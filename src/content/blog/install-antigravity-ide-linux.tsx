import React from "react";
import { BlogPostMeta } from "@/lib/blog/types";
import CodeBlock from "@/components/blog/CodeBlock";
import Callout from "@/components/blog/Callout";
import Quote from "@/components/blog/Quote";
import Link from "next/link";

export const post: BlogPostMeta = {
  title: "How to Install and Uninstall Antigravity IDE on Linux (.tar.gz Setup Guide)",
  slug: "install-antigravity-ide-linux",
  description:
    "A complete, step-by-step technical guide on extracting, installing, and configuring Antigravity IDE on Linux from a .tar.gz archive, creating desktop launchers, and performing a clean uninstall.",
  publishedAt: "2026-08-29",
  updatedAt: "2026-08-29",
  author: "Nazmus Sakib",
  authorRole: "Curious Technologist",
  category: "Linux",
  tags: ["Linux", "Antigravity", "IDE", "DevOps", "Guide", "Bash", "Setup"],
  featuredImage: "https://pub-f8f1a4ed23fa4b1db02e4a63a4383001.r2.dev/images/antigravity_linux_thumbnail_1787993420531.jpg",
  featuredImageAlt: "Installing Antigravity IDE on Linux Guide Thumbnail",
  readingTime: "6 min read",
  featured: true,
  toc: [
    { id: "introduction", title: "Introduction", level: 2 },
    { id: "downloading-the-ide", title: "Step 0: Downloading the Standalone IDE", level: 2 },
    { id: "part-1-step-by-step-installation", title: "Part 1: Step-by-Step Installation", level: 2 },
    { id: "part-2-troubleshooting-and-full-uninstall", title: "Part 2: Troubleshooting & Clean Uninstall", level: 2 },
    { id: "part-3-desktop-integration", title: "Part 3: Desktop Menu Integration", level: 2 },
    { id: "conclusion", title: "Conclusion & Pro Tips", level: 2 },
  ],
};

