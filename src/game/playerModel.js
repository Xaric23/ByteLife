import { getRandomName } from '../data/names';
import { createInitialFactions, secretTemplates, rivalTemplates } from '../data/storySystems';
import { safeUUID, clampPlayerStats, randomItem } from '../utils/helpers';

export const createInitialPlayer = (anatomy = "Male", orientation = "Straight") => ({
  name: getRandomName(anatomy === "Both" ? (Math.random() > 0.5 ? "Male" : "Female") : anatomy),
  age: 0,
  happiness: 85,
  health: 90,
  smarts: 55,
  social: 55,
  money: 6000,
  job: null,
  alive: true,
  logs: [],
  sessionLogs: [],
  anatomy,
  orientation,
  inPrison: false,
  prisonYearsLeft: 0,
  portfolio: {},
  properties: [],
  vehicles: [],
  occult: "Human",
  occultMeter: 50,
  country: "USA",
  education: "None",
  enrolledEducation: null,
  educationYearsLeft: 0,
  studentDebt: 0,
  scpContained: false,
  scpDesignation: null,
  family: [
    { id: safeUUID(), name: getRandomName("Female"), relationship: 80, type: "Parent", role: "Mother", occult: "Human", alive: true, age: 25 },
    { id: safeUUID(), name: getRandomName("Male"), relationship: 75, type: "Parent", role: "Father", occult: "Human", alive: true, age: 27 },
  ],
  children: [],
  partners: [],
  karma: 50,
  criminalRecord: [],
  achievements: [],
  yearsPlayed: 0,
  rivals: [],
  secrets: [],
  artifacts: [],
  factions: createInitialFactions(),
  reputation: "Unknown",
});

export const normalizePlayer = (player) => {
  if (!player) return player;

  const normalized = {
    ...player,
    rivals: player.rivals || [],
    secrets: player.secrets || [],
    artifacts: player.artifacts || [],
    factions: { ...createInitialFactions(), ...(player.factions || {}) },
    reputation: player.reputation || 'Unknown',
  };

  return clampPlayerStats(normalized);
};

export const getMissingAutomaticSecrets = (player) =>
  secretTemplates
    .filter((secret) => secret.condition(player))
    .filter((secret) => !(player.secrets || []).some((owned) => owned.id === secret.id))
    .map((secret) => ({ ...secret, discoveredAt: player.age, exposed: false }));

export const createRival = (player) => {
  const eligible = rivalTemplates.filter((rival) => {
    if (player.age < rival.minAge || player.age > rival.maxAge) return false;
    if (rival.requiresOccult && player.occult === 'Human') return false;
    return true;
  });
  const template = randomItem(eligible);
  if (!template) return null;

  return {
    id: safeUUID(),
    name: getRandomName(Math.random() > 0.5 ? 'Male' : 'Female'),
    type: template.type,
    hostility: template.hostility,
    history: [`Became your ${template.type.toLowerCase()}.`],
    exposedSecretId: null,
  };
};
