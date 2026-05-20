export const occultTypes = {
  Human: {
    id: "Human",
    name: "Human",
    description: "Regular mortal human",
    meterName: "Happiness",
    meterIcon: "😊",
    meterColor: "#ff007f",
    meterDecay: 0,
    healthDecay: { min: 0, max: 5 },
    canAge: true,
    canDieOfAge: true,
    scpRisk: 0,
    abilities: [],
    weaknesses: [],
  },
  
  Vampire: {
    id: "Vampire",
    name: "Vampire",
    description: "Immortal bloodsucker of the night",
    meterName: "Blood Thirst",
    meterIcon: "🩸",
    meterColor: "#9a031e",
    meterDecay: 15,
    healthDecay: { min: 0, max: 0 },
    healthPenaltyThreshold: 15,
    healthPenalty: 35,
    canAge: false,
    canDieOfAge: false,
    scpRisk: 0.12,
    abilities: [
      { id: "feed", name: "Hunt for Blood", description: "Stalk the night for victims", meterRestore: 45, risk: 0.08 },
      { id: "seduce", name: "Seductive Bite", description: "Charm a willing victim", meterRestore: 30, risk: 0.02 },
      { id: "blood_bank", name: "Rob Blood Bank", description: "Break into medical storage", meterRestore: 60, risk: 0.15 },
    ],
    weaknesses: ["Sunlight exposure", "Holy symbols", "Garlic sensitivity"],
    transformMethods: ["Bitten by vampire", "Ancient ritual", "Cursed artifact"],
  },
  
  Werewolf: {
    id: "Werewolf",
    name: "Werewolf",
    description: "Cursed to transform under the full moon",
    meterName: "Primal Fury",
    meterIcon: "🐺",
    meterColor: "#e36414",
    meterDecay: -10,
    healthDecay: { min: 0, max: 5 },
    furyThreshold: 90,
    canAge: true,
    canDieOfAge: true,
    scpRisk: 0.18,
    abilities: [
      { id: "hunt", name: "Wilderness Hunt", description: "Hunt prey in the wild", meterChange: -25, healthRestore: 15, risk: 0.05 },
      { id: "rampage", name: "Urban Rampage", description: "Let the beast loose in the city", meterChange: -50, risk: 0.35, scpRisk: 0.25 },
      { id: "meditate", name: "Meditation", description: "Suppress the beast within", meterChange: -15, risk: 0 },
    ],
    weaknesses: ["Silver weapons", "Full moon compulsion", "Wolfsbane"],
    transformMethods: ["Bitten by werewolf", "Family curse", "Dark ritual"],
  },
  
  Zombie: {
    id: "Zombie",
    name: "Zombie",
    description: "Reanimated corpse driven by hunger",
    meterName: "Decay Prevention",
    meterIcon: "🧠",
    meterColor: "#4f772d",
    meterDecay: 20,
    healthDecay: { min: 0, max: 0 },
    healthPenaltyThreshold: 10,
    healthPenalty: 40,
    canAge: false,
    canDieOfAge: false,
    scpRisk: 0.20,
    abilities: [
      { id: "feast", name: "Feast on Flesh", description: "Hunt the living", meterRestore: 50, risk: 0.25, scpRisk: 0.20 },
      { id: "morgue", name: "Raid Morgue", description: "Consume the already dead", meterRestore: 35, risk: 0.12 },
      { id: "preserve", name: "Chemical Preservation", description: "Apply preservation chemicals", meterRestore: 20, cost: 5000, risk: 0 },
    ],
    weaknesses: ["Brain destruction", "Fire", "Continuous decay"],
    transformMethods: ["Bitten by zombie", "Experimental virus", "Necromantic ritual"],
    jobRestrictions: true,
  },
  
  Ghoul: {
    id: "Ghoul",
    name: "Ghoul",
    description: "Graveyard dweller feeding on the dead",
    meterName: "Grave Sanity",
    meterIcon: "🪦",
    meterColor: "#6c584c",
    meterDecay: 15,
    healthDecay: { min: 0, max: 2 },
    canAge: true,
    canDieOfAge: false,
    scpRisk: 0.10,
    abilities: [
      { id: "exhume", name: "Exhume Corpse", description: "Dig up fresh graves", meterRestore: 40, risk: 0.08 },
      { id: "crypt", name: "Crypt Dwelling", description: "Rest in consecrated ground", meterRestore: 25, healthRestore: 10, risk: 0 },
      { id: "funeral", name: "Funeral Stalking", description: "Follow funeral processions", meterRestore: 30, risk: 0.05 },
    ],
    weaknesses: ["Sunlight discomfort", "Holy ground burns", "Detection by smell"],
    transformMethods: ["Consuming cursed flesh", "Burial ground corruption", "Dark pact"],
  },
  
  Demon: {
    id: "Demon",
    name: "Demon",
    description: "Infernal entity bound to mortal flesh",
    meterName: "Soul Energy",
    meterIcon: "👹",
    meterColor: "#d00000",
    meterDecay: 12,
    healthDecay: { min: 0, max: 0 },
    canAge: false,
    canDieOfAge: false,
    scpRisk: 0.15,
    abilities: [
      { id: "corrupt", name: "Corrupt Soul", description: "Harvest soul energy through corruption", meterRestore: 35, socialPenalty: 10, risk: 0.05 },
      { id: "deal", name: "Soul Bargain", description: "Make a deal for a piece of someone's soul", meterRestore: 50, moneyGain: 10000, risk: 0.08 },
      { id: "torment", name: "Psychological Torment", description: "Feed on suffering", meterRestore: 25, risk: 0.03 },
      { id: "possession", name: "Temporary Possession", description: "Briefly possess a mortal", meterRestore: 60, risk: 0.20, scpRisk: 0.15 },
    ],
    weaknesses: ["Holy water", "Exorcism rituals", "Sacred symbols", "True names"],
    transformMethods: ["Demonic possession", "Faustian bargain", "Hellgate exposure"],
  },
  
  Fae: {
    id: "Fae",
    name: "Fae",
    description: "Ancient fairy creature of the otherworld",
    meterName: "Glamour",
    meterIcon: "✨",
    meterColor: "#9d4edd",
    meterDecay: 8,
    healthDecay: { min: 0, max: 0 },
    canAge: false,
    canDieOfAge: false,
    scpRisk: 0.08,
    abilities: [
      { id: "enchant", name: "Enchant Mortal", description: "Weave glamour around a human", meterRestore: 30, socialBonus: 15, risk: 0.02 },
      { id: "revels", name: "Fairy Revels", description: "Dance under moonlight", meterRestore: 40, happinessBonus: 20, risk: 0 },
      { id: "bargain", name: "Fae Bargain", description: "Trade favors for essence", meterRestore: 35, risk: 0.05 },
      { id: "steal", name: "Steal Creativity", description: "Siphon artistic inspiration", meterRestore: 25, smartsBonus: 5, risk: 0.03 },
    ],
    weaknesses: ["Cold iron", "Broken promises", "Saying 'thank you'", "Salt circles"],
    transformMethods: ["Changeling swap", "Eating fairy food", "Fae blessing/curse"],
  },
  
  Revenant: {
    id: "Revenant",
    name: "Revenant",
    description: "Vengeful spirit returned from death",
    meterName: "Vengeance",
    meterIcon: "💀",
    meterColor: "#264653",
    meterDecay: 10,
    healthDecay: { min: 0, max: 0 },
    canAge: false,
    canDieOfAge: false,
    scpRisk: 0.12,
    hasVengeanceTarget: true,
    abilities: [
      { id: "haunt", name: "Haunt Target", description: "Terrorize your vengeance target", meterRestore: 40, risk: 0.10 },
      { id: "manifest", name: "Physical Manifestation", description: "Become corporeal temporarily", meterRestore: 20, risk: 0.05 },
      { id: "possess_object", name: "Possess Object", description: "Inhabit an object to regain strength", meterRestore: 30, risk: 0 },
      { id: "death_touch", name: "Death's Touch", description: "Drain life from the living", meterRestore: 50, healthRestore: 20, risk: 0.15 },
    ],
    weaknesses: ["Completion of vengeance", "Salt", "Burning remains", "Forgiveness"],
    transformMethods: ["Murdered unjustly", "Dying with unfinished business", "Necromantic binding"],
  },
  
  Wendigo: {
    id: "Wendigo",
    name: "Wendigo",
    description: "Cannibalistic spirit of endless hunger",
    meterName: "Eternal Hunger",
    meterIcon: "🦌",
    meterColor: "#2d3a3a",
    meterDecay: 25,
    healthDecay: { min: 0, max: 0 },
    healthPenaltyThreshold: 20,
    healthPenalty: 30,
    canAge: false,
    canDieOfAge: false,
    scpRisk: 0.25,
    abilities: [
      { id: "consume", name: "Consume Human", description: "Give in to the hunger completely", meterRestore: 70, risk: 0.30, scpRisk: 0.35 },
      { id: "hunt_animals", name: "Hunt Large Game", description: "Partially sate hunger with animals", meterRestore: 25, risk: 0.05 },
      { id: "frozen_trance", name: "Frozen Trance", description: "Enter dormancy to slow hunger", meterRestore: 15, risk: 0 },
    ],
    weaknesses: ["Fire", "Silver", "Starvation drives madness"],
    transformMethods: ["Cannibalism in desperation", "Wendigo curse", "Spirit possession"],
  },

  Abomination: {
    id: "Abomination",
    name: "Abomination",
    description: "Hybrid monstrosity of multiple occult bloodlines",
    meterName: "Stability",
    meterIcon: "⚡",
    meterColor: "#45f3ff",
    meterDecay: 10,
    healthDecay: { min: 0, max: 0 },
    healthPenaltyThreshold: 20,
    healthPenalty: 20,
    canAge: false,
    canDieOfAge: false,
    scpRisk: 0.30,
    isHybrid: true,
    abilities: [
      { id: "unstable_power", name: "Unstable Power", description: "Channel chaotic hybrid energy", meterRestore: 40, risk: 0.15 },
      { id: "adapt", name: "Adaptive Feeding", description: "Feed in whatever way sustains you", meterRestore: 35, risk: 0.10 },
    ],
    weaknesses: ["Genetic instability", "Multiple vulnerabilities", "SCP priority target"],
    transformMethods: ["Born of two different occult parents"],
  },

  Alien: {
    id: "Alien",
    name: "Alien",
    description: "Extraterrestrial being or human modified by alien technology",
    meterName: "Cosmic Energy",
    meterIcon: "👽",
    meterColor: "#00ff88",
    meterDecay: 8,
    healthDecay: { min: 0, max: 0 },
    canAge: false,
    canDieOfAge: false,
    scpRisk: 0.20,
    abilities: [
      { id: "telepathy", name: "Telepathic Probe", description: "Read and influence mortal minds", meterRestore: 30, smartsBonus: 5, risk: 0.05 },
      { id: "abduct", name: "Conduct Abduction", description: "Abduct humans for experimentation", meterRestore: 45, risk: 0.15, scpRisk: 0.20 },
      { id: "tech_harvest", name: "Harvest Technology", description: "Steal advanced tech from facilities", meterRestore: 35, moneyGain: 25000, risk: 0.20 },
      { id: "beacon", name: "Contact Mothership", description: "Recharge via orbital energy beam", meterRestore: 60, risk: 0.08, scpRisk: 0.12 },
    ],
    weaknesses: ["Earth pathogens", "Electromagnetic interference", "Government black sites"],
    transformMethods: ["Alien abduction experimentation", "Implant integration", "Genetic hybridization"],
  },
};

