# Contabo VPS & Coolify Command Reference

> **Source of Truth:** Compiled from verified terminal commands executed during the Contabo VPS and Coolify setup (`docs/vps-setup-conversation.md`).

---

## 1. System Inspection & Hardware Verification

### Command 1.1: Operating System Release Check
* **Execution Location:** VPS Host
* **User Context:** `root`
* **Purpose:** Confirm installed distribution and LTS release codename.
* **Command:**
  ```bash
  cat /etc/os-release
  ```
* **Actual Output:**
  ```text
  PRETTY_NAME="Ubuntu 24.04.5 LTS"
  NAME="Ubuntu"
  VERSION_ID="24.04"
  VERSION="24.04.5 LTS (Noble Numbat)"
  VERSION_CODENAME=noble
  ID=ubuntu
  ID_LIKE=debian
  HOME_URL="https://www.ubuntu.com/"
  SUPPORT_URL="https://help.ubuntu.com/"
  BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
  PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
  UBUNTU_CODENAME=noble
  LOGO=ubuntu-logo
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 1.2: CPU Core Count Verification
* **Execution Location:** VPS Host
* **User Context:** `root`
* **Purpose:** Verify provisioned vCPU core allocation from Contabo.
* **Command:**
  ```bash
  nproc
  ```
* **Actual Output:**
  ```text
  4
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 1.3: Memory Allocation & Swap Audit
* **Execution Location:** VPS Host
* **User Context:** `root`
* **Purpose:** Audit total RAM headroom before installing Docker and containerized databases.
* **Command:**
  ```bash
  free -h
  ```
* **Actual Output:**
  ```text
                total        used        free      shared  buff/cache   available
  Mem:           7.8Gi       431Mi       7.3Gi       964Ki       312Mi       7.4Gi
  Swap:             0B          0B          0B
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 1.4: Disk Partition Space Verification
* **Execution Location:** VPS Host
* **User Context:** `root`
* **Purpose:** Verify disk space on root filesystem mount.
* **Command:**
  ```bash
  df -h /
  ```
* **Actual Output:**
  ```text
  Filesystem      Size  Used Avail Use% Mounted on
  /dev/sda1        96G  2.3G   94G   3% /
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 1.5: Network Interface & IP Address Check
* **Execution Location:** VPS Host
* **User Context:** `root`
* **Purpose:** Confirm public IPv4 address assigned to external NIC (`eth0`).
* **Command:**
  ```bash
  ip -br a
  ```
* **Actual Output:**
  ```text
  lo               UNKNOWN        127.0.0.1/8 ::1/128 
  eth0             UP             169.58.108.95/24 2a02:c207:.../64
  ```
* **Status:** Still Recommended | MUST HAVE

---

## 2. Dedicated Deploy User & Sudo Elevation

### Command 2.1: Create Deploy User
* **Execution Location:** VPS Host
* **User Context:** `root`
* **Purpose:** Create an unprivileged user account for daily administration.
* **Command:**
  ```bash
  adduser deploy
  ```
* **Actual Output:**
  ```text
  Adding user `deploy' ...
  Adding new group `deploy' (1000) ...
  Adding new user `deploy' (1000) with group `deploy' ...
  Creating home directory `/home/deploy' ...
  Copying files from `/etc/skel' ...
  New password: 
  Retype new password: 
  passwd: password updated successfully
  Is the information correct? [Y/n] Y
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 2.2: Grant Sudo Privileges
* **Execution Location:** VPS Host
* **User Context:** `root`
* **Purpose:** Attach the `sudo` administrative group to the deploy user.
* **Command:**
  ```bash
  usermod -aG sudo deploy
  ```
* **Actual Output:** Silent exit (`0`).
* **Status:** Still Recommended | MUST HAVE

---

### Command 2.3: Verify User Group Affiliations
* **Execution Location:** VPS Host
* **User Context:** `root`
* **Purpose:** Verify user ID and group ID assignments.
* **Command:**
  ```bash
  id deploy
  ```
* **Actual Output:**
  ```text
  uid=1000(deploy) gid=1000(deploy) groups=1000(deploy),27(sudo),100(users)
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 2.4: Switch to Deploy User
* **Execution Location:** VPS Host
* **User Context:** `root`
* **Purpose:** Switch into an interactive login shell under the `deploy` account.
* **Command:**
  ```bash
  su - deploy
  ```
* **Actual Output:**
  ```text
  deploy@vmi203011310:~$
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 2.5: Verify Sudo Elevation
* **Execution Location:** VPS Host
* **User Context:** `deploy`
* **Purpose:** Confirm password elevation functions properly.
* **Command:**
  ```bash
  sudo whoami
  ```
* **Actual Output:**
  ```text
  [sudo] password for deploy: 
  root
  ```
* **Status:** Still Recommended | MUST HAVE

---

## 3. SSH Key Generation, Installation & Hardening

### Command 3.1: Generate Local Ed25519 Keypair
* **Execution Location:** Local Developer Workstation
* **User Context:** Local User (`lenovo`)
* **Purpose:** Generate a dedicated Ed25519 private/public keypair.
* **Command:**
  ```bash
  ssh-keygen -t ed25519 -f ~/.ssh/contabo-vps -C "deploy@contabo-vps"
  ```
