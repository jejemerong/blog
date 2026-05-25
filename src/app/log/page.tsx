import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/content/getPosts";
import type { LogParagraph, LogPost } from "@/content/log-types";
import styles from "./log.module.css";

export const metadata: Metadata = {
  title: "Log | jejemerong.space",
  description: "짧은 메모와 기록",
};

function getParagraphLength(paragraph: LogParagraph) {
  if (typeof paragraph === "string") return paragraph.length;

  return paragraph.parts.reduce((total, part) => {
    return total + (typeof part === "string" ? part.length : part.label.length);
  }, 0);
}

function getPostTextLength(post: LogPost) {
  return (
    post.title.length +
    post.description.length +
    post.intro.length +
    post.sections.reduce((sectionTotal, section) => {
      const paragraphLength = section.paragraphs.reduce(
        (total, paragraph) => total + getParagraphLength(paragraph),
        0,
      );
      const stepLength =
        section.steps?.reduce((total, step) => total + step.length, 0) ?? 0;

      return (
        sectionTotal + section.heading.length + paragraphLength + stepLength
      );
    }, 0)
  );
}

function formatPostDateTime(date: string) {
  const [, , month, day] = date.match(/(\d{4})[.-](\d{2})[.-](\d{2})/) ?? [];

  if (month && day) return `${month}:${day}`;

  return date.slice(-5).replace(".", ":");
}

export default function LogIndexPage() {
  const posts = [...getAllPosts()].sort((a, b) => b.date.localeCompare(a.date));
  const postLengths = posts.map(getPostTextLength);
  const longestPostLength = Math.max(...postLengths, 1);

  return (
    <main className={styles.page}>
      <article className={styles.logContainer}>
        <p className={styles.backLink}>
          <Link href="/">← 홈</Link>
        </p>

        <h1>오늘의 기록</h1>
        <p className={styles.indexIntro}>
          결국 변하지 않는 건 스스로 갈고 닦은 가치입니다.
        </p>

        <ul className={styles.postList}>
          {posts.map((post, index) => {
            const textLength = postLengths[index];
            const progressPercent = Math.max(
              10,
              Math.round((textLength / longestPostLength) * 100),
            );

            return (
              <li key={post.slug} className={styles.postItem}>
                <Link href={`/log/${post.slug}`} className={styles.postCard}>
                  <span className={styles.postThumbnail}>
                    <Image
                      src={post.thumbnail ?? "/images/myduck.png"}
                      alt=""
                      width={96}
                      height={96}
                    />
                  </span>
                  <span className={styles.postContent}>
                    <span className={styles.postHeader}>
                      <span className={styles.postText}>
                        <span className={styles.postLink}>{post.title}</span>
                        <span className={styles.postDescription}>
                          {post.description}
                        </span>
                      </span>
                      <span className={styles.postBadge} aria-hidden>
                        ◉
                      </span>
                    </span>
                    <span className={styles.playerTimeline}>
                      <span className={styles.playerTrack}>
                        <span
                          className={styles.playerProgress}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </span>
                      <span className={styles.playerTime}>
                        {formatPostDateTime(post.date)}
                      </span>
                    </span>
                    <span className={styles.playerControls} aria-hidden>
                      <span className={styles.playerIcon}>↻</span>
                      <span className={styles.playerIcon}>◀◀</span>
                      <span className={styles.playerIcon}>▶</span>
                      <span className={styles.playerIcon}>▶▶</span>
                      <span className={styles.playerIcon}>♡</span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </article>
    </main>
  );
}
