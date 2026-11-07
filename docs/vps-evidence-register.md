# Contabo VPS & Coolify Implementation Evidence Register

> **Source of Truth:** Reconstructed from the actual setup chat transcript (`docs/vps-setup-conversation.md`). This register distinguishes verified historical implementations from UI configurations, discussions, and future recommendations.

---

## 1. Master Implementation & Verification Register

| Implementation Task | Historical Execution Status | Classification | Verification Artifact / Output |
| :--- | :--- | :--- | :--- |
| **Contabo VPS Provisioning (4 vCPU, 8GB RAM, 96GB Disk)** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `nproc` (4), `free -h` (7.8Gi), `df -h` (96G) |
| **Ubuntu 24.04.5 LTS Deployment** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `cat /etc/os-release` (`Noble Numbat`) |
| **Initial Root SSH Access via Password** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | Connected over port 22 via Contabo root credentials |
| **System Hardware & Network Audit** | **ACTUALLY EXECUTED AND VERIFIED** | RECOMMENDED | `ip -br a` (`eth0 169.58.108.95`) |
| **Dedicated `deploy` User Account Creation** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `adduser deploy` completed |
| **Sudo Privilege Delegation** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `usermod -aG sudo deploy`, `id deploy` verified |
| **Sudo Execution Verification** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `sudo whoami` returned `root` |
| **Ed25519 SSH Keypair Generation** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `~/.ssh/contabo-vps` (399B), `contabo-vps.pub` (93B) |
| **Public Key Deployment via `ssh-copy-id`** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `Number of key(s) added: 1` |
| **Key-Based SSH Login Verification** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | Logged in as `deploy` without password |
| **Disable Password Authentication** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `PasswordAuthentication no` in `sshd_config.d` |
| **PermitRootLogin Policy Alignment** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | Set to `without-password` after `no` broke Coolify |
| **OpenSSH Config Validation (`sshd -t`)** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | Exit code `0` prior to reloading daemon |
| **UFW Default-Deny Policy Configuration** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | Inbound `deny`, Outbound `allow` |
| **UFW Inbound Rules (22, 80, 443 TCP/UDP)** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | Rules updated for IPv4 and IPv6 |
| **UFW Enablement & Verification** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `Firewall is active and enabled on system startup` |
| **Contabo Cloud Perimeter Firewall Creation** | **CONFIGURED AND VERIFIED THROUGH UI** | SECURITY HARDENING | Rules created for 22, 80, 443; assigned in CCP |
| **Docker Engine Installation** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | Installed via official Coolify script |
| **Coolify v4 Core Container Stack** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `docker ps` verified `coolify`, `proxy`, `db`, `redis` |
| **Initial Admin Web Registration (Port 8000)** | **CONFIGURED AND VERIFIED THROUGH UI** | MUST HAVE | Admin account registered at `http://<IP>:8000` |
| **Localhost Server Connection Validation** | **CONFIGURED AND VERIFIED THROUGH UI** | MUST HAVE | Docker socket connected via SSH root key |
| **Cloudflare DNS A Record Configuration** | **CONFIGURED AND VERIFIED THROUGH UI** | MUST HAVE | A records created for dashboard and app |
| **Traefik Automated Let's Encrypt TLS** | **CONFIGURED AND VERIFIED THROUGH UI** | MUST HAVE | Valid HTTPS on `coolify.<domain>` verified |
| **UFW Port 8000 Removal** | **ACTUALLY EXECUTED AND VERIFIED** | SECURITY HARDENING | Temporary setup port rule deleted from UFW |
| **Listening Socket Audit (`ss -lntup`)** | **ACTUALLY EXECUTED AND VERIFIED** | RECOMMENDED | Verified Traefik 80/443, Docker proxy bindings |
| **Unattended Security Updates Setup** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `unattended-upgrades` package active, logs verified |
| **APT Periodic Timer Schedule** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | `20auto-upgrades` written with daily timers |
| **Reboot Flag Notification Inspection** | **ACTUALLY EXECUTED AND VERIFIED** | RECOMMENDED | Kept automatic reboot `false` on single VPS |
| **Private PostgreSQL Deployment (Alpine)** | **CONFIGURED AND VERIFIED THROUGH UI** | MUST HAVE | Database created without public host port bind |
| **Cloudflare R2 S3 Storage Connection** | **CONFIGURED AND VERIFIED THROUGH UI** | MUST HAVE | Bucket connected via scoped R2 API token |
| **PostgreSQL Daily Backup Schedule** | **CONFIGURED AND VERIFIED THROUGH UI** | MUST HAVE | Cron scheduled daily backups to R2 |
| **Manual PostgreSQL Backup Execution** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | Dump file `.sql.gz` uploaded to R2 |
| **PostgreSQL Non-Destructive Restore Drill** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | Restored into `temp-restore-test-db`; tables verified |
| **Restored Table Data Inspection** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | Confirmed: "ha dekha jacche vitore datao ache" |
| **Temporary Database Teardown** | **CONFIGURED AND VERIFIED THROUGH UI** | MUST HAVE | Sandbox container and volume deleted cleanly |
| **Inspection of `/data/coolify` Layout** | **ACTUALLY EXECUTED AND VERIFIED** | MUST HAVE | Total 31M; backups (18M), source (12M) |
| **Hardening `/data/coolify/source/.env`** | **ACTUALLY EXECUTED AND VERIFIED** | SECURITY HARDENING | Permissions changed from `644` to `600` |
| **Hardening `/data/coolify/ssh` Keys** | **ACTUALLY EXECUTED AND VERIFIED** | SECURITY HARDENING | Permissions restricted to `700` |
| **Docker `HEALTHCHECK` Implementation** | **DISCUSSED & VERIFIED IN MANIFEST** | RECOMMENDED | Embedded in Next.js Dockerfile with `/api/health` |
| **Coolify Built-In One-Click Rollback** | **DISCUSSED & VERIFIED IN UI** | RECOMMENDED | Uses immutable Docker image tags from deployments |
| **Coolify Built-In Metrics** | **CONFIGURED AND VERIFIED THROUGH UI** | RECOMMENDED | Real-time CPU, RAM, Disk charts without Prometheus |
| **Full Bare-Metal VPS Disaster Recovery** | **DISCUSSED & DOCUMENTED AS RUNBOOK** | KEEP FOR LONG TERM | Step-by-step runbook preserving `APP_KEY` |

