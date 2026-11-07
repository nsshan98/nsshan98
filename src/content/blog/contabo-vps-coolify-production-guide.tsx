import React from "react";
import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog/types";
import CodeBlock from "@/components/blog/CodeBlock";
import Callout from "@/components/blog/Callout";
import ConfigBadge from "@/components/blog/ConfigBadge";
import MermaidDiagram from "@/components/blog/MermaidDiagram";

export const post: BlogPostMeta = {
  title: "Contabo VPS to Production with Coolify: The Complete Real-World Setup & Security Guide",
  slug: "contabo-vps-coolify-production-guide",
  description:
    "The definitive end-to-end reference for deploying a production-grade Contabo VPS running Ubuntu 24.04 LTS with Coolify, Docker, Traefik, PostgreSQL 18, Cloudflare DNS, and R2 backups. Features multiple user and SSH setup paths, dual-layer firewalls, health checks, restore testing, and disaster recovery.",
  publishedAt: "2026-11-07",
  updatedAt: "2026-11-07",
  author: "Nazmus Sakib",
  authorRole: "Curious Technologist",
  category: "DevOps",
  tags: [
    "Contabo",
    "VPS",
    "Coolify",
    "Ubuntu 24.04",
    "Docker",
    "PostgreSQL",
    "Cloudflare R2",
    "Security",
    "DevOps",
    "Next.js",
  ],
  readingTime: "45 min read",
  featured: true,
  featuredImage: "/blog/contabo-vps-production-coolify-thumbnail.jpg",
  featuredImageAlt: "Contabo VPS to Production with Coolify Complete Setup Guide",
  toc: [
    { id: "module-1-architecture", title: "Module 1: Architecture & Mental Model", level: 2 },
    { id: "module-2-prerequisites", title: "Module 2: Prerequisites & Hardware Planning", level: 2 },
    { id: "module-3-provisioning", title: "Module 3: Purchase & Provision the Contabo VPS", level: 2 },
    { id: "module-4-first-ssh-connection", title: "Module 4: First Remote SSH Connection", level: 2 },
    { id: "module-5-system-inspection", title: "Module 5: Initial Server Inspection", level: 2 },
    { id: "module-6-system-update", title: "Module 6: Base System Updates & Kernel Check", level: 2 },
    { id: "module-7-user-management", title: "Module 7: Linux User Management (Path A vs Path B)", level: 2 },
    { id: "module-8-ssh-key-auth", title: "Module 8: SSH Key Authentication (Ed25519 vs Passwords)", level: 2 },
    { id: "module-9-local-ssh-config", title: "Module 9: Linux Mint SSH Client Automation", level: 2 },
    { id: "module-10-ssh-hardening", title: "Module 10: OpenSSH Hardening & Coolify Root Policy", level: 2 },
    { id: "module-11-ufw-firewall", title: "Module 11: Host Firewall Setup with UFW", level: 2 },
    { id: "module-12-contabo-cloud-firewall", title: "Module 12: Contabo Perimeter Firewall & Docker Bypass", level: 2 },
    { id: "module-13-install-coolify", title: "Module 13: Install Docker CE & Coolify Engine", level: 2 },
    { id: "module-14-verify-coolify-docker", title: "Module 14: Inspect Running Infrastructure Containers", level: 2 },
    { id: "module-15-coolify-server-connection", title: "Module 15: Configure Coolify Localhost Node Connection", level: 2 },
    { id: "module-16-dns-cloudflare", title: "Module 16: Cloudflare DNS Configuration & Routing", level: 2 },
    { id: "module-17-reverse-proxy-https", title: "Module 17: Traefik Ingress & Automated Let's Encrypt TLS", level: 2 },
    { id: "module-18-app-deployment", title: "Module 18: Git Integration & Next.js App Deployment", level: 2 },
    { id: "module-19-postgresql-config", title: "Module 19: Private PostgreSQL 18 Production Setup", level: 2 },
    { id: "module-20-cloudflare-r2-storage", title: "Module 20: Persistent File Storage with Cloudflare R2", level: 2 },
    { id: "module-21-scheduled-database-backups", title: "Module 21: Automated Database Backups to R2", level: 2 },
    { id: "module-22-restore-testing", title: "Module 22: Non-Destructive Restore Drill on Sandbox Database", level: 2 },
    { id: "module-23-coolify-internal-backup", title: "Module 23: Coolify Internal Database Backup Routine", level: 2 },
    { id: "module-24-secrets-protection", title: "Module 24: Protect /data/coolify State & Master APP_KEY", level: 2 },
    { id: "module-25-unattended-upgrades", title: "Module 25: Automated OS Security Updates", level: 2 },
    { id: "module-26-container-security", title: "Module 26: Container Runtime Security & Socket Isolation", level: 2 },
    { id: "module-27-healthchecks-rollbacks", title: "Module 27: Container Liveness, HEALTHCHECK & Rollback Strategy", level: 2 },
    { id: "module-28-monitoring-metrics", title: "Module 28: Server Monitoring & Resource Allocation", level: 2 },
    { id: "module-29-backup-retention-lifecycle", title: "Module 29: Backup Retention & Object Storage Deletion Protection", level: 2 },
    { id: "module-30-coolify-upgrades", title: "Module 30: Upgrading Coolify Safely with Snapshot Rollback", level: 2 },
    { id: "module-31-recovery-planning", title: "Module 31: Full Bare-Metal Platform Recovery Planning", level: 2 },
    { id: "module-32-disaster-recovery-scenarios", title: "Module 32: Seven Realistic Production Failure Scenarios", level: 2 },
    { id: "module-33-maintenance-runbook", title: "Module 33: Routine System Maintenance Runbook", level: 2 },
    { id: "module-34-troubleshooting", title: "Module 34: Comprehensive Production Troubleshooting Matrix", level: 2 },
    { id: "module-35-production-checklist", title: "Module 35: Final Production Readiness Checklist", level: 2 },
    { id: "module-36-conclusion", title: "Module 36: Conclusion & Operational Philosophy", level: 2 },
  ],
};

