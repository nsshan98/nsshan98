import React from "react";
import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog/types";
import CodeBlock from "@/components/blog/CodeBlock";
import Callout from "@/components/blog/Callout";
import Quote from "@/components/blog/Quote";
import ConfigBadge from "@/components/blog/ConfigBadge";
import MermaidDiagram from "@/components/blog/MermaidDiagram";

export const post: BlogPostMeta = {
  title: "From a Fresh Contabo VPS to Production with Coolify: A Minimal Step-by-Step Guide",
  slug: "contabo-vps-production-coolify-guide",
  description:
    "A hands-on, beginner-friendly guide to provisioning a fresh Contabo VPS running Ubuntu 24.04 LTS, securing SSH, configuring UFW, installing Coolify, connecting Cloudflare DNS and R2, and deploying a production Next.js app with private PostgreSQL.",
  publishedAt: "2026-11-07",
  updatedAt: "2026-11-07",
  author: "Nazmus Sakib",
  authorRole: "Senior DevOps & Full-Stack Engineer",
  category: "DevOps",
  tags: [
    "Contabo",
    "VPS",
    "Coolify",
    "Ubuntu 24.04",
    "Docker",
    "Next.js",
    "PostgreSQL",
    "Cloudflare",
    "DevOps",
  ],
  readingTime: "24 min read",
  featured: true,
  featuredImage: "/blog/contabo-vps-production-coolify-thumbnail.jpg",
  featuredImageAlt: "From a Fresh Contabo VPS to Production with Coolify Minimal Guide Thumbnail",
  toc: [
    { id: "module-1-architecture", title: "Module 1: Architecture & Requirements", level: 2 },
    { id: "module-2-initial-vps-setup", title: "Module 2: Purchase & Initial VPS Access", level: 2 },
    { id: "step-2-1-identify-server-ip", title: "Step 2.1: Identify Your Server Public IP", level: 3 },
    { id: "step-2-2-first-ssh-login", title: "Step 2.2: First SSH Connection as Root", level: 3 },
    { id: "module-3-dedicated-deploy-user", title: "Module 3: Create a Dedicated Deploy User", level: 2 },
    { id: "step-3-1-create-deploy-user", title: "Step 3.1: Create the User Account", level: 3 },
    { id: "step-3-2-grant-sudo-privileges", title: "Step 3.2: Grant Sudo Administrative Privileges", level: 3 },
    { id: "step-3-3-verify-user-groups", title: "Step 3.3: Verify User Groups", level: 3 },
    { id: "step-3-4-switch-to-deploy-user", title: "Step 3.4: Switch to the Deploy User", level: 3 },
    { id: "step-3-5-test-sudo-access", title: "Step 3.5: Test Sudo Access", level: 3 },
    { id: "module-4-ssh-key-auth", title: "Module 4: Configure SSH Key Authentication", level: 2 },
    { id: "step-4-1-generate-local-key", title: "Step 4.1: Generate an Ed25519 Key on Your Local PC", level: 3 },
    { id: "step-4-2-install-public-key", title: "Step 4.2: Copy the Public Key to the VPS", level: 3 },
    { id: "step-4-3-test-key-login", title: "Step 4.3: Test Key-Based Login in a New Terminal", level: 3 },
    { id: "module-5-essential-ssh-security", title: "Module 5: Essential SSH Security Hardening", level: 2 },
    { id: "step-5-1-configure-sshd", title: "Step 5.1: Create Drop-In SSH Configuration", level: 3 },
    { id: "step-5-2-validate-sshd-config", title: "Step 5.2: Validate SSH Syntax Before Reloading", level: 3 },
    { id: "step-5-3-reload-ssh-service", title: "Step 5.3: Reload the SSH Service", level: 3 },
    { id: "step-5-4-verify-new-session", title: "Step 5.4: Verify New Authenticated Session", level: 3 },
    { id: "module-6-configure-firewall", title: "Module 6: Host & Cloud Firewall Configuration", level: 2 },
    { id: "step-6-1-ufw-default-policies", title: "Step 6.1: Set UFW Default Policies", level: 3 },
    { id: "step-6-2-ufw-allow-rules", title: "Step 6.2: Allow Essential Ports (22, 80, 443)", level: 3 },
    { id: "step-6-3-enable-ufw", title: "Step 6.3: Enable the UFW Firewall", level: 3 },
    { id: "step-6-4-verify-firewall", title: "Step 6.4: Verify Firewall Status & Rules", level: 3 },
    { id: "module-7-install-coolify", title: "Module 7: Install Coolify Engine", level: 2 },
    { id: "step-7-1-run-coolify-installer", title: "Step 7.1: Execute Official Coolify Installation Script", level: 3 },
    { id: "step-7-2-verify-docker-containers", title: "Step 7.2: Verify Coolify Docker Containers", level: 3 },
    { id: "step-7-3-initial-admin-onboarding", title: "Step 7.3: Complete Initial Web Administrator Setup", level: 3 },
    { id: "module-8-domain-and-https", title: "Module 8: Cloudflare DNS & Traefik HTTPS", level: 2 },
    { id: "step-8-1-configure-cloudflare-dns", title: "Step 8.1: Create Cloudflare DNS Records", level: 3 },
    { id: "step-8-2-configure-coolify-domain", title: "Step 8.2: Bind Custom Domain to Coolify Dashboard", level: 3 },
    { id: "module-9-deploy-nextjs-app", title: "Module 9: Deploying Your First Next.js Application", level: 2 },
    { id: "step-9-1-connect-git-repository", title: "Step 9.1: Connect Git Repository", level: 3 },
    { id: "step-9-2-build-and-env-config", title: "Step 9.2: Configure Build Method & Environment", level: 3 },
    { id: "step-9-3-trigger-deployment", title: "Step 9.3: Deploy and Inspect Build Logs", level: 3 },
    { id: "module-10-postgresql-and-r2-backups", title: "Module 10: Private PostgreSQL & Cloudflare R2 Backups", level: 2 },
    { id: "step-10-1-provision-postgres", title: "Step 10.1: Provision an Isolated PostgreSQL Instance", level: 3 },
    { id: "step-10-2-connect-app-to-db", title: "Step 10.2: Connect Next.js App to Internal Database", level: 3 },
    { id: "step-10-3-configure-r2-backups", title: "Step 10.3: Setup Cloudflare R2 Automated Backups", level: 3 },
    { id: "step-10-4-verify-backup-execution", title: "Step 10.4: Execute Manual Test Backup & Verify R2", level: 3 },
    { id: "module-11-final-verification", title: "Module 11: Production Verification & Next Steps", level: 2 },
  ],
};

