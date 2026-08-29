import { BlogPostMeta, BlogPostModule } from "./types";
import { validateAllPosts } from "./validation";
import blogPostsMap from "@/content/blog";

export function getAllPosts(): BlogPostMeta[] {
  const posts = Object.values(blogPostsMap).map((module: BlogPostModule) => module.post);
  validateAllPosts(posts);

  // Sort descending by publication date
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPostModule | null {
  const allPosts = getAllPosts();
  const exists = allPosts.some((p) => p.slug === slug);
  if (!exists) return null;

  const postModule = blogPostsMap[slug];
  if (!postModule) return null;
  return postModule;
}

export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 2
): BlogPostMeta[] {
  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);

  const scoredPosts = allPosts.map((post) => {
    let score = 0;
    // Shared tags get highest score
    post.tags.forEach((tag) => {
      if (tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())) {
        score += 2;
      }
    });
    return { post, score };
  });

  scoredPosts.sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map((sp) => sp.post);
}

export function getPostNavigation(currentSlug: string): {
  prevPost: BlogPostMeta | null;
  nextPost: BlogPostMeta | null;
} {
  const allPosts = getAllPosts(); // Sorted descending by date (newest first)
  const index = allPosts.findIndex((p) => p.slug === currentSlug);

  if (index === -1) return { prevPost: null, nextPost: null };

  // Since posts are sorted newest first:
  // Next post (newer) is index - 1
  // Prev post (older) is index + 1
  const nextPost = index > 0 ? allPosts[index - 1] : null;
  const prevPost = index < allPosts.length - 1 ? allPosts[index + 1] : null;

  return { prevPost, nextPost };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagsSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((tag) => tagsSet.add(tag)));
  return Array.from(tagsSet);
}