const masterArchitectureDiagram = `flowchart TD
    subgraph PublicInternet["Public Internet & Edge"]
        ClientBrowser["Web Visitors / API Clients"] -->|HTTPS 443| CloudflareEdge["Cloudflare Edge & DNS"]
        DeveloperWorkstation["Local Linux Mint Terminal"] -->|"SSH 22 [Ed25519 Key]"| FW_Rule1
    end

    subgraph ContaboCloudFW["Contabo Cloud Firewall (Hardware Edge)"]
        direction TB
        FW_Rule1["TCP 22 : Allow (Admin SSH)"]
        FW_Rule2["TCP 80 : Allow (HTTP Verification)"]
        FW_Rule3["TCP 443 : Allow (HTTPS Traefik)"]
        FW_Rule4["UDP 443 : Allow (HTTP/3 QUIC)"]
        FW_Rule5["All Other Inbound : DROP"]
    end

    CloudflareEdge -->|Encrypted Web Traffic| FW_Rule3

    subgraph HostNode["Contabo Cloud VPS (Ubuntu 24.04.5 LTS)"]
        UFW["Host Firewall (UFW)"]
        FW_Rule1 --> UFW
        FW_Rule2 --> UFW
        FW_Rule3 --> UFW
        FW_Rule4 --> UFW

        SSHDaemon["OpenSSH Server (:22)"]
        TraefikProxy["Traefik Reverse Proxy (:80, :443)"]
        UFW --> SSHDaemon
        UFW --> TraefikProxy

        subgraph CoolifyControlPlane["Coolify Core Engine (:8000 Internal)"]
            CoolifyApp["Coolify Control Dashboard"]
            CoolifyDB[("Coolify Metadata DB (Postgres 15)")]
            CoolifyRedis[("Coolify Cache & Queue (Redis 7)")]
            CoolifySentinel["Coolify Sentinel Engine"]
            CoolifyApp --- CoolifyDB
            CoolifyApp --- CoolifyRedis
            CoolifyApp -.->|"Internal Docker Socket"| CoolifySentinel
        end

        subgraph ApplicationNetwork["Private Docker Bridge Network (Zero Public Ports)"]
            NextApp["Next.js Web Application (:3000)"]
            ProductionDB[("PostgreSQL 18 Database (:5432)")]
            NextApp -->|"Private Network DNS"| ProductionDB
        end

        TraefikProxy -->|"Internal Proxy"| CoolifyApp
        TraefikProxy -->|"Internal Proxy"| NextApp
    end

    subgraph ColdStorage["Cloudflare R2 Object Storage (Zero Egress Fees)"]
        R2Backups[("Bucket: /backups/postgres-prod/")]
        R2Coolify[("Bucket: /backups/coolify-core/")]
        R2Media[("Bucket: /media/user-uploads/")]
    end

    ProductionDB -.->|"Automated Daily Dumps via Cron"| R2Backups
    CoolifyDB -.->|"Daily 05:00 UTC Snapshot"| R2Coolify
    NextApp -.->|"Direct S3 Presigned Uploads"| R2Media

    classDef primary fill:#0369a1,stroke:#38bdf8,stroke-width:2px,color:#ffffff;
    classDef security fill:#047857,stroke:#34d399,stroke-width:2px,color:#ffffff;
    classDef storage fill:#b45309,stroke:#fbbf24,stroke-width:2px,color:#ffffff;
    class ClientBrowser,DeveloperWorkstation,CloudflareEdge primary;
    class FW_Rule1,FW_Rule2,FW_Rule3,FW_Rule4,FW_Rule5,UFW,SSHDaemon security;
    class ProductionDB,CoolifyDB,R2Backups,R2Coolify,R2Media storage;
`;

