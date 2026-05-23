"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

function readTheme(): Theme {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = readTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      applyTheme(next);
      return next;
    });
  };

  if (!mounted) {
    return (
      <div className={styles.wrapper} aria-hidden>
        <div className={styles.toggle} />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
        className={`${styles.toggle} ${isDark ? styles.toggleDark : ""}`}
        onClick={toggleTheme}
      >
        <span className={styles.icon} aria-hidden>
          ☀️
        </span>
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
        <span className={styles.icon} aria-hidden>
          🌙
        </span>
      </button>
    </div>
  );
}
