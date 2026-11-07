# Contabo VPS & Coolify Real-World Implementation Timeline

> **Source of Truth:** Reconstructed from actual chat transcript (`docs/vps-setup-conversation.md`) spanning 190+ user exchanges and verified terminal sessions on a Contabo Cloud VPS running Ubuntu 24.04 LTS.

---

## Chronological Implementation Milestones

```
[Phase 1: VPS Acquisition & Hardware Verification]
       │
       ▼
[Phase 2: Initial SSH & System Inspection]
       │
       ▼
[Phase 3: Dedicated Deploy User & Sudo Elevation]
       │
       ▼
[Phase 4: SSH Ed25519 Key Generation & Installation]
       │
       ▼
[Phase 5: OpenSSH Hardening & Root Policy Debugging]
       │
       ▼
[Phase 6: Dual-Layer Firewall: UFW & Contabo Cloud]
       │
       ▼
[Phase 7: Docker Engine & Coolify v4 Installation]
       │
       ▼
[Phase 8: Cloudflare DNS, Dashboard & HTTPS Provisioning]
       │
       ▼
[Phase 9: Unattended OS Security Updates Configuration]
       │
       ▼
[Phase 10: Private PostgreSQL Deployment & R2 Backups]
       │
       ▼
[Phase 11: Non-Destructive PostgreSQL Restore Drill]
       │
       ▼
[Phase 12: /data/coolify Secret Hardening & Disaster Recovery]
```

---

### Phase 1: VPS Acquisition & Hardware Verification
* **Timestamp / Context:** Initial server spin-up on Contabo.
* **Server Specifications:**
  * **OS:** Ubuntu 24.04.5 LTS (Noble Numbat)
  * **Kernel:** GNU/Linux 6.8.0-31-generic x86_64
  * **Compute:** 4 vCPU cores (`nproc` confirmed `4`)
  * **Memory:** 7.8 GiB total (`free -h` showed 431 MiB used, 7.3 GiB free)
  * **Disk:** 96 GiB root partition on NVMe/SSD (`/dev/sda1`, 2.3 GiB used)
  * **Network Interface:** `eth0` with static public IPv4 (recorded as `169.58.108.95` placeholder)

---

### Phase 2: Initial Root SSH Connection & Audit
* **Action:** First remote connection established from developer's local workstation via SSH as `root`.
* **Host Audit:**
  * Audited active listening sockets using `ss -tulpn`.
  * Checked default OpenSSH daemon configuration using `sshd -T`.
  * Baseline SSH state:
    * `PermitRootLogin yes`
    * `PubkeyAuthentication yes`
    * `PasswordAuthentication yes`
    * `KbdInteractiveAuthentication no`

---

### Phase 3: Dedicated Deploy User Creation & Privilege Delegation
* **Motivation:** Elimination of daily `root` login to adhere to the principle of least privilege and establish an audit trail.
* **Execution:**
  1. Created non-root user account: `adduser deploy`
  2. Granted administrative privilege: `usermod -aG sudo deploy`
  3. Verified group membership: `id deploy` -> `uid=1000(deploy) gid=1000(deploy) groups=1000(deploy),27(sudo),100(users)`
  4. Switched context: `su - deploy`
  5. Verified sudo capability: `sudo whoami` -> `root`

---

### Phase 4: SSH Key-Based Cryptographic Authentication
* **Motivation:** Neutralize password dictionary attacks across port 22.
* **Execution:**
  1. Generated local Ed25519 keypair on developer workstation:
     `ssh-keygen -t ed25519 -f ~/.ssh/contabo-vps`
     * Private key: `~/.ssh/contabo-vps` (permissions `0600`, 399 bytes)
     * Public key: `~/.ssh/contabo-vps.pub` (permissions `0644`, 93 bytes)
  2. Provisioned public key to VPS:
     `ssh-copy-id -i ~/.ssh/contabo-vps.pub deploy@<SERVER_IP>`
     * Verified output: `Number of key(s) added: 1`
  3. Verified in a separate terminal:
     `ssh -i ~/.ssh/contabo-vps deploy@<SERVER_IP>` -> Connected successfully without server password prompt.

---

### Phase 5: OpenSSH Security Hardening & The "Coolify Root SSH" Lesson
* **Issue Encountered:** Setting `PermitRootLogin no` caused Coolify's server orchestration container to fail connection during initial local node discovery.
* **Root Cause:** Coolify's orchestration engine connects to managed nodes (including localhost) using key-based SSH authentication under `root`.
* **Solution Implemented:**
  * Configured `PermitRootLogin without-password` (also known as `prohibit-password`).
  * Enforced:
    * `PasswordAuthentication no`
    * `KbdInteractiveAuthentication no`
    * `PubkeyAuthentication yes`
    * `PermitRootLogin without-password`
  * Tested configuration syntax: `sudo sshd -t`
  * Reloaded daemon: `sudo systemctl reload ssh`
  * Verified effective runtime: `sshd -T` confirmed `permitrootlogin without-password` and `passwordauthentication no`.

---

