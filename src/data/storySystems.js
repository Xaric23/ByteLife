export const factionTemplates = {
  foundation: {
    id: 'foundation',
    name: 'SCP Foundation',
    description: 'Containment agents tracking anomalous threats.',
    min: -100,
    max: 100,
  },
  serpentHand: {
    id: 'serpentHand',
    name: "Serpent's Hand",
    description: 'Occult liberation cells hiding anomalies from containment.',
    min: -100,
    max: 100,
  },
  nightCourt: {
    id: 'nightCourt',
    name: 'Night Court',
    description: 'A quiet aristocracy of vampires, fae, and old monsters.',
    min: -100,
    max: 100,
  },
  hunterOrder: {
    id: 'hunterOrder',
    name: 'Hunter Order',
    description: 'Human monster hunters with silver, salt, and grudges.',
    min: -100,
    max: 100,
  },
};

export const createInitialFactions = () =>
  Object.fromEntries(
    Object.values(factionTemplates).map((faction) => [faction.id, 0])
  );

export const secretTemplates = [
  {
    id: 'occult_identity',
    title: 'Occult Identity',
    description: 'Your supernatural nature is hidden from the public.',
    heat: 35,
    condition: (player) => player.occult !== 'Human',
  },
  {
    id: 'scp_escapee',
    title: 'SCP Escapee',
    description: 'The Foundation has paperwork with your name on it.',
    heat: 55,
    condition: (player) => player.scpDesignation && !player.scpContained,
  },
  {
    id: 'forbidden_artifact',
    title: 'Forbidden Artifact',
    description: 'You possess an object that should not exist.',
    heat: 30,
    condition: (player) => (player.artifacts || []).some((artifact) => artifact.rarity === 'rare'),
  },
];

export const artifactTemplates = [
  {
    id: 'moon_silver_blade',
    name: 'Moon-Silver Blade',
    rarity: 'rare',
    description: 'A hunter-forged knife that makes predators think twice.',
    effects: { health: 4, social: -2 },
    factionEffects: { hunterOrder: 8, nightCourt: -8 },
  },
  {
    id: 'scrying_mirror',
    name: 'Scrying Mirror',
    rarity: 'rare',
    description: 'Shows one possible disaster before it arrives.',
    effects: { smarts: 6, happiness: -4 },
    factionEffects: { serpentHand: 6, foundation: -5 },
  },
  {
    id: 'blood_chalice',
    name: 'Blood Chalice',
    rarity: 'uncommon',
    description: 'An old cup that hums near hungry things.',
    effects: { occultMeter: 12, health: -2 },
    factionEffects: { nightCourt: 10 },
  },
  {
    id: 'cursed_coin',
    name: 'Cursed Coin',
    rarity: 'uncommon',
    description: 'Luck favors you, then asks for interest.',
    effects: { money: 7500, karma: -8 },
    factionEffects: {},
  },
  {
    id: 'soul_jar',
    name: 'Soul Jar',
    rarity: 'rare',
    description: 'Warm glass, whispering contents, terrible resale value.',
    effects: { health: 8, karma: -15 },
    factionEffects: { foundation: -12, nightCourt: 6 },
  },
];

export const rivalTemplates = [
  { type: 'School Rival', minAge: 8, maxAge: 18, hostility: 35 },
  { type: 'Workplace Rival', minAge: 18, maxAge: 70, hostility: 40 },
  { type: 'Occult Rival', minAge: 16, maxAge: 90, hostility: 50, requiresOccult: true },
  { type: 'Hunter Nemesis', minAge: 18, maxAge: 90, hostility: 65, requiresOccult: true },
  { type: 'Ex-Friend', minAge: 14, maxAge: 90, hostility: 30 },
];