* **Actual Output:**
  ```text
  Generating public/private ed25519 key pair.
  Enter passphrase (empty for no passphrase): 
  Enter same passphrase again: 
  Your identification has been saved in /home/lenovo/.ssh/contabo-vps
  Your public key has been saved in /home/lenovo/.ssh/contabo-vps.pub
  The key fingerprint is:
  SHA256:wS9... deploy@contabo-vps
  ```
* **Key File Status:**
  ```text
  -rw------- 1 lenovo lenovo 399 Oct 18 22:06 /home/lenovo/.ssh/contabo-vps
  -rw-r--r-- 1 lenovo lenovo  93 Oct 18 22:06 /home/lenovo/.ssh/contabo-vps.pub
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 3.2: Copy Public Key to VPS
* **Execution Location:** Local Developer Workstation
* **User Context:** Local User
* **Purpose:** Authorize public key on remote host.
* **Command:**
  ```bash
  ssh-copy-id -i ~/.ssh/contabo-vps.pub deploy@169.58.108.95
  ```
* **Actual Output:**
  ```text
  /usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/lenovo/.ssh/contabo-vps.pub"
  Number of key(s) added: 1
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 3.3: Verify Key-Based Login in Separate Terminal
* **Execution Location:** Local Developer Workstation
* **User Context:** Local User
* **Purpose:** Verify passwordless key login prior to disabling passwords.
* **Command:**
  ```bash
  ssh -i ~/.ssh/contabo-vps deploy@169.58.108.95
  ```
* **Actual Output:** Logged in directly to `deploy@vmi...:~$`.
* **Status:** Still Recommended | MUST HAVE

---

### Command 3.4: OpenSSH Daemon Audit
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Purpose:** Inspect compiled SSH parameters before editing.
* **Command:**
  ```bash
  sudo sshd -T | grep -E 'permitrootlogin|pubkeyauthentication|passwordauthentication|kbdinteractiveauthentication'
  ```
* **Initial Actual Output:**
  ```text
  permitrootlogin yes
  pubkeyauthentication yes
  passwordauthentication yes
  kbdinteractiveauthentication no
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 3.5: Configure SSH Drop-in File
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Purpose:** Enforce key-only authentication while maintaining Coolify-compatible root access.
* **Command:**
  ```bash
  sudo bash -c 'cat << "EOF" > /etc/ssh/sshd_config.d/99-security.conf
  PasswordAuthentication no
  KbdInteractiveAuthentication no
  PubkeyAuthentication yes
  PermitRootLogin without-password
  EOF'
  ```
* **Actual Output:** Silent exit (`0`).
* **Status:** Still Recommended | SECURITY HARDENING

---

### Command 3.6: Test OpenSSH Configuration Syntax
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Purpose:** Prevent daemon crashes and terminal lockout caused by typos.
* **Command:**
  ```bash
  sudo sshd -t
  ```
* **Actual Output:** No output; exit code `0`.
* **Status:** Still Recommended | MUST HAVE

---

### Command 3.7: Reload OpenSSH Service
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Purpose:** Apply updated authentication directives without terminating existing connections.
* **Command:**
  ```bash
  sudo systemctl reload ssh
  ```
* **Actual Output:** Silent exit (`0`).
* **Verified Runtime Output (`sudo sshd -T`):**
  ```text
  permitrootlogin without-password
  pubkeyauthentication yes
  passwordauthentication no
  kbdinteractiveauthentication no
  ```
* **Status:** Still Recommended | MUST HAVE

---

## 4. Host Firewall (UFW) Configuration

### Command 4.1: Inspect Initial Firewall Status
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Command:**
  ```bash
  sudo ufw status
  ```
* **Actual Output:**
  ```text
  Status: inactive
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 4.2: Set Default Policies & Allow Ports
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Command:**
  ```bash
  sudo ufw default deny incoming
  sudo ufw default allow outgoing
  sudo ufw allow 22/tcp comment "OpenSSH"
  sudo ufw allow 80/tcp comment "HTTP"
  sudo ufw allow 443/tcp comment "HTTPS"
  sudo ufw allow 443/udp comment "HTTP3-QUIC"
  sudo ufw --force enable
  ```
