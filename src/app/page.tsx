import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import data from "../../data.json";

const STREAK_GOAL = 10;

export default function Home() {
  const userId = data.user.userID;
  const streak = data.user.stats.streak;
  const freeze = data.user.stats.freeze;
  const combo = data.user.stats.combo;
  const progressPercent = Math.min(100, (streak / STREAK_GOAL) * 100);
  const exp = Math.max(0, Math.round(progressPercent));

  const year2YY = new Date().getFullYear().toString().slice(-2);
  const month2MM = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const day2DD = new Date().getDate().toString().padStart(2, "0");

  return (
    <main className={styles.main}>
      <section className={styles.dashboard} aria-label="캐릭터 대시보드">
        <header className={styles.topBar}>
          <div>
            <p className={styles.kicker}>PLAYER DASHBOARD</p>
            <h1>{userId}</h1>
          </div>
          <time className={styles.date}>
            {year2YY}.{month2MM}.{day2DD}
          </time>
        </header>

        <div className={styles.characterPanel}>
          <div className={styles.levelBadge}>
            <span>Lv.</span>
            <strong>1</strong>
          </div>
          <div className={styles.characterStage}>
            <Image
              src="/svgs/myduck.svg"
              alt={`${userId} 캐릭터`}
              className={`${styles.character} ${styles.characterLight}`}
              width={60}
              height={130}
              priority
            />
            <Image
              src="/svgs/myduck_black.svg"
              alt=""
              aria-hidden
              className={`${styles.character} ${styles.characterDark}`}
              width={60}
              height={130}
              priority
            />
          </div>
        </div>

        <section className={styles.statusPanel} aria-label="캐릭터 상태">
          <div className={styles.identityRow}>
            <div>
              <p className={styles.statusLabel}>CLASS</p>
              <p className={styles.statusValue}>Daily Keeper</p>
            </div>
            <div>
              <p className={styles.statusLabel}>EXP</p>
              <p className={styles.statusValue}>{exp}%</p>
            </div>
          </div>

          <div className={styles.progressWrapper}>
            <div className={styles.progressHeader}>
              <span>STREAK</span>
              <span>
                {streak}/{STREAK_GOAL}
              </span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className={styles.streakRow}>
            <div className={styles.streakCard}>
              <span className={styles.streakCardLabel}>로그</span>
              <span className={styles.streakCardValue}>{streak}</span>
            </div>
            <div className={styles.streakCard}>
              <span className={styles.streakCardLabel}>산책</span>
              <span className={styles.streakCardValue}>{streak}</span>
            </div>
            <div className={styles.streakCard}>
              <span className={styles.streakCardLabel}>보호막</span>
              <span className={styles.streakCardValue}>{freeze}</span>
            </div>
            <div className={styles.streakCard}>
              <span className={styles.streakCardLabel}>콤보</span>
              <span className={styles.streakCardValue}>{combo}</span>
            </div>
          </div>

        </section>

        <nav className={styles.menuPanel} aria-label="대시보드 메뉴">
          <Link href="/log" className={styles.primaryAction}>
            기록 열기
          </Link>
          <Link href="/log/log-1" className={styles.secondaryAction}>
            이어하기
          </Link>
          <Link href="/log" className={styles.secondaryAction}>
            인벤토리
          </Link>
        </nav>
      </section>
    </main>
  );
}
