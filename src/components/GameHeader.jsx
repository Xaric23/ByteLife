import { useGame } from '../context/GameContext';
import { occultTypes } from '../data/occults';
import styles from './GameHeader.module.css';

export default function GameHeader() {
  const { player } = useGame();
  
  if (!player) return null;

  const occult = occultTypes[player.occult];
  const isContained = player.scpContained;
  
  let bodyLabel = player.anatomy === 'Both' ? 'Intersex' : player.anatomy;
  if (player.occult !== "Human") {
    bodyLabel += ` • ${player.occult}`;
  }

  const getStatusText = () => {
    if (isContained) return `⚠️ SCP CONTAINED: ${player.scpDesignation}`;
    if (player.inPrison) return `🚨 INCARCERATED (${player.prisonYearsLeft} years left)`;
    if (player.enrolledEducation) return `📚 Studying: ${player.enrolledEducation} (${player.educationYearsLeft}yr)`;
    if (player.job) return `💼 ${player.job.title}`;
    return player.education !== "None" ? `🎓 ${player.education}` : "Unemployed";
  };

  return (
    <div className={`${styles.header} ${isContained ? styles.contained : ''}`}>
      <div className={styles.identitySection}>
        <div className={styles.identity}>
          <h1 className={styles.name}>{player.name}</h1>
          <div className={styles.meta}>
            <span className={styles.badge}>Age {player.age}</span>
            <span className={styles.badge}>🧬 {bodyLabel}</span>
            <span className={styles.badge}>📍 {player.country}</span>
          </div>
          <div className={styles.status}>{getStatusText()}</div>
          {player.studentDebt > 0 && (
            <div className={styles.debt}>
              📋 Student Debt: ${player.studentDebt.toLocaleString()}
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.financialSection}>
        <div className={styles.moneyLabel}>NET WORTH</div>
        <div className={styles.money}>
          ${player.money.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
