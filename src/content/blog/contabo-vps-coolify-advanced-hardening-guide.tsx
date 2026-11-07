import React from "react";
import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog/types";
import CodeBlock from "@/components/blog/CodeBlock";
import Callout from "@/components/blog/Callout";
import Quote from "@/components/blog/Quote";
import ConfigBadge from "@/components/blog/ConfigBadge";
import MermaidDiagram from "@/components/blog/MermaidDiagram";

export const post: BlogPostMeta = {
  title: "Production-Grade Contabo VPS with Coolify: Complete Security, Backup, Monitoring and Disaster Recovery Guide",
  slug: "contabo-vps-coolify-advanced-hardening-guide",
  description:
    "An exhaustive technical reference for production systems engineers: advanced SSH hardening, UFW and Docker iptables bypass mitigation, unattended security updates, Coolify secrets recovery, non-destructive PostgreSQL restore testing on Cloudflare R2, container healthchecks, rollback architecture, and a comprehensive bare-metal disaster recovery plan.",
  publishedAt: "2026-11-07",
  updatedAt: "2026-11-07",
  author: "Nazmus Sakib",
  authorRole: "Senior DevOps & Full-Stack Engineer",
  category: "DevOps",
  tags: [
    "Contabo",
    "VPS",
    "Coolify",
    "DevOps",
    "Security",
    "PostgreSQL",
    "Cloudflare R2",
    "Docker",
    "Disaster Recovery",
    "Ubuntu 24.04",
  ],
  readingTime: "32 min read",
  featured: true,
  featuredImage: "/blog/contabo-vps-coolify-advanced-hardening-thumbnail.jpg",
  featuredImageAlt: "Production-Grade Contabo VPS with Coolify Advanced Hardening Guide Thumbnail",
  toc: [
    { id: "module-1-architecture-security-model", title: "Module 1: Architecture & Threat Boundary Model", level: 2 },
    { id: "module-2-advanced-ssh-hardening", title: "Module 2: Advanced OpenSSH Hardening & Fallback", level: 2 },
    { id: "step-2-1-audit-ssh-configuration", title: "Step 2.1: Audit Existing SSH Directives", level: 3 },
    { id: "step-2-2-enforce-crypto-policy", title: "Step 2.2: Deploy Hardened Drop-in Configuration", level: 3 },
    { id: "step-2-3-validate-and-reload-sshd", title: "Step 2.3: Validate Daemon Syntax & Socket Reload", level: 3 },
    { id: "module-3-firewall-docker-isolation", title: "Module 3: Firewall Hardening & Docker Port Bypass", level: 2 },
    { id: "step-3-1-verify-docker-iptables-bypass", title: "Step 3.1: Inspect Active Listening Sockets", level: 3 },
    { id: "step-3-2-configure-dual-layer-firewall", title: "Step 3.2: Configure UFW & Contabo Perimeter Rules", level: 3 },
    { id: "step-3-3-external-port-verification", title: "Step 3.3: Verify Exposure via External Port Scan", level: 3 },
    { id: "module-4-automatic-security-updates", title: "Module 4: Automated OS Security Patching", level: 2 },
    { id: "step-4-1-install-unattended-upgrades", title: "Step 4.1: Install and Enable unattended-upgrades", level: 3 },
    { id: "step-4-2-configure-apt-periodic", title: "Step 4.2: Configure Daily Update Timers", level: 3 },
    { id: "step-4-3-verify-upgrade-dry-run", title: "Step 4.3: Execute a Dry-Run & Check Upgrade Logs", level: 3 },
    { id: "step-4-4-monitor-reboot-required", title: "Step 4.4: Check Kernel Reboot Notification Flags", level: 3 },
    { id: "module-5-coolify-internal-architecture", title: "Module 5: Coolify Internal Architecture & Secret Recovery", level: 2 },
    { id: "step-5-1-inspect-data-coolify", title: "Step 5.1: Inspect Persistent Storage Layout", level: 3 },
    { id: "step-5-2-secure-secret-permissions", title: "Step 5.2: Enforce Strict UNIX File Permissions", level: 3 },
    { id: "step-5-3-coolify-config-backup", title: "Step 5.3: Create an Encrypted Configuration Archive", level: 3 },
    { id: "module-6-cloudflare-r2-backup-architecture", title: "Module 6: Enterprise Cloudflare R2 Storage Architecture", level: 2 },
    { id: "step-6-1-r2-least-privilege-tokens", title: "Step 6.1: Provision Least-Privilege R2 API Tokens", level: 3 },
    { id: "step-6-2-coolify-s3-integration", title: "Step 6.2: Configure S3 Storage Endpoint in Coolify", level: 3 },
    { id: "module-7-postgresql-restore-testing", title: "Module 7: PostgreSQL Non-Destructive Restore Drill", level: 2 },
    { id: "step-7-1-locate-backup-archive", title: "Step 7.1: Identify the Latest Production Backup Dump", level: 3 },
    { id: "step-7-2-provision-temp-db", title: "Step 7.2: Provision Temporary Isolated Test Database", level: 3 },
    { id: "step-7-3-execute-restore-into-temp", title: "Step 7.3: Restore Production Dump into Test Instance", level: 3 },
    { id: "step-7-4-verify-data-integrity", title: "Step 7.4: Query Row Counts & Schema Consistency", level: 3 },
    { id: "step-7-5-deprovision-temp-db", title: "Step 7.5: Safe Teardown of Temporary Test Resource", level: 3 },
    { id: "module-8-docker-healthchecks", title: "Module 8: Application Container Healthchecks & Liveness", level: 2 },
    { id: "step-8-1-implement-health-endpoint", title: "Step 8.1: Next.js Health & Database Check Route", level: 3 },
    { id: "step-8-2-configure-dockerfile-healthcheck", title: "Step 8.2: Embed HEALTHCHECK Directive in Dockerfile", level: 3 },
    { id: "module-9-zero-downtime-rollback", title: "Module 9: Instant Rollbacks & Migration Safety", level: 2 },
    { id: "step-9-1-inspect-deployment-history", title: "Step 9.1: Review Image Hashes in Deployment History", level: 3 },
    { id: "step-9-2-backward-compatible-migrations", title: "Step 9.2: Apply Expand-and-Contract Migration Pattern", level: 3 },
    { id: "module-10-monitoring-resource-limits", title: "Module 10: Resource Limits, Log Rotation & Garbage Collection", level: 2 },
    { id: "step-10-1-configure-docker-log-rotation", title: "Step 10.1: Configure Docker Daemon JSON Log Limits", level: 3 },
    { id: "step-10-2-set-container-cgroups", title: "Step 10.2: Enforce Container Memory & CPU Caps", level: 3 },
    { id: "step-10-3-automated-disk-pruning", title: "Step 10.3: Safe Automated Docker Build Cache Cleanup", level: 3 },
    { id: "module-11-full-disaster-recovery-plan", title: "Module 11: End-to-End Bare-Metal Disaster Recovery Plan", level: 2 },
    { id: "dr-runbook-step-by-step", title: "Step-by-Step Recovery Runbook (RTO < 45m)", level: 3 },
  ],
};

