import { useGame } from '../../context/GameContext';
import { getRandomName, getRandomFirstName } from '../../data/names';
import { Button } from '../ui';
import { safeUUID, safeParseName } from '../../utils/helpers';
import styles from './Panel.module.css';

export default function RelationsPanel() {
  const { player, applyAction, addLog, showModal, hideModal } = useGame();

  if (!player) return null;

  const chatWith = (index) => {
    const member = player.family?.[index];
    if (!member) return;
    
    const newFamily = [...player.family];
    newFamily[index] = {
      ...member,
      relationship: Math.min(100, member.relationship + 15),
    };
    
    applyAction(
      { family: newFamily, social: player.social + 5 },
      `Had a nice conversation with ${member.name}.`,
      'Social'
    );
  };

  const attemptIntimacy = (index) => {
    if (player.age < 18) {
      addLog("You're too young for that.", 'System');
      return;
    }
    
    const partner = player.family?.[index];
    if (!partner || partner.type !== 'Partner') return;
    
    const updates = { happiness: player.happiness + 20 };
    
    const isParentOccult = player.occult !== "Human";
    const isPartnerOccult = partner.occult !== "Human";
    
    if (Math.random() < 0.25) {
      const childGender = Math.random() > 0.5 ? "Male" : "Female";
      const { last } = safeParseName(player.name);
      const childName = `${getRandomFirstName(childGender)} ${last}`.trim();
      
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
        id: safeUUID(),
        name: childName,
        age: 0,
        gender: childGender,
        hybridMutationCarrier: hybridCarrier,
        mutationAwakened,
        inheritedOccultStrain: inheritedOccult,
      };
      
      updates.children = [...(player.children || []), newChild];
      applyAction(updates, `${partner.name} gave birth to ${childName}!`, 'Family');
    } else {
      applyAction(updates, `Spent intimate time with ${partner.name}.`, 'Relationship');
    }
  };

  const openDating = () => {
    if (player.age < 18) {
      addLog("You're too young to date!", 'Dating');
      return;
    }
    
    let partnerGender;
    if (player.orientation === "Straight") {
      partnerGender = player.anatomy === "Male" ? "Female" : "Male";
    } else if (player.orientation === "Gay") {
      partnerGender = player.anatomy === "Male" ? "Male" : "Female";
    } else {
      partnerGender = Math.random() > 0.5 ? "Male" : "Female";
    }
    
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
              id: safeUUID(),
              name: partnerName,
              relationship: 75,
              type: 'Partner',
              occult: partnerOccult,
              alive: true,
              age: Math.max(18, player.age + Math.floor(Math.random() * 10) - 5),
            };
            applyAction(
              { family: [...player.family, newPartner] },
              `Started dating ${partnerName}!`,
              'Dating'
            );
            hideModal();
          },
        },
        { text: 'Pass', action: () => hideModal() },
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

      {player.family?.length === 0 && (
        <div className={styles.empty}>No family members.</div>
      )}

      {player.family?.map((member, index) => (
        <div key={member.id || index} className={styles.listRow}>
          <div className={styles.listInfo}>
            <strong>
              {member.name}
              {!member.alive && ' (deceased)'}
            </strong>
            <small>
              {member.type}{member.role ? ` (${member.role})` : ''} • 
              {member.occult !== "Human" ? ` ${member.occult} •` : ''} 
              {' '}Relationship: {member.relationship}%
              {member.age !== undefined && ` • Age ${member.age}`}
            </small>
          </div>
          {member.alive && (
            <div className={styles.actions}>
              <Button size="small" onClick={() => chatWith(index)}>💬 Talk</Button>
              {member.type === 'Partner' && player.age >= 18 && (
                <Button size="small" variant="success" onClick={() => attemptIntimacy(index)}>
                  💋 Intimacy
                </Button>
              )}
            </div>
          )}
        </div>
      ))}

      {player.children?.length > 0 && (
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
