import * as installAntigravityIdeLinux from "./install-antigravity-ide-linux";
import * as contaboVpsProductionCoolifyGuide from "./contabo-vps-production-coolify-guide";
import * as contaboVpsCoolifyProductionGuide from "./contabo-vps-coolify-production-guide";
import { BlogPostModule } from "@/lib/blog/types";

const blogPostsMap: Record<string, BlogPostModule> = {
  [installAntigravityIdeLinux.post.slug]: installAntigravityIdeLinux as unknown as BlogPostModule,
  [contaboVpsProductionCoolifyGuide.post.slug]: contaboVpsProductionCoolifyGuide as unknown as BlogPostModule,
  [contaboVpsCoolifyProductionGuide.post.slug]: contaboVpsCoolifyProductionGuide as unknown as BlogPostModule,
};

export default blogPostsMap;