const advancedSecurityDiagram = `flowchart TD
    subgraph Edge["Perimeter Edge & CDN"]
        User["Client Browser"] -->|HTTPS / TLS 1.3| CF["Cloudflare Edge Network"]
        CF -->|DDoS Scrubbed Web Traffic| ContaboFW["Contabo Cloud Firewall (Ports 80, 443 Only)"]
        Admin["Admin Workstation"] -->|SSH Key Only| ContaboFWSSH["Contabo Firewall (Port 22)"]
    end

    subgraph Host["Contabo Host Node (Ubuntu 24.04 LTS)"]
        ContaboFWSSH --> UFW["Host UFW / nftables"]
        ContaboFW --> UFW
        
        UFW --> Traefik["Traefik Reverse Proxy (Ports 80, 443)"]
        UFW --> SSHD["OpenSSH Daemon (Port 22)"]
        
        subgraph DockerEngine["Docker Daemon (Internal Isolated Networks)"]
            Traefik -->|Docker Socket Labels| Sentinel["Coolify Sentinel Engine"]
            
            subgraph CoolifyCoreNet["coolify-internal (Bridge Network)"]
                CoolifyApp["Coolify Core Engine"]
                CoolifyDB[("Coolify Metadata DB")]
                CoolifyRedis[("Coolify Queue Redis")]
                CoolifyApp <--> CoolifyDB
                CoolifyApp <--> CoolifyRedis
            end
            
            subgraph AppNet["project-production-network (Bridge Network)"]
                Traefik -->|HTTP Proxy :3000| NextApp["Next.js Application Container"]
                NextApp -->|Internal DNS postgres:5432| ProdDB[("PostgreSQL 18 DB")]
            end
            
            subgraph TestNet["restore-drill-network (Isolated Temporary)"]
                TempDB[("PostgreSQL 18 Restore Test DB")]
            end
        end
    end

    subgraph ColdStorage["Offsite Cloud Object Storage"]
        ProdDB -.->|Daily Encrypted Dumps (cron)| R2Prod[("Cloudflare R2: /backups/postgres/")]
        CoolifyCoreNet -.->|APP_KEY + DB Snapshot| R2Config[("Cloudflare R2: /backups/coolify-core/")]
        R2Prod -.->|Restore Drill (Monthly Verification)| TempDB
    end

    classDef primary fill:#0369a1,stroke:#38bdf8,stroke-width:2px,color:#ffffff;
    classDef security fill:#047857,stroke:#34d399,stroke-width:2px,color:#ffffff;
    classDef storage fill:#b45309,stroke:#fbbf24,stroke-width:2px,color:#ffffff;
    classDef isolated fill:#475569,stroke:#94a3b8,stroke-width:1px,stroke-dasharray: 5 5,color:#ffffff;
    
    class User,Admin,CF primary;
    class ContaboFW,ContaboFWSSH,UFW,SSHD security;
    class ProdDB,CoolifyDB,R2Prod,R2Config storage;
    class TempDB isolated;
`;

const disasterRecoveryDiagram = `sequenceDiagram
    autonumber
    actor Engineer as DevOps Engineer
    participant DNS as Cloudflare DNS
    participant NewVPS as New Contabo VPS
    participant R2 as Cloudflare R2 Bucket
    participant Coolify as Coolify Control Plane
    participant DB as Production PostgreSQL
    participant App as Next.js App

    Note over Engineer,NewVPS: Phase 1: Bare-Metal Provisioning (< 10 min)
    Engineer->>NewVPS: Provision Ubuntu 24.04 LTS & Setup SSH Key
    Engineer->>NewVPS: Configure UFW (22, 80, 443) & Install Coolify

    Note over Engineer,R2: Phase 2: Coolify State Restoration (< 15 min)
    Engineer->>R2: Download /data/coolify/source/.env (Preserves APP_KEY)
    Engineer->>NewVPS: Restore .env and coolify-db database dump
    Engineer->>NewVPS: Restart Coolify Docker Stack (docker compose up -d)

    Note over Engineer,DNS: Phase 3: Traffic Cutover & Database Hydration (< 10 min)
    Engineer->>DNS: Update A Records to New VPS IP (203.0.113.50)
    Engineer->>Coolify: Trigger Database Restore from R2 Snapshot
    Coolify->>DB: Hydrate PostgreSQL 18 Data Volumes

    Note over Engineer,App: Phase 4: Application Rebuild & Verification (< 10 min)
    Engineer->>Coolify: Trigger App Build from Git Repository
    Coolify->>App: Launch Container & Verify /api/health
    App-->>Engineer: HTTP 200 OK — Production Restored!
`;

