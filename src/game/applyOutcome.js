import { artifactTemplates, secretTemplates, createInitialFactions } from '../data/storySystems';
import { clampPlayerStats } from '../utils/helpers';

export function applyOutcomeToPlayer(player, outcome) {
  if (!player || !outcome) return player;
  
  const updates = {};

  const applyEffects = (effects) => {
    if (!effects) return;

    Object.entries(effects).forEach(([key, value]) => {
      if (key === 'money') {
        updates.money = (updates.money ?? player.money ?? 0) + value;
      } else if (['happiness', 'health', 'smarts', 'social', 'karma'].includes(key)) {
        updates[key] = (updates[key] ?? player[key] ?? 50) + value;
      } else if (key === 'artifact') {
        const artifact = artifactTemplates.find(item => item.id === value);
        if (artifact && !player.artifacts?.some(item => item.id === artifact.id)) {
          const base = updates.artifacts || player.artifacts || [];
          updates.artifacts = [...base, { ...artifact, foundAt: player.age }];
        }
      } else if (key === 'secret') {
        const secret = secretTemplates.find(item => item.id === value);
        if (secret && !player.secrets?.some(item => item.id === secret.id)) {
          const base = updates.secrets || player.secrets || [];
          updates.secrets = [...base, { ...secret, discoveredAt: player.age, exposed: false }];
        }
      } else if (key === 'factions') {
        const existing = updates.factions || player.factions || createInitialFactions();
        const nextFactions = { ...existing };
        Object.entries(value).forEach(([id, amount]) => {
          nextFactions[id] = Math.max(-100, Math.min(100, (nextFactions[id] || 0) + amount));
        });
        updates.factions = nextFactions;
      }
    });
  };

  applyEffects(outcome.effects);

  if (outcome.artifact) {
    applyEffects({ artifact: outcome.artifact });
  }
  if (outcome.secret) {
    applyEffects({ secret: outcome.secret });
  }
  if (outcome.factions) {
    applyEffects({ factions: outcome.factions });
  }

  if (outcome.transform) {
    updates.occult = outcome.transform;
    updates.occultMeter = 70;
  }

  if (outcome.escape) {
    updates.scpContained = false;
  }

  return clampPlayerStats({ ...player, ...updates });
}