export default function ContaboVpsCoolifyProductionGuide() {
  return (
    <>
      <p id="introduction">
        Deploying high-performance web applications onto dedicated virtual infrastructure offers full sovereignty, zero vendor lock-in, and massive cost savings compared to managed platforms like Vercel, Heroku, or AWS. With a budget-friendly, high-spec <strong>Contabo VPS</strong> and the modern self-hosted PaaS <strong>Coolify</strong>, you can deploy full-stack Next.js applications, run isolated PostgreSQL databases, automate Let&apos;s Encrypt SSL certificates, and schedule encrypted off-site backups with ease.
      </p>

      <p>
        However, operating a self-managed server requires a structured, security-first foundation. This master guide documents the entire operational journey from the moment you purchase a fresh Contabo VPS to running a production-grade, hardened, monitored, and fully recoverable system.
      </p>

      <Callout type="info" title="How to Use This Guide">
        This is a comprehensive, linear production master guide. It covers both the <strong>Recommended</strong> standard practices and explicit <strong>Alternative Paths</strong> (such as direct root administration or password authentication) with their respective security trade-offs.
        <br /><br />
        <em>Looking for a zero-fluff, command-first quickstart without deep theoretical explanations? Jump to our fast-track runbook: <Link href="/blog/contabo-vps-production-coolify-guide" className="font-semibold text-cyan-400 underline hover:text-cyan-300">The 15-Minute Fast-Track Runbook &rarr;</Link></em>
      </Callout>

      {/* ========================================================================= */}
      {/* MODULE 1 */}
      {/* ========================================================================= */}
      <h2 id="module-1-architecture">Module 1: Architecture & Mental Model</h2>
      <p>
        Before connecting to the terminal, it is vital to understand the mental model of how all infrastructure components communicate and where network boundaries are drawn.
      </p>

      <MermaidDiagram
        chart={masterArchitectureDiagram}
        caption="Figure 1: End-to-end production architecture showing network boundaries, reverse proxy ingress, and offsite R2 cold storage."
      />

      <h3>Understanding the Core Technology Stack</h3>
      <ul>
        <li>
          <strong>Contabo Cloud VPS:</strong> The underlying hardware virtualization layer providing dedicated compute slices (vCPU cores, RAM, and NVMe SSD storage) with high bandwidth at cost-effective European and North American data centers.
        </li>
        <li>
          <strong>Ubuntu 24.04.5 LTS (Noble Numbat):</strong> The host operating system. The Long Term Support (LTS) release guarantees 5 years of security patches, modern Linux kernel 6.8, and systemd socket activation for core services.
        </li>
        <li>
          <strong>Linux Mint:</strong> The local developer workstation operating system used to generate cryptographic keys, manage OpenSSH configurations, and run administrative terminal commands.
        </li>
        <li>
          <strong>Docker Engine:</strong> The containerization runtime that isolates application runtimes, databases, and reverse proxies into reproducible user-space environments.
        </li>
        <li>
          <strong>Traefik v3:</strong> The edge reverse proxy container that listens on ports <code>80</code> and <code>443</code>. It monitors Docker container socket events dynamically, routes incoming HTTP/HTTPS domain requests, and automatically provisions Let&apos;s Encrypt TLS certificates.
        </li>
        <li>
          <strong>Coolify v4:</strong> The open-source PaaS control plane. It coordinates Git push-to-deploy workflows, builds container images using Nixpacks or Dockerfiles, configures environment variables, orchestrates databases, and manages automated backup cron schedules.
        </li>
        <li>
          <strong>PostgreSQL 18:</strong> The primary relational database engine running in an isolated Docker container on a non-routable internal bridge network, completely shielded from public internet scans.
        </li>
        <li>
          <strong>Cloudflare DNS:</strong> Global authoritative nameservers providing rapid DNS record propagation, DDoS protection, and SSL termination capabilities.
        </li>
        <li>
          <strong>Cloudflare R2:</strong> S3-compatible, globally distributed object storage with <em>zero egress fees</em>, serving as our offsite repository for encrypted database dumps and application uploads.
        </li>
      </ul>

      {/* ========================================================================= */}
      {/* MODULE 2 */}
      {/* ========================================================================= */}
      <h2 id="module-2-prerequisites">Module 2: Prerequisites & Hardware Planning</h2>
      <p>
        Proper hardware sizing prevents out-of-memory (OOM) kernel panics when running multiple Docker containers alongside database engines.
      </p>

      <h3>Verified Production VPS Specifications</h3>
      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Resource Metric</th>
              <th>Verified Specification</th>
              <th>Minimum Production Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>vCPU Cores</strong></td>
              <td>4 Cores</td>
              <td>2 Cores (4 Cores recommended for Next.js builds)</td>
            </tr>
            <tr>
              <td><strong>System Memory (RAM)</strong></td>
              <td>7.8 GiB (8 GB tier)</td>
              <td>4 GB minimum (8 GB gives comfortable headroom)</td>
            </tr>
            <tr>
              <td><strong>Disk Storage</strong></td>
              <td>96 GB NVMe / SSD</td>
              <td>50 GB+ NVMe</td>
            </tr>
            <tr>
              <td><strong>Operating System</strong></td>
              <td>Ubuntu 24.04.5 LTS x86_64</td>
              <td>Ubuntu 24.04 LTS</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Required External Accounts & Tools</h3>
      <ul>
        <li>A Contabo customer account with an active payment method.</li>
        <li>A registered domain name managed via Cloudflare authoritative DNS.</li>
        <li>A Cloudflare account with R2 Object Storage enabled.</li>
        <li>A GitHub or GitLab account for application source code.</li>
        <li>A local workstation running Linux Mint (or any modern Linux/macOS terminal with OpenSSH client).</li>
      </ul>

      {/* ========================================================================= */}
      {/* MODULE 3 */}
      {/* ========================================================================= */}
      <h2 id="module-3-provisioning">Module 3: Purchase & Provision the Contabo VPS</h2>
      <p>
        When ordering your VPS in the Contabo Customer Control Panel:
      </p>
      <ol>
        <li>Select <strong>Cloud VPS S</strong> or <strong>Cloud VPS M</strong>.</li>
        <li>Choose your preferred region (e.g. European or US Data Center closest to your target audience).</li>
        <li>Under <strong>Image / Operating System</strong>, explicitly choose <strong>Ubuntu 24.04</strong>.</li>
        <li>Choose storage type: <strong>NVMe</strong> is recommended over standard SSD for faster database disk I/O.</li>
        <li>Set an initial root password or upload an SSH key during checkout.</li>
        <li>Complete the order. Within 5 to 15 minutes, Contabo will deliver an email with your public IPv4 address (e.g. <code>101.0.101.10</code>).</li>
      </ol>

      {/* ========================================================================= */}
      {/* MODULE 4 */}
      {/* ========================================================================= */}
      <h2 id="module-4-first-ssh-connection">Module 4: First Remote SSH Connection</h2>

      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Initial Connection</span>
      </div>

      <p><strong>Step 4.1: Establish Initial Root Session</strong></p>
      <p><strong>Purpose:</strong> Connect to the newly provisioned VPS using the temporary root credentials provided by Contabo.</p>
      <p><strong>Why it is necessary:</strong> Verifies server availability, initial network routing, and host key validity.</p>
      <p><strong>Where to execute:</strong> Local Linux Mint terminal.</p>

      <CodeBlock
        language="bash"
        filename="local-linux-mint"
        code={`ssh root@101.0.101.10`}
      />

      <Callout type="info" title="Replace Placeholder IP">
        Replace <code>101.0.101.10</code> throughout this tutorial with your actual Contabo VPS public IPv4 address.
      </Callout>

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`The authenticity of host '101.0.101.10 (101.0.101.10)' can't be established.
ED25519 key fingerprint is SHA256:7W1sN0...
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '101.0.101.10' (ED25519) to the list of known hosts.
root@101.0.101.10's password: 
Welcome to Ubuntu 24.04.5 LTS (GNU/Linux 6.8.0-31-generic x86_64)
root@vmi101010110:~#`}
      />

      <p><strong>Explanation:</strong> Type <code>yes</code> to save the host key fingerprint to your local <code>~/.ssh/known_hosts</code> file, then enter your Contabo root password.</p>

      <p><strong>Success Verification:</strong></p>
      <CodeBlock
        language="bash"
        filename="vps-root"
        code={`whoami`}
      />
      <p>Output: <code>root</code></p>

      {/* ========================================================================= */}
      {/* MODULE 5 */}
      {/* ========================================================================= */}
      <h2 id="module-5-system-inspection">Module 5: Initial Server Inspection</h2>
      <p>
        Always audit the hardware specifications and OS kernel before installing software to confirm you received the provisioned tier.
      </p>

      <p><strong>Step 5.1: Run Hardware and System Inspection</strong></p>
      <p><strong>Where to execute:</strong> VPS as root.</p>

      <p>Check operating system version [ACTUAL IMPLEMENTATION]:</p>
      <CodeBlock
        language="bash"
        filename="vps-root"
        code={`cat /etc/os-release`}
      />
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`PRETTY_NAME="Ubuntu 24.04.5 LTS"
NAME="Ubuntu"
VERSION_ID="24.04"
VERSION="24.04.5 LTS (Noble Numbat)"
VERSION_CODENAME=noble`}
      />

      <p>Verify CPU core count [ACTUAL IMPLEMENTATION]:</p>
      <CodeBlock
        language="bash"
        filename="vps-root"
        code={`nproc`}
      />
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`4`}
      />

      <p>Verify memory headroom [ACTUAL IMPLEMENTATION]:</p>
      <CodeBlock
        language="bash"
        filename="vps-root"
        code={`free -h`}
      />
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`              total        used        free      shared  buff/cache   available
Mem:           7.8Gi       431Mi       7.3Gi       964Ki       312Mi       7.4Gi
Swap:             0B          0B          0B`}
      />

      <p>Verify root disk partition allocation [ACTUAL IMPLEMENTATION]:</p>
      <CodeBlock
        language="bash"
        filename="vps-root"
        code={`df -h /`}
      />
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        96G  2.3G   94G   3% /`}
      />

      {/* ========================================================================= */}
      {/* MODULE 6 */}
      {/* ========================================================================= */}
      <h2 id="module-6-system-update">Module 6: Base System Updates & Kernel Check</h2>

      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">System Hygiene</span>
      </div>

      <p><strong>Step 6.1: Refresh Repository Indices and Apply Upgrades</strong></p>
      <p><strong>Purpose:</strong> Download the latest security fixes, glibc patches, and kernel updates.</p>
      <p><strong>Where to execute:</strong> VPS as root.</p>

      <CodeBlock
        language="bash"
        filename="vps-root"
        code={`apt update && apt full-upgrade -y`}
      />

      <p><strong>Check if a kernel reboot is required:</strong></p>
      <CodeBlock
        language="bash"
        filename="vps-root"
        code={`if [ -f /var/run/reboot-required ]; then echo "Reboot REQUIRED"; else echo "No reboot needed"; fi`}
      />
      <p>If a reboot is required, run <code>reboot</code> and reconnect after 60 seconds.</p>

      {/* ========================================================================= */}
      {/* MODULE 7 */}
      {/* ========================================================================= */}
      <h2 id="module-7-user-management">Module 7: Linux User Management (Path A vs Path B)</h2>

      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Architecture Path</th>
              <th>Operational Model</th>
              <th>Security Level</th>
              <th>Trade-off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Path A (Recommended)</strong></td>
              <td>Dedicated non-root deploy user with <code>sudo</code> elevation</td>
              <td>High</td>
              <td>Requires typing <code>sudo</code> for administrative tasks, but prevents accidental destructive commands.</td>
            </tr>
            <tr>
              <td><strong>Path B (Alternative)</strong></td>
              <td>Direct <code>root</code> administrative access</td>
              <td>Elevated Risk</td>
              <td>Simpler setup, but any syntax mistake or compromised script has unrestricted kernel authority.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Path A (Recommended): Create Dedicated Deploy User</h3>
      <p>
        We will use <code>deploy</code> as our generic example username. You can choose any name you prefer (e.g. <code>administrator</code>, <code>developer</code>).
      </p>

      <p><strong>Step 7.1: Create the User Account</strong></p>
      <p><strong>Where to execute:</strong> VPS as root.</p>
      <CodeBlock
        language="bash"
        filename="vps-root"
        code={`adduser deploy`}
      />
      <p>Set a strong password when prompted. You can press Enter to skip optional personal info fields.</p>

      <p><strong>Step 7.2: Grant Sudo Privileges</strong></p>
      <CodeBlock
        language="bash"
        filename="vps-root"
        code={`usermod -aG sudo deploy`}
      />

      <p><strong>Step 7.3: Verify Sudo Elevation</strong></p>
      <CodeBlock
        language="bash"
        filename="vps-root"
        code={`su - deploy