export default function ContaboVpsCoolifyAdvancedGuide() {
  return (
    <>
      <p id="introduction">
        In our foundational guide,{" "}
        <Link
          href="/blog/contabo-vps-production-coolify-guide"
          className="font-bold text-cyan-400 underline decoration-cyan-400/50 hover:text-cyan-300"
        >
          From a Fresh Contabo VPS to Production with Coolify: A Minimal Step-by-Step Guide
        </Link>
        , we walked through the essential baseline setup: provisioning a Contabo instance, configuring key-based SSH, activating UFW, installing Coolify, and launching a Next.js frontend with private PostgreSQL.
      </p>

      <p>
        However, a minimal setup is not an enterprise-hardened setup. What happens when a zero-day vulnerability targets the Linux kernel while you sleep? What happens when a junior developer commits a Docker Compose file that publishes port <code>5432</code> directly to <code>0.0.0.0</code>, bypassing UFW completely? How do you recover if your hosting provider experiences catastrophic hardware failure, and you need to restore your entire infrastructure onto a fresh server in under 45 minutes?
      </p>

      <Quote author="Werner Vogels" source="Amazon CTO">
        Everything fails, all the time. The difference between an amateur setup and a production-grade deployment is that the production deployment has pre-tested failure modes, verified recovery runbooks, and strict cryptographic boundaries.
      </Quote>

      <Callout type="info" title="Target Audience & Prerequisites">
        This article is designed as an operational reference manual for senior developers, DevOps engineers, and system administrators. You should already have access to a running VPS with Ubuntu 24.04 and Coolify. If you have not completed the baseline configuration yet, read{" "}
        <Link
          href="/blog/contabo-vps-production-coolify-guide"
          className="font-semibold text-cyan-400 underline decoration-cyan-400/50 hover:text-cyan-300"
        >
          Blog 01: Minimal Production VPS Setup
        </Link>{" "}
        before implementing the advanced hardening practices below.
      </Callout>

      {/* ========================================================================= */}
      {/* MODULE 1 */}
      {/* ========================================================================= */}
      <h2 id="module-1-architecture-security-model">Module 1: Architecture & Threat Boundary Model</h2>
      <p>
        Enterprise VPS security is built on the concept of <strong>defense in depth</strong> and <strong>least privilege</strong>. No single layer (whether a firewall, reverse proxy, or container) should be trusted unconditionally.
      </p>

      <MermaidDiagram
        chart={advancedSecurityDiagram}
        caption="Figure 1: Production Multi-Layer Threat Isolation Architecture with Dual Firewalls and Offsite R2 Backups"
      />

      <h3>Understanding the Five Security Boundaries</h3>
      <ol>
        <li>
          <strong>Boundary 1 — Upstream Cloudflare Edge:</strong> Cloudflare provides DDoS mitigation, Web Application Firewall (WAF) rule sets, and SSL/TLS termination, shielding your raw origin IP from bot scans.
        </li>
        <li>
          <strong>Boundary 2 — Contabo Cloud Perimeter Firewall:</strong> A hardware-enforced packet filter running outside the hypervisor. Packets directed at ports other than <code>22</code>, <code>80</code>, and <code>443</code> are dropped before they consume VPS bandwidth or CPU cycles.
        </li>
        <li>
          <strong>Boundary 3 — Linux Host UFW &amp; OpenSSH:</strong> Enforces cryptographic authentication, rejects password login attempts, and isolates host daemon processes.
        </li>
        <li>
          <strong>Boundary 4 — Traefik Reverse Proxy &amp; Docker Networks:</strong> Traefik acts as the sole ingress point. Applications and databases communicate strictly across private, non-routable Docker bridge networks (e.g. <code>172.18.0.0/16</code>) using Docker&apos;s internal DNS resolver (<code>127.0.0.11</code>). Database ports are <em>never</em> bound to host interfaces.
        </li>
        <li>
          <strong>Boundary 5 — Offsite Cloudflare R2 Vault:</strong> Production database dumps and Coolify recovery keys are encrypted and mirrored to S3-compatible, geographically replicated R2 storage with bucket-level versioning and strict IAM token scoping.
        </li>
      </ol>

      {/* ========================================================================= */}
      {/* MODULE 2 */}
      {/* ========================================================================= */}
      <h2 id="module-2-advanced-ssh-hardening">Module 2: Advanced OpenSSH Hardening & Fallback</h2>
      <p>
        In basic setups, disabling password authentication is sufficient. In production, we enforce modern cryptographic cipher suites, reduce authentication timeouts, restrict key types to elliptic curve Ed25519, and configure safe fallback channels.
      </p>

      <Callout type="warning" title="Coolify Server Connection & Root Login Policy">
        Do NOT set <code>PermitRootLogin no</code> if Coolify manages the local server or remote servers via SSH using an SSH key!
        <br /><br />
        Setting <code>PermitRootLogin prohibit-password</code> (also written as <code>without-password</code>) is the official recommended standard: it forbids all password-based attacks while permitting authorized, key-authenticated orchestration by Coolify.
      </Callout>

      <h3 id="step-2-1-audit-ssh-configuration">Step 2.1: Audit Existing SSH Directives</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Baseline Audit</span>
      </div>

      <p><strong>Purpose:</strong> Query OpenSSH&apos;s compiled runtime settings to inspect active directives across all configuration files.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo sshd -T | grep -E -i 'passwordauthentication|permitrootlogin|pubkeyauthentication|x11forwarding'`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`passwordauthentication no
permitrootlogin prohibit-password
pubkeyauthentication yes
x11forwarding no`}
      />

      <p><strong>Explanation:</strong> <code>sshd -T</code> outputs the effective server configuration after parsing both <code>/etc/ssh/sshd_config</code> and any drop-in files in <code>/etc/ssh/sshd_config.d/</code>.</p>

      <p><strong>If something goes wrong:</strong> If <code>passwordauthentication yes</code> is returned, your previous hardening files were overridden or not parsed.</p>

      <h3 id="step-2-2-enforce-crypto-policy">Step 2.2: Deploy Hardened Drop-in Configuration</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="SECURITY HARDENING" />
        <span className="text-sm font-medium text-slate-300">Cryptographic Hardening</span>
      </div>

      <p><strong>Purpose:</strong> Enforce strong key-exchange algorithms, disable legacy protocols, restrict idle sessions, and prevent TCP forwarding leaks.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo bash -c 'cat << "EOF" > /etc/ssh/sshd_config.d/99-enterprise-hardening.conf
# Authentication controls
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
PermitRootLogin prohibit-password
PermitEmptyPasswords no
MaxAuthTries 3
LoginGraceTime 30

# Session and forwarding security
X11Forwarding no
AllowAgentForwarding no
ClientAliveInterval 300
ClientAliveCountMax 2

# Cryptographic ciphers & MACs (Modern Ed25519 & AES-GCM only)
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com
EOF'`}
      />

      <p><strong>Expected output:</strong> Command exits with code <code>0</code>.</p>

      <p><strong>Explanation:</strong> This restricts key exchange algorithms to Curve25519 and DH group 16, ciphers to ChaCha20-Poly1305 and AES-256-GCM, and drops unauthenticated connections within 30 seconds.</p>

      <h3 id="step-2-3-validate-and-reload-sshd">Step 2.3: Validate Daemon Syntax & Socket Reload</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Safe Reload</span>
      </div>

      <p><strong>Purpose:</strong> Verify configuration syntax and reload the OpenSSH systemd unit without dropping existing SSH connections.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo sshd -t && sudo systemctl reload ssh`}
      />

      <p><strong>Expected output:</strong> Zero output returned; exit code <code>0</code>.</p>

      <p><strong>Explanation:</strong> On Ubuntu 24.04 LTS, OpenSSH runs under systemd socket activation. The reload signal instructs the daemon to adopt new connection rules while existing sessions remain connected.</p>

      <p><strong>If something goes wrong:</strong> If <code>sshd -t</code> prints errors, remove the drop-in file (<code>sudo rm /etc/ssh/sshd_config.d/99-enterprise-hardening.conf</code>) before reloading.</p>

      {/* ========================================================================= */}
      {/* MODULE 3 */}
      {/* ========================================================================= */}
      <h2 id="module-3-firewall-docker-isolation">Module 3: Firewall Hardening & Docker Port Bypass</h2>
      <p>
        The most common vulnerability on Linux VPS instances running Docker is the <strong>Docker iptables bypass</strong>.
      </p>

      <Callout type="danger" title="Why UFW Alone Does Not Protect Docker Containers">
        When you run <code>docker run -p 5432:5432 postgres</code> or toggle &ldquo;Make Public&rdquo; in Coolify, Docker injects rules into the <code>PREROUTING</code> chain of the Linux <code>nat</code> table.
        <br /><br />
        Linux processes NAT routing <em>before</em> the packets reach UFW&apos;s <code>INPUT</code> filter table. As a consequence, <strong>port 5432 is exposed to the public internet</strong>, completely ignoring any <code>ufw default deny incoming</code> setting!
      </Callout>

      <h3 id="step-3-1-verify-docker-iptables-bypass">Step 3.1: Inspect Active Listening Sockets</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Socket Inspection</span>
      </div>

      <p><strong>Purpose:</strong> Identify all processes and containers listening on public (<code>0.0.0.0</code> / <code>:::</code>) vs local loopback (<code>127.0.0.1</code>) interfaces.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo ss -tulpn | grep LISTEN`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`tcp   LISTEN 0      4096         0.0.0.0:80        0.0.0.0:*    users:(("docker-proxy",pid=1240,fd=4))
tcp   LISTEN 0      4096         0.0.0.0:443       0.0.0.0:*    users:(("docker-proxy",pid=1220,fd=4))
tcp   LISTEN 0      128          0.0.0.0:22        0.0.0.0:*    users:(("sshd",pid=850,fd=3))
tcp   LISTEN 0      4096            [::]:80           [::]:*    users:(("docker-proxy",pid=1245,fd=4))
tcp   LISTEN 0      4096            [::]:443          [::]:*    users:(("docker-proxy",pid=1225,fd=4))
tcp   LISTEN 0      128             [::]:22           [::]:*    users:(("sshd",pid=850,fd=4))`}
      />

      <p><strong>Explanation:</strong> Verify that ONLY ports <code>22</code> (SSH), <code>80</code> (HTTP), and <code>443</code> (HTTPS) appear bound to <code>0.0.0.0</code>. If port <code>5432</code> or <code>6379</code> appears bound to <code>0.0.0.0</code>, a database container was configured with public host binding.</p>

      <h3 id="step-3-2-configure-dual-layer-firewall">Step 3.2: Configure UFW & Contabo Perimeter Rules</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="SECURITY HARDENING" />
        <span className="text-sm font-medium text-slate-300">Dual-Layer Defense</span>
      </div>

      <p>
        To prevent accidental Docker exposure from compromising the host, configure Contabo&apos;s hardware cloud firewall:
      </p>

      <ol>
        <li>Log in to the <strong>Contabo Customer Control Panel (CCP)</strong>.</li>
        <li>Navigate to <strong>Cloud Firewall</strong> &gt; Assign your VPS.</li>
        <li>Set the default inbound policy to <strong>DROP / DENY</strong>.</li>
        <li>Create the following allow rules:</li>
      </ol>

      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Rule Priority</th>
              <th>Protocol</th>
              <th>Source IP</th>
              <th>Destination Port</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>TCP</td>
              <td>Anywhere (or Your Office IP)</td>
              <td><code>22</code></td>
              <td>Encrypted SSH access</td>
            </tr>
            <tr>
              <td>20</td>
              <td>TCP</td>
              <td>Anywhere</td>
              <td><code>80</code></td>
              <td>HTTP &amp; Let&apos;s Encrypt ACME verification</td>
            </tr>
            <tr>
              <td>30</td>
              <td>TCP</td>
              <td>Anywhere</td>
              <td><code>443</code></td>
              <td>HTTPS web traffic via Traefik</td>
            </tr>
            <tr>
              <td>40</td>
              <td>UDP</td>
              <td>Anywhere</td>
              <td><code>443</code></td>
              <td>HTTP/3 QUIC acceleration</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="step-3-3-external-port-verification">Step 3.3: Verify Exposure via External Port Scan</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Penetration Test</span>
      </div>

      <p>
        From your <strong>local workstation</strong>, execute an Nmap SYN stealth scan against your VPS public IP to verify no leaked ports exist.
      </p>

      <p><strong>Purpose:</strong> Probe the external network interface to confirm closed ports are filtered.</p>

      <p><strong>Command (Local Workstation):</strong></p>
      <CodeBlock
        language="bash"
        filename="local-terminal"
        code={`nmap -sS -Pn -p 22,80,443,5432,6379,8000 203.0.113.10`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 203.0.113.10
PORT     STATE    SERVICE
22/tcp   open     ssh
80/tcp   open     http
443/tcp  open     https
5432/tcp filtered postgresql
6379/tcp filtered redis
8000/tcp filtered http-alt

Nmap done: 1 IP address (1 host up) scanned in 1.45 seconds`}
      />

      <p><strong>Explanation:</strong> Ports 22, 80, and 443 show <code>open</code>. Critical database ports (5432, 6379) and the internal Coolify port (8000) show <code>filtered</code>, proving the Contabo perimeter firewall drops unauthorized packets.</p>

      {/* ========================================================================= */}
      {/* MODULE 4 */}
      {/* ========================================================================= */}
      <h2 id="module-4-automatic-security-updates">Module 4: Automated OS Security Patching</h2>
      <p>
        Unpatched Linux kernel vulnerabilities and OpenSSL exploits compromise hundreds of production servers every month. Ubuntu 24.04 LTS includes <code>unattended-upgrades</code> to download and apply security patches without manual intervention.
      </p>

      <h3 id="step-4-1-install-unattended-upgrades">Step 4.1: Install and Enable unattended-upgrades</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Package Installation</span>
      </div>

      <p><strong>Purpose:</strong> Install the unattended upgrade daemon and update-notifier utilities.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo apt-get update && sudo apt-get install -y unattended-upgrades update-notifier-common`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease
Hit:2 http://security.ubuntu.com/ubuntu noble-security InRelease
Reading package lists... Done
unattended-upgrades is already the newest version.
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.`}
      />

      <h3 id="step-4-2-configure-apt-periodic">Step 4.2: Configure Daily Update Timers</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Automation Policy</span>
      </div>

      <p><strong>Purpose:</strong> Schedule daily package list synchronization, security patch downloads, and automatic package cache cleaning.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo bash -c 'cat << "EOF" > /etc/apt/apt.conf.d/20auto-upgrades
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
EOF'`}
      />

      <p><strong>Expected output:</strong> Command exits with code <code>0</code>.</p>

      <p><strong>Explanation:</strong> The <code>&quot;1&quot;</code> value schedules the specified task to run once every 24 hours via systemd APT timers (<code>apt-daily.timer</code> and <code>apt-daily-upgrade.timer</code>).</p>

      <h3 id="step-4-3-verify-upgrade-dry-run">Step 4.3: Execute a Dry-Run & Check Upgrade Logs</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Simulation Drill</span>
      </div>

      <p><strong>Purpose:</strong> Simulate an unattended upgrade run in debug mode to ensure repositories and origin signatures parse correctly.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo unattended-upgrade --dry-run --debug`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`Checking if system is running on battery is skipped.
