import { useState } from 'react';
import { useGame } from '../hooks/useGame';
import { Button, Modal } from './ui';
import styles from './MainMenu.module.css';

export default function MainMenu() {
  const { slots, startNewGame, loadGame, deleteSlot } = useGame();
  const [showNewGame, setShowNewGame] = useState(false);
  const [creationStep, setCreationStep] = useState(1);
  const [selectedAnatomy, setSelectedAnatomy] = useState(null);

  const handleNewGame = () => {
    setShowNewGame(true);
    setCreationStep(1);
    setSelectedAnatomy(null);
  };

  const selectAnatomy = (anatomy) => {
    setSelectedAnatomy(anatomy);
    setCreationStep(2);
  };

  const selectOrientation = (orientation) => {
    startNewGame(selectedAnatomy, orientation);
    setShowNewGame(false);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.header}>
          <h1 className={styles.title}>ByteLife</h1>
          <p className={styles.subtitle}>Life Simulation</p>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="xlarge" fullWidth onClick={handleNewGame}>
            New Life
          </Button>
        </div>

        {slots.length > 0 && (
          <div className={styles.saves}>
            <h2 className={styles.savesTitle}>Saved Lives</h2>
            {slots.map(slot => (
              <div key={slot.id} className={styles.saveSlot}>
                <div className={styles.saveInfo}>
                  <strong>{slot.name}</strong>
                  <small>
                    Age {slot.age} • {slot.occult}
                    <br />
                    {formatDate(slot.savedAt)}
                  </small>
                </div>
                <div className={styles.saveActions}>
                  <Button size="small" onClick={() => loadGame(slot.id)}>
                    Load
                  </Button>
                  <Button size="small" variant="danger" onClick={() => deleteSlot(slot.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <p>Multiple save slots • Supernatural beings • Expanded careers</p>
        </div>
      </div>

      {showNewGame && (
        <Modal
          title={creationStep === 1 ? "Character Creation" : "Orientation"}
          description={
            creationStep === 1 
              ? "Select your character's biological framework:"
              : "Select your character's orientation:"
          }
          onClose={() => setShowNewGame(false)}
          options={
            creationStep === 1 
              ? [
                  { text: '♂️ Male', action: () => selectAnatomy('Male') },
                  { text: '♀️ Female', action: () => selectAnatomy('Female') },
                  { text: '⚧️ Intersex', action: () => selectAnatomy('Both') },
                ]
              : [
                  { text: 'Straight', action: () => selectOrientation('Straight') },
                  { text: 'Bisexual', action: () => selectOrientation('Bisexual') },
                  { text: 'Gay/Lesbian', action: () => selectOrientation('Gay') },
                ]
          }
        />
      )}
    </div>
  );
}