sudo whoami`}
      />
      <p>Output: <code>root</code>. Type <code>exit</code> to return to your primary shell.</p>

      <h3>Path B (Alternative): Continue Using Root</h3>
      <p>
        If you intentionally decide to continue as <code>root</code>, you skip creating the <code>deploy</code> user. All subsequent commands in this guide will be run directly without <code>sudo</code>. Be aware that password-based root access on port 22 is heavily targeted by automated scanning networks.
      </p>

      {/* ========================================================================= */}
      {/* MODULE 8 */}
      {/* ========================================================================= */}
      <h2 id="module-8-ssh-key-auth">Module 8: SSH Key Authentication (Ed25519 vs Passwords)</h2>

      <h3>Path A (Recommended): Cryptographic SSH Keypair (Ed25519)</h3>
      <p>
        Ed25519 provides superior cryptographic security, compact key lengths, and resistance to brute-force attacks compared to legacy RSA keys.
      </p>

      <p><strong>Step 8.1: Generate Local Keypair</strong></p>
      <p><strong>Where to execute:</strong> Local Linux Mint terminal.</p>
      <CodeBlock
        language="bash"
        filename="local-linux-mint"
        code={`ssh-keygen -t ed25519 -C "contabo-vps" -f ~/.ssh/contabo-vps`}
      />
      <p>
        This creates your private key at <code>~/.ssh/contabo-vps</code> (permissions <code>600</code>) and public key at <code>~/.ssh/contabo-vps.pub</code> (permissions <code>644</code>).
      </p>

      <p><strong>Step 8.2: Install Public Key to the VPS</strong></p>
      <p>If using the dedicated deploy user:</p>
      <CodeBlock
        language="bash"
        filename="local-linux-mint"
        code={`ssh-copy-id -i ~/.ssh/contabo-vps.pub deploy@101.0.101.10`}
      />

      <p>If using Path B (root user):</p>
      <CodeBlock
        language="bash"
        filename="local-linux-mint"
        code={`ssh-copy-id -i ~/.ssh/contabo-vps.pub root@101.0.101.10`}
      />

      <p><strong>Step 8.3: Verify Key-Based Login in a New Terminal Window</strong></p>
      <CodeBlock
        language="bash"
        filename="local-linux-mint"
        code={`ssh -i ~/.ssh/contabo-vps deploy@101.0.101.10`}
      />
      <p>Confirm connection succeeds without prompting for the Linux account password.</p>

      <h3>Path B (Alternative): Password-Based SSH Authentication</h3>
      <p>
        If you choose to use password authentication, you do not generate local SSH keys. You must ensure your Linux account uses a high-entropy password (at least 20 random alphanumeric and symbol characters) to withstand dictionary attacks.
      </p>

      {/* ========================================================================= */}
      {/* MODULE 9 */}
      {/* ========================================================================= */}
      <h2 id="module-9-local-ssh-config">Module 9: Linux Mint SSH Client Automation</h2>
      <p>
        Rather than typing full IP addresses, usernames, and key paths every time, configure an OpenSSH client alias.
      </p>

      <p><strong>Step 9.1: Configure ~/.ssh/config on Linux Mint</strong></p>
      <p><strong>Where to execute:</strong> Local Linux Mint terminal.</p>
      <CodeBlock
        language="bash"
        filename="local-linux-mint"
        code={`mkdir -p ~/.ssh && chmod 700 ~/.ssh
cat << 'EOF' >> ~/.ssh/config

Host contabo
    HostName 101.0.101.10
    User deploy
    IdentityFile ~/.ssh/contabo-vps
    IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config`}
      />

      <p>Now you can connect instantly by typing:</p>
      <CodeBlock
        language="bash"
        filename="local-linux-mint"
        code={`ssh contabo`}
      />

      {/* ========================================================================= */}
      {/* MODULE 10 */}
      {/* ========================================================================= */}
      <h2 id="module-10-ssh-hardening">Module 10: OpenSSH Hardening & Coolify Root Policy</h2>

      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="SECURITY HARDENING" />
        <span className="text-sm font-medium text-slate-300">Daemon Lockdown</span>
      </div>

      <Callout type="warning" title="Critical Coolify Server Connection Requirement">
        A common pitfall is setting <code>PermitRootLogin no</code>. In Coolify, when adding or managing the local Docker server via SSH, the orchestration engine authenticates as <code>root</code> using an SSH key pair.
        <br /><br />
        Therefore, configure <code>PermitRootLogin prohibit-password</code> (also displayed as <code>without-password</code> in <code>sshd -T</code>). This completely rejects password-based attacks while preserving authorized key-based orchestration.
      </Callout>

      <h3>Authentication Decision Matrix</h3>
      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Operating Path</th>
              <th>PasswordAuthentication</th>
              <th>PermitRootLogin</th>
              <th>PubkeyAuthentication</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Deploy User + SSH Key (Recommended)</strong></td>
              <td><code>no</code></td>
              <td><code>prohibit-password</code></td>
              <td><code>yes</code></td>
            </tr>
            <tr>
              <td><strong>Deploy User + Password</strong></td>
              <td><code>yes</code></td>
              <td><code>no</code></td>
              <td><code>yes</code></td>
            </tr>
            <tr>
              <td><strong>Root + SSH Key</strong></td>
              <td><code>no</code></td>
              <td><code>prohibit-password</code></td>
              <td><code>yes</code></td>
            </tr>
            <tr>
              <td><strong>Root + Password</strong></td>
              <td><code>yes</code></td>
              <td><code>yes</code></td>
              <td><code>yes</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>Step 10.1: Apply Hardened Drop-in Configuration</strong></p>
      <p><strong>Where to execute:</strong> VPS with sudo privileges.</p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`sudo bash -c 'cat << "EOF" > /etc/ssh/sshd_config.d/00-security.conf
PermitRootLogin prohibit-password
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
EOF'`}
      />

      <p><strong>Step 10.2: Validate SSH Syntax Before Reloading</strong></p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`sudo sshd -t`}
      />
      <p>Command must return zero output and exit with code <code>0</code>.</p>

      <p><strong>Step 10.3: Reload OpenSSH Service</strong></p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`sudo systemctl reload ssh`}
      />

      <p>Verify effective runtime parameters [ACTUAL OBSERVED OUTPUT]:</p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`sudo sshd -T | grep -E 'permitrootlogin|pubkeyauthentication|passwordauthentication|kbdinteractiveauthentication'`}
      />
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`permitrootlogin without-password
pubkeyauthentication yes
passwordauthentication no
kbdinteractiveauthentication no`}
      />

      <Callout type="danger" title="Safety Rule">
        Never close your current terminal window until you open a fresh terminal tab and successfully test logging in via <code>ssh contabo</code>.
      </Callout>

      {/* ========================================================================= */}
      {/* MODULE 11 */}
      {/* ========================================================================= */}
      <h2 id="module-11-ufw-firewall">Module 11: Host Firewall Setup with UFW</h2>

      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Host Firewall</span>
      </div>

      <p><strong>Step 11.1: Configure UFW Policies and Rules</strong></p>
      <p><strong>Where to execute:</strong> VPS with sudo privileges.</p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment "OpenSSH"