const architectureDiagram = `graph TD
    User["Client Browser / User"] -->|HTTPS 443| Cloudflare["Cloudflare DNS & Edge"]
    Cloudflare -->|Filtered Web Traffic| ContaboFW["Contabo External Firewall"]
    ContaboFW -->|TCP 80, 443| UFW["Host Firewall (UFW)"]
    Admin["Developer Workstation"] -->|SSH 22 / Ed25519 Key| UFW
    
    subgraph VPS["Contabo Cloud VPS (Ubuntu 24.04 LTS)"]
        UFW --> Traefik["Traefik Reverse Proxy (:80, :443)"]
        UFW --> SSHDaemon["OpenSSH Server (:22)"]
        
        subgraph CoolifyControl["Coolify Control Plane"]
            Traefik -->|coolify.example.com| CoolifyEngine["Coolify Web App (:8000)"]
            CoolifyEngine <--> CoolifyDB[("Coolify Metadata DB")]
            CoolifyEngine <--> CoolifyRedis[("Coolify Queue / Redis")]
        end
        
        subgraph ProductionNetwork["Isolated Docker Bridge Network (Internal Only)"]
            Traefik -->|app.example.com| NextApp["Next.js Application Container"]
            NextApp <-->|Internal postgres:5432| PostgresDB[("PostgreSQL 18 Database")]
        end
    end
    
    PostgresDB -.->|Scheduled Daily Dumps| R2Storage[("Cloudflare R2 Object Storage")]

    classDef primary fill:#0369a1,stroke:#38bdf8,stroke-width:2px,color:#ffffff;
    classDef security fill:#047857,stroke:#34d399,stroke-width:2px,color:#ffffff;
    classDef storage fill:#b45309,stroke:#fbbf24,stroke-width:2px,color:#ffffff;
    class User,Admin,Cloudflare primary;
    class ContaboFW,UFW,SSHDaemon security;
    class PostgresDB,R2Storage,CoolifyDB storage;
`;