Initial blacklisted packages: 
Initial whitelisted packages: 
Starting unattended-upgrades process
Checking: noble-security [Ubuntu:24.04/noble-security]
pkgs that look like they should be upgraded: 
No packages found that can be upgraded unattended`}
      />

      <p><strong>Explanation:</strong> This verifies that <code>noble-security</code> is parsed as an approved origin. Real upgrade execution logs are recorded in <code>/var/log/unattended-upgrades/unattended-upgrades.log</code>.</p>

      <h3 id="step-4-4-monitor-reboot-required">Step 4.4: Check Kernel Reboot Notification Flags</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="RECOMMENDED" />
        <span className="text-sm font-medium text-slate-300">Kernel Maintenance</span>
      </div>

      <p>
        When security updates include a new Linux kernel, the old kernel continues executing in memory until a system reboot occurs. Check if a reboot is pending:
      </p>

      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`if [ -f /var/run/reboot-required ]; then
  echo "Reboot REQUIRED by packages:"
  cat /var/run/reboot-required.pkgs
else
  echo "System up to date: No reboot required."
fi`}
      />

      <Callout type="tip" title="Automatic Reboot Policy on Single-Node VPS">
        We intentionally leave <code>Unattended-Upgrade::Automatic-Reboot &quot;false&quot;</code>. On a single-node production VPS, an unexpected 3:00 AM reboot can disrupt active database transactions. Instead, perform planned manual reboots (<code>sudo reboot</code>) during scheduled maintenance windows when kernel updates are flagged.
      </Callout>

      {/* ========================================================================= */}
      {/* MODULE 5 */}
      {/* ========================================================================= */}
      <h2 id="module-5-coolify-internal-architecture">Module 5: Coolify Internal Architecture & Secret Recovery</h2>
      <p>
        Many developers believe that backing up their application&apos;s PostgreSQL database is all that is required for disaster recovery. <strong>This is a dangerous misconception.</strong>
      </p>

      <p>
        Coolify stores all project definitions, Git webhooks, custom environment variables, and SSH keys in its internal metadata store. Crucially, sensitive fields (such as user credentials and API tokens) are encrypted at rest using an <strong>application encryption key (<code>APP_KEY</code>)</strong> located on the host filesystem.
      </p>

      <Quote author="Coolify Recovery Principle" source="Cryptographic State Dependency">
        Without the exact APP_KEY stored in /data/coolify/source/.env, a restored Coolify PostgreSQL database cannot decrypt your environment variables, database passwords, or server SSH keys.
      </Quote>

      <h3 id="step-5-1-inspect-data-coolify">Step 5.1: Inspect Persistent Storage Layout</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Filesystem Inspection</span>
      </div>

      <p><strong>Purpose:</strong> Understand the directory hierarchy and identify critical recovery artifacts under <code>/data/coolify</code>.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo ls -la /data/coolify`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`total 24
drwxr-xr-x 6 root root 4096 Nov  7 10:15 .
drwxr-xr-x 3 root root 4096 Nov  7 10:14 ..
drwxr-xr-x 3 root root 4096 Nov  7 10:16 proxy
drwxr-xr-x 4 root root 4096 Nov  7 10:15 source
drwx------ 2 root root 4096 Nov  7 10:15 ssh
drwxr-xr-x 3 root root 4096 Nov  7 10:16 webhooks`}
      />

      <p><strong>Explanation:</strong></p>
      <ul>
        <li><code>/data/coolify/source/.env</code>: Contains <code>APP_KEY</code>, DB credentials, and master salt keys.</li>
        <li><code>/data/coolify/ssh/</code>: Contains SSH keypairs used by Coolify to connect to deployment nodes and Git remotes.</li>
        <li><code>/data/coolify/proxy/acme.json</code>: Contains active Let&apos;s Encrypt TLS certificates.</li>
      </ul>

      <h3 id="step-5-2-secure-secret-permissions">Step 5.2: Enforce Strict UNIX File Permissions</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="SECURITY HARDENING" />
        <span className="text-sm font-medium text-slate-300">Access Control</span>
      </div>

      <p><strong>Purpose:</strong> Ensure unauthorized local system users cannot read Coolify master encryption keys or private SSH credentials.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo chmod 600 /data/coolify/source/.env
