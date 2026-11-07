import React from "react";
import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog/types";
import CodeBlock from "@/components/blog/CodeBlock";
import Callout from "@/components/blog/Callout";

type TargetEnv = "LOCAL TERMINAL" | "VPS ROOT" | "VPS DEPLOY" | "CLOUDFLARE" | "COOLIFY UI";

function TargetEnvBadge({ env }: { env: TargetEnv }) {
  const styles: Record<TargetEnv, string> = {
    "LOCAL TERMINAL": "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    "VPS ROOT": "border-rose-500/30 bg-rose-500/10 text-rose-400",
    "VPS DEPLOY": "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    "CLOUDFLARE": "border-orange-500/30 bg-orange-500/10 text-orange-400",
    "COOLIFY UI": "border-purple-500/30 bg-purple-500/10 text-purple-400",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold font-mono uppercase tracking-wider ${styles[env]}`}
    >
      {env}
    </span>
  );
}

export const post: BlogPostMeta = {
  title: "Contabo VPS to Production with Coolify: The 15-Minute Fast-Track Runbook",
  slug: "contabo-vps-production-coolify-guide",
  description:
    "A clean, minimal, copy-paste execution runbook to take a fresh Contabo VPS running Ubuntu 24.04 LTS to a secured production PaaS with Coolify, Docker, Cloudflare DNS, Cloudflare R2 automated backups, and private PostgreSQL.",
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
    "Cloudflare",
    "Fast-Track",
  ],
  readingTime: "12 min read",
  featured: true,
  featuredImage: "/blog/contabo-vps-production-coolify-thumbnail.jpg",
  featuredImageAlt: "Contabo VPS to Production with Coolify The 15-Minute Fast-Track Runbook Thumbnail",
  toc: [
    { id: "overview", title: "Overview & Mental Model", level: 2 },
    { id: "step-1-initial-access", title: "Step 1: First SSH Login & System Update", level: 2 },
    { id: "step-2-deploy-user", title: "Step 2: Create Dedicated Deploy User", level: 2 },
    { id: "step-3-ssh-keys", title: "Step 3: Generate & Install Ed25519 SSH Key", level: 2 },
    { id: "step-4-ssh-hardening", title: "Step 4: Lock Down SSH (Key-Only)", level: 2 },
    { id: "step-5-firewall", title: "Step 5: Configure UFW Firewall", level: 2 },
    { id: "step-6-install-coolify", title: "Step 6: Install Coolify Engine", level: 2 },
    { id: "step-7-dns-traefik", title: "Step 7: Cloudflare DNS & Traefik HTTPS", level: 2 },
    { id: "step-8-postgresql", title: "Step 8: Deploy Private PostgreSQL 18", level: 2 },
    { id: "step-9-r2-backups", title: "Step 9: Configure Cloudflare R2 Automated Backups", level: 2 },
    { id: "step-10-deploy-app", title: "Step 10: Deploy Next.js Production Web App", level: 2 },
    { id: "step-11-production-checklist", title: "Step 11: 60-Second Production Checklist", level: 2 },
  ],
};

export default function ContaboVpsProductionCoolifyGuide() {
  return (
    <>
      <p id="overview">
        This is an actionable, zero-fluff copy-paste runbook for developers who want to take a fresh <strong>Contabo VPS (Ubuntu 24.04 LTS)</strong> directly to a secured production environment running <strong>Coolify</strong>, <strong>Docker</strong>, <strong>Cloudflare DNS</strong>, <strong>PostgreSQL</strong>, and <strong>Cloudflare R2</strong> offsite backups.
      </p>

      <Callout type="info" title="Need Deep Architectural Explanations?">
        This guide contains only the essential commands and expected outputs. If you need deep conceptual explanations, alternative paths (root vs deploy user, password vs key auth), automated security patches, or disaster recovery restore drills, refer to our comprehensive companion guide:{" "}
        <Link
          href="/blog/contabo-vps-coolify-production-guide"
          className="font-bold text-cyan-400 underline decoration-cyan-400/50 hover:text-cyan-300"
        >
          Contabo VPS &amp; Coolify Production Master Guide (36 Modules) &rarr;
        </Link>
      </Callout>

      <div className="overflow-x-auto my-6">
        <table>
          <thead>
            <tr>
              <th>Placeholder</th>
              <th>Example Used Here</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;SERVER_IP&gt;</code></td>
              <td><code>101.0.101.10</code></td>
              <td>Your Contabo VPS public IPv4 address</td>
            </tr>
            <tr>
              <td><code>&lt;USERNAME&gt;</code></td>
              <td><code>deploy</code></td>
              <td>Dedicated non-root administrative sudo user</td>
            </tr>
            <tr>
              <td><code>&lt;DOMAIN&gt;</code></td>
              <td><code>example.com</code></td>
              <td>Your registered domain managed by Cloudflare</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1 */}
      {/* ========================================================================= */}
      <h2 id="step-1-initial-access">Step 1: First SSH Login &amp; System Update</h2>
      <div className="flex items-center gap-2 mb-3">
        <TargetEnvBadge env="LOCAL TERMINAL" />
        <span className="text-xs text-slate-400">Run on your local terminal (Linux Mint / macOS / WSL)</span>
      </div>

      <p>Log into your newly provisioned VPS using the initial root credentials from your Contabo email:</p>

      <CodeBlock language="bash" title="Local Terminal">
        {`ssh root@101.0.101.10`}
      </CodeBlock>

      <div className="flex items-center gap-2 mb-3 mt-4">
        <TargetEnvBadge env="VPS ROOT" />
        <span className="text-xs text-slate-400">Run inside the VPS root session</span>
      </div>

      <p>Update packages, install security patches, set your timezone to UTC, and enable NTP clock sync:</p>

      <CodeBlock language="bash" title="VPS (as root)">
        {`apt update && apt -y upgrade
timedatectl set-timezone UTC
timedatectl set-ntp true`}
      </CodeBlock>

      <p><strong>Expected Output:</strong></p>
      <CodeBlock language="text" title="Expected Output">
        {`Reading package lists... Done
Building dependency tree... Done
Calculating upgrade... Done
...
All packages are up to date.`}
      </CodeBlock>

      {/* ========================================================================= */}
      {/* STEP 2 */}
      {/* ========================================================================= */}
      <h2 id="step-2-deploy-user">Step 2: Create Dedicated Deploy User</h2>
      <div className="flex items-center gap-2 mb-3">
        <TargetEnvBadge env="VPS ROOT" />
        <span className="text-xs text-slate-400">Run inside the VPS root session</span>
      </div>

      <p>Create a dedicated unprivileged user <code>deploy</code> with standard bash shell and grant sudo privileges:</p>

      <CodeBlock language="bash" title="VPS (as root)">
        {`adduser --gecos "" deploy
usermod -aG sudo deploy`}
      </CodeBlock>

      <p>Test switching to the new user and executing sudo:</p>

      <CodeBlock language="bash" title="VPS (as root)">
        {`su - deploy
sudo whoami`}
      </CodeBlock>

      <p><strong>Expected Output:</strong></p>
      <CodeBlock language="text" title="Expected Output">
        {`[sudo] password for deploy:
root`}
      </CodeBlock>

      {/* ========================================================================= */}
      {/* STEP 3 */}
      {/* ========================================================================= */}
      <h2 id="step-3-ssh-keys">Step 3: Generate &amp; Install Ed25519 SSH Key</h2>
      <div className="flex items-center gap-2 mb-3">
        <TargetEnvBadge env="LOCAL TERMINAL" />
        <span className="text-xs text-slate-400">Open a second local terminal</span>
      </div>

      <p>Generate a high-security Ed25519 SSH keypair on your local machine (press Enter to accept default path):</p>

      <CodeBlock language="bash" title="Local Terminal">
        {`ssh-keygen -t ed25519 -C "deploy@contabo-prod"`}
      </CodeBlock>

      <p>Copy the public key to your VPS <code>deploy</code> user account:</p>

      <CodeBlock language="bash" title="Local Terminal">
        {`ssh-copy-id -i ~/.ssh/id_ed25519.pub deploy@101.0.101.10`}
      </CodeBlock>

      <p><strong>Expected Output:</strong></p>
      <CodeBlock language="text" title="Expected Output">
        {`/usr/bin/ssh-copy-id: INFO: 1 key(s) added.
Now try logging into the machine, with:   "ssh 'deploy@101.0.101.10'"`}
      </CodeBlock>

      <p>Verify key authentication in a new terminal window before closing your root session:</p>

      <CodeBlock language="bash" title="Local Terminal">
        {`ssh -i ~/.ssh/id_ed25519 deploy@101.0.101.10`}
      </CodeBlock>

      {/* ========================================================================= */}
      {/* STEP 4 */}
      {/* ========================================================================= */}
      <h2 id="step-4-ssh-hardening">Step 4: Lock Down SSH (Key-Only Authentication)</h2>
      <div className="flex items-center gap-2 mb-3">
        <TargetEnvBadge env="VPS DEPLOY" />
        <span className="text-xs text-slate-400">Run as deploy user with sudo</span>
      </div>

      <p>
        Create an isolated drop-in configuration file to disable password authentication and block direct root login:
      </p>

      <CodeBlock language="bash" title="VPS (deploy user)">
        {`sudo bash -c 'cat << "EOF" > /etc/ssh/sshd_config.d/99-hardening.conf
PasswordAuthentication no
PermitRootLogin prohibit-password
PubkeyAuthentication yes
AuthenticationMethods publickey
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
EOF'`}
      </CodeBlock>

      <p>Test configuration syntax, and restart SSH (Ubuntu 24.04 uses socket activation):</p>

      <CodeBlock language="bash" title="VPS (deploy user)">
        {`sudo sshd -t
sudo systemctl restart ssh.socket ssh.service`}
      </CodeBlock>

      <p>Test that password login is now rejected from your local machine:</p>

      <CodeBlock language="bash" title="Local Terminal">
        {`ssh -o PubkeyAuthentication=no deploy@101.0.101.10`}
      </CodeBlock>

      <p><strong>Expected Output:</strong></p>
      <CodeBlock language="text" title="Expected Output">
        deploy@101.0.101.10: Permission denied (publickey).
      </CodeBlock>

      {/* ========================================================================= */}
      {/* STEP 5 */}
      {/* ========================================================================= */}
      <h2 id="step-5-firewall">Step 5: Configure UFW Host Firewall</h2>
      <div className="flex items-center gap-2 mb-3">
        <TargetEnvBadge env="VPS DEPLOY" />
        <span className="text-xs text-slate-400">Run as deploy user with sudo</span>
      </div>

      <p>Set default policies (drop incoming, allow outgoing) and open only essential production ports:</p>

      <CodeBlock language="bash" title="VPS (deploy user)">
        {`sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment 'SSH Administrative'
sudo ufw allow 80/tcp comment 'HTTP Let\\'s Encrypt TLS'
sudo ufw allow 443/tcp comment 'HTTPS Traefik Ingress'
sudo ufw allow 443/udp comment 'HTTP3 QUIC'
sudo ufw --force enable`}
      </CodeBlock>

      <p>Check the active firewall table:</p>

      <CodeBlock language="bash" title="VPS (deploy user)">
        {`sudo ufw status verbose`}
      </CodeBlock>

      <p><strong>Expected Output:</strong></p>
      <CodeBlock language="text" title="Expected Output">
        {`Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW IN    Anywhere                   # SSH Administrative
80/tcp                     ALLOW IN    Anywhere                   # HTTP Let's Encrypt TLS
443/tcp                    ALLOW IN    Anywhere                   # HTTPS Traefik Ingress
443/udp                    ALLOW IN    Anywhere                   # HTTP3 QUIC`}
      </CodeBlock>

      {/* ========================================================================= */}
      {/* STEP 6 */}
      {/* ========================================================================= */}
      <h2 id="step-6-install-coolify">Step 6: Install Coolify Engine</h2>
      <div className="flex items-center gap-2 mb-3">
        <TargetEnvBadge env="VPS DEPLOY" />
        <span className="text-xs text-slate-400">Run as deploy user with sudo</span>
      </div>

      <p>Run the official automated installation script (installs Docker CE, Compose, and Coolify stack):</p>

      <CodeBlock language="bash" title="VPS (deploy user)">
        {`curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash`}
      </CodeBlock>

      <p>Verify all Coolify core containers are running healthy:</p>

      <CodeBlock language="bash" title="VPS (deploy user)">
        {`sudo docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"`}
      </CodeBlock>

      <p><strong>Expected Output:</strong></p>
      <CodeBlock language="text" title="Expected Output">
        {`NAMES                 STATUS                   PORTS
coolify               Up 2 minutes (healthy)   0.0.0.0:8000->80/tcp
coolify-proxy         Up 2 minutes (healthy)   0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
coolify-db            Up 2 minutes (healthy)   5432/tcp
coolify-redis         Up 2 minutes (healthy)   6379/tcp
coolify-realtime      Up 2 minutes (healthy)   6001/tcp
coolify-sentinel      Up 2 minutes (healthy)   8000/tcp`}
      </CodeBlock>

      <p>
        Temporarily open port 8000 in UFW to access initial browser onboarding:
      </p>

      <CodeBlock language="bash" title="VPS (deploy user)">
        {`sudo ufw allow 8000/tcp comment 'Coolify Setup Onboarding'`}
      </CodeBlock>

      <p>
        Visit <code>http://101.0.101.10:8000</code> in your browser, register your master administrator account, and select <strong>Localhost</strong> as your deployment server.
      </p>

      {/* ========================================================================= */}
      {/* STEP 7 */}
      {/* ========================================================================= */}
      <h2 id="step-7-dns-traefik">Step 7: Cloudflare DNS &amp; Traefik HTTPS</h2>
      <div className="flex items-center gap-2 mb-3">
        <TargetEnvBadge env="CLOUDFLARE" />
        <span className="text-xs text-slate-400">DNS Management</span>
      </div>

      <p>Add two <strong>DNS Only (Gray Cloud)</strong> A records pointing to your VPS IP:</p>

      <div className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>IPv4 Target</th>
              <th>Proxy Status</th>
              <th>TTL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>A</code></td>
              <td><code>coolify</code></td>
              <td><code>101.0.101.10</code></td>
              <td>DNS only (Gray cloud)</td>
              <td>Auto</td>
            </tr>
            <tr>
              <td><code>A</code></td>
              <td><code>app</code></td>
              <td><code>101.0.101.10</code></td>
              <td>DNS only (Gray cloud)</td>
              <td>Auto</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 mb-3 mt-4">
        <TargetEnvBadge env="COOLIFY UI" />
        <span className="text-xs text-slate-400">Settings &gt; Instance</span>
      </div>

      <ol className="list-decimal list-inside space-y-1.5 text-slate-300 my-3 text-sm">
        <li>Navigate to <strong>Settings</strong> &gt; <strong>Instance Domain</strong> in the Coolify dashboard.</li>
        <li>Set the domain to <code>https://coolify.example.com</code>.</li>
        <li>Click <strong>Save</strong>. Traefik automatically provisions an SSL certificate via Let&apos;s Encrypt.</li>
      </ol>

      <div className="flex items-center gap-2 mb-3 mt-4">
        <TargetEnvBadge env="VPS DEPLOY" />
        <span className="text-xs text-slate-400">Close temporary setup port</span>
      </div>

      <p>Now that HTTPS via Traefik is working, close port 8000 to eliminate public exposure:</p>

      <CodeBlock language="bash" title="VPS (deploy user)">
        {`sudo ufw delete allow 8000/tcp
sudo ufw status`}
      </CodeBlock>

      {/* ========================================================================= */}
      {/* STEP 8 */}
      {/* ========================================================================= */}
      <h2 id="step-8-postgresql">Step 8: Deploy Private PostgreSQL 18</h2>
      <div className="flex items-center gap-2 mb-3">
        <TargetEnvBadge env="COOLIFY UI" />
        <span className="text-xs text-slate-400">Project &gt; + New Resource &gt; Database</span>
      </div>

      <ol className="list-decimal list-inside space-y-2 text-slate-300 my-3 text-sm">
        <li>Select <strong>PostgreSQL</strong> (Version 18).</li>
        <li>Set Database Name: <code>production_app</code>.</li>
        <li>Set User: <code>app_user</code>.</li>
        <li>
          Leave <strong>Public Port</strong> empty! (Keep unchecked to prevent public exposure).
        </li>
        <li>Click <strong>Deploy</strong>.</li>
      </ol>

      <p>
        Note your database internal connection URL provided by Coolify:
      </p>

      <CodeBlock language="text" title="Coolify Internal Connection URL">
        {`postgresql://app_user:GeneratedPassword@postgres-db-uuid:5432/production_app`}
      </CodeBlock>

      {/* ========================================================================= */}
      {/* STEP 9 */}
      {/* ========================================================================= */}
      <h2 id="step-9-r2-backups">Step 9: Configure Cloudflare R2 Automated Backups</h2>
      <div className="flex items-center gap-2 mb-3">
        <TargetEnvBadge env="CLOUDFLARE" />
        <span className="text-xs text-slate-400">R2 Object Storage</span>
      </div>

      <ol className="list-decimal list-inside space-y-1.5 text-slate-300 my-3 text-sm">
        <li>Go to <strong>R2</strong> &gt; <strong>Create Bucket</strong> &gt; Name: <code>vps-postgres-backups</code>.</li>
        <li>Click <strong>Manage R2 API Tokens</strong> &gt; <strong>Create API Token</strong> (Object Read &amp; Write).</li>
        <li>Copy your <strong>Access Key ID</strong>, <strong>Secret Access Key</strong>, and <strong>Endpoint URL</strong>.</li>
      </ol>

      <div className="flex items-center gap-2 mb-3 mt-4">
        <TargetEnvBadge env="COOLIFY UI" />
        <span className="text-xs text-slate-400">Database &gt; Backups Panel</span>
      </div>

      <ol className="list-decimal list-inside space-y-1.5 text-slate-300 my-3 text-sm">
        <li>Open your PostgreSQL database in Coolify and click <strong>Backups</strong>.</li>
        <li>Enable <strong>S3 Compatible Storage</strong>.</li>
        <li>Paste your R2 endpoint: <code>https://&lt;ACCOUNT_ID&gt;.r2.cloudflarestorage.com</code></li>
        <li>Bucket Name: <code>vps-postgres-backups</code>.</li>
        <li>Set Schedule Cron: <code>0 3 * * *</code> (Runs daily at 03:00 UTC).</li>
        <li>Click <strong>Save</strong>, then click <strong>Backup Now</strong> to execute a test backup.</li>
      </ol>

      <p>
        Check your Cloudflare R2 bucket: you will see a fresh <code>.sql.gz</code> compressed archive.
      </p>

      {/* ========================================================================= */}
      {/* STEP 10 */}
      {/* ========================================================================= */}
      <h2 id="step-10-deploy-app">Step 10: Deploy Next.js Production Web App</h2>
      <div className="flex items-center gap-2 mb-3">
        <TargetEnvBadge env="COOLIFY UI" />
        <span className="text-xs text-slate-400">Project &gt; + New Resource &gt; Application</span>
      </div>

      <ol className="list-decimal list-inside space-y-2 text-slate-300 my-3 text-sm">
        <li>Select <strong>Public / Private Git Repository</strong> (GitHub, GitLab, or Git URL).</li>
        <li>Select branch <code>main</code> and build pack <strong>Nixpacks</strong> (or Dockerfile).</li>
        <li>Set Domain: <code>https://app.example.com</code>.</li>
        <li>
          Under <strong>Environment Variables</strong>, paste your database connection:
          <div className="my-2">
            <CodeBlock language="text" title=".env">
              DATABASE_URL=postgresql://app_user:GeneratedPassword@postgres-db-uuid:5432/production_app
            </CodeBlock>
          </div>
        </li>
        <li>Click <strong>Deploy</strong>.</li>
      </ol>

      <p>Test your live production application from your local machine:</p>

      <CodeBlock language="bash" title="Local Terminal">
        {`curl -sI https://app.example.com | head -n 5`}
      </CodeBlock>

      <p><strong>Expected Output:</strong></p>
      <CodeBlock language="text" title="Expected Output">
        {`HTTP/2 200
content-type: text/html; charset=utf-8
server: traefik`}
      </CodeBlock>

      {/* ========================================================================= */}
      {/* STEP 11 */}
      {/* ========================================================================= */}
      <h2 id="step-11-production-checklist">Step 11: 60-Second Production Checklist</h2>
      <p>
        Run these audit commands to verify complete production security compliance:
      </p>

      <div className="overflow-x-auto my-6">
        <table>
          <thead>
            <tr>
              <th>Audit Target</th>
              <th>Command to Execute</th>
              <th>Expected Safe Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>SSH Password Auth</strong></td>
              <td><code>ssh -o PubkeyAuthentication=no deploy@101.0.101.10</code></td>
              <td><code>Permission denied (publickey)</code></td>
            </tr>
            <tr>
              <td><strong>Host Firewall</strong></td>
              <td><code>sudo ufw status</code></td>
              <td>Only 22, 80, 443 active (8000 closed)</td>
            </tr>
            <tr>
              <td><strong>Database Isolation</strong></td>
              <td><code>sudo ss -tulpn | grep 5432</code></td>
              <td>No listener bound to public <code>0.0.0.0:5432</code></td>
            </tr>
            <tr>
              <td><strong>HTTPS TLS Ingress</strong></td>
              <td><code>curl -sI https://coolify.example.com</code></td>
              <td>HTTP/2 200 OK via Traefik</td>
            </tr>
            <tr>
              <td><strong>Live Web Application</strong></td>
              <td><code>curl -sI https://app.example.com</code></td>
              <td>HTTP/2 200 OK</td>
            </tr>
            <tr>
              <td><strong>R2 Cold Backups</strong></td>
              <td>Cloudflare R2 Dashboard</td>
              <td>Valid <code>.sql.gz</code> file uploaded</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="Looking for Advanced Operations &amp; Disaster Recovery?">
        Your VPS is now live and secured. For advanced infrastructure tasks—including automated OS unattended-upgrades, Docker daemon socket protection, database restore drills into sandbox instances, Coolify state recovery, and multi-region disaster recovery—read our in-depth companion article:{" "}
        <Link
          href="/blog/contabo-vps-coolify-production-guide"
          className="font-bold text-cyan-400 underline decoration-cyan-400/50 hover:text-cyan-300"
        >
          Contabo VPS &amp; Coolify Production Master Guide (36 Modules) &rarr;
        </Link>
      </Callout>
    </>
  );
}
