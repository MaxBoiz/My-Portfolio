"use client";

import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./MissionReportSequence.module.css";
import { runMissionReportSequence } from "./mission-report-sequence";

export default function MissionReportSequence({ onComplete, onCancel }: {
  onComplete: () => void;
  onCancel: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    return runMissionReportSequence(cardRef.current, onComplete);
  }, [onComplete]);

  return (
    <div ref={cardRef} className={styles.card} data-mission-sequence>
      <button className={styles.close} type="button" onClick={onCancel} autoFocus aria-label="Cancel opening mission report"><FaTimes /></button>
      <section className={styles.stage} data-vault-entry>
        <header className={styles.copy} data-vault-copy>
          <h2>Opening mission report</h2>
          <p>Preparing the selected mission.</p>
        </header>
        <div className={styles.otpWrap} data-vault-digits aria-hidden="true">
          {[0, 1, 2, 3].map(index => (
            <input key={index} className={styles.otpInput} data-vault-digit readOnly tabIndex={-1} aria-label={`Sequence digit ${index + 1}`} />
          ))}
        </div>
        <div className={styles.orbitZone} data-vault-orbit aria-hidden="true" />
      </section>
      <section className={`${styles.stage} ${styles.stageVerify}`} data-vault-verify aria-hidden="true" aria-live="polite">
        <header className={styles.copy} data-vault-copy><h2>Loading report...</h2><p>Bringing the mission into focus.</p></header>
        <div className={styles.progressShell} data-vault-progress aria-hidden="true">
          <svg className={styles.progressRing} viewBox="0 0 120 120">
            <circle className={styles.progressTrack} cx="60" cy="60" r="47" />
            <circle className={styles.progressValue} data-vault-progress-value cx="60" cy="60" r="47" />
          </svg>
          <div className={styles.progressNumber} data-vault-progress-number>0</div>
        </div>
        <div className={styles.successOrb} data-vault-success-orb aria-hidden="true"><span className={styles.checkMark} data-vault-check>✓</span></div>
      </section>
      <section className={`${styles.stage} ${styles.stageSuccess}`} data-vault-success aria-hidden="true" aria-live="polite">
        <header className={styles.copy} data-vault-copy><h2>Report ready</h2><p>Opening your selected mission...</p></header>
        <div className={styles.successCore} data-vault-success-core aria-hidden="true"><span>✓</span></div>
        <div className={styles.verifiedPill} data-vault-pill>READY</div>
        <div className={styles.particles} data-vault-particles aria-hidden="true" />
      </section>
      <footer className={styles.cardFooter} data-vault-footer><span>Mission / 01</span><span>Preparing...</span></footer>
    </div>
  );
}
