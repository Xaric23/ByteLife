import { useGame } from '../context/GameContext';
import { Button } from './ui';
import styles from './DeathScreen.module.css';

export default function DeathScreen() {
  const { player, handleSuccession, goToMenu } = useGame();

  if (!player) return null;

  const hasHeirs = player.children && player.children.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Game Over</h1>
          <p className={styles.name}>{player.name}</p>
          <p className={styles.age}>Lived {player.age} years</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Final Net Worth</span>
            <span className={styles.statValue}>${player.money.toLocaleString()}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Species</span>
            <span className={styles.statValue}>{player.occult}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Children</span>
            <span className={styles.statValue}>{player.children?.length || 0}</span>
          </div>
        </div>

        {hasHeirs ? (
          <div className={styles.succession}>
            <h2>Choose an Heir</h2>
            <p>Continue your legacy through one of your children:</p>
            <div className={styles.heirs}>
              {player.children.map((child, index) => {
                const strainLabel = child.mutationAwakened 
                  ? child.inheritedOccultStrain 
                  : (child.hybridMutationCarrier ? `Carrier (${child.inheritedOccultStrain})` : 'Human');
                
                return (
                  <Button
                    key={child.id || index}
                    fullWidth
                    onClick={() => handleSuccession(index)}
                  >
                    {child.name} (Age {child.age}) - {strainLabel}
                  </Button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={styles.noHeirs}>
            <p>Your bloodline ends here.</p>
            <p>No heirs to continue your legacy.</p>
          </div>
        )}

        <div className={styles.actions}>
          <Button variant="ghost" onClick={goToMenu}>
            Return to Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