---

## 2. Infrastructure Identity & Technology Stack

* **Hosting Provider:** Contabo GmbH (Cloud VPS)
* **Operating System:** Ubuntu 24.04.5 LTS (Linux kernel 6.8.0-31-generic)
* **Local Developer Client:** Linux workstation (`lenovo`, OpenSSH client)
* **User Accounts:** `root` (emergency/orchestration) and `deploy` (daily administration, `sudo` group 27)
* **SSH Key Specification:** OpenSSH Ed25519 (256-bit elliptic curve)
* **Host Firewall:** Ubuntu Uncomplicated Firewall (`ufw`) over `nftables`
* **Edge Perimeter Firewall:** Contabo Cloud Firewall (Data center network filter)
* **Container Engine:** Docker Engine CE (installed via Coolify helper script)
* **PaaS Management Platform:** Coolify v4.x (self-hosted open-source control plane)
* **Reverse Proxy & Ingress:** Traefik v3 (managed dynamically via Docker container labels)
* **Relational Database:** PostgreSQL 18 (Alpine image, private bridge network isolation)
* **DNS Provider:** Cloudflare Authoritative DNS
* **Offsite Backup Storage:** Cloudflare R2 (S3-compatible object storage, zero egress pricing)
* **Application Framework:** Next.js (Standalone output, Dockerfile containerized)

---

## 3. Explicit List of Unimplemented Recommendations vs. Completed Work

* **Tested Bare-Metal VPS Migration:** The user successfully executed a **PostgreSQL database restore drill** into a temporary test database container. However, an entire end-to-end bare-metal wipe and recreation of the entire VPS was *discussed and designed as a runbook*, but **not destructively tested on the production host**.
* **Contabo Snapshot Backups:** The user confirmed Contabo native snapshots were not purchased or active ("contabo backup free na ar amar kina nei"). Therefore, offsite R2 is the primary disaster recovery channel.
* **External Prometheus/Grafana Stack:** The user explicitly rejected adding external heavyweight monitoring tools ("aktu beshi unnecessary kaj kora hocche ki?"). Coolify's native Metrics and Docker log caps were selected instead.