sudo chmod 700 /data/coolify/ssh
sudo chmod 600 /data/coolify/ssh/* 2>/dev/null || true`}
      />

      <p><strong>Expected output:</strong> Command exits with code <code>0</code>.</p>

      <p><strong>Explanation:</strong> Permissions <code>600</code> (read/write only by owner <code>root</code>) prevent non-privileged system processes from reading secrets.</p>

      <h3 id="step-5-3-coolify-config-backup">Step 5.3: Create an Encrypted Configuration Archive</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="RECOMMENDED" />
        <span className="text-sm font-medium text-slate-300">Disaster Preparation</span>
      </div>

      <p><strong>Purpose:</strong> Package Coolify&apos;s configuration keys and proxy state into an archive for disaster recovery storage.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo tar -czf /tmp/coolify-core-backup.tar.gz -C /data/coolify source/.env ssh proxy/acme.json
sudo ls -lh /tmp/coolify-core-backup.tar.gz`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`-rw-r--r-- 1 root root 8.4K Nov  7 11:20 /tmp/coolify-core-backup.tar.gz`}
      />

      <Callout type="danger" title="Store This Archive Securely">
        This archive contains your master encryption key. Transfer this file to your local encrypted password vault (e.g. 1Password or an encrypted offline drive) using <code>scp</code>:
        <CodeBlock
          language="bash"
          filename="local-terminal"
          code={`scp deploy@203.0.113.10:/tmp/coolify-core-backup.tar.gz ~/SecureVault/`}
        />
        Then delete <code>/tmp/coolify-core-backup.tar.gz</code> from the server immediately.
      </Callout>

      {/* ========================================================================= */}
      {/* MODULE 6 */}
      {/* ========================================================================= */}
      <h2 id="module-6-cloudflare-r2-backup-architecture">Module 6: Enterprise Cloudflare R2 Storage Architecture</h2>
      <p>
        Cloudflare R2 provides an ideal offsite backup destination for production VPS deployments because it charges <strong>zero data egress fees</strong>. If you ever need to download a 50 GB database dump during an emergency recovery, you won&apos;t face surprise network transfer charges.
      </p>

      <h3 id="step-6-1-r2-least-privilege-tokens">Step 6.1: Provision Least-Privilege R2 API Tokens</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="SECURITY HARDENING" />
        <span className="text-sm font-medium text-slate-300">IAM Scoping</span>
      </div>

      <p>
        Never use an Account-Owner global API key for automated server backups. In the Cloudflare dashboard:
      </p>
      <ol>
        <li>Navigate to <strong>R2 &gt; Manage R2 API Tokens</strong>.</li>
        <li>Click <strong>Create API Token</strong>.</li>
        <li>Select <strong>Object Read &amp; Write</strong> permissions.</li>
        <li>
          Under <strong>Specify bucket(s)</strong>, restrict scope strictly to your backup bucket: <code>vps-production-backups</code>.
        </li>
        <li>Set a TTL or rotation reminder (e.g., 12 months).</li>
      </ol>

      <h3 id="step-6-2-coolify-s3-integration">Step 6.2: Configure S3 Storage Endpoint in Coolify</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Storage Provider</span>
      </div>

      <p>
        In Coolify, register the storage provider under <strong>Settings &gt; S3 Storages</strong>:
      </p>

      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Setting</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Name</strong></td>
              <td><code>Cloudflare-R2-Prod</code></td>
              <td>Internal reference identifier</td>
            </tr>
            <tr>
              <td><strong>Endpoint</strong></td>
              <td><code>https://&lt;ACCOUNT_ID&gt;.r2.cloudflarestorage.com</code></td>
              <td>S3-compatible R2 endpoint</td>
            </tr>
            <tr>
              <td><strong>Bucket Name</strong></td>
              <td><code>vps-production-backups</code></td>
              <td>Target Cloudflare bucket</td>
            </tr>
            <tr>
              <td><strong>Region</strong></td>
              <td><code>auto</code></td>
              <td>R2 automatically routes to the closest edge</td>
            </tr>
            <tr>
              <td><strong>Access Key ID</strong></td>
              <td><code>&lt;R2_TOKEN_ID&gt;</code></td>
              <td>Scoped read/write access key</td>
            </tr>
            <tr>
              <td><strong>Secret Access Key</strong></td>
              <td><code>&lt;R2_TOKEN_SECRET&gt;</code></td>
              <td>Secret key</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="Separation of Backups vs. Application Uploads">
        Do NOT store user-uploaded application media (avatars, PDFs) and database dumps in the same bucket directory. Create dedicated buckets or distinct prefix paths:
        <ul>
          <li><code>/backups/postgresql/</code>: Private, daily retention lifecycle, no public URL.</li>
          <li><code>/media/uploads/</code>: Public read access enabled via custom domain CDN.</li>
        </ul>
      </Callout>

      {/* ========================================================================= */}
      {/* MODULE 7 */}
      {/* ========================================================================= */}
      <h2 id="module-7-postgresql-restore-testing">Module 7: PostgreSQL Non-Destructive Restore Drill</h2>
      <p>
        The true test of a backup system is not the backup process—it is the <strong>restore process</strong>. A corrupted database dump or an incompatible PostgreSQL major version (e.g., trying to restore PG 18 WAL files into PG 15) can render backups completely useless.
      </p>

      <Callout type="danger" title="NEVER Test Restores Against Your Production Database">
        Never test a restore drill against a live database container. A failed restore attempt can drop tables, overwrite current records, or corrupt active database state. Always restore into an isolated, temporary instance.
      </Callout>

      <h3 id="step-7-1-locate-backup-archive">Step 7.1: Identify the Latest Production Backup Dump</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Artifact Identification</span>
      </div>

      <p>
        In Coolify, navigate to your production PostgreSQL resource &gt; <strong>Backups</strong> tab. Inspect the execution history to locate the latest completed dump:
      </p>
      <ul>
        <li><strong>File:</strong> <code>dump-production-postgres-2026-11-07-020000.sql.gz</code></li>
        <li><strong>Status:</strong> <code>Success</code></li>
        <li><strong>Storage:</strong> <code>Cloudflare-R2-Prod</code></li>
      </ul>

      <h3 id="step-7-2-provision-temp-db">Step 7.2: Provision Temporary Isolated Test Database</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Sandbox Creation</span>
      </div>

      <ol>
        <li>In your Coolify Project, click <strong>+ Add Resource &gt; PostgreSQL</strong>.</li>
        <li>Set the name to <code>temp-restore-test-db</code>.</li>
        <li>
          Verify the PostgreSQL version matches production (e.g. <code>postgres:18-alpine</code> or <code>postgres:17-alpine</code>).
        </li>
        <li>Leave <strong>Make Public</strong> turned <strong>OFF</strong>.</li>
        <li>Click <strong>Start Database</strong>.</li>
      </ol>

      <h3 id="step-7-3-execute-restore-into-temp">Step 7.3: Restore Production Dump into Test Instance</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Restore Execution</span>
      </div>

      <ol>
        <li>Open the <code>temp-restore-test-db</code> resource in Coolify.</li>
        <li>Navigate to the <strong>Backups</strong> tab &gt; click <strong>Restore from S3 / External</strong>.</li>
        <li>Select <code>Cloudflare-R2-Prod</code> as the source.</li>
        <li>Select the archive: <code>dump-production-postgres-2026-11-07-020000.sql.gz</code>.</li>
        <li>Confirm restore into <code>temp-restore-test-db</code>.</li>
        <li>Review the restore execution logs to confirm zero errors.</li>
      </ol>

      <h3 id="step-7-4-verify-data-integrity">Step 7.4: Query Row Counts & Schema Consistency</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Data Validation</span>
      </div>

      <p><strong>Purpose:</strong> Execute test queries against the restored temporary database to verify row counts match production.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo docker exec -i \$(sudo docker ps -qf "name=temp-restore-test-db") psql -U postgres -d postgres -c "
