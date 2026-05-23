"use client";
import Image from "next/image";
import styles from "./page.module.css";
import data from "../../data.json";
import { useState } from "react";

/** 100% 채움 기준 (일수·포인트 등 원하는 단위로 설정) */
const STREAK_GOAL = 100;

export default function Home() {
  const userId = data.user.userID;
  const [streak, setStreak] = useState(data.user.stats.streak);
  const progressPercent = Math.min(100, (streak / STREAK_GOAL) * 100);
  const [link, setLink] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const year2YY = new Date().getFullYear().toString().slice(-2);
  const month2MM = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const day2DD = new Date().getDate().toString().padStart(2, "0");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLink(value);
    setIsButtonDisabled(!value.trim());
  };

  return (
    <main className={styles.main}>
      <div className={styles.contentBox}>
      <div className={styles.hero}>
        <p className={styles.date}>
          {year2YY}.{month2MM}.{day2DD}
        </p>
        <Image
          src="/myduck.png"
          alt="omo Logo"
          className={styles.omoLogo}
          width={60}
          height={130}
          priority
        />
      </div>
      <p className={styles.userLevel}>{userId} Lv 1️⃣</p>
      <div className={styles.progressWrapper}>
        {progressPercent > 0 && (
          <span
            className={styles.progressLabel}
            style={{ left: `${progressPercent}%` }}
          >
            {streak}
          </span>
        )}
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      <div className={styles.streakRow}>
        <div className={styles.streakCard}>
          <span className={styles.streakCardLabel}>각자도생 스터디</span>
          <span className={styles.streakCardValue}>
            <span className={styles.streakCardEmoji} aria-hidden>
              🔥
            </span>
            {streak}
          </span>
        </div>
        <div className={styles.streakCard}>
          <span className={styles.streakCardLabel}>듀오링고</span>
          <span className={styles.streakCardValue}>
            <span className={styles.streakCardEmoji} aria-hidden>
              🥶
            </span>
            {streak}
          </span>
        </div>
      </div>
      </div>
    </main>
  );
}
