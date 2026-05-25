import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/content/getPosts";
import styles from "./log.module.css";

export const metadata: Metadata = {
  title: "Log | jejemerong.space",
  description: "짧은 메모와 기록",
};

export default function LogIndexPage() {
  const posts = [...getAllPosts()].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className={styles.page}>
      <article className={styles.logContainer}>
        <p className={styles.backLink}>
          <Link href="/">← 홈으로</Link>
        </p>

        <h1>오늘의 기록</h1>
        <p className={styles.indexIntro}>
          결국 변하지 않는 건 스스로 갈고 닦은 가치입니다.
        </p>

        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.postItem}>
              <Link href={`/log/${post.slug}`} className={styles.postCard}>
                <span className={styles.postThumbnail}>
                  <Image
                    src={post.thumbnail ?? "/myduck.png"}
                    alt=""
                    width={96}
                    height={96}
                  />
                </span>
                <span className={styles.postContent}>
                  <span className={styles.postLink}>{post.title}</span>
                  <span className={styles.postDescription}>
                    {post.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}
