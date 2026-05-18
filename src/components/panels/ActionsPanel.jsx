import { useGame } from '../../context/GameContext';
import { occultTypes } from '../../data/occults';
import { Button } from '../ui';
import styles from './Panel.module.css';

export default function ActionsPanel() {
  const { player, updatePlayer, addLog, showModal, saveGame } = useGame();

  if (!player) return null;

  const occult = occultTypes[player.occult];
  const isOccult = player.occult !== "Human";

  const doActivity = (activity) => {
    const updates = {};
    let message = '';

    switch (activity) {
      case 'gym':
        updates.health = Math.min(100, player.health + 8);
        updates.happiness = Math.min(100, player.happiness + 3);
        message = 'Had a great workout at the gym!';
        break;
      case 'meditate':
        updates.happiness = Math.min(100, player.happiness + 10);
        updates.health = Math.min(100, player.health + 3);
        message = 'Found inner peace through meditation.';
        break;
      case 'socialize':
        updates.social = Math.min(100, player.social + 10);
        updates.happiness = Math.min(100, player.happiness + 5);
        message = 'Had a great time with friends!';
        break;
      case 'party':
        updates.social = Math.min(100, player.social + 15);
        updates.happiness = Math.min(100, player.happiness + 10);
        updates.health = Math.max(0, player.health - 5);
        message = 'Partied hard last night!';
        break;
      case 'volunteer':
        updates.social = Math.min(100, player.social + 8);
        updates.happiness = Math.min(100, player.happiness + 12);
        updates.karma = Math.min(100, (player.karma || 50) + 5);
        message = 'Volunteered to help the community.';
        break;
      case 'therapy':
        if (player.money < 2000) return;
        updates.money = player.money - 2000;
        updates.happiness = Math.min(100, player.happiness + 20);
        message = 'Had a productive therapy session.';
        break;
      case 'doctor':
        if (player.money < 5000) return;
        updates.money = player.money - 5000;
        updates.health = Math.min(100, player.health + 25);
        message = 'Got a health checkup and treatment.';
        break;
      case 'plastic_surgery':
        if (player.money < 25000) return;
        updates.money = player.money - 25000;
        updates.social = Math.min(100, player.social + 15);
        updates.happiness = Math.min(100, player.happiness + 10);
        message = 'Got plastic surgery!';
        break;
    }

    updatePlayer(updates);
    addLog(message, 'Activity');
    saveGame();
  };

  const doOccultAction = (ability) => {
    const updates = {};
    
    if (ability.cost && player.money < ability.cost) return;
    if (ability.cost) updates.money = player.money - ability.cost;
    
    if (ability.meterRestore) {
      updates.occultMeter = Math.min(100, player.occultMeter + ability.meterRestore);
    }
    if (ability.meterChange) {
      updates.occultMeter = Math.max(0, Math.min(100, player.occultMeter + ability.meterChange));
    }
    if (ability.healthRestore) {
      updates.health = Math.min(100, player.health + ability.healthRestore);
    }
    if (ability.socialBonus) {
      updates.social = Math.min(100, player.social + ability.socialBonus);
    }
    if (ability.happinessBonus) {
      updates.happiness = Math.min(100, player.happiness + ability.happinessBonus);
    }
    if (ability.smartsBonus) {
      updates.smarts = Math.min(100, player.smarts + ability.smartsBonus);
    }
    if (ability.moneyGain) {
      updates.money = (updates.money || player.money) + ability.moneyGain;
    }

    if (ability.risk && Math.random() < ability.risk) {
      addLog(`${ability.name} went wrong! Attracted unwanted attention.`, 'Occult');
      if (ability.scpRisk && Math.random() < ability.scpRisk) {
        updates.scpContained = true;
        updates.scpDesignation = `SCP-${Math.floor(Math.random() * 4999) + 1000}`;
        updates.job = null;
        addLog(`Captured by SCP Foundation! Designated ${updates.scpDesignation}`, 'SCP');
      }
    } else {
      addLog(`${ability.name} successful.`, 'Occult');
    }

    updatePlayer(updates);
    saveGame();
  };

  const attemptCure = () => {
    showModal({
      title: 'Experimental Cure',
      description: `A shadowy clinic offers an experimental serum that might cure your ${player.occult} condition. Cost: $75,000. Success rate: 60%`,
      options: [
        {
          text: 'Take the Cure ($75,000)',
          action: () => {
            if (player.money < 75000) {
              addLog("Can't afford the experimental cure.", 'Medical');
              return;
            }
            updatePlayer({ money: player.money - 75000 });
            
            if (Math.random() < 0.6) {
              updatePlayer({ occult: "Human", occultMeter: 50 });
              addLog('The cure worked! You are human again.', 'Medical');
            } else {
              updatePlayer({ health: player.health - 30 });
              addLog('The cure failed and damaged your health!', 'Medical');
            }
            saveGame();
          },
          disabled: player.money < 75000,
        },
        { text: 'Too risky', action: () => {} },
      ],
    });
  };

  const exportLogs = () => {
    if (!player.sessionLogs || player.sessionLogs.length === 0) {
      addLog('No logs to export yet.', 'System');
      return;
    }

    let content = `═══════════════════════════════════════════════════\n`;
    content += `           BYTELIFE SESSION ARCHIVE\n`;
    content += `═══════════════════════════════════════════════════\n`;
    content += `Subject: ${player.name}\n`;
    content += `Final Age: ${player.age}\n`;
    content += `Species: ${player.occult}\n`;
    content += `═══════════════════════════════════════════════════\n\n`;

    player.sessionLogs.forEach(log => {
      content += `[Age ${log.age} | ${log.time} | $${log.money?.toLocaleString() || 0}]\n`;
      content += `→ ${log.action}: ${log.outcome}\n`;
      content += `──────────────────────────────────────────────────\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ByteLife_${player.name.replace(/\s+/g, '_')}_Archive.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.panel}>
      <h3 className={styles.sectionTitle}>Health & Wellness</h3>
      
      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>💪 Gym Workout</strong>
          <small>Improve health and mood</small>
        </div>
        <Button size="small" onClick={() => doActivity('gym')}>Go</Button>
      </div>

      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>🧘 Meditation</strong>
          <small>Find inner peace</small>
        </div>
        <Button size="small" onClick={() => doActivity('meditate')}>Meditate</Button>
      </div>

      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>🏥 Doctor Visit</strong>
          <small>Get medical treatment ($5,000)</small>
        </div>
        <Button size="small" onClick={() => doActivity('doctor')} disabled={player.money < 5000}>
          Visit
        </Button>
      </div>

      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>🛋️ Therapy Session</strong>
          <small>Mental health support ($2,000)</small>
        </div>
        <Button size="small" onClick={() => doActivity('therapy')} disabled={player.money < 2000}>
          Book
        </Button>
      </div>

      <h3 className={styles.sectionTitle}>Social Activities</h3>

      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>👋 Hang Out</strong>
          <small>Spend time with friends</small>
        </div>
        <Button size="small" onClick={() => doActivity('socialize')}>Go Out</Button>
      </div>

      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>🎉 Party</strong>
          <small>Have a wild night (may affect health)</small>
        </div>
        <Button size="small" onClick={() => doActivity('party')}>Party!</Button>
      </div>

      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>🤝 Volunteer</strong>
          <small>Help the community</small>
        </div>
        <Button size="small" onClick={() => doActivity('volunteer')}>Volunteer</Button>
      </div>

      {isOccult && occult && (
        <>
          <h3 className={styles.sectionTitle} style={{ color: occult.meterColor }}>
            {occult.meterIcon} {player.occult} Abilities
          </h3>
          
          {occult.abilities?.map(ability => (
            <div key={ability.id} className={styles.listRow} style={{ borderColor: occult.meterColor }}>
              <div className={styles.listInfo}>
                <strong>{ability.name}</strong>
                <small>
                  {ability.description}
                  {ability.risk && ` • Risk: ${Math.round(ability.risk * 100)}%`}
                  {ability.cost && ` • Cost: $${ability.cost.toLocaleString()}`}
                </small>
              </div>
              <Button 
                size="small" 
                onClick={() => doOccultAction(ability)}
                disabled={ability.cost && player.money < ability.cost}
              >
                Use
              </Button>
            </div>
          ))}

          <div className={styles.listRow} style={{ borderColor: 'var(--success-color)' }}>
            <div className={styles.listInfo}>
              <strong>💉 Seek Cure</strong>
              <small>Attempt to reverse your condition ($75,000)</small>
            </div>
            <Button size="small" variant="success" onClick={attemptCure}>
              Try Cure
            </Button>
          </div>
        </>
      )}

      <h3 className={styles.sectionTitle}>System</h3>
      
      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>📥 Export Life Archive</strong>
          <small>Download your complete session history</small>
        </div>
        <Button size="small" onClick={exportLogs}>Export</Button>
      </div>
    </div>
  );
}
