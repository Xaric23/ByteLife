import { useGame } from '../../context/GameContext';
import { educationLevels } from '../../data/careers';
import { Button } from '../ui';
import styles from './Panel.module.css';

export default function EducationPanel() {
  const { player, applyAction, addLog } = useGame();

  if (!player) return null;

  const canEnroll = (level, info) => {
    if (player.enrolledEducation) return false;
    if (player.age < info.minAge) return false;
    if (info.reqSmarts && player.smarts < info.reqSmarts) return false;
    if (info.reqEducation && player.education !== info.reqEducation) return false;
    if (player.education === level) return false;
    if (level === "Bachelor" && ["Bachelor", "Master", "Doctorate"].includes(player.education)) return false;
    if (level === "Master" && ["Master", "Doctorate"].includes(player.education)) return false;
    if (level === "Doctorate" && player.education === "Doctorate") return false;
    return true;
  };

  const enroll = (level, info) => {
    if (!canEnroll(level, info)) {
      addLog(`Can't enroll in ${level} program right now.`, 'System');
      return;
    }
    
    const downPayment = Math.min(player.money, info.cost * 0.1);
    
    applyAction(
      {
        enrolledEducation: level,
        educationYearsLeft: info.duration,
        studentDebt: player.studentDebt + info.cost,
        money: player.money - downPayment,
      },
      `Enrolled in ${level} program!`,
      'Education'
    );
  };

  const dropOut = () => {
    if (!player.enrolledEducation) return;
    
    applyAction(
      { enrolledEducation: null, educationYearsLeft: 0 },
      `Dropped out of ${player.enrolledEducation} program.`,
      'Education'
    );
  };

  const study = () => {
    applyAction(
      { smarts: player.smarts + 3 },
      'Spent time studying.',
      'Education'
    );
  };

  const readBooks = () => {
    applyAction(
      { smarts: player.smarts + 2, happiness: player.happiness + 5 },
      'Read some interesting books.',
      'Education'
    );
  };

  return (
    <div className={styles.panel}>
      <h3 className={styles.sectionTitle}>Current Education</h3>
      
      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>
            {player.enrolledEducation 
              ? `Studying: ${player.enrolledEducation}` 
              : `Highest: ${player.education || 'None'}`}
          </strong>
          {player.enrolledEducation && (
            <small>{player.educationYearsLeft} years remaining</small>
          )}
        </div>
        {player.enrolledEducation && (
          <Button size="small" variant="danger" onClick={dropOut}>
            Drop Out
          </Button>
        )}
      </div>

      {player.studentDebt > 0 && (
        <div className={styles.debtInfo}>
          📋 Student Loan Balance: ${player.studentDebt.toLocaleString()}
          <small>Interest accrues yearly. $5,000 auto-paid annually.</small>
        </div>
      )}

      <h3 className={styles.sectionTitle} style={{ marginTop: '20px' }}>
        Available Programs
      </h3>

      {Object.entries(educationLevels).map(([level, info]) => {
        const available = canEnroll(level, info);
        const completed = player.education === level || 
          (level === "High School" && ["Bachelor", "Master", "Doctorate"].includes(player.education)) ||
          (level === "Bachelor" && ["Master", "Doctorate"].includes(player.education)) ||
          (level === "Master" && player.education === "Doctorate");

        return (
          <div 
            key={level} 
            className={`${styles.listRow} ${completed ? styles.completed : ''}`}
          >
            <div className={styles.listInfo}>
              <strong>{level} {completed && '✓'}</strong>
              <small>
                {info.duration > 0 ? `${info.duration} years` : 'Complete'} • 
                Cost: ${info.cost.toLocaleString()}
                {info.reqSmarts ? ` • Requires ${info.reqSmarts}% Smarts` : ''}
                {info.reqEducation ? ` • Requires ${info.reqEducation}` : ''}
                {info.minAge > 0 ? ` • Min Age: ${info.minAge}` : ''}
              </small>
            </div>
            {!completed && info.duration > 0 && (
              <Button 
                size="small" 
                onClick={() => enroll(level, info)}
                disabled={!available}
              >
                Enroll
              </Button>
            )}
          </div>
        );
      })}

      <h3 className={styles.sectionTitle} style={{ marginTop: '20px' }}>
        Self-Improvement
      </h3>

      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>📚 Study Session</strong>
          <small>Improve your intelligence through dedicated study</small>
        </div>
        <Button size="small" onClick={study}>
          Study (+3 Smarts)
        </Button>
      </div>

      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>📖 Read Books</strong>
          <small>Expand your knowledge through literature</small>
        </div>
        <Button size="small" onClick={readBooks}>
          Read (+2 Smarts)
        </Button>
      </div>
    </div>
  );
}
