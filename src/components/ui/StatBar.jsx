import styles from './StatBar.module.css';

export default function StatBar({ 
  label, 
  value, 
  icon, 
  color = 'var(--accent-color)',
  showValue = true 
}) {
  const clampedValue = Math.max(0, Math.min(100, value));
  
  return (
    <div className={styles.card}>
      <div className={styles.label}>
        <span>{icon} {label}</span>
        {showValue && <span>{Math.round(clampedValue)}%</span>}
      </div>
      <div className={styles.barContainer}>
        <div 
          className={styles.barFill}
          style={{ 
            width: `${clampedValue}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}40`
          }}
        />
      </div>
    </div>
  );
}
