import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LogArticle from "@/components/LogArticle";
import { getAllPosts, getLogPost } from "@/content/getPosts";
import styles from "../log.module.css";

type LogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: LogPostPageProps): Metadata {
  const post = getLogPost(params.slug);

  if (!post) {
    return {
      title: "Log | jejemerong.space",
    };
  }

  return {
    title: `${post.title} | jejemerong.space`,
    description: post.description,
  };
}

export default function LogPostPage({ params }: LogPostPageProps) {
  const post = getLogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <LogArticle post={post} />
    </main>
  );
}
