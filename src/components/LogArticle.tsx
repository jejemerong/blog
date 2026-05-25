import Link from "next/link";
import type { LogLink, LogParagraph, LogPost } from "@/content/log-types";
import styles from "@/app/log/log.module.css";

function renderLink(link: LogLink, key: number) {
  const isExternal = link.href.startsWith("http");

  if (isExternal) {
    return (
      <a key={key} href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }

  return (
    <Link key={key} href={link.href}>
      {link.label}
    </Link>
  );
}

function renderParagraph(content: LogParagraph, key: number) {
  if (typeof content === "string") {
    return <p key={key}>{content}</p>;
  }

  return (
    <p key={key}>
      {content.parts.map((part, index) =>
        typeof part === "string" ? part : renderLink(part, index),
      )}
    </p>
  );
}

type LogArticleProps = {
  post: LogPost;
  showBackLink?: boolean;
};

export default function LogArticle({
  post,
  showBackLink = true,
}: LogArticleProps) {
  return (
    <article className={styles.logContainer}>
      {showBackLink && (
        <p className={styles.backLink}>
          <Link href="/log">← 로그 목록</Link>
        </p>
      )}

      <h1>{post.title}</h1>
      <p className={styles.meta}>{post.date}</p>
      <p>{post.intro}</p>

      {post.sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <p>
            <strong>{section.heading}</strong>
          </p>
          {section.paragraphs.map((paragraph, index) =>
            renderParagraph(paragraph, index),
          )}
          {section.steps?.map((step, index) => (
            <p key={step} className={styles.step}>
              &nbsp;&nbsp;{index + 1}. {step}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
