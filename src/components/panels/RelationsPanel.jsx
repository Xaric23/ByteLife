import { useGame } from '../../context/GameContext';
import { getRandomName, getRandomFirstName } from '../../data/names';
import { occultTypes } from '../../data/occults';
import { Button } from '../ui';
import styles from './Panel.module.css';

export default function RelationsPanel() {
  const { player, updatePlayer, addLog, showModal, saveGame } = useGame();

  if (!player) return null;

  const chatWith = (index) => {
    const member = player.family[index];
    const newFamily = [...player.family];
    newFamily[index] = {
      ...member,
      relationship: Math.min(100, member.relationship + 15),
    };
    updatePlayer({ family: newFamily, social: player.social + 5 });
    addLog(`Had a nice conversation with ${member.name}.`, 'Social');
    saveGame();
  };

  const attemptIntimacy = (index) => {
    const partner = player.family[index];
    updatePlayer({ happiness: Math.min(100, player.happiness + 20) });
    
    const isParentOccult = player.occult !== "Human";
    const isPartnerOccult = partner.occult !== "Human";
    
    if (Math.random() < 0.25) {
      const childGender = Math.random() > 0.5 ? "Male" : "Female";
      const childName = `${getRandomFirstName(childGender)} ${player.name.split(" ")[1]}`;
      
      let inheritedOccult = "Human";
      let hybridCarrier = false;
      let mutationAwakened = false;
      
      if (isParentOccult && isPartnerOccult && player.occult !== partner.occult) {
        if (Math.random() < 0.05) {
          inheritedOccult = "Abomination";
          mutationAwakened = true;
        } else {
          inheritedOccult = Math.random() > 0.5 ? player.occult : partner.occult;
          mutationAwakened = true;
        }
      } else if (isParentOccult || isPartnerOccult) {
        const activeStrain = isParentOccult ? player.occult : partner.occult;
        if (Math.random() < 0.45) {
          hybridCarrier = true;
          inheritedOccult = activeStrain;
          mutationAwakened = Math.random() > 0.5;
        }
      }
      
      const newChild = {
        id: crypto.randomUUID(),
        name: childName,
        age: 0,
        gender: childGender,
        hybridMutationCarrier: hybridCarrier,
        mutationAwakened,
        inheritedOccultStrain: inheritedOccult,
      };
      
      updatePlayer({ children: [...player.children, newChild] });
      addLog(`${partner.name} gave birth to ${childName}!`, 'Family');
    } else {
      addLog(`Spent intimate time with ${partner.name}.`, 'Relationship');
    }
    saveGame();
  };

  const openDating = () => {
    if (player.age < 18) {
      addLog("You're too young to date!", 'Dating');
      return;
    }
    
    const partnerGender = player.orientation === "Straight" 
      ? (player.anatomy === "Male" ? "Female" : "Male")
      : (Math.random() > 0.5 ? "Male" : "Female");
    
    const partnerName = getRandomName(partnerGender);
    let partnerOccult = "Human";
    
    if (Math.random() < 0.15) {
      const options = ["Vampire", "Werewolf", "Ghoul", "Fae"];
      partnerOccult = options[Math.floor(Math.random() * options.length)];
    }
    
    showModal({
      title: 'Dating App Match',
      description: `You matched with ${partnerName}${partnerOccult !== "Human" ? ` (${partnerOccult})` : ''}! Start a relationship?`,
      options: [
        {
          text: 'Start Relationship',
          action: () => {
            const newPartner = {
              id: crypto.randomUUID(),
              name: partnerName,
              relationship: 75,
              type: 'Partner',
              occult: partnerOccult,
              alive: true,
              age: player.age + Math.floor(Math.random() * 10) - 5,
            };
            updatePlayer({ family: [...player.family, newPartner] });
            addLog(`Started dating ${partnerName}!`, 'Dating');
            saveGame();
          },
        },
        { text: 'Pass', action: () => {} },
      ],
    });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Family & Relationships</h3>
        <Button size="small" onClick={openDating} disabled={player.age < 18}>
          💕 Dating App
        </Button>
      </div>

      {player.family.map((member, index) => (
        <div key={member.id || index} className={styles.listRow}>
          <div className={styles.listInfo}>
            <strong>{member.name}</strong>
            <small>
              {member.type}{member.role ? ` (${member.role})` : ''} • 
              {member.occult !== "Human" ? ` ${member.occult} •` : ''} 
              {' '}Relationship: {member.relationship}%
              {member.age !== undefined && ` • Age ${member.age}`}
            </small>
          </div>
          <div className={styles.actions}>
            <Button size="small" onClick={() => chatWith(index)}>💬 Talk</Button>
            {member.type === 'Partner' && (
              <Button size="small" variant="success" onClick={() => attemptIntimacy(index)}>
                💋 Intimacy
              </Button>
            )}
          </div>
        </div>
      ))}

      {player.children.length > 0 && (
        <>
          <h3 className={styles.sectionTitle} style={{ marginTop: '20px' }}>Children</h3>
          {player.children.map((child, index) => {
            const statusLabel = child.mutationAwakened 
              ? `Active ${child.inheritedOccultStrain}` 
              : (child.hybridMutationCarrier ? 'Carrier (dormant)' : 'Human');
            
            return (
              <div key={child.id || index} className={styles.listRow}>
                <div className={styles.listInfo}>
                  <strong>{child.name}</strong>
                  <small>Age {child.age} • {statusLabel}</small>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