### Phase 6: Dual-Layer Firewall (UFW & Contabo Cloud Perimeter)
* **Host Layer (UFW):**
  * Baseline: `Status: inactive`
  * Configured default policies: incoming `deny`, outgoing `allow`.
  * Added rules:
    * `22/tcp` (OpenSSH)
    * `80/tcp` (HTTP / Let's Encrypt)
    * `443/tcp` (HTTPS / Traefik)
    * `443/udp` (HTTP/3 QUIC)
  * Activated: `sudo ufw enable` -> `Firewall is active and enabled on system startup`.
* **Perimeter Layer (Contabo Cloud Firewall):**
  * Configured upstream in Contabo Customer Control Panel.
  * Added rules matching allowed TCP/UDP ports; default inbound dropped.
  * Assigned firewall policy to VPS instance.
  * Verified: External connectivity to SSH and HTTPS remained online with zero packet drops.
* **Critical Finding:** Docker bypasses UFW by injecting NAT rules directly into `iptables` `PREROUTING`. The Contabo cloud firewall ensures ports published unintentionally by Docker are dropped at the network edge.

---

### Phase 7: Docker Engine & Coolify v4 Installation
* **Pre-check:** `docker` command was absent on stock image.
* **Installation:** Executed official Coolify installation script:
  `curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash`
* **Containers Provisioned:**
  * `coolify` (Web control plane & API)
  * `coolify-proxy` (Traefik reverse proxy)
  * `coolify-db` (Internal PostgreSQL metadata store)
  * `coolify-redis` (Background job queue & cache)
  * `coolify-realtime` (Websocket notification service)
* **Onboarding:**
  * Accessed Web UI at `http://<SERVER_IP>:8000`.
  * Registered Root Instance Administrator.
  * Validated connection to localhost Docker daemon.

---

### Phase 8: Cloudflare DNS, Dashboard & HTTPS Provisioning
* **Cloudflare Configuration:**
  * Created DNS `A` records pointing `coolify.<domain>` and `app.<domain>` to the VPS public IP.
  * Initially set proxy status to **DNS Only (Grey Cloud)** to allow Traefik to solve Let's Encrypt ACME HTTP-01 challenges on port 80.
* **Coolify Instance Domain:**
  * Configured `https://coolify.<domain>` in Settings > Instance Domain.
  * Traefik automatically obtained valid Let's Encrypt certificates.
  * Verified padlock icon and HTTPS connection in browser.
  * Removed temporary port 8000 from UFW: `sudo ufw delete allow 8000/tcp`.

---

### Phase 9: Automated OS Security Updates (unattended-upgrades)
* **Audit:** Verified `unattended-upgrades` package presence on Ubuntu 24.04.
* **Configuration:**
  * Enabled daily timer in `/etc/apt/apt.conf.d/20auto-upgrades`:
    * `APT::Periodic::Update-Package-Lists "1";`
    * `APT::Periodic::Unattended-Upgrade "1";`
  * Verified allowed origins in `/etc/apt/apt.conf.d/50unattended-upgrades` (`noble-security`).
  * Inspected `/var/log/unattended-upgrades/unattended-upgrades.log` to confirm automated background checks.
  * Reboots: Explicitly kept automatic reboot disabled (`false`) to prevent unannounced container downtime during production hours.

---

### Phase 10: Private PostgreSQL Deployment & Cloudflare R2 Backups
* **Database Deployment:**
  * Provisioned PostgreSQL 18 (Alpine) container in Coolify.
  * Kept **Make Public** turned OFF (zero host port bindings; isolated inside Docker bridge network).
* **Cloudflare R2 Integration:**
  * Created dedicated bucket: `vps-production-backups`.
  * Generated scoped R2 API token with Object Read & Write permissions.
  * Configured S3 Storage provider in Coolify.
* **Backup Automation:**
  * Enabled automated daily PostgreSQL dumps (`0 2 * * *`).
  * Set retention policy to 7 rolling daily snapshots.
  * Verified manual snapshot execution and archive upload to R2 bucket.

---

### Phase 11: Non-Destructive PostgreSQL Restore Drill
* **Safety Mandate:** Never test restore drills against live production database volumes.
* **Execution:**
  1. Located latest compressed dump in R2 (`.sql.gz`).
  2. Spun up an isolated temporary database container (`temp-restore-test-db`) in Coolify.
  3. Executed restore of production dump into `temp-restore-test-db`.
  4. Executed query to verify schema and table row counts (`users`, `orders`, etc.).
  5. Confirmed integrity ("ha dekha jacche vitore datao ache").
  6. Safely deleted temporary test resource to release RAM and disk resources.

---

### Phase 12: Coolify Secrets Hardening & Disaster Recovery Architecture
* **Secret Permissions Audit:**
  * Audited `/data/coolify/source/.env`.
  * Discovered initial permissions were `644` (`-rw-r--r--`).
  * Hardened permissions to `600` (`chmod 600 /data/coolify/source/.env`).
  * Audited `/data/coolify/ssh` permissions (hardened to `700`).
* **Cryptographic Dependency Identified:**
  * Confirmed that Coolify database backups alone cannot recover an instance without `/data/coolify/source/.env` containing the identical `APP_KEY`.
* **Disaster Recovery Strategy:**
  * Documented offsite packaging of `APP_KEY`, SSH keys, and database dumps to achieve an RTO < 45 minutes on any fresh Ubuntu VPS.