* **Actual Output:**
  ```text
  Default incoming policy changed to 'deny'
  Default outgoing policy changed to 'allow'
  Rules updated
  Rules updated (v6)
  Firewall is active and enabled on system startup
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 4.3: Verify Active Firewall Rules
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Command:**
  ```bash
  sudo ufw status verbose
  ```
* **Actual Output:**
  ```text
  Status: active
  Logging: on (low)
  Default: deny (incoming), allow (outgoing), disabled (routed)
  New profiles: skip

  To                         Action      From
  --                         ------      ----
  22/tcp                     ALLOW IN    Anywhere                   # OpenSSH
  80/tcp                     ALLOW IN    Anywhere                   # HTTP
  443/tcp                    ALLOW IN    Anywhere                   # HTTPS
  443/udp                    ALLOW IN    Anywhere                   # HTTP3-QUIC
  22/tcp (v6)                ALLOW IN    Anywhere (v6)              # OpenSSH
  80/tcp (v6)                ALLOW IN    Anywhere (v6)              # HTTP
  443/tcp (v6)               ALLOW IN    Anywhere (v6)              # HTTPS
  443/udp (v6)               ALLOW IN    Anywhere (v6)              # HTTP3-QUIC
  ```
* **Status:** Still Recommended | MUST HAVE

---

## 5. Docker Engine & Coolify Installation

### Command 5.1: Execute Official Coolify Installer
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Command:**
  ```bash
  curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
  ```
* **Actual Output Summary:**
  * Detected OS: `Ubuntu 24.04.5 LTS`
  * Docker not found -> Installed official Docker CE packages automatically.
  * Pulled core images: `coolify`, `coolify-proxy` (Traefik), `coolify-db` (Postgres), `coolify-redis`.
  * Output: `Coolify is installed and running! Access Coolify at: http://<SERVER_IP>:8000`
* **Status:** Still Recommended | MUST HAVE

---

### Command 5.2: Verify Coolify Containers
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Command:**
  ```bash
  sudo docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
  ```
* **Actual Output:**
  ```text
  NAMES               STATUS                    PORTS
  coolify             Up 3 minutes (healthy)    0.0.0.0:8000->80/tcp
  coolify-proxy       Up 3 minutes (healthy)    0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp, 0.0.0.0:443->443/udp
  coolify-db          Up 3 minutes (healthy)    5432/tcp
  coolify-redis       Up 3 minutes (healthy)    6379/tcp
  coolify-realtime    Up 3 minutes (healthy)    6001/tcp
  ```
* **Status:** Still Recommended | MUST HAVE

---

## 6. Unattended Upgrades & Maintenance

### Command 6.1: Verify Package & Service Status
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Command:**
  ```bash
  dpkg -l unattended-upgrades
  systemctl status unattended-upgrades.service
  ```
* **Actual Output:**
  ```text
  ii  unattended-upgrades 2.9.1+nmu3ubuntu1 all automatic installation of security upgrades
  ● unattended-upgrades.service - Unattended Upgrades Shutdown
       Loaded: loaded (/usr/lib/systemd/system/unattended-upgrades.service; enabled)
       Active: active (running)
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 6.2: Configure Daily APT Periodic Timers
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Command:**
  ```bash
  sudo bash -c 'cat << "EOF" > /etc/apt/apt.conf.d/20auto-upgrades
  APT::Periodic::Update-Package-Lists "1";
  APT::Periodic::Unattended-Upgrade "1";
  EOF'
  ```
* **Actual Output:** Silent exit (`0`).
* **Status:** Still Recommended | MUST HAVE

---

### Command 6.3: Inspect Upgrade Activity Logs
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Command:**
  ```bash
  sudo tail -30 /var/log/unattended-upgrades/unattended-upgrades.log
  ```
* **Actual Output Excerpt:**
  ```text
  2026-11-04 00:28:41,520 INFO Allowed origins are: o=Ubuntu,a=noble-security
  2026-11-04 00:28:43,104 INFO Initial blacklisted packages: 
  2026-11-04 00:28:43,105 INFO Initial whitelisted packages: 
  2026-11-04 00:28:45,992 INFO No packages found that can be upgraded unattended
  ```
* **Status:** Still Recommended | MUST HAVE

---

## 7. Storage, Secrets & Disaster Recovery Hardening

### Command 7.1: Inspect /data/coolify Disk Usage
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Command:**
  ```bash
  sudo du -sh /data/coolify
  sudo du -sh /data/coolify/*
  ```
* **Actual Output:**
  ```text
  31M     /data/coolify

  36K     /data/coolify/applications
  18M     /data/coolify/backups
  20K     /data/coolify/databases
  12K     /data/coolify/proxy
  4.0K    /data/coolify/services
  12M     /data/coolify/source
  8.0K    /data/coolify/ssh
  ```
* **Status:** Still Recommended | MUST HAVE

---

### Command 7.2: Audit and Enforce Secret File Permissions
* **Execution Location:** VPS Host
* **User Context:** `deploy` (with `sudo`)
* **Purpose:** Harden `.env` master application key from world-readable `644` to owner-only `600`.
* **Initial Audit:**
  ```bash
  ls -l /data/coolify/source/.env
  ```
* **Actual Output:**
  ```text
  -rw-r--r-- 1 root root 680 Nov  4 01:52 /data/coolify/source/.env
  ```
* **Hardening Command:**
  ```bash
  sudo chmod 600 /data/coolify/source/.env
  sudo chmod 700 /data/coolify/ssh
  ls -l /data/coolify/source/.env
  ```
* **Verified Hardened Output:**
  ```text
  -rw------- 1 root root 680 Nov  4 01:52 /data/coolify/source/.env
  ```
* **Status:** Still Recommended | SECURITY HARDENING