export default function ContaboVpsCoolifyGuide() {
  return (
    <>
      <p id="introduction">
        Deploying modern web applications shouldn&apos;t require locking your projects into expensive managed PaaS platforms like Vercel, Heroku, or Render. With a high-performance, cost-effective Virtual Private Server (VPS) from <strong>Contabo</strong> and the open-source self-hosted platform <strong>Coolify</strong>, you can own your infrastructure, run unlimited Docker containers, automate SSL certificates, and manage PostgreSQL databases for a fraction of the cost.
      </p>

      <p>
        However, launching a raw Linux server can be intimidating for developers who haven&apos;t spent years configuring firewalls, user permissions, and container networking. One wrong command can lock you out of your server or accidentally expose your production database to the entire internet.
      </p>

      <Quote author="Production DevOps Axiom" source="Minimal Production Setup">
        A rock-solid production deployment does not require an overwhelming stack of twenty observability tools. It requires doing the foundational basics with flawless precision: strict key-based SSH, verified firewalls, private container networks, automated TLS, and battle-tested backups.
      </Quote>

      <Callout type="info" title="What This Guide Covers (And What It Intentionally Defers)">
        This guide is strictly engineered for <strong>clarity and essential production security</strong>. We will build a complete, resilient system from scratch. If you are looking for advanced disaster recovery drills, unattended OS upgrades, or systemd log rotation policies, consult our companion deep-dive:{" "}
        <Link
          href="/blog/contabo-vps-coolify-advanced-hardening-guide"
          className="font-semibold text-cyan-400 underline decoration-cyan-400/50 hover:text-cyan-300"
        >
          Production-Grade Contabo VPS with Coolify: Complete Security, Backup, Monitoring and Disaster Recovery Guide
        </Link>.
      </Callout>

      {/* ========================================================================= */}
      {/* MODULE 1 */}
      {/* ========================================================================= */}
      <h2 id="module-1-architecture">Module 1: Architecture & Requirements</h2>
      <p>
        Before running a single terminal command, it is essential to understand the mental model of how all the pieces in your production infrastructure interact.
      </p>

      <MermaidDiagram
        chart={architectureDiagram}
        caption="Figure 1: High-level network topology and boundary isolation for Contabo VPS with Coolify"
      />

      <h3>Understanding the Infrastructure Components</h3>
      <ul>
        <li>
          <strong>Virtual Private Server (VPS):</strong> An isolated virtual machine running dedicated compute, memory, and storage slices on physical enterprise host nodes.
        </li>
        <li>
          <strong>Contabo VPS:</strong> A European/US cloud hosting provider offering industry-leading price-to-performance ratios (e.g., 4 to 6 vCPU cores and 8 to 16 GB RAM for under $10/month), making it an ideal choice for running Dockerized workloads.
        </li>
        <li>
          <strong>Ubuntu 24.04 LTS (Noble Numbat):</strong> Canonical&apos;s Long Term Support Linux distribution, offering 5 years of security maintenance, Linux Kernel 6.8, updated <code>systemd</code>, and native compatibility with Docker Engine.
        </li>
        <li>
          <strong>Docker Engine:</strong> The lightweight container runtime that packages our applications, proxies, and databases into immutable, reproducible execution environments.
        </li>
        <li>
          <strong>Coolify (v4.x):</strong> An all-in-one, open-source PaaS (Platform as a Service) that runs on your server. It provides a visual dashboard, Git push-to-deploy workflows, environment variable vaults, Traefik reverse proxy orchestration, and automated database backups.
        </li>
        <li>
          <strong>Cloudflare DNS:</strong> Fast, globally distributed authoritative nameservers providing rapid DNS record propagation, DDoS protection, and SSL/TLS termination options.
        </li>
        <li>
          <strong>Cloudflare R2:</strong> S3-compatible, geo-distributed object storage with <em>zero egress fees</em>, serving as our offsite destination for daily automated PostgreSQL dumps.
        </li>
      </ul>

      {/* ========================================================================= */}
      {/* MODULE 2 */}
      {/* ========================================================================= */}
      <h2 id="module-2-initial-vps-setup">Module 2: Purchase & Initial VPS Access</h2>
      <p>
        To get started, navigate to Contabo&apos;s portal and select an instance.
      </p>

      <Callout type="tip" title="Recommended Contabo Plan for Production">
        For running Coolify alongside a Next.js frontend, an API service, and PostgreSQL, select at least the <strong>Cloud VPS S</strong> (4 vCPU Cores, 8 GB RAM, 50 GB NVMe or 200 GB SSD) or <strong>Cloud VPS M</strong>. Ensure you select <strong>Ubuntu 24.04</strong> as your operating system image during checkout.
      </Callout>

      <h3 id="step-2-1-identify-server-ip">Step 2.1: Identify Your Server Public IP</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Prerequisite</span>
      </div>
      <p>
        Once Contabo provisions your VPS, they will send a &ldquo;Your login data!&rdquo; confirmation email. You can also view your server details in the Contabo Customer Control Panel (CCP) under <strong>VPS Control</strong>. Note your server&apos;s public IPv4 address (e.g., <code>203.0.113.10</code>).
      </p>

      <h3 id="step-2-2-first-ssh-login">Step 2.2: First SSH Connection as Root</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Initial Access</span>
      </div>

      <p>
        Open your local terminal (macOS Terminal, Linux Bash/Zsh, or Windows Terminal using PowerShell) to initiate your first connection using the root password provided by Contabo.
      </p>

      <p><strong>Purpose:</strong> Establish an encrypted remote shell session to the newly deployed server.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="local-terminal"
        code={`ssh root@203.0.113.10`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`The authenticity of host '203.0.113.10 (203.0.113.10)' can't be established.
ED25519 key fingerprint is SHA256:7W1sN0...
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '203.0.113.10' (ED25519) to the list of known hosts.
root@203.0.113.10's password: 
Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-31-generic x86_64)
root@vmi203011310:~#`}
      />

      <p><strong>Explanation:</strong> Type <code>yes</code> when prompted to save the server&apos;s host key into your local <code>~/.ssh/known_hosts</code> file. Then, paste your temporary Contabo root password (keystrokes will remain invisible for security).</p>

      <p><strong>If something goes wrong:</strong> If the connection times out (<code>Connection timed out</code>), verify in Contabo CCP that your VPS status is &ldquo;Running&rdquo;. If authentication fails repeatedly, reset the root password via Contabo&apos;s VPS Control Panel and allow 2 minutes for the hypervisor to apply changes.</p>

      {/* ========================================================================= */}
      {/* MODULE 3 */}
      {/* ========================================================================= */}
      <h2 id="module-3-dedicated-deploy-user">Module 3: Create a Dedicated Deploy User</h2>
      <p>
        Logging into a production server as <code>root</code> for daily maintenance is dangerous. Any accidental command (such as an incorrect <code>rm -rf</code> or unescaped environment variable) executes with unrestricted kernel-level authority. Instead, we create a dedicated non-root user (e.g., <code>deploy</code>) with <code>sudo</code> privileges.
      </p>

      <h3 id="step-3-1-create-deploy-user">Step 3.1: Create the User Account</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Account Provisioning</span>
      </div>

      <p><strong>Purpose:</strong> Create an unprivileged user named <code>deploy</code> with its own home directory and shell.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-root"
        code={`adduser deploy`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`Adding user \`deploy' ...
Adding new group \`deploy' (1000) ...
Adding new user \`deploy' (1000) with group \`deploy' ...
Creating home directory \`/home/deploy' ...
Copying files from \`/etc/skel' ...
New password: 
Retype new password: 
passwd: password updated successfully
Changing the user information for deploy
Enter the new value, or press ENTER for the default
	Full Name []: Deploy User
	Room Number []: 
	Work Phone []: 
	Home Phone []: 
	Other []: 
Is the information correct? [Y/n] Y`}
      />

      <p><strong>Explanation:</strong> Enter a strong temporary password. You can press Enter to accept the defaults for the user information fields.</p>

      <p><strong>If something goes wrong:</strong> If you receive <code>adduser: The user &apos;deploy&apos; already exists</code>, verify if the user exists with <code>id deploy</code> or choose another username such as <code>deployer</code>.</p>

      <h3 id="step-3-2-grant-sudo-privileges">Step 3.2: Grant Sudo Administrative Privileges</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Privilege Elevation</span>
      </div>

      <p><strong>Purpose:</strong> Append the user to the system <code>sudo</code> group so they can execute administrative tasks when necessary.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-root"
        code={`usermod -aG sudo deploy`}
      />

      <p><strong>Expected output:</strong> Command terminates silently with exit code <code>0</code> (standard Linux Unix philosophy: no news is good news).</p>

      <p><strong>Explanation:</strong> The <code>-aG</code> flag appends the specified group (<code>sudo</code>) to the user&apos;s supplementary groups without removing existing group memberships.</p>

      <p><strong>If something goes wrong:</strong> If you see <code>usermod: group &apos;sudo&apos; does not exist</code>, you are not running Ubuntu. In Debian or other distributions, verify available groups in <code>/etc/group</code>.</p>

      <h3 id="step-3-3-verify-user-groups">Step 3.3: Verify User Groups</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Verification</span>
      </div>

      <p><strong>Purpose:</strong> Confirm that the <code>deploy</code> account belongs to both its primary group and the <code>sudo</code> group.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-root"
        code={`id deploy`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`uid=1000(deploy) gid=1000(deploy) groups=1000(deploy),27(sudo)`}
      />

      <p><strong>Explanation:</strong> The output confirms group <code>27(sudo)</code> is attached to user <code>deploy</code>.</p>

      <p><strong>If something goes wrong:</strong> If <code>sudo</code> is missing from the <code>groups=</code> list, re-run <code>usermod -aG sudo deploy</code>.</p>

      <h3 id="step-3-4-switch-to-deploy-user">Step 3.4: Switch to the Deploy User</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Context Switch</span>
      </div>

      <p><strong>Purpose:</strong> Transition your current shell environment into the <code>deploy</code> user context.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-root"
        code={`su - deploy`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`deploy@vmi203011310:~$`}
      />

      <p><strong>Explanation:</strong> The <code>-</code> (login shell flag) initializes environment variables, working directories, and shell profiles as if the user logged in directly.</p>

      <p><strong>If something goes wrong:</strong> If you receive <code>No directory, logging in with HOME=/</code>, ensure the user directory <code>/home/deploy</code> was created properly with permissions <code>755</code>.</p>

      <h3 id="step-3-5-test-sudo-access">Step 3.5: Test Sudo Access</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Privilege Verification</span>
      </div>

      <p><strong>Purpose:</strong> Ensure the user can execute commands as root using <code>sudo</code>.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo whoami`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`[sudo] password for deploy: 
root`}
      />

      <p><strong>Explanation:</strong> Sudo will prompt for the <code>deploy</code> user&apos;s password. Once entered, <code>whoami</code> executes under the root UID and returns <code>root</code>.</p>

      <p><strong>If something goes wrong:</strong> If you see <code>deploy is not in the sudoers file. This incident will be reported</code>, switch back to root by typing <code>exit</code> and re-run Step 3.2.</p>

      {/* ========================================================================= */}
      {/* MODULE 4 */}
      {/* ========================================================================= */}
      <h2 id="module-4-ssh-key-auth">Module 4: Configure SSH Key Authentication</h2>
      <p>
        Password-based SSH authentication is inherently vulnerable to automated brute-force bots that probe public IPs across port 22 around the clock. <strong>Public key authentication</strong> uses asymmetric cryptography:
      </p>
      <ul>
        <li>
          <strong>Private Key (<code>id_ed25519</code>):</strong> Stored exclusively on your local computer. It is cryptographically protected and must <em>never</em> be shared or committed to Git.
        </li>
        <li>
          <strong>Public Key (<code>id_ed25519.pub</code>):</strong> Placed on the VPS in <code>~/.ssh/authorized_keys</code>. It acts as an open padlock that only your private key can unlock.
        </li>
      </ul>

      <h3 id="step-4-1-generate-local-key">Step 4.1: Generate an Ed25519 Key on Your Local PC</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Local Cryptography</span>
      </div>

      <p>
        In a <strong>NEW terminal window on your local machine</strong> (not on the VPS), generate a modern, compact Ed25519 elliptic curve keypair.
      </p>

      <p><strong>Purpose:</strong> Create a state-of-the-art Ed25519 SSH keypair on your local operating system.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="local-terminal"
        code={`ssh-keygen -t ed25519 -C "deploy@portfolio-vps"`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/id_ed25519
Your public key has been saved in /home/user/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:mC9kP... deploy@portfolio-vps`}
      />

      <p><strong>Explanation:</strong> Press Enter to accept the default file location. Enter a passphrase for extra protection so your private key cannot be used even if your local laptop is compromised.</p>

      <p><strong>If something goes wrong:</strong> If <code>id_ed25519</code> already exists and you don&apos;t want to overwrite it, provide a distinct path such as <code>~/.ssh/contabo_deploy</code>.</p>

      <h3 id="step-4-2-install-public-key">Step 4.2: Copy the Public Key to the VPS</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Public Key Provisioning</span>
      </div>

      <p>
        Copy the generated public key to the remote <code>deploy</code> user account.
      </p>

      <p><strong>Purpose:</strong> Authorize your local machine&apos;s public key on the remote server.</p>

      <p><strong>Command (Linux & macOS):</strong></p>
      <CodeBlock
        language="bash"
        filename="local-terminal"
        code={`ssh-copy-id -i ~/.ssh/id_ed25519.pub deploy@203.0.113.10`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/user/.ssh/id_ed25519.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
deploy@203.0.113.10's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'deploy@203.0.113.10'"
and check to make sure that only the key(s) you wanted were added.`}
      />

      <Callout type="tip" title="Windows PowerShell Alternative (Manual Setup)">
        If you are on Windows PowerShell and <code>ssh-copy-id</code> is unavailable, run this on your local machine:
        <CodeBlock
          language="bash"
          filename="powershell"
          code={`type $env:USERPROFILE\\.ssh\\id_ed25519.pub | ssh deploy@203.0.113.10 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"`}
        />
      </Callout>

      <h3 id="step-4-3-test-key-login">Step 4.3: Test Key-Based Login in a New Terminal</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Connection Verification</span>
      </div>

      <p><strong>Purpose:</strong> Verify that SSH key authentication functions seamlessly without prompting for a Linux user password.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="local-terminal"
        code={`ssh -i ~/.ssh/id_ed25519 deploy@203.0.113.10`}
      />

      <p><strong>Expected output:</strong> Instant login directly to <code>deploy@vmi203011310:~$</code> (prompts only for your local key passphrase if you set one).</p>

      <p><strong>If something goes wrong:</strong> If it still asks for the <code>deploy</code> account password, check permissions on the server: <code>ls -ld ~/.ssh</code> must be <code>drwx------</code> (700) and <code>ls -l ~/.ssh/authorized_keys</code> must be <code>-rw-------</code> (600).</p>

      {/* ========================================================================= */}
      {/* MODULE 5 */}
      {/* ========================================================================= */}
      <h2 id="module-5-essential-ssh-security">Module 5: Essential SSH Security Hardening</h2>
      <p>
        Now that key-based authentication is verified, we must lock down the OpenSSH daemon to stop password brute-force attacks.
      </p>

      <Callout type="danger" title="CRITICAL SAFETY RULE: Never Close Your Active Session">
        When modifying SSH daemon configurations, <strong>always leave your current terminal session open</strong>. Open a separate terminal window to test changes. If you make a configuration syntax mistake, your active session remains connected to fix it.
      </Callout>

      <Callout type="warning" title="Coolify Server Connection & Root Login Policy">
        A common DevOps mistake is blindly setting <code>PermitRootLogin no</code>. When Coolify manages a server, its internal orchestration container may connect over SSH using an SSH key pair.
        <br /><br />
        Therefore, we configure <code>PermitRootLogin prohibit-password</code> (also known as <code>without-password</code>). This disables password-based brute force attacks for root while still allowing authorized SSH key access required by container platforms.
      </Callout>

      <h3 id="step-5-1-configure-sshd">Step 5.1: Create Drop-In SSH Configuration</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="SECURITY HARDENING" />
        <span className="text-sm font-medium text-slate-300">Daemon Configuration</span>
      </div>

      <p>
        Ubuntu 24.04 LTS uses the drop-in directory <code>/etc/ssh/sshd_config.d/</code>. Files inside this directory take precedence over the base configuration.
      </p>

      <p><strong>Purpose:</strong> Enforce key-only authentication and prohibit root password access.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo bash -c 'cat << "EOF" > /etc/ssh/sshd_config.d/99-security.conf
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
PermitRootLogin prohibit-password
EOF'`}
      />

      <p><strong>Expected output:</strong> Command terminates silently with exit code <code>0</code>.</p>

      <p><strong>Explanation:</strong> This writes four explicit directives to <code>/etc/ssh/sshd_config.d/99-security.conf</code>. <code>PasswordAuthentication no</code> and <code>KbdInteractiveAuthentication no</code> prevent brute force attacks.</p>

      <p><strong>If something goes wrong:</strong> If write permission is denied, ensure you executed the command using <code>sudo</code>.</p>

      <h3 id="step-5-2-validate-sshd-config">Step 5.2: Validate SSH Syntax Before Reloading</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Syntax Verification</span>
      </div>

      <p><strong>Purpose:</strong> Parse the SSH configuration files to detect syntax errors before restarting the daemon.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo sshd -t`}
      />

      <p><strong>Expected output:</strong> Command returns no output and exits with code <code>0</code>.</p>

      <p><strong>Explanation:</strong> <code>sshd -t</code> tests the configuration for validity. If there is a typo or unsupported directive, it will print an error message indicating the exact line number.</p>

      <p><strong>If something goes wrong:</strong> If an error is printed (e.g., <code>Bad configuration option</code>), delete the file with <code>sudo rm -f /etc/ssh/sshd_config.d/99-security.conf</code> and re-check your spelling.</p>

      <h3 id="step-5-3-reload-ssh-service">Step 5.3: Reload the SSH Service</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Service Reload</span>
      </div>

      <p><strong>Purpose:</strong> Apply the new configuration rules to the running OpenSSH service.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo systemctl reload ssh`}
      />

      <p><strong>Expected output:</strong> Command executes silently with exit code <code>0</code>.</p>

      <p><strong>Explanation:</strong> On Ubuntu 24.04 LTS, OpenSSH is managed via systemd. Reloading the service instructs the process to re-read configuration files without terminating existing active client sockets.</p>

      <p><strong>If something goes wrong:</strong> If <code>reload</code> fails, check the logs with <code>sudo journalctl -u ssh -n 20 --no-pager</code>.</p>

      <h3 id="step-5-4-verify-new-session">Step 5.4: Verify New Authenticated Session</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Lockout Prevention</span>
      </div>

      <p>
        In a <strong>third local terminal window</strong>, verify logging in using your SSH key:
      </p>

      <CodeBlock
        language="bash"
        filename="local-terminal"
        code={`ssh -i ~/.ssh/id_ed25519 deploy@203.0.113.10`}
      />

      <p>
        If connection succeeds, your SSH hardening is functioning correctly!
      </p>

      <Callout type="info" title="Safe Rollback via Contabo VNC Web Console">
        If you ever accidentally lock yourself out of SSH, log in to the Contabo Customer Control Panel, select your VPS, and click <strong>VNC</strong>. This launches an out-of-band HTML5 web console that bypasses SSH entirely, allowing you to log in with your root credentials and repair <code>/etc/ssh/sshd_config.d/</code>.
      </Callout>

      {/* ========================================================================= */}
      {/* MODULE 6 */}
      {/* ========================================================================= */}
      <h2 id="module-6-configure-firewall">Module 6: Host & Cloud Firewall Configuration</h2>
      <p>
        Security in depth requires filtering network traffic at two distinct layers:
      </p>
      <ol>
        <li>
          <strong>Contabo Cloud Firewall (Perimeter):</strong> Configured in the Contabo web portal. It filters packets at the data center switch before they ever reach your virtual network interface.
        </li>
        <li>
          <strong>Ubuntu UFW (Uncomplicated Firewall):</strong> Host-level packet filter on the Linux kernel using <code>nftables</code>/<code>iptables</code>.
        </li>
      </ol>

      <Callout type="danger" title="The Critical Docker & UFW Interaction">
        Docker by default manipulates Linux <code>iptables</code> directly. When you publish a port with Docker (e.g. <code>docker run -p 5432:5432 postgres</code>), Docker injects rules into the <code>PREROUTING</code> chain, <strong>bypassing standard UFW rules completely!</strong>
        <br /><br />
        This means an exposed Docker port will be open to the entire internet even if UFW appears active. This is why we configure Contabo&apos;s external firewall AND keep all databases on internal Docker networks without publishing host ports.
      </Callout>

      <h3 id="step-6-1-ufw-default-policies">Step 6.1: Set UFW Default Policies</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Firewall Baseline</span>
      </div>

      <p><strong>Purpose:</strong> Enforce a default-deny policy for all inbound packets while allowing outbound connections.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo ufw default deny incoming
sudo ufw default allow outgoing`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`Default incoming policy changed to 'deny'
(be sure to update your rules accordingly)
Default outgoing policy changed to 'allow'
(be sure to update your rules accordingly)`}
      />

      <p><strong>Explanation:</strong> This ensures every port is closed unless we explicitly open it.</p>

      <h3 id="step-6-2-ufw-allow-rules">Step 6.2: Allow Essential Ports (22, 80, 443)</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Port Allowlist</span>
      </div>

      <p>
        Open only the ports required for remote administration and web traffic:
      </p>
      <ul>
        <li><strong>TCP 22:</strong> SSH administration</li>
        <li><strong>TCP 80:</strong> HTTP (Let&apos;s Encrypt ACME challenges & redirect to HTTPS)</li>
        <li><strong>TCP 443:</strong> HTTPS (Encrypted web traffic)</li>
        <li><strong>UDP 443:</strong> HTTP/3 (QUIC modern protocol acceleration)</li>
      </ul>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo ufw allow 22/tcp comment "OpenSSH"
sudo ufw allow 80/tcp comment "HTTP"
sudo ufw allow 443/tcp comment "HTTPS"
sudo ufw allow 443/udp comment "HTTP3-QUIC"`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`Rules updated
Rules updated (v6)
Rules updated
Rules updated (v6)
Rules updated
Rules updated (v6)
Rules updated
Rules updated (v6)`}
      />

      <p><strong>Explanation:</strong> UFW automatically generates both IPv4 and IPv6 rules for each port.</p>

      <h3 id="step-6-3-enable-ufw">Step 6.3: Enable the UFW Firewall</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Firewall Activation</span>
      </div>

      <p><strong>Purpose:</strong> Turn on firewall packet filtering.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo ufw --force enable`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`Firewall is active and enabled on system startup`}
      />

      <p><strong>Explanation:</strong> The <code>--force</code> flag suppresses the interactive prompt warning about disrupting existing SSH connections since we already allowed port 22.</p>

      <h3 id="step-6-4-verify-firewall">Step 6.4: Verify Firewall Status & Rules</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Firewall Verification</span>
      </div>

      <p><strong>Purpose:</strong> Inspect active firewall rules and confirm only designated ports are open.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo ufw status verbose`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`Status: active
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
443/udp (v6)               ALLOW IN    Anywhere (v6)              # HTTP3-QUIC`}
      />

      <p><strong>Explanation:</strong> Confirm status is <code>active</code> and no database ports (like <code>5432</code> or <code>6379</code>) appear on this list.</p>

      {/* ========================================================================= */}
      {/* MODULE 7 */}
      {/* ========================================================================= */}
      <h2 id="module-7-install-coolify">Module 7: Install Coolify Engine</h2>
      <p>
        Coolify provides an automated installation script that checks prerequisites, installs official Docker CE packages if absent, generates instance encryption keys, and launches the core orchestration containers.
      </p>

      <h3 id="step-7-1-run-coolify-installer">Step 7.1: Execute Official Coolify Installation Script</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">PaaS Installation</span>
      </div>

      <p><strong>Purpose:</strong> Download and execute the official Coolify v4 installer.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`---------------------------------------------
Welcome to Coolify installer!
---------------------------------------------
OS: ubuntu 24.04
Installing required packages: curl wget git jq ...
Docker is not installed. Installing Docker CE ...
Docker installed successfully!
Downloading Coolify configuration files to /data/coolify ...
Pulling required Docker images (coolify, postgresql, redis, traefik) ...
Starting Coolify containers ...
Coolify is installed and running!
Access Coolify at: http://203.0.113.10:8000`}
      />

      <p><strong>Explanation:</strong> The installer sets up persistent state in <code>/data/coolify</code>, including application settings, Docker compose manifests, and encryption secrets.</p>

      <p><strong>If something goes wrong:</strong> If the installer hangs during Docker installation, verify your VPS has at least 2 GB of free RAM (run <code>free -m</code>) and adequate disk space (run <code>df -h</code>).</p>

      <h3 id="step-7-2-verify-docker-containers">Step 7.2: Verify Coolify Docker Containers</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Runtime Verification</span>
      </div>

      <p><strong>Purpose:</strong> Verify all underlying Coolify infrastructure containers are healthy and running.</p>

      <p><strong>Command:</strong></p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"`}
      />

      <p><strong>Expected output:</strong></p>
      <CodeBlock
        language="text"
        filename="terminal-output"
        code={`NAMES               STATUS                    PORTS
coolify             Up 2 minutes (healthy)    0.0.0.0:8000->80/tcp
coolify-proxy       Up 2 minutes (healthy)    0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
coolify-db          Up 2 minutes (healthy)    5432/tcp
coolify-redis       Up 2 minutes (healthy)    6379/tcp
coolify-realtime    Up 2 minutes (healthy)    6001/tcp`}
      />

      <p><strong>Explanation:</strong> Notice that <code>coolify-db</code> and <code>coolify-redis</code> do not bind to <code>0.0.0.0</code> host ports. They exist solely inside Coolify&apos;s private Docker network.</p>

      <h3 id="step-7-3-initial-admin-onboarding">Step 7.3: Complete Initial Web Administrator Setup</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Web Dashboard Setup</span>
      </div>

      <p>
        Temporarily open port 8000 on UFW so you can register your initial admin account:
      </p>

      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo ufw allow 8000/tcp comment "Temp-Coolify-Setup"`}
      />

      <ol>
        <li>Open your browser and navigate to: <code>http://203.0.113.10:8000</code>.</li>
        <li>Enter your <strong>Name</strong>, <strong>Email</strong>, and a strong <strong>Password</strong>.</li>
        <li>Click <strong>Register</strong>. This first account becomes the Root Instance Administrator.</li>
        <li>Select <strong>Localhost (Docker)</strong> as your default deployment server. Coolify connects to the local Docker socket (<code>unix:///var/run/docker.sock</code>) automatically.</li>
      </ol>

      {/* ========================================================================= */}
      {/* MODULE 8 */}
      {/* ========================================================================= */}
      <h2 id="module-8-domain-and-https">Module 8: Cloudflare DNS & Traefik HTTPS</h2>
      <p>
        Accessing your dashboard and deployed apps via raw IP and port 8000 is neither professional nor secure. We will connect your custom domain using Cloudflare DNS and have Coolify&apos;s Traefik proxy issue automated Let&apos;s Encrypt TLS certificates.
      </p>

      <h3 id="step-8-1-configure-cloudflare-dns">Step 8.1: Create Cloudflare DNS Records</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">DNS Routing</span>
      </div>

      <p>
        Log in to your <strong>Cloudflare Dashboard</strong>, select your domain (e.g. <code>example.com</code>), and navigate to <strong>DNS &gt; Records</strong>:
      </p>

      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>IPv4 Address</th>
              <th>Proxy Status</th>
              <th>TTL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>A</code></td>
              <td><code>coolify</code></td>
              <td><code>203.0.113.10</code></td>
              <td><strong>DNS only (Grey Cloud)</strong></td>
              <td>Auto</td>
            </tr>
            <tr>
              <td><code>A</code></td>
              <td><code>app</code></td>
              <td><code>203.0.113.10</code></td>
              <td><strong>DNS only (Grey Cloud)</strong></td>
              <td>Auto</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="warning" title="Important Cloudflare Proxy Consideration">
        During initial setup, set the Cloudflare Proxy Status to <strong>DNS only (Grey Cloud)</strong>. This allows Traefik to directly answer Let&apos;s Encrypt ACME HTTP-01 challenges on port 80 without interference.
        <br /><br />
        If you prefer to enable Cloudflare&apos;s Orange Cloud proxy later, ensure your Cloudflare SSL/TLS encryption mode is set to <strong>Full (Strict)</strong> so Cloudflare validates Traefik&apos;s certificate.
      </Callout>

      <h3 id="step-8-2-configure-coolify-domain">Step 8.2: Bind Custom Domain to Coolify Dashboard</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">TLS Automation</span>
      </div>

      <ol>
        <li>In the Coolify dashboard, navigate to <strong>Settings &gt; Instance Domain</strong>.</li>
        <li>Set the domain to your fully qualified domain with HTTPS: <code>https://coolify.example.com</code>.</li>
        <li>Click <strong>Save</strong>. Coolify will notify Traefik, which immediately requests a Let&apos;s Encrypt SSL certificate over ports 80 and 443.</li>
        <li>Open <code>https://coolify.example.com</code> in your browser to verify the padlock icon and valid SSL certificate.</li>
      </ol>

      <p>Once verified, remove the temporary port 8000 rule from your firewall:</p>
      <CodeBlock
        language="bash"
        filename="remote-deploy"
        code={`sudo ufw delete allow 8000/tcp`}
      />

      {/* ========================================================================= */}
      {/* MODULE 9 */}
      {/* ========================================================================= */}
      <h2 id="module-9-deploy-nextjs-app">Module 9: Deploying Your First Next.js Application</h2>
      <p>
        Now we will deploy a real-world Next.js web application using Coolify&apos;s automated container build system.
      </p>

      <h3 id="step-9-1-connect-git-repository">Step 9.1: Connect Git Repository</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Source Control</span>
      </div>

      <ol>
        <li>In Coolify, navigate to <strong>Projects</strong> &gt; click <strong>+ Add Resource</strong> &gt; select <strong>Public Repository</strong> (or GitHub App for private repos).</li>
        <li>Enter your Git repository URL: <code>https://github.com/your-username/my-nextjs-app</code>.</li>
        <li>Select the production branch: <code>main</code>.</li>
      </ol>

      <h3 id="step-9-2-build-and-env-config">Step 9.2: Configure Build Method & Environment</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Build Configuration</span>
      </div>

      <p>Coolify offers two primary build methods:</p>
      <ul>
        <li>
          <strong>Nixpacks (Default):</strong> Automatically detects Next.js, installs Node.js dependencies, and builds the production standalone bundle without requiring a custom Dockerfile.
        </li>
        <li>
          <strong>Dockerfile:</strong> Uses your repository&apos;s <code>Dockerfile</code> for precise multi-stage build optimization.
        </li>
      </ul>

      <p>In the application configuration panel:</p>
      <ol>
        <li><strong>Domains:</strong> Enter <code>https://app.example.com</code>.</li>
        <li><strong>Port:</strong> Enter <code>3000</code>.</li>
        <li>
          <strong>Environment Variables:</strong> Add the following production variables:
          <CodeBlock
            language="bash"
            filename="coolify-env-vars"
            code={`NODE_ENV=production