SELECT table_name, 
       (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
FROM (
  SELECT table_name, 
         query_to_xml(format('select count(*) as cnt from %I', table_name), false, true, '') as xml_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
) t;"`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={` table_name  | row_count 
-------------+-----------
 users       |      1420
 accounts    |      1420
 sessions    |      3890
 orders      |      8912
(4 rows)`}
      />

      <p><strong>Explanation:</strong> This dynamic query inspects every table in the public schema and reports exact row counts, confirming data integrity.</p>

      <h3 id="step-7-5-deprovision-temp-db">Step 7.5: Safe Teardown of Temporary Test Resource</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Resource Cleanup</span>
      </div>

      <p>
        Once row counts and relationships are verified, delete the <code>temp-restore-test-db</code> resource inside Coolify. This stops the container and removes its temporary Docker volume, freeing RAM and disk space.
      </p>

      {/* ========================================================================= */}
      {/* MODULE 8 */}
      {/* ========================================================================= */}
      <h2 id="module-8-docker-healthchecks">Module 8: Application Container Healthchecks & Liveness</h2>
      <p>
        Traefik and Docker can detect crashed containers, but what happens when a Node.js process experiences an unhandled promise rejection or memory leak and hangs without terminating? The container continues running, but incoming HTTP requests timeout.
      </p>

      <p>
        Docker&apos;s <code>HEALTHCHECK</code> instruction periodically probes your application from within the container to ensure it is actually healthy.
      </p>

      <h3 id="step-8-1-implement-health-endpoint">Step 8.1: Next.js Health & Database Check Route</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Application Route</span>
      </div>

      <p>
        In your Next.js application, create an endpoint at <code>src/app/api/health/route.ts</code>:
      </p>

      <CodeBlock
        language="typescript"
        filename="src/app/api/health/route.ts"
        code={`import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Optional: Add a lightweight database query (e.g. await db.query('SELECT 1'))
    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "unhealthy", error: String(error) },
      { status: 503 }
    );
  }
}`}
      />

      <h3 id="step-8-2-configure-dockerfile-healthcheck">Step 8.2: Embed HEALTHCHECK Directive in Dockerfile</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Container Manifest</span>
      </div>

      <p>
        Add the <code>HEALTHCHECK</code> directive to your multi-stage <code>Dockerfile</code>:
      </p>

      <CodeBlock
        language="dockerfile"
        filename="Dockerfile"
        code={`FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Install wget for lightweight container health probing
