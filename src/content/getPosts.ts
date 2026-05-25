import sample from "../../sample.json";
import type { LogPost } from "./log-types";

type PostSource = LogPost | LogPost[];

const posts = sample as PostSource;

export function getAllPosts(): LogPost[] {
  return Array.isArray(posts) ? posts : [posts];
}

export function getLogPost(slug: string): LogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