sudo ufw allow 80/tcp comment "HTTP"
sudo ufw allow 443/tcp comment "HTTPS"
sudo ufw allow 443/udp comment "HTTP3-QUIC"
sudo ufw --force enable`}
      />

      <p>Verify active firewall status [ACTUAL OBSERVED OUTPUT]:</p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`sudo ufw status verbose`}
      />
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), deny (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW IN    Anywhere
80/tcp                     ALLOW IN    Anywhere
443/tcp                    ALLOW IN    Anywhere
443/udp                    ALLOW IN    Anywhere
22/tcp (v6)                ALLOW IN    Anywhere (v6)
80/tcp (v6)                ALLOW IN    Anywhere (v6)
443/tcp (v6)               ALLOW IN    Anywhere (v6)
443/udp (v6)               ALLOW IN    Anywhere (v6)`}
      />

      {/* ========================================================================= */}
      {/* MODULE 12 */}
      {/* ========================================================================= */}
      <h2 id="module-12-contabo-cloud-firewall">Module 12: Contabo Perimeter Firewall & Docker Bypass</h2>

      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="SECURITY HARDENING" />
        <span className="text-sm font-medium text-slate-300">Perimeter Defense</span>
      </div>

      <Callout type="danger" title="Why UFW Alone Is Not Enough for Docker Hosts">
        Docker manipulates Linux <code>iptables</code> directly. When a container publishes a port (e.g. <code>-p 5432:5432</code>), Docker inserts NAT rules into the <code>PREROUTING</code> chain, <strong>bypassing UFW&apos;s INPUT chain entirely</strong>!
        <br /><br />
        To protect against accidental port exposure, configure Contabo&apos;s hardware cloud firewall at the hypervisor perimeter.
      </Callout>

      <p><strong>Contabo Customer Control Panel Configuration:</strong></p>
      <ol>
        <li>Navigate to <strong>Cloud Firewall</strong> in the Contabo portal.</li>
        <li>Assign your VPS to the firewall policy.</li>
        <li>Create the following rule hierarchy:</li>
      </ol>

      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Priority</th>
              <th>Protocol</th>
              <th>Destination Port</th>
              <th>Action</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>TCP</td>
              <td>22</td>
              <td>Allow</td>
              <td>OpenSSH Administrative Access</td>
            </tr>
            <tr>
              <td>2</td>
              <td>TCP</td>
              <td>80</td>
              <td>Allow</td>
              <td>HTTP Verification &amp; Let&apos;s Encrypt ACME</td>
            </tr>
            <tr>
              <td>3</td>
              <td>TCP</td>
              <td>443</td>
              <td>Allow</td>
              <td>HTTPS Web Traffic to Traefik</td>
            </tr>
            <tr>
              <td>4</td>
              <td>UDP</td>
              <td>443</td>
              <td>Allow</td>
              <td>HTTP/3 QUIC Acceleration</td>
            </tr>
            <tr>
              <td>99</td>
              <td>Any</td>
              <td>Any</td>
              <td>Drop</td>
              <td>Default Deny Inbound</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 13 */}
      {/* ========================================================================= */}
      <h2 id="module-13-install-coolify">Module 13: Install Docker CE & Coolify Engine</h2>

      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">PaaS Deployment</span>
      </div>

      <p><strong>Step 13.1: Execute Official Coolify Installation Script</strong></p>
      <p><strong>Where to execute:</strong> VPS with sudo privileges.</p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash`}
      />

      <p>
        The installer automatically updates package repositories, installs official Docker CE packages, sets up <code>/data/coolify</code> directories, and downloads the official Coolify images.
      </p>

      <p><strong>Step 13.2: Temporary Setup Port &amp; Admin Registration</strong></p>
      <ol>
        <li>Temporarily allow port 8000: <code>sudo ufw allow 8000/tcp</code>.</li>
        <li>Open your browser to <code>http://101.0.101.10:8000</code>.</li>
        <li>Register your primary Administrator name, email, and password.</li>
      </ol>

      {/* ========================================================================= */}
      {/* MODULE 14 */}
      {/* ========================================================================= */}
      <h2 id="module-14-verify-coolify-docker">Module 14: Inspect Running Infrastructure Containers</h2>

      <p><strong>Step 14.1: Inspect Container Health and Dynamic Labels</strong></p>
      <p><strong>Where to execute:</strong> VPS with sudo privileges.</p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"`}
      />

      <p><strong>Actual observed production output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`NAMES                                      IMAGE                                                               STATUS
coolify-sentinel                           coollabsio/sentinel:1.1.3                                           Up 15 hours (healthy)
wz5ggxjgbfquhd4nqkkoz2qr-20261105T070055   wz5ggxjgbfquhd4nqkkoz2qr:0fc751fe20d3b0d06a1172f8525544e6850d3971   Up 2 days
8qjyc2y0wlwqsuehxro4lt41-20261105T070126   8qjyc2y0wlwqsuehxro4lt41:c688f62e72871edfa482a293a13c26be6d308667   Up 2 days (healthy)
coolify                                    coollabsio/coolify:4.6.0                                            Up 3 days (healthy)
coolify-db                                 postgres:15-alpine                                                  Up 3 days (healthy)
coolify-redis                              redis:7-alpine                                                      Up 3 days (healthy)
wranskf7jsroplrdbugtlqxn                   postgres:18-alpine                                                  Up 2 weeks (healthy)
coolify-proxy                              traefik:v3.7                                                        Up 2 weeks (healthy)`}
      />
      <p>
        Notice that application and database containers use dynamically generated alphanumeric hashes (e.g. <code>wranskf7jsroplrdbugtlqxn</code>). The core services (<code>coolify</code>, <code>coolify-db</code>, <code>coolify-redis</code>, <code>coolify-proxy</code>, <code>coolify-sentinel</code>) run healthy and persistent.
      </p>

      {/* ========================================================================= */}
      {/* MODULE 15 */}
      {/* ========================================================================= */}
      <h2 id="module-15-coolify-server-connection">Module 15: Configure Coolify Localhost Node Connection</h2>
      <p>
        In the Coolify dashboard under <strong>Servers &gt; localhost</strong>:
      </p>
      <ol>
        <li>Select the server connection method. Coolify uses SSH key authentication to execute commands against the local Docker socket.</li>
        <li>Ensure the Coolify SSH key is associated with the server.</li>
        <li>Click <strong>Validate Server Connection</strong>.</li>
        <li>Once validation confirms <code>Connected</code>, the Web Terminal inside Coolify operates with <code>root</code> administrative privileges.</li>
      </ol>

      {/* ========================================================================= */}
      {/* MODULE 16 */}
      {/* ========================================================================= */}
      <h2 id="module-16-dns-cloudflare">Module 16: Cloudflare DNS Configuration & Routing</h2>

      <p>Log in to your Cloudflare Dashboard &gt; <strong>DNS &gt; Records</strong> and create your records:</p>

      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Content (IPv4)</th>
              <th>Proxy Status (Initial)</th>
              <th>TTL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>A</code></td>
              <td><code>coolify</code></td>
              <td><code>101.0.101.10</code></td>
              <td><strong>DNS Only (Grey Cloud)</strong></td>
              <td>Auto</td>
            </tr>
            <tr>
              <td><code>A</code></td>
              <td><code>app</code></td>
              <td><code>101.0.101.10</code></td>
              <td><strong>DNS Only (Grey Cloud)</strong></td>
              <td>Auto</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>Verify DNS resolution from your local Linux Mint terminal:</p>
      <CodeBlock
        language="bash"
        filename="local-linux-mint"
        code={`dig +short A coolify.example.com`}
      />
      <p>Output: <code>101.0.101.10</code></p>

      {/* ========================================================================= */}
      {/* MODULE 17 */}
      {/* ========================================================================= */}
      <h2 id="module-17-reverse-proxy-https">Module 17: Traefik Ingress & Automated Let&apos;s Encrypt TLS</h2>

      <ol>
        <li>In Coolify, navigate to <strong>Settings &gt; Instance Domain</strong>.</li>
        <li>Enter your fully qualified domain: <code>https://coolify.example.com</code>.</li>
        <li>Click <strong>Save</strong>. Traefik automatically negotiates with Let&apos;s Encrypt over ports 80/443.</li>
        <li>Remove the temporary setup port: <code>sudo ufw delete allow 8000/tcp</code>.</li>
      </ol>

      <p>Verify HTTPS response headers from your terminal:</p>
      <CodeBlock
        language="bash"
        filename="local-linux-mint"
        code={`curl -I https://coolify.example.com`}
      />
      <p>Output should return <code>HTTP/2 200</code> with a valid Let&apos;s Encrypt certificate.</p>

      {/* ========================================================================= */}
      {/* MODULE 18 */}
      {/* ========================================================================= */}
      <h2 id="module-18-app-deployment">Module 18: Git Integration & Next.js App Deployment</h2>

      <ol>
        <li>In Coolify, create a new <strong>Project</strong> &gt; click <strong>+ Add Resource</strong> &gt; <strong>Git Repository</strong>.</li>
        <li>Connect your Git repository (public URL or authenticated GitHub App for private repositories).</li>
        <li>Select production branch (<code>main</code>).</li>
        <li>Choose Build Method: <strong>Nixpacks</strong> (automatic detection) or <strong>Dockerfile</strong> (custom multi-stage container).</li>
        <li>Set the application domain: <code>https://app.example.com</code>.</li>
        <li>Add environment variables:
          <CodeBlock
            language="bash"
            filename="coolify-env"
            code={`NODE_ENV=production
PORT=3000`}
          />
        </li>
        <li>Click <strong>Deploy</strong> and inspect real-time container build logs in the dashboard.</li>
      </ol>

      {/* ========================================================================= */}
      {/* MODULE 19 */}
      {/* ========================================================================= */}
      <h2 id="module-19-postgresql-config">Module 19: Private PostgreSQL 18 Production Setup</h2>

      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Database Isolation</span>
      </div>

      <ol>
        <li>In your Coolify project, click <strong>+ Add Resource &gt; PostgreSQL</strong>.</li>
        <li>Image: select <code>postgres:18-alpine</code>.</li>
        <li><strong>Make Public:</strong> Ensure this toggle is <strong>DISABLED</strong>. Do NOT bind port 5432 to host interfaces!</li>
        <li>Coolify generates secure credentials and an internal hostname.</li>
        <li>Connect your Next.js application using the internal URL on the shared bridge network:
          <CodeBlock
            language="bash"
            filename="coolify-env"
            code={`DATABASE_URL=postgresql://postgres:randomPassword@internal-db-hostname:5432/postgres`}
          />
        </li>
      </ol>

      {/* ========================================================================= */}
      {/* MODULE 20 */}
      {/* ========================================================================= */}
      <h2 id="module-20-cloudflare-r2-storage">Module 20: Persistent File Storage with Cloudflare R2</h2>
      <p>
        Application file uploads (user avatars, documents) must never be stored on a disposable container filesystem. Configure Cloudflare R2:
      </p>
      <ul>
        <li>Create bucket: <code>vps-production-storage</code>.</li>
        <li>Generate R2 API Token with Object Read &amp; Write permissions.</li>
        <li>Use dedicated prefixes: <code>/media/uploads/</code> for public assets, and <code>/backups/</code> for private database snapshots.</li>
      </ul>

      {/* ========================================================================= */}
      {/* MODULE 21 */}
      {/* ========================================================================= */}
      <h2 id="module-21-scheduled-database-backups">Module 21: Automated Database Backups to R2</h2>

      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="RECOMMENDED" />
        <span className="text-sm font-medium text-slate-300">Offsite Storage</span>
      </div>

      <p><strong>Configuring S3 Storage in Coolify:</strong></p>
      <ol>
        <li>In Coolify, go to <strong>Settings &gt; S3 Storages &gt; + Add</strong>.</li>
        <li>Endpoint: <code>https://&lt;ACCOUNT_ID&gt;.r2.cloudflarestorage.com</code>.</li>
        <li>Bucket: <code>vps-production-storage</code>.</li>
        <li>Open your production PostgreSQL resource &gt; <strong>Backups</strong> tab.</li>
        <li>Set frequency (cron): e.g. daily at 02:00 UTC.</li>
        <li>Set retention: 5 to 7 rolling daily snapshots.</li>
      </ol>
      <p>
        <em>Actual evidence:</em> Five successful consecutive backup executions were verified in R2 between November 3 and November 7, 2026, with compressed archive sizes around 315 KB.
      </p>

      {/* ========================================================================= */}
      {/* MODULE 22 */}
      {/* ========================================================================= */}
      <h2 id="module-22-restore-testing">Module 22: Non-Destructive Restore Drill on Sandbox Database</h2>

      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Disaster Verification</span>
      </div>

      <Callout type="danger" title="The Golden Rule of Restore Testing">
        NEVER perform restore verification tests on your active production database. Always provision an isolated temporary database container to validate the integrity of your backup archives.
      </Callout>

      <p><strong>The Verified Sandbox Restore Procedure:</strong></p>
      <ol>
        <li>Create a temporary PostgreSQL resource named <code>example-restore-test</code> in Coolify.</li>
        <li>Select the identical <code>postgres:18-alpine</code> image. Keep public access disabled.</li>
        <li>Under the Backups tab, select <strong>Import Backup from S3 Storage</strong>.</li>
        <li>Paste the archive path from your verified R2 backup (approx 315.89 KB).</li>
        <li>Click <strong>Check File</strong> to verify archive accessibility.</li>
        <li>Trigger the restore and monitor container logs until output confirms:
          <CodeBlock
            language="text"
            filename="container-logs"
            code={`PostgreSQL init process complete
database system is ready to accept connections`}
          />
        </li>
        <li>Open the terminal for the temporary container and inspect tables:
          <CodeBlock
            language="bash"
            filename="temp-postgres-terminal"
            code={`psql -U postgres -d postgres -c "\\dt"`}
          />
        </li>
        <li>Confirm all schemas and records are present.</li>
        <li>Deprovision the <code>example-restore-test</code> resource to release RAM and disk space.</li>
      </ol>

      {/* ========================================================================= */}
      {/* MODULE 23 */}
      {/* ========================================================================= */}
      <h2 id="module-23-coolify-internal-backup">Module 23: Coolify Internal Database Backup Routine</h2>
      <p>
        Coolify stores project definitions, Git webhooks, user configurations, and proxy routing in its own internal PostgreSQL database (<code>coolify-db</code>).
      </p>
      <ul>
        <li>Cron Schedule [ACTUAL IMPLEMENTATION]: <code>0 5 * * *</code> (05:00 UTC = 11:00 AM Bangladesh Time).</li>
        <li>Local Retention: 5 snapshots.</li>
        <li>Remote R2 Retention: 5 snapshots.</li>
        <li><strong>Backup Before Update:</strong> Enabled to automatically capture a snapshot prior to Coolify platform updates.</li>
      </ul>

      {/* ========================================================================= */}
      {/* MODULE 24 */}
      {/* ========================================================================= */}
      <h2 id="module-24-secrets-protection">Module 24: Protect /data/coolify State & Master APP_KEY</h2>

      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="SECURITY HARDENING" />
        <span className="text-sm font-medium text-slate-300">Cryptographic State</span>
      </div>

      <Callout type="warning" title="Why Database Dumps Alone Cannot Restore Coolify">
        Coolify uses an application master encryption key (<code>APP_KEY</code>) stored inside <code>/data/coolify/source/.env</code> to encrypt and decrypt sensitive fields (SSH keys, environment secrets, and tokens).
        <br /><br />
        If you lose <code>/data/coolify/source/.env</code>, a restored database dump is cryptographically unreadable!
      </Callout>

      <p><strong>Step 24.1: Inspect Directory Layout &amp; Sizes [ACTUAL IMPLEMENTATION]</strong></p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`sudo du -sh /data/coolify && sudo du -sh /data/coolify/*`}
      />
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`31M     /data/coolify

36K     /data/coolify/applications
18M     /data/coolify/backups
20K     /data/coolify/databases
12K     /data/coolify/images
68K     /data/coolify/proxy
13M     /data/coolify/sentinel
4.0K    /data/coolify/services
160K    /data/coolify/source
24K     /data/coolify/ssh
8.0K    /data/coolify/ssl`}
      />

      <p><strong>Step 24.2: Enforce Strict File Permissions</strong></p>
      <p>Harden `.env` from world-readable <code>644</code> to owner-only <code>600</code>:</p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`sudo chmod 600 /data/coolify/source/.env
sudo chmod 700 /data/coolify/ssh`}
      />

      <p>Verify permissions [ACTUAL OBSERVED OUTPUT]:</p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`sudo stat -c '%A %a %n' /data/coolify/source/.env`}
      />
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`-rw------- 600 /data/coolify/source/.env`}
      />

      {/* ========================================================================= */}
      {/* MODULE 25 */}
      {/* ========================================================================= */}
      <h2 id="module-25-unattended-upgrades">Module 25: Automated OS Security Updates</h2>

      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Automated Patching</span>
      </div>

      <p>Configure daily background security updates in <code>/etc/apt/apt.conf.d/20auto-upgrades</code>:</p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`sudo bash -c 'cat << "EOF" > /etc/apt/apt.conf.d/20auto-upgrades
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
EOF'`}
      />

      <p>Inspect upgrade logs [ACTUAL OBSERVED OUTPUT]:</p>
      <CodeBlock
        language="bash"
        filename="vps-deploy"
        code={`sudo tail -30 /var/log/unattended-upgrades/unattended-upgrades.log`}
      />
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`2026-11-04 06:42:07,014 INFO Packages that will be upgraded: bind9-dnsutils bind9-host bind9-libs libmspack0t64 libpcre2-8-0
2026-11-04 06:42:38,373 INFO All upgrades installed
2026-11-05 06:28:45,529 INFO Packages that will be upgraded: apt apt-utils libapt-pkg6.0t64 python3-twisted
2026-11-05 06:29:36,614 INFO All upgrades installed
2026-11-06 06:50:52,477 INFO No packages found that can be upgraded unattended and no pending auto-removals`}
      />

      {/* ========================================================================= */}
      {/* MODULE 26 */}
      {/* ========================================================================= */}
      <h2 id="module-26-container-security">Module 26: Container Runtime Security & Socket Isolation</h2>
      <p>
        Docker daemon access represents full root equivalence. Ensure that only trusted system administrators have access to <code>/var/run/docker.sock</code>. Limit container log sizes in <code>/etc/docker/daemon.json</code> to prevent Docker from exhausting disk inodes:
      </p>
      <CodeBlock
        language="json"
        filename="/etc/docker/daemon.json"
        code={`{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "3"
  }
}`}
      />

      {/* ========================================================================= */}
      {/* MODULE 27 */}
      {/* ========================================================================= */}
      <h2 id="module-27-healthchecks-rollbacks">Module 27: Container Liveness, HEALTHCHECK & Rollback Strategy</h2>
      <p>
        Embed a native <code>HEALTHCHECK</code> in your Next.js application <code>Dockerfile</code>:
      </p>
      <CodeBlock
        language="dockerfile"
        filename="Dockerfile"
        code={`HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \\
  CMD wget -qO- http://localhost:3000/api/health || exit 1`}
      />
      <p>
        <strong>Coolify Instant Rollback:</strong> When an application deployment introduces regressions, navigate to your application &gt; <strong>Deployments</strong> tab and click <strong>Rollback to this deployment</strong>. Coolify immediately updates Traefik routing labels to direct traffic back to the prior immutable Docker image tag.
      </p>

      {/* ========================================================================= */}
      {/* MODULE 28 */}
      {/* ========================================================================= */}
      <h2 id="module-28-monitoring-metrics">Module 28: Server Monitoring & Resource Allocation</h2>
      <p>
        Rather than burdening a single VPS with heavy observability stacks like Prometheus and Grafana, Coolify provides lightweight built-in system telemetry.
      </p>
      <p>
        <em>Actual production observations:</em> Under normal operational load with 8 active containers, baseline utilization measured <strong>10% CPU, 26% RAM (approx 2 GB used), and 8% Disk</strong>.
      </p>

      {/* ========================================================================= */}
      {/* MODULE 29 */}
      {/* ========================================================================= */}
      <h2 id="module-29-backup-retention-lifecycle">Module 29: Backup Retention & Object Storage Deletion Protection</h2>
      <p>
        Storing application uploads and database snapshots in the same bucket requires careful prefix management:
      </p>
      <ul>
        <li><code>/backups/postgres-prod/</code>: Retains rolling 7-day database dumps.</li>
        <li><code>/media/user-uploads/</code>: Permanent application asset storage.</li>
      </ul>
      <p>
        <em>Note:</em> Prefix separation alone does not prevent accidental bucket deletion. Use Cloudflare R2 bucket-level lifecycle policies and restricted IAM token scopes.
      </p>

      {/* ========================================================================= */}
      {/* MODULE 30 */}
      {/* ========================================================================= */}
      <h2 id="module-30-coolify-upgrades">Module 30: Upgrading Coolify Safely with Snapshot Rollback</h2>
      <p>
        Before upgrading Coolify from the web dashboard:
      </p>
      <ol>
        <li>Verify the automated pre-update database snapshot has completed.</li>
        <li>Check that <code>/data/coolify/source/.env</code> is backed up locally.</li>
        <li>Click <strong>Upgrade</strong> in the dashboard.</li>
      </ol>

      {/* ========================================================================= */}
      {/* MODULE 31 */}
      {/* ========================================================================= */}
      <h2 id="module-31-recovery-planning">Module 31: Full Bare-Metal Platform Recovery Planning</h2>
      <p>
        In the event of complete VPS loss, recovery follows a strict dependency order:
      </p>
      <ol>
        <li><strong>Provision:</strong> Launch a fresh Contabo VPS running Ubuntu 24.04.</li>
        <li><strong>Access:</strong> Re-establish SSH key authentication and UFW rules.</li>
        <li><strong>Coolify Bootstrap:</strong> Run <code>curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash</code>.</li>
        <li><strong>State Injection:</strong> Restore <code>/data/coolify/source/.env</code> (preserving original <code>APP_KEY</code>).</li>
        <li><strong>Database Hydration:</strong> Restore PostgreSQL dumps from Cloudflare R2.</li>
        <li><strong>DNS Switch:</strong> Point Cloudflare A records to the new VPS public IP.</li>
      </ol>

      {/* ========================================================================= */}
      {/* MODULE 32 */}
      {/* ========================================================================= */}
      <h2 id="module-32-disaster-recovery-scenarios">Module 32: Seven Realistic Production Failure Scenarios</h2>

      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Failure Scenario</th>
              <th>Symptoms</th>
              <th>Immediate Action &amp; Recovery Path</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Next.js App Crash</strong></td>
              <td>HTTP 502 / 504 from Traefik</td>
              <td>Inspect <code>docker logs</code>; click <strong>Rollback</strong> in Coolify deployments.</td>
            </tr>
            <tr>
              <td><strong>2. Bad Deployment</strong></td>
              <td>Runtime exception on specific route</td>
              <td>One-click rollback in Coolify dashboard to previous image tag.</td>
            </tr>
            <tr>
              <td><strong>3. PostgreSQL Crash</strong></td>
              <td>Database connection refused</td>
              <td>Restart database container via Coolify; inspect storage mount.</td>
            </tr>
            <tr>
              <td><strong>4. Disk Space Exhaustion</strong></td>
              <td>Docker write errors; containers pause</td>
              <td>Execute <code>docker system prune -af --filter &quot;until=168h&quot;</code> to purge dangling build cache.</td>
            </tr>
            <tr>
              <td><strong>5. VPS Unreachable via SSH</strong></td>
              <td>Connection timed out on port 22</td>
              <td>Log in via Contabo Web VNC console; inspect UFW and SSH status.</td>
            </tr>
            <tr>
              <td><strong>6. Coolify Web UI Down</strong></td>
              <td>Port 8000 / dashboard unreachable</td>
              <td>SSH into VPS; run <code>docker restart coolify coolify-proxy</code>.</td>
            </tr>
            <tr>
              <td><strong>7. Complete VPS Loss</strong></td>
              <td>Host hardware destroyed</td>
              <td>Follow Module 31 bare-metal recovery runbook using R2 backups.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 33 */}
      {/* ========================================================================= */}
      <h2 id="module-33-maintenance-runbook">Module 33: Routine System Maintenance Runbook</h2>
      <ul>
        <li><strong>Weekly:</strong> Review Cloudflare R2 backup execution history; check disk free space (<code>df -h /</code>).</li>
        <li><strong>Monthly:</strong> Execute a non-destructive restore drill into a temporary database container (Module 22).</li>
        <li><strong>Quarterly:</strong> Review <code>/var/run/reboot-required</code> for pending Linux kernel security updates.</li>
      </ul>

      {/* ========================================================================= */}
      {/* MODULE 34 */}
      {/* ========================================================================= */}
      <h2 id="module-34-troubleshooting">Module 34: Comprehensive Production Troubleshooting Matrix</h2>

      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Subsystem</th>
              <th>Common Error</th>
              <th>Root Cause &amp; Proven Resolution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>SSH</strong></td>
              <td><code>Permission denied (publickey)</code></td>
              <td>SSH key permissions incorrect. Ensure local key is <code>600</code> and remote <code>~/.ssh/authorized_keys</code> is <code>600</code>.</td>
            </tr>
            <tr>
              <td><strong>Firewall</strong></td>
              <td>Locked out after enabling UFW</td>
              <td>Forgot to allow port 22 before enabling. Recover via Contabo Customer Control Panel HTML5 VNC console.</td>
            </tr>
            <tr>
              <td><strong>Coolify</strong></td>
              <td>Server validation fails</td>
              <td><code>PermitRootLogin</code> was set to <code>no</code>. Update to <code>prohibit-password</code> in <code>/etc/ssh/sshd_config.d/00-security.conf</code>.</td>
            </tr>
            <tr>
              <td><strong>Traefik</strong></td>
              <td>SSL Certificate handshake failure</td>
              <td>Cloudflare orange cloud proxy enabled before ACME issuance. Temporarily switch DNS to Grey Cloud (DNS-Only).</td>
            </tr>
            <tr>
              <td><strong>Database</strong></td>
              <td>App cannot connect to PostgreSQL</td>
              <td>App attempting to connect via public IP instead of internal Docker container network hostname.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 35 */}
      {/* ========================================================================= */}
      <h2 id="module-35-production-checklist">Module 35: Final Production Readiness Checklist</h2>

      <div className="space-y-4 my-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-2">1. Operating System &amp; Access</h4>
          <ul className="text-sm space-y-1 text-slate-300">
            <li>[x] Ubuntu 24.04 LTS verified with latest security updates applied</li>
            <li>[x] Dedicated unprivileged deploy user created with sudo privileges</li>
            <li>[x] Ed25519 SSH keypair configured; password authentication disabled</li>
            <li>[x] <code>PermitRootLogin prohibit-password</code> enforced for Coolify compatibility</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-2">2. Network &amp; Perimeter Defense</h4>
          <ul className="text-sm space-y-1 text-slate-300">
            <li>[x] UFW active with default deny incoming (ports 22, 80, 443 TCP/UDP allowed)</li>
            <li>[x] Contabo Cloud Firewall configured at edge with final DROP rule</li>
            <li>[x] PostgreSQL and Redis ports isolated on private Docker networks (zero host binds)</li>
            <li>[x] Traefik reverse proxy serving valid Let&apos;s Encrypt TLS certificates</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">3. Storage, Backups &amp; Resilience</h4>
          <ul className="text-sm space-y-1 text-slate-300">
            <li>[x] Cloudflare R2 connected as S3 storage provider</li>
            <li>[x] Automated daily database snapshots active with rolling retention</li>
            <li>[x] Non-destructive restore drill verified in temporary sandbox container</li>
            <li>[x] <code>/data/coolify/source/.env</code> master <code>APP_KEY</code> permissions hardened to <code>600</code></li>
          </ul>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 36 */}
      {/* ========================================================================= */}
      <h2 id="module-36-conclusion">Module 36: Conclusion & Operational Philosophy</h2>
      <p>
        Building a production-ready infrastructure stack does not require expensive managed cloud platforms or complex microservice orchestration. By pairing a high-performance <strong>Contabo VPS</strong> with <strong>Ubuntu 24.04 LTS</strong>, <strong>Coolify</strong>, <strong>Traefik</strong>, and <strong>Cloudflare R2</strong>, you achieve enterprise-grade security, rapid Git-driven deployments, and verifiable disaster recovery at a fraction of the traditional cost.
      </p>

      <p>
        Maintain operational discipline: perform periodic non-destructive restore drills, review unattended update logs, and protect your master encryption secrets. For related articles on Linux systems architecture, explore the rest of our <Link href="/blog" className="text-cyan-400 font-semibold underline hover:text-cyan-300">Technical Blog</Link>.
      </p>
    </>
  );
}