RUN apk add --no-cache wget

# Copy standalone build output
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public

EXPOSE 3000

# Probe container health every 30 seconds
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \\
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]`}
      />

      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Flag</th>
              <th>Setting</th>
              <th>Technical Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--interval</code></td>
              <td><code>30s</code></td>
              <td>Frequency between health check probes</td>
            </tr>
            <tr>
              <td><code>--timeout</code></td>
              <td><code>5s</code></td>
              <td>Maximum duration before considering a probe failed</td>
            </tr>
            <tr>
              <td><code>--start-period</code></td>
              <td><code>15s</code></td>
              <td>Startup grace period during which failures don&apos;t count towards retries</td>
            </tr>
            <tr>
              <td><code>--retries</code></td>
              <td><code>3</code></td>
              <td>Consecutive failed checks before Docker flags container as <code>unhealthy</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="info" title="Container Health vs. External Uptime Monitoring">
        A Docker <code>HEALTHCHECK</code> runs locally on the VPS and handles automatic restarts if a container becomes unresponsive. However, it cannot notify you if your Contabo VPS goes offline or encounters a network routing failure.
        <br /><br />
        Always pair container health checks with an external uptime monitoring service (such as BetterStack, Uptime Kuma, or Cloudflare Health Checks) that monitors your public URL from external networks.
      </Callout>

      {/* ========================================================================= */}
      {/* MODULE 9 */}
      {/* ========================================================================= */}
      <h2 id="module-9-zero-downtime-rollback">Module 9: Instant Rollbacks & Migration Safety</h2>
      <p>
        When a bad deployment reaches production, every minute spent debugging in a panic costs revenue and user trust. Coolify retains an immutable history of Docker images for previous deployments, enabling instant one-click rollbacks.
      </p>

      <h3 id="step-9-1-inspect-deployment-history">Step 9.1: Review Image Hashes in Deployment History</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Rollback Execution</span>
      </div>

      <ol>
        <li>Navigate to your application resource in Coolify.</li>
        <li>Click the <strong>Deployments</strong> tab.</li>
        <li>Each deployment is tagged with its Git commit hash and immutable Docker image tag.</li>
        <li>
          To initiate a rollback, locate the last known good deployment and click <strong>Rollback to this deployment</strong>.
        </li>
        <li>Traefik updates its routing labels to point to the previous container image with near-zero downtime.</li>
      </ol>

      <h3 id="step-9-2-backward-compatible-migrations">Step 9.2: Apply Expand-and-Contract Migration Pattern</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="SECURITY HARDENING" />
        <span className="text-sm font-medium text-slate-300">Database Resilience</span>
      </div>

      <Callout type="danger" title="Why Rolling Back Frontend Code Does NOT Roll Back Databases">
        Rolling back a Next.js application container rolls back only the application code—it does <strong>not</strong> undo database migrations executed in PostgreSQL!
        <br /><br />
        If release <code>v2.0</code> runs a destructive migration (like <code>ALTER TABLE users DROP COLUMN username</code>), rolling back the application to <code>v1.9</code> will crash your app because <code>v1.9</code> expects that column to exist.
      </Callout>

      <p>
        To make rollbacks safe, follow the <strong>Expand-and-Contract</strong> migration pattern:
      </p>

      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Phase</th>
              <th>Database Migration</th>
              <th>Application Code</th>
              <th>Rollback Safety</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Expand</strong></td>
              <td>Add new column <code>display_name</code> (nullable). Keep old column <code>username</code>.</td>
              <td>Write to both columns; read from <code>username</code> with fallback to <code>display_name</code>.</td>
              <td><strong>100% Safe:</strong> Older app code continues working seamlessly.</td>
            </tr>
            <tr>
              <td><strong>2. Transition</strong></td>
              <td>Run background backfill query copying data from <code>username</code> to <code>display_name</code>.</td>
              <td>Deploy update reading exclusively from <code>display_name</code>.</td>
              <td><strong>100% Safe:</strong> Both columns remain intact.</td>
            </tr>
            <tr>
              <td><strong>3. Contract</strong></td>
              <td>Drop legacy column <code>username</code> after verifying stability in production.</td>
              <td>Clean up code paths referencing <code>username</code>.</td>
              <td>Executed only after release is stable.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 10 */}
      {/* ========================================================================= */}
      <h2 id="module-10-monitoring-resource-limits">Module 10: Resource Limits, Log Rotation & Garbage Collection</h2>
      <p>
        Over time, production VPS servers encounter disk exhaustion from two primary sources:
      </p>
      <ol>
        <li><strong>Docker JSON logs:</strong> Containers writing <code>stdout</code> to disk indefinitely.</li>
        <li><strong>Dangling build cache:</strong> Accumulated Nixpacks / Docker image layers from repeated Git deployments.</li>
      </ol>

      <h3 id="step-10-1-configure-docker-log-rotation">Step 10.1: Configure Docker Daemon JSON Log Limits</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Disk Protection</span>
      </div>

      <p><strong>Purpose:</strong> Enforce log rotation across all Docker containers so logs never exceed a fixed size.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo bash -c 'cat << "EOF" > /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "3"
  }
}
EOF'
sudo systemctl reload docker`}
      />

      <p><strong>Expected output:</strong> Command exits with code <code>0</code>.</p>

      <p><strong>Explanation:</strong> This limits every container to a maximum of 3 log files of 50 MB each (150 MB total per container). Older log entries are automatically rotated out.</p>

      <h3 id="step-10-2-set-container-cgroups">Step 10.2: Enforce Container Memory & CPU Caps</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="RECOMMENDED" />
        <span className="text-sm font-medium text-slate-300">Resource Isolation</span>
      </div>

      <p>
        Prevent a memory leak in an application from crashing the Linux kernel or killing your database. In Coolify:
      </p>
      <ol>
        <li>Open your Next.js application &gt; <strong>Resource Limits</strong>.</li>
        <li><strong>Memory Limit:</strong> Set to <code>1024 MB</code> (or appropriate for your tier).</li>
        <li><strong>CPU Limit:</strong> Set to <code>1.5 Cores</code>.</li>
        <li>Click <strong>Save</strong>.</li>
      </ol>

      <h3 id="step-10-3-automated-disk-pruning">Step 10.3: Safe Automated Docker Build Cache Cleanup</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="RECOMMENDED" />
        <span className="text-sm font-medium text-slate-300">Maintenance Automation</span>
      </div>

      <p>
        Coolify includes an automated cleanup task in <strong>Settings &gt; Server &gt; Auto Cleanup</strong>. Ensure this is enabled.
      </p>

      <p>
        If you ever need to manually reclaim disk space from old build layers, run:
      </p>

      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo docker system prune -af --filter "until=168h"`}
      />

      <Callout type="danger" title="Do NOT Run `docker system prune --volumes`">
        Never run <code>docker system prune --volumes</code> on a production server without explicit volume exclusions. This will permanently delete any Docker volume not currently mounted by a running container, which could destroy stopped database volumes!
      </Callout>

      {/* ========================================================================= */}
      {/* MODULE 11 */}
      {/* ========================================================================= */}
      <h2 id="module-11-full-disaster-recovery-plan">Module 11: End-to-End Bare-Metal Disaster Recovery Plan</h2>
      <p>
        Consider a realistic worst-case scenario: a data center fire, catastrophic SSD failure, or accidental server termination destroys your Contabo VPS. You are staring at an empty terminal, and your web app is down.
      </p>

      <p>
        Because we structured our backups around <strong>Cloudflare R2</strong> and preserved Coolify&apos;s <code>APP_KEY</code>, you can restore your complete production infrastructure from bare metal onto a brand-new VPS in under 45 minutes.
      </p>

      <h3>Defining RPO and RTO</h3>
      <ul>
        <li>
          <strong>Recovery Point Objective (RPO):</strong> The maximum acceptable age of data loss. With daily 2:00 AM R2 backups, our baseline RPO is 24 hours. (If using continuous WAL streaming, RPO can be reduced to under 5 minutes).
        </li>
        <li>
          <strong>Recovery Time Objective (RTO):</strong> The targeted duration from outage confirmation to full operational recovery. Following this runbook, our RTO is <strong>35 to 45 minutes</strong>.
        </li>
      </ul>

      <MermaidDiagram
        chart={disasterRecoveryDiagram}
        caption="Figure 2: Bare-Metal Disaster Recovery Workflow from Fresh VPS to Production"
      />

      <h3 id="dr-runbook-step-by-step">Step-by-Step Recovery Runbook (RTO &lt; 45m)</h3>

      <h4>Phase 1: Bare-Metal Provisioning &amp; OS Setup (10 Minutes)</h4>
      <ol>
        <li>Purchase or spin up a new Contabo VPS running <strong>Ubuntu 24.04 LTS</strong>.</li>
        <li>Log in via SSH and configure the dedicated <code>deploy</code> user and SSH key authentication (refer to Blog 01, Modules 3–5).</li>
        <li>Configure UFW rules: allow <code>22</code>, <code>80</code>, and <code>443</code>.</li>
        <li>Install Coolify using the official installation script:
          <CodeBlock
            language="bash"
            filename="new-vps-terminal"
            code={`curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash`}
          />
        </li>
      </ol>

      <h4>Phase 2: Restore Coolify Master Cryptographic State (10 Minutes)</h4>
      <ol>
        <li>Stop the freshly installed Coolify containers:
          <CodeBlock
            language="bash"
            filename="new-vps-terminal"
            code={`sudo docker stop coolify coolify-proxy coolify-db coolify-redis`}
          />
        </li>
        <li>Extract your secure configuration archive containing the original <code>APP_KEY</code>:
          <CodeBlock
            language="bash"
            filename="new-vps-terminal"
            code={`sudo tar -xzf coolify-core-backup.tar.gz -C /data/coolify/`}
          />
        </li>
        <li>Enforce strict permissions on the restored secrets:
          <CodeBlock
            language="bash"
            filename="new-vps-terminal"
            code={`sudo chmod 600 /data/coolify/source/.env
