import contents from "../../contents.json";
import sample from "../../sample.json";
import type { ContentsIndex, LogPost } from "./log-types";

const postFiles: Record<string, LogPost> = {
  "sample.json": sample as LogPost,
};

const contentsIndex = contents as ContentsIndex;

export function getAllPosts(): LogPost[] {
  return contentsIndex.posts
    .map((entry) => postFiles[entry.file])
    .filter((post): post is LogPost => Boolean(post));
}

export function getLogPost(slug: string): LogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
