import { useGame } from '../../hooks/useGame';
import { occultTypes, generateSCPDesignation } from '../../data/occults';
import { factionTemplates } from '../../data/storySystems';
import { rollChance } from '../../utils/helpers';
import { Button } from '../ui';
import styles from './Panel.module.css';

export default function ActionsPanel() {
  const { player, applyAction, addLog, showModal, hideModal, addArtifact, updateFaction } = useGame();

  if (!player) return null;

  const occult = occultTypes[player.occult];
  const isOccult = player.occult !== "Human";

  const doActivity = (activity) => {
    let updates;
    let message;

    switch (activity) {
      case 'gym':
        updates = { health: player.health + 8, happiness: player.happiness + 3 };
        message = 'Had a great workout at the gym!';
        break;
      case 'meditate':
        updates = { happiness: player.happiness + 10, health: player.health + 3 };
        message = 'Found inner peace through meditation.';
        break;
      case 'socialize':
        updates = { social: player.social + 10, happiness: player.happiness + 5 };
        message = 'Had a great time with friends!';
        break;
      case 'party':
        updates = { social: player.social + 15, happiness: player.happiness + 10, health: player.health - 5 };
        message = 'Partied hard last night!';
        break;
      case 'volunteer':
        updates = { social: player.social + 8, happiness: player.happiness + 12, karma: (player.karma || 50) + 5 };
        message = 'Volunteered to help the community.';
        break;
      case 'therapy':
        if (player.money < 2000) {
          addLog("Can't afford therapy right now.", 'System');
          return;
        }
        updates = { money: player.money - 2000, happiness: player.happiness + 20 };
        message = 'Had a productive therapy session.';
        break;
      case 'doctor':
        if (player.money < 5000) {
          addLog("Can't afford a doctor visit right now.", 'System');
          return;
        }
        updates = { money: player.money - 5000, health: player.health + 25 };
        message = 'Got a health checkup and treatment.';
        break;
      case 'plastic_surgery':
        if (player.money < 25000) {
          addLog("Can't afford plastic surgery.", 'System');
          return;
        }
        updates = { money: player.money - 25000, social: player.social + 15, happiness: player.happiness + 10 };
        message = 'Got plastic surgery!';
        break;
      default:
        return;
    }

    applyAction(updates, message, 'Activity');
  };

  const doOccultAction = (ability) => {
    if (ability.cost && player.money < ability.cost) {
      addLog(`Can't afford ${ability.name}.`, 'System');
      return;
    }
    
    const updates = {};
    
    if (ability.cost) {
      updates.money = player.money - ability.cost;
    }
    
    if (ability.meterRestore) {
      updates.occultMeter = player.occultMeter + ability.meterRestore;
    }
    if (ability.meterChange) {
      updates.occultMeter = player.occultMeter + ability.meterChange;
    }
    if (ability.healthRestore) {
      updates.health = player.health + ability.healthRestore;
    }
    if (ability.socialBonus) {
      updates.social = player.social + ability.socialBonus;
    }
    if (ability.happinessBonus) {
      updates.happiness = player.happiness + ability.happinessBonus;
    }
    if (ability.smartsBonus) {
      updates.smarts = player.smarts + ability.smartsBonus;
    }
    if (ability.moneyGain) {
      updates.money = (updates.money ?? player.money) + ability.moneyGain;
    }

    let message = `${ability.name} successful.`;
    
    if (ability.risk && rollChance(ability.risk)) {
      message = `${ability.name} went wrong! Attracted unwanted attention.`;
      
      if (ability.scpRisk && rollChance(ability.scpRisk)) {
        updates.scpContained = true;
        updates.scpDesignation = generateSCPDesignation(player.occult);
        updates.job = null;
        message = `Captured by SCP Foundation! Designated ${updates.scpDesignation}`;
      }
    }

    applyAction(updates, message, 'Occult');
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
            
            if (rollChance(0.6)) {
              applyAction(
                { money: player.money - 75000, occult: "Human", occultMeter: 50 },
                'The cure worked! You are human again.',
                'Medical'
              );
            } else {
              applyAction(
                { money: player.money - 75000, health: player.health - 30 },
                'The cure failed and damaged your health!',
                'Medical'
              );
            }
            hideModal();
          },
          disabled: player.money < 75000,
        },
        { text: 'Too risky', action: () => hideModal() },
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
    
    addLog('Exported life archive to file.', 'System');
  };

  const searchForArtifact = () => {
    if (player.money < 1500) {
      addLog("Can't afford to chase occult leads right now.", 'Artifact');
      return;
    }

    if (rollChance(0.45) && addArtifact(null, { money: player.money - 1500, smarts: player.smarts + 1 })) {
      return;
    }

    applyAction(
      { money: player.money - 1500, smarts: player.smarts + 1 },
      'Followed rumors through estate sales, forums, and locked basements. No real artifact surfaced this time.',
      'Artifact'
    );
    if ((player.artifacts || []).length >= 5) {
      addLog('No real artifact surfaced this time.', 'Artifact');
    }
  };

  const supportFaction = (factionId) => {
    const faction = factionTemplates[factionId];
    if (!faction) return;
    updateFaction(factionId, 8, `You helped ${faction.name}. They will remember it.`);
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
                  {ability.risk ? ` • Risk: ${Math.round(ability.risk * 100)}%` : ''}
                  {ability.scpRisk ? ` • SCP Risk: ${Math.round(ability.scpRisk * 100)}%` : ''}
                  {ability.cost ? ` • Cost: $${ability.cost.toLocaleString()}` : ''}
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

      <h3 className={styles.sectionTitle}>Artifacts</h3>

      <div className={styles.listRow}>
        <div className={styles.listInfo}>
          <strong>Curio Hunt</strong>
          <small>Spend $1,500 following leads for strange relics</small>
        </div>
        <Button size="small" onClick={searchForArtifact} disabled={player.money < 1500}>
          Search
        </Button>
      </div>

      {player.artifacts?.length > 0 ? (
        player.artifacts.map(artifact => (
          <div key={artifact.id} className={styles.listRow}>
            <div className={styles.listInfo}>
              <strong>{artifact.name}</strong>
              <small>
                {artifact.rarity} â€¢ Found at age {artifact.foundAt} â€¢ {artifact.description}
              </small>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.empty}>No artifacts discovered.</div>
      )}

      <h3 className={styles.sectionTitle}>Factions</h3>

      {Object.values(factionTemplates).map(faction => (
        <div key={faction.id} className={styles.listRow}>
          <div className={styles.listInfo}>
            <strong>{faction.name}</strong>
            <small>
              Standing: {(player.factions || {})[faction.id] || 0} â€¢ {faction.description}
            </small>
          </div>
          <Button size="small" onClick={() => supportFaction(faction.id)}>
            Help
          </Button>
        </div>
      ))}

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
