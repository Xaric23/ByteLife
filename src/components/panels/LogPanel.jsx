import { useGame } from '../../context/GameContext';
import styles from './Panel.module.css';

export default function LogPanel() {
  const { player } = useGame();

  if (!player) return null;

  return (
    <div className={styles.panel}>
      <h3 className={styles.sectionTitle}>Life History</h3>
      
      {player.logs.length === 0 ? (
        <div className={styles.empty}>Your story begins...</div>
      ) : (
        <div className={styles.logList}>
          {[...player.logs].reverse().map((log, index) => (
            <div key={index} className={styles.logItem}>
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