PORT=3000`}
          />
        </li>
      </ol>

      <h3 id="step-9-3-trigger-deployment">Step 9.3: Deploy and Inspect Build Logs</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Deployment</span>
      </div>

      <p>
        Click <strong>Deploy</strong>. Coolify will clone the repository, run the build process inside an isolated container, configure Traefik with the new subdomain routing rules, and obtain a Let&apos;s Encrypt certificate.
      </p>

      <p>
        Inspect the live deployment logs in the dashboard. Once the status shows <strong>Running (Healthy)</strong>, visit <code>https://app.example.com</code> to verify your live Next.js application!
      </p>

      {/* ========================================================================= */}
      {/* MODULE 10 */}
      {/* ========================================================================= */}
      <h2 id="module-10-postgresql-and-r2-backups">Module 10: Private PostgreSQL & Cloudflare R2 Backups</h2>
      <p>
        Most web applications require a persistent relational database. Exposing PostgreSQL ports to the public internet is one of the most common causes of database ransom attacks. Here is how to keep PostgreSQL strictly private while automating offsite backups to Cloudflare R2.
      </p>

      <h3 id="step-10-1-provision-postgres">Step 10.1: Provision an Isolated PostgreSQL Instance</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Database Provisioning</span>
      </div>

      <ol>
        <li>In your Coolify Project, click <strong>+ Add Resource</strong> &gt; select <strong>PostgreSQL</strong>.</li>
        <li>Set the resource name to <code>production-postgres</code>.</li>
        <li>
          <strong>Make Public:</strong> Ensure this toggle is <strong>DISABLED</strong>. Do NOT assign a public host port.
        </li>
        <li>Coolify generates secure random values for <code>POSTGRES_USER</code>, <code>POSTGRES_PASSWORD</code>, and <code>POSTGRES_DB</code>.</li>
        <li>Click <strong>Start Database</strong>.</li>
      </ol>

      <h3 id="step-10-2-connect-app-to-db">Step 10.2: Connect Next.js App to Internal Database</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Internal Networking</span>
      </div>

      <p>
        Because both the Next.js app container and PostgreSQL container reside on Coolify&apos;s internal Docker bridge network, they communicate using Docker&apos;s internal DNS.
      </p>

      <p>
        Copy the <strong>Internal Database URL</strong> from the database settings page (e.g. <code>postgresql://postgres:randomSecretPassword@production-postgres:5432/postgres</code>).
      </p>

      <p>
        Navigate back to your Next.js application &gt; <strong>Environment Variables</strong> &gt; add:
      </p>

      <CodeBlock
        language="bash"
        filename="coolify-env-vars"
        code={`DATABASE_URL=postgresql://postgres:randomSecretPassword@production-postgres:5432/postgres`}
      />

      <p>Click <strong>Redeploy</strong> to apply the database connection string to your application.</p>

      <h3 id="step-10-3-configure-r2-backups">Step 10.3: Setup Cloudflare R2 Automated Backups</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="RECOMMENDED" />
        <span className="text-sm font-medium text-slate-300">Offsite Disaster Prevention</span>
      </div>

      <p>
        Backing up databases to the same VPS disk is dangerous; if the VPS disk corrupts or the provider experiences hardware loss, both your database and your backups disappear. We will stream backups directly to <strong>Cloudflare R2</strong>.
      </p>

      <h4>Part A: Create R2 Bucket in Cloudflare</h4>
      <ol>
        <li>In Cloudflare, go to <strong>R2 Object Storage</strong> &gt; click <strong>Create bucket</strong>.</li>
        <li>Name the bucket: <code>vps-production-backups</code>.</li>
        <li>Go to <strong>Manage R2 API Tokens</strong> &gt; click <strong>Create API Token</strong>.</li>
        <li>Permissions: <strong>Object Read &amp; Write</strong>.</li>
        <li>Save the <strong>Access Key ID</strong>, <strong>Secret Access Key</strong>, and the <strong>Endpoint URL</strong> (format: <code>https://&lt;ACCOUNT_ID&gt;.r2.cloudflarestorage.com</code>).</li>
      </ol>

      <h4>Part B: Add S3 Storage Provider in Coolify</h4>
      <ol>
        <li>In Coolify, navigate to <strong>Settings &gt; S3 Storages &gt; + Add</strong>.</li>
        <li><strong>Name:</strong> <code>Cloudflare-R2</code></li>
        <li><strong>Endpoint:</strong> <code>https://&lt;ACCOUNT_ID&gt;.r2.cloudflarestorage.com</code></li>
        <li><strong>Bucket Name:</strong> <code>vps-production-backups</code></li>
        <li><strong>Region:</strong> <code>auto</code> (or <code>us-east-1</code>)</li>
        <li><strong>Access Key &amp; Secret Key:</strong> Paste your R2 credentials.</li>
        <li>Click <strong>Save &amp; Test Connection</strong>.</li>
      </ol>

      <h4>Part C: Configure Backup Schedule</h4>
      <ol>
        <li>Open your <code>production-postgres</code> resource in Coolify &gt; click the <strong>Backups</strong> tab.</li>
        <li>Enable <strong>Automated Backups</strong>.</li>
        <li><strong>Frequency (Cron):</strong> <code>0 2 * * *</code> (Runs daily at 2:00 AM UTC).</li>
        <li><strong>Storage Destination:</strong> Select <code>Cloudflare-R2</code>.</li>
        <li><strong>Retention:</strong> Set to <code>7</code> (retains 7 daily rolling snapshots).</li>
        <li>Click <strong>Save</strong>.</li>
      </ol>

      <h3 id="step-10-4-verify-backup-execution">Step 10.4: Execute Manual Test Backup & Verify R2</h3>
      <div className="flex items-center gap-2 mb-2">
        <ConfigBadge level="MUST HAVE" />
        <span className="text-sm font-medium text-slate-300">Backup Verification</span>
      </div>

      <p>
        Click <strong>Backup Now</strong> in the Coolify Backups panel. Once the status shows completed, log in to your Cloudflare R2 dashboard and verify that a new compressed <code>.sql.gz</code> file has been uploaded.
      </p>

      <Quote author="System Administrator Principle" source="The Golden Rule of Backups">
        An untested backup is merely an unverified hypothesis. Never assume backups work until you have successfully executed a restore drill into a temporary database instance.
      </Quote>

      {/* ========================================================================= */}
      {/* MODULE 11 */}
      {/* ========================================================================= */}
      <h2 id="module-11-final-verification">Module 11: Production Verification & Next Steps</h2>
      <p>
        Congratulations! You have transformed a blank Contabo VPS into a secure, production-ready application deployment platform. Before celebrating, run through this final production checklist:
      </p>

      <div className="overflow-x-auto my-6">
        <table>
          <thead>
            <tr>
              <th>Verification Area</th>
              <th>Test Method</th>
              <th>Target Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>SSH Key Authentication</strong></td>
              <td><code>ssh -i ~/.ssh/id_ed25519 deploy@&lt;IP&gt;</code></td>
              <td>Passphrase/key login succeeds without server password prompt</td>
            </tr>
            <tr>
              <td><strong>SSH Password Attack Surface</strong></td>
              <td><code>ssh -o PubkeyAuthentication=no deploy@&lt;IP&gt;</code></td>
              <td><code>Permission denied (publickey)</code></td>
            </tr>
            <tr>
              <td><strong>Host Firewall (UFW)</strong></td>
              <td><code>sudo ufw status verbose</code></td>
              <td>Only ports 22, 80, 443 are allowed</td>
            </tr>
            <tr>
              <td><strong>Database Exposure</strong></td>
              <td>Check UFW status &amp; <code>docker ps</code></td>
              <td>PostgreSQL is internal only; port 5432 is not bound to <code>0.0.0.0</code></td>
            </tr>
            <tr>
              <td><strong>Dashboard Security</strong></td>
              <td>Visit <code>https://coolify.example.com</code></td>
              <td>Padlock icon present, valid Let&apos;s Encrypt certificate</td>
            </tr>
            <tr>
              <td><strong>Live Web Application</strong></td>
              <td>Visit <code>https://app.example.com</code></td>
              <td>Next.js app responds with HTTP 200 and loads successfully</td>
            </tr>
            <tr>
              <td><strong>Offsite Cloud Backups</strong></td>
              <td>Cloudflare R2 Bucket Viewer</td>
              <td>Fresh <code>.sql.gz</code> dump archive visible in R2 bucket</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>What We Accomplished vs. Advanced Hardening</h3>
      <p>
        This minimal setup provides a strong production baseline: your server is immune to SSH password dictionary attacks, open ports are minimized, web traffic is encrypted with automated TLS, and your database dumps are safely stored offsite.
      </p>

      <p>
        However, for enterprise mission-critical workloads, you should also implement:
      </p>
      <ul>
        <li>Automated OS security patching via <code>unattended-upgrades</code></li>
        <li>Docker daemon log rotation to prevent disk exhaustion</li>
        <li>Formal disaster recovery testing (restoring R2 dumps into temporary test databases)</li>
        <li>Container healthchecks and automated zero-downtime rollbacks</li>
      </ul>

      <Callout type="tip" title="Ready for Complete Security Hardening & Disaster Recovery?">
        Continue your infrastructure mastery with our comprehensive guide:{" "}
        <Link
          href="/blog/contabo-vps-coolify-advanced-hardening-guide"
          className="font-bold text-cyan-400 underline decoration-cyan-400/50 hover:text-cyan-300"
        >
          Production-Grade Contabo VPS with Coolify: Complete Security, Backup, Monitoring and Disaster Recovery Guide &rarr;
        </Link>
      </Callout>
    </>
  );
}

