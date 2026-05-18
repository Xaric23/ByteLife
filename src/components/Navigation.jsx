import { useGame } from '../context/GameContext';
import styles from './Navigation.module.css';

const tabs = [
  { id: 'log', label: 'History', icon: '📜' },
  { id: 'relations', label: 'Family', icon: '👥' },
  { id: 'jobs', label: 'Career', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'market', label: 'Assets', icon: '📈' },
  { id: 'actions', label: 'Activities', icon: '🎭' },
];

export default function Navigation() {
  const { activeTab, setTab, player } = useGame();

  return (
    <nav className={styles.nav}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.navLink} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => setTab(tab.id)}
          disabled={player?.scpContained && !['log', 'relations'].includes(tab.id)}
        >
          <span className={styles.icon}>{tab.icon}</span>
          <span className={styles.label}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
