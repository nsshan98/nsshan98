# Contabo VPS & Coolify Troubleshooting History

> **Source of Truth:** Reconstructed from the actual errors, debugging sessions, and architectural discoveries recorded during the real-world VPS setup in `docs/vps-setup-conversation.md`.

---

## Incident 1: Coolify Localhost Connection Failure after Disabling Root SSH

### Incident Summary
During initial SSH hardening, setting `PermitRootLogin no` broke Coolify's ability to validate and manage the local deployment server.

### Technical Diagnosis & Root Cause
1. **Symptom:** In the Coolify web dashboard, the server connection status showed failed/unreachable when connecting to `localhost` or remote nodes over SSH.
2. **Diagnosis:** Coolify's orchestration container connects to managed servers over SSH using private keys stored in `/data/coolify/ssh/keys/`. It initiates this session as user `root` to execute privileged Docker commands and volume binds.
3. **Root Cause:** By setting `PermitRootLogin no`, OpenSSH completely rejected key-based authentication for `root`, severing Coolify's communication link with the host.

### Resolution
* Modified `/etc/ssh/sshd_config.d/99-security.conf` to use:
  ```text
  PermitRootLogin without-password
  ```
  *(Equivalent to `PermitRootLogin prohibit-password` in modern OpenSSH).*
* This allows root to log in using an authorized SSH key (which Coolify uses), while still rejecting all password-based brute force attempts.
* Reloaded OpenSSH: `sudo systemctl reload ssh`.
* Re-validated the server connection inside Coolify: connection succeeded immediately.

### Key Operational Lesson
Never blindly apply generic Linux hardening advice (`PermitRootLogin no`) to container orchestrators. Distinguish between **disabling root password authentication** (mandatory) and **disabling root SSH key authentication** (which breaks self-hosted management platforms).

---

## Incident 2: The Docker `iptables` Bypass vs. UFW Security Hole

### Incident Summary
Inspection of listening sockets (`ss -lntup`) and container port bindings revealed that Docker-published ports bypass host UFW rules.

### Technical Diagnosis & Root Cause
1. **Symptom:** Ports mapped via Docker (`-p 5432:5432` or `-p 8080:8080`) were reachable from external IPs even when UFW had a strict `default deny incoming` policy and no matching allow rule.
2. **Diagnosis:** Docker manipulates the Linux kernel's `iptables` rules directly. When a container publishes a port to `0.0.0.0`, Docker injects a `DNAT` rule into the `PREROUTING` chain.
3. **Root Cause:** In the Linux packet traversal pipeline, `PREROUTING` (NAT) happens *before* UFW's `INPUT` filter table. Packets addressed to published container ports are forwarded directly to the container bridge interface without ever hitting UFW's deny rule!

### Resolution
* **Rule 1 — Private Databases:** Database containers (PostgreSQL, Redis) must **never** use host port mapping in Coolify (leave "Make Public" turned off). They communicate purely across Docker's internal overlay/bridge networks via container DNS names (e.g. `postgres:5432`).
* **Rule 2 — Provider-Level Firewall:** Configured Contabo's external cloud firewall at the hypervisor/network edge. Even if a container accidentally maps a host port, the Contabo edge router drops the packets before they reach the VPS virtual network card.

### Key Operational Lesson
UFW alone is not a sufficient firewall for Dockerized hosts. Defense-in-depth requires keeping database containers private on internal Docker networks AND enforcing provider-level perimeter firewall rules.

---

## Incident 3: Cloudflare Proxy Interfering with Traefik Let's Encrypt Issuance

### Incident Summary
Coolify dashboard domain assignment failed to provision a Let's Encrypt TLS certificate when Cloudflare proxy (orange cloud) was active with default settings.

### Technical Diagnosis & Root Cause
1. **Symptom:** Browser reported SSL handshake error (`ERR_SSL_VERSION_OR_CIPHER_MISMATCH` or `526 Invalid SSL Certificate`) when visiting `https://coolify.<domain>`.
2. **Diagnosis:** Traefik uses Let's Encrypt's ACME HTTP-01 challenge over port 80 to verify domain ownership.
3. **Root Cause:** When Cloudflare's orange cloud proxy was active, Let's Encrypt verification servers received Cloudflare's edge certificate or redirect loops rather than direct access to Traefik's challenge token on port 80. Furthermore, if Cloudflare SSL was set to "Flexible", it caused redirect loops with Traefik's automatic HTTP-to-HTTPS redirection.

### Resolution
* Switched Cloudflare DNS record status to **DNS Only (Grey Cloud)** during initial domain registration and certificate issuance.
* Once Traefik successfully provisioned the Let's Encrypt certificate, Cloudflare proxying could be safely enabled provided that the SSL/TLS encryption mode in Cloudflare was set to **Full (Strict)**.

### Key Operational Lesson
Always use DNS-only during the initial ACME challenge verification, or configure Cloudflare to "Full (Strict)" so edge proxies validate the origin's Traefik certificate.

---

## Incident 4: Non-Destructive Restore Safety & Verification

### Incident Summary
The team needed to prove that automated daily PostgreSQL backups stored in Cloudflare R2 were valid and recoverable without risking data corruption on the live production database.

### Technical Diagnosis & Root Cause
1. **Risk:** Clicking "Restore" directly on the production database container would wipe active tables, abort ongoing client transactions, and cause downtime. If the backup dump was corrupt or truncated, the production database would be left empty or broken.
2. **Diagnosis:** A production database must never be used as a test subject for backup integrity verification.

### Resolution
* Spun up an isolated, temporary PostgreSQL instance (`temp-restore-test-db`) on a private network in Coolify.
* Selected the latest `.sql.gz` backup archive from Cloudflare R2 and restored it into `temp-restore-test-db`.
* Executed dynamic SQL verification to count rows across all public tables:
  ```sql
  SELECT table_name, 
         (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
  FROM (
    SELECT table_name, 
           query_to_xml(format('select count(*) as cnt from %I', table_name), false, true, '') as xml_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
  ) t;
  ```
* Confirmed: `users`, `orders`, and related tables were fully populated ("ha dekha jacche vitore datao ache").
* Safely deleted `temp-restore-test-db` to reclaim memory and disk space.

### Key Operational Lesson
Backup integrity testing must always be performed in a quarantined sandbox container. Never test restores against production databases.

---

## Incident 5: World-Readable `/data/coolify/source/.env` Permissions

### Incident Summary
Audit of the Coolify persistent filesystem revealed that the master `.env` file containing application encryption keys was created with default `644` permissions.

### Technical Diagnosis & Root Cause
1. **Symptom:** File permissions showed `-rw-r--r-- 1 root root /data/coolify/source/.env`.
2. **Diagnosis:** File mode `644` permits any unprivileged local user or compromised container with access to host user namespaces to read the file contents.
3. **Risk:** The file contains `APP_KEY`, which is the master cryptographic key used by Laravel/Coolify to encrypt and decrypt stored environment variables, API tokens, and SSH keys.

### Resolution
* Executed permission hardening:
  ```bash
  sudo chmod 600 /data/coolify/source/.env
  sudo chmod 700 /data/coolify/ssh
  sudo chmod 600 /data/coolify/ssh/* 2>/dev/null || true
  ```
* Verified that only `root` possesses read/write capability (`-rw-------`).

### Key Operational Lesson
Always verify UNIX file permissions on secret configuration files. Even if you are the sole human administrator, background daemons or container breakout vulnerabilities must not have read access to master encryption keys.