sudo chmod 700 /data/coolify/ssh`}
          />
        </li>
        <li>Restart Coolify:
          <CodeBlock
            language="bash"
            filename="new-vps-terminal"
            code={`cd /data/coolify/source && sudo docker compose up -d`}
          />
        </li>
      </ol>

      <h4>Phase 3: DNS Cutover &amp; Database Hydration (10 Minutes)</h4>
      <ol>
        <li>Log in to <strong>Cloudflare DNS</strong> and update the A records for <code>coolify.example.com</code> and <code>app.example.com</code> to the <strong>new VPS IP address</strong>.</li>
        <li>In Coolify, verify your storage provider connection to <code>Cloudflare-R2-Prod</code>.</li>
        <li>In your restored project, select your PostgreSQL resource &gt; <strong>Backups</strong>.</li>
        <li>Trigger <strong>Restore from S3</strong> selecting the latest dump archive from R2.</li>
        <li>Coolify hydrates PostgreSQL tables and indexes.</li>
      </ol>

      <h4>Phase 4: Application Redeployment &amp; Verification (10 Minutes)</h4>
      <ol>
        <li>Open your Next.js application resource in Coolify.</li>
        <li>Click <strong>Deploy</strong> to pull latest code from Git, build the image, and mount internal database connections.</li>
        <li>Verify container health:
          <CodeBlock
            language="bash"
            filename="new-vps-terminal"
            code={`curl -I https://app.example.com/api/health`}
          />
        </li>
        <li>Verify HTTP 200 response and valid Let&apos;s Encrypt SSL certificate.</li>
      </ol>

      <h3>Disaster Recovery Verification Checklist</h3>
      <div className="overflow-x-auto my-6">
        <table>
          <thead>
            <tr>
              <th>Recovery Component</th>
              <th>Validation Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Server OS &amp; Firewall</strong></td>
              <td><code>sudo ufw status verbose</code></td>
              <td>Ports 22, 80, 443 active; all others blocked</td>
            </tr>
            <tr>
              <td><strong>Coolify Master Key</strong></td>
              <td>Check <code>APP_KEY</code> in <code>/data/coolify/source/.env</code></td>
              <td>Matches pre-disaster hash</td>
            </tr>
            <tr>
              <td><strong>PostgreSQL Data</strong></td>
              <td>Query row counts on <code>users</code> and <code>orders</code></td>
              <td>Row counts match pre-incident snapshot</td>
            </tr>
            <tr>
              <td><strong>Traefik SSL/TLS</strong></td>
              <td>Inspect browser certificate for <code>app.example.com</code></td>
              <td>Valid Let&apos;s Encrypt TLS 1.3 certificate</td>
            </tr>
            <tr>
              <td><strong>Application Liveness</strong></td>
              <td>GET <code>/api/health</code></td>
              <td>HTTP 200 OK with database connectivity confirmed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="Schedule Quarterly Disaster Recovery Drills">
        A disaster recovery plan that has never been tested in practice is just wishful thinking. Schedule a quarterly calendar reminder to spin up a secondary VPS, follow this runbook, and confirm you can achieve full operational recovery within your target RTO.
      </Callout>

      <p>
        For a refresher on the baseline server provisioning steps, return to{" "}
        <Link
          href="/blog/contabo-vps-production-coolify-guide"
          className="font-bold text-cyan-400 underline decoration-cyan-400/50 hover:text-cyan-300"
        >
          Blog 01: From a Fresh Contabo VPS to Production with Coolify: A Minimal Step-by-Step Guide
        </Link>.
      </p>
    </>
  );
}