export const scpDesignations = {
  standard: { prefix: "SCP-", range: [100, 999], suffix: "" },
  dangerous: { prefix: "SCP-", range: [1000, 4999], suffix: "" },
  keter: { prefix: "SCP-", range: [1000, 4999], suffix: "-KETER" },
  apollyon: { prefix: "SCP-", range: [5000, 8999], suffix: "-APOLLYON" },
};

export const generateSCPDesignation = (occultType) => {
  const highThreat = ["Abomination", "Wendigo", "Demon"];
  const template = highThreat.includes(occultType) 
    ? (Math.random() < 0.3 ? scpDesignations.apollyon : scpDesignations.keter)
    : (Math.random() < 0.2 ? scpDesignations.keter : scpDesignations.standard);
  
  const number = Math.floor(Math.random() * (template.range[1] - template.range[0])) + template.range[0];
  return `${template.prefix}${number}${template.suffix}`;
};

export const supernaturalEvents = [
  {
    id: "vampire_attack",
    name: "Vampire Attack",
    description: "A pale figure emerges from the shadows, fangs gleaming...",
    resultOccult: "Vampire",
    minAge: 16,
    weight: 1,
  },
  {
    id: "werewolf_bite",
    name: "Werewolf Bite", 
    description: "Under the full moon, a massive wolf-like creature attacks you...",
    resultOccult: "Werewolf",
    minAge: 16,
    weight: 1,
  },
  {
    id: "zombie_outbreak",
    name: "Zombie Outbreak",
    description: "An infected entity breaches containment and bites you...",
    resultOccult: "Zombie",
    minAge: 16,
    weight: 0.8,
  },
  {
    id: "ghoul_curse",
    name: "Graveyard Curse",
    description: "Wandering through an old cemetery, something ancient stirs beneath...",
    resultOccult: "Ghoul",
    minAge: 18,
    weight: 0.7,
  },
  {
    id: "demon_deal",
    name: "Crossroads Deal",
    description: "A mysterious figure offers you a deal too good to refuse...",
    resultOccult: "Demon",
    minAge: 21,
    weight: 0.5,
  },
  {
    id: "fae_touched",
    name: "Fairy Ring",
    description: "You stumble into a ring of mushrooms and the world shifts...",
    resultOccult: "Fae",
    minAge: 16,
    weight: 0.6,
  },
  {
    id: "wendigo_curse",
    name: "Starvation Curse",
    description: "Lost in the wilderness, desperate hunger takes hold...",
    resultOccult: "Wendigo",
    minAge: 21,
    weight: 0.3,
  },
  {
    id: "alien_abduction",
    name: "Alien Abduction",
    description: "A blinding light descends from the sky. You wake up... different.",
    resultOccult: "Alien",
    minAge: 16,
    weight: 0.8,
  },
];

export const getRandomSupernaturalEvent = (playerAge) => {
  const eligible = supernaturalEvents.filter(e => playerAge >= e.minAge);
  if (eligible.length === 0) return null;
  
  const totalWeight = eligible.reduce((sum, e) => sum + e.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const event of eligible) {
    random -= event.weight;
    if (random <= 0) return event;
  }
  
  return eligible[eligible.length - 1];
};