export default function PostContent() {
  return (
    <>
      <p id="introduction">
        Installing modern developer applications on Linux can sometimes feel confusing when distributed as a standalone{" "}
        <code>.tar.gz</code> archive rather than a system-managed <code>.deb</code>, <code>.rpm</code>, or <code>AppImage</code> package.
      </p>

      <p>
        In this comprehensive guide, we will walk through the exact terminal commands required to extract and install{" "}
        <strong>Antigravity IDE</strong> on Linux, integrate it into your system application menu, and safely troubleshoot or completely clean-uninstall it if needed.
      </p>

      <Quote author="Linux Application Standards" source="Freedesktop.org Specification">
        User-installed standalone applications belong in ~/Applications or /opt, with desktop entries stored in ~/.local/share/applications for seamless desktop launcher integration.
      </Quote>

      <h2 id="downloading-the-ide">Step 0: Downloading the Standalone IDE for Linux</h2>
      <p>
        Before starting the installation, navigate to the official{" "}
        <a href="https://antigravity.google/download" target="_blank" rel="noopener noreferrer">
          Antigravity Downloads Page
        </a>.
      </p>

      <Callout type="info" title="Selecting the Standalone Linux Package">
        Look for the <strong>Antigravity IDE (Standalone)</strong> section on the download page and choose the appropriate architecture for your system:
        <ul>
          <li><strong>Download for x64</strong> — For Intel and AMD 64-bit Linux machines.</li>
          <li><strong>Download for ARM64</strong> — For ARM 64-bit Linux machines.</li>
        </ul>
        Save the <code>.tar.gz</code> file in your default <code>~/Downloads</code> folder.
      </Callout>

      <h2 id="part-1-step-by-step-installation">Part 1: Step-by-Step Installation Guide</h2>

      <p>
        Once the <code>Antigravity IDE.tar.gz</code> file is saved in your <code>~/Downloads</code> folder, execute the following commands in your terminal.
      </p>

      <h3 id="step-1-navigate-to-downloads">Step 1: Navigate to Downloads and Verify Archive</h3>
      <p>Open your terminal and change directory to your Downloads folder:</p>

      <CodeBlock
        language="bash"
        filename="terminal"
        code={`cd ~/Downloads
ls -lh "Antigravity IDE.tar.gz"`}
      />

      <h3 id="step-2-extract-the-archive">Step 2: Extract the Tarball Archive</h3>
      <p>Extract the compressed <code>.tar.gz</code> file using the <code>tar</code> command:</p>

      <CodeBlock
        language="bash"
        filename="terminal"
        code={`tar -xzf "Antigravity IDE.tar.gz"
ls`}
      />
      <p>You should now see an extracted directory containing the binary files.</p>

      <h3 id="step-3-create-applications-directory-and-move">Step 3: Move IDE Files to Applications Directory</h3>
      <p>Create a dedicated <code>Applications</code> folder in your home directory (if it doesn&apos;t exist) and move the extracted IDE folder:</p>

      <CodeBlock
        language="bash"
        filename="terminal"
        code={`mkdir -p ~/Applications
mv "Antigravity IDE" ~/Applications/antigravity-ide`}
      />

      <h3 id="step-4-set-executable-permissions">Step 4: Set Executable Permissions</h3>
      <p>Ensure the main binary file has execution permissions enabled:</p>

      <CodeBlock
        language="bash"
        filename="terminal"
        code={`chmod +x ~/Applications/antigravity-ide/antigravity-ide`}
      />

      <h3 id="step-5-test-run-the-ide">Step 5: Test Run the IDE from Terminal</h3>
      <Callout type="tip" title="Test Launch Before Creating Desktop Entry">
        Always launch the executable directly from your terminal first to check for any missing shared library dependencies.
      </Callout>

      <CodeBlock
        language="bash"
        filename="terminal"
        code={`~/Applications/antigravity-ide/antigravity-ide`}
      />
      <p>If the IDE opens successfully, close it and proceed to Part 3 to add it to your system launcher menu!</p>

      <h2 id="part-2-troubleshooting-and-full-uninstall">Part 2: Troubleshooting & Clean Uninstall</h2>

      <p>
        If the IDE fails to launch, crashes, or you want to perform a complete clean reinstall, follow these cleanup steps first.
      </p>

      <Callout type="warning" title="When to Perform a Full Uninstall">
        Perform these steps if you experience permission errors, incomplete extractions, or broken application menu shortcuts.
      </Callout>

      <h3 id="step-1-remove-desktop-launcher">Step 1: Remove Application Launcher</h3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`rm -f ~/.local/share/applications/antigravity-ide.desktop`}
      />

      <h3 id="step-2-remove-installed-ide-files">Step 2: Remove Installed IDE Directory</h3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`rm -rf ~/Applications/antigravity-ide`}
      />

      <h3 id="step-3-remove-corrupted-downloads">Step 3: Remove Corrupted Download Archive (Optional)</h3>
      <p>If you suspect the downloaded tarball was corrupted during transfer:</p>

      <CodeBlock
        language="bash"
        filename="terminal"
        code={`rm -f ~/Downloads/"Antigravity IDE.tar.gz"`}
      />

      <h3 id="step-4-verify-removal-and-refresh-database">Step 4: Verify Removal & Refresh Desktop Database</h3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`ls ~/Applications
ls ~/.local/share/applications | grep -i antigravity
update-desktop-database ~/.local/share/applications 2>/dev/null`}
      />
      <p>Once cleared, re-download the archive and repeat the installation steps in Part 1.</p>

      <h2 id="part-3-desktop-integration">Part 3: Desktop Menu & Launcher Integration</h2>

      <p>
        To launch Antigravity IDE directly from your system application menu (Super / Win key) and pin it to your dock, create a custom <code>.desktop</code> entry.
      </p>

      <h3 id="step-1-create-desktop-entry-file">Step 1: Create Desktop Shortcut Entry</h3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`mkdir -p ~/.local/share/applications
cat << 'EOF' > ~/.local/share/applications/antigravity-ide.desktop
[Desktop Entry]
Version=1.0
Type=Application
Name=Antigravity IDE
Comment=Antigravity Code Editor
Exec=/home/sakib/Applications/antigravity-ide/antigravity-ide
Path=/home/sakib/Applications/antigravity-ide
Terminal=false
StartupNotify=true
Categories=Development;IDE;
EOF`}
      />

      <h3 id="step-2-set-permissions-and-validate">Step 2: Set Launcher Permissions & Validate</h3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`chmod +x ~/.local/share/applications/antigravity-ide.desktop
desktop-file-validate ~/.local/share/applications/antigravity-ide.desktop`}
      />
      <p>If <code>desktop-file-validate</code> returns no output, your syntax is 100% correct!</p>

      <h3 id="step-3-refresh-desktop-menu">Step 3: Refresh System Application Menu</h3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`update-desktop-database ~/.local/share/applications 2>/dev/null`}
      />

      <h2 id="conclusion">Conclusion & Pro Tips</h2>

      <p>
        Now you can press your <strong>Super Key (Windows Key)</strong>, type <code>Antigravity IDE</code>, and press Enter to launch your editor. Once open, right-click the icon in your dock/panel and select <strong>Pin to Panel</strong> for instant access.
      </p>

      <p>
        For more Linux terminal guides and web architecture tips, check out our other posts on the <Link href="/blog">Technical Blog</Link>.
      </p>
    </>
  );
}
