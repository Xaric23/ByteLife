import { useGame } from '../context/GameContext';
import GameHeader from './GameHeader';
import StatsHUD from './StatsHUD';
import Navigation from './Navigation';
import { LogPanel, RelationsPanel, JobsPanel, EducationPanel, MarketPanel, ActionsPanel } from './panels';
import { Button, Modal } from './ui';
import styles from './GameScreen.module.css';

export default function GameScreen() {
  const { player, activeTab, ageUp, modal, hideModal, goToMenu, applyAction } = useGame();

  if (!player) return null;

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'log': return <LogPanel />;
      case 'relations': return <RelationsPanel />;
      case 'jobs': return <JobsPanel />;
      case 'education': return <EducationPanel />;
      case 'market': return <MarketPanel />;
      case 'actions': return <ActionsPanel />;
      default: return <LogPanel />;
    }
  };

  const handleStudy = () => {
    applyAction(
      { smarts: player.smarts + 5 },
      'Studied hard and improved intelligence.',
      'Activity'
    );
  };

  const handleGym = () => {
    applyAction(
      { health: player.health + 5 },
      'Worked out at the gym.',
      'Activity'
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <Button variant="ghost" size="small" onClick={goToMenu}>
          ← Menu
        </Button>
        <Button variant="ghost" size="small" onClick={saveGame}>
          💾 Save
        </Button>
      </div>

      <GameHeader />
      <StatsHUD />

      <div className={styles.mainContent}>
        <Navigation />
        <div className={styles.viewport}>
          {renderActivePanel()}
        </div>
      </div>

      <div className={styles.controls}>
        <Button 
          variant="primary" 
          size="xlarge" 
          className={styles.ageButton}
          onClick={ageUp}
          disabled={!player.alive}
        >
          Age Up (+1 Year)
        </Button>
        <Button onClick={handleStudy} disabled={!player.alive}>
          📚 Study
        </Button>
        <Button onClick={handleGym} disabled={!player.alive}>
          💪 Gym
        </Button>
      </div>

      {modal && (
        <Modal
          title={modal.title}
          description={modal.description}
          options={modal.options}
          onClose={hideModal}
        >
          {modal.content}
        </Modal>
      )}
    </div>
  );
}
