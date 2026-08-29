import * as installAntigravityIdeLinux from "./install-antigravity-ide-linux";
import { BlogPostModule } from "@/lib/blog/types";

const blogPostsMap: Record<string, BlogPostModule> = {
  [installAntigravityIdeLinux.post.slug]: installAntigravityIdeLinux as unknown as BlogPostModule,
};

export default blogPostsMap;
