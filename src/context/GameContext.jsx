import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { occultTypes, generateSCPDesignation, getRandomSupernaturalEvent } from '../data/occults';
import { getRandomName } from '../data/names';

const SAVE_KEY_PREFIX = 'bytelife_slot_';
const SLOTS_INDEX_KEY = 'bytelife_slots_index';
const CURRENT_SLOT_KEY = 'bytelife_current_slot';

const createInitialPlayer = (anatomy = "Male", orientation = "Straight") => ({
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
    { id: crypto.randomUUID(), name: getRandomName("Female"), relationship: 80, type: "Parent", role: "Mother", occult: "Human", alive: true, age: 25 },
    { id: crypto.randomUUID(), name: getRandomName("Male"), relationship: 75, type: "Parent", role: "Father", occult: "Human", alive: true, age: 27 },
  ],
  children: [],
  partners: [],
  karma: 50,
  criminalRecord: [],
  achievements: [],
  yearsPlayed: 0,
});

const initialState = {
  player: null,
  currentSlot: null,
  slots: [],
  gamePhase: 'menu',
  modal: null,
  activeTab: 'log',
  marketPrices: {},
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'LOAD_SLOTS':
      return { ...state, slots: action.slots };
    
    case 'SET_CURRENT_SLOT':
      return { ...state, currentSlot: action.slot };
    
    case 'START_NEW_GAME':
      return {
        ...state,
        player: createInitialPlayer(action.anatomy, action.orientation),
        gamePhase: 'playing',
      };
    
    case 'LOAD_GAME':
      return {
        ...state,
        player: action.player,
        currentSlot: action.slot,
        gamePhase: 'playing',
      };
    
    case 'UPDATE_PLAYER':
      return {
        ...state,
        player: { ...state.player, ...action.updates },
      };
    
    case 'ADD_LOG':
      return {
        ...state,
        player: {
          ...state.player,
          logs: [...state.player.logs, `[Age ${state.player.age}] ${action.message}`],
          sessionLogs: [...state.player.sessionLogs, {
            age: state.player.age,
            time: new Date().toLocaleTimeString(),
            money: state.player.money,
            action: action.actionName || 'Event',
            outcome: action.message,
          }],
        },
      };
    
    case 'SET_TAB':
      return { ...state, activeTab: action.tab };
    
    case 'SHOW_MODAL':
      return { ...state, modal: action.modal };
    
    case 'HIDE_MODAL':
      return { ...state, modal: null };
    
    case 'SET_GAME_PHASE':
      return { ...state, gamePhase: action.phase };
    
    case 'UPDATE_MARKET_PRICES':
      return { ...state, marketPrices: action.prices };
    
    case 'DEATH':
      return {
        ...state,
        player: { ...state.player, alive: false },
        gamePhase: 'death',
      };
    
    case 'SUCCESSION':
      return {
        ...state,
        player: action.newPlayer,
        gamePhase: 'playing',
      };
    
    case 'RESET_TO_MENU':
      return {
        ...state,
        player: null,
        currentSlot: null,
        gamePhase: 'menu',
        modal: null,
      };
    
    default:
      return state;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const slotsJson = localStorage.getItem(SLOTS_INDEX_KEY);
    const slots = slotsJson ? JSON.parse(slotsJson) : [];
    dispatch({ type: 'LOAD_SLOTS', slots });
  }, []);

  const saveGame = useCallback((slotId = state.currentSlot) => {
    if (!state.player || !slotId) return;
    
    const saveData = {
      player: state.player,
      savedAt: new Date().toISOString(),
      version: 1,
    };
    
    localStorage.setItem(`${SAVE_KEY_PREFIX}${slotId}`, JSON.stringify(saveData));
    
    let slots = JSON.parse(localStorage.getItem(SLOTS_INDEX_KEY) || '[]');
    const existingIndex = slots.findIndex(s => s.id === slotId);
    const slotInfo = {
      id: slotId,
      name: state.player.name,
      age: state.player.age,
      occult: state.player.occult,
      savedAt: saveData.savedAt,
    };
    
    if (existingIndex >= 0) {
      slots[existingIndex] = slotInfo;
    } else {
      slots.push(slotInfo);
    }
    
    localStorage.setItem(SLOTS_INDEX_KEY, JSON.stringify(slots));
    localStorage.setItem(CURRENT_SLOT_KEY, slotId);
    dispatch({ type: 'LOAD_SLOTS', slots });
    dispatch({ type: 'SET_CURRENT_SLOT', slot: slotId });
  }, [state.player, state.currentSlot]);

  const loadGame = useCallback((slotId) => {
    const saveJson = localStorage.getItem(`${SAVE_KEY_PREFIX}${slotId}`);
    if (!saveJson) return false;
    
    try {
      const saveData = JSON.parse(saveJson);
      dispatch({ type: 'LOAD_GAME', player: saveData.player, slot: slotId });
      localStorage.setItem(CURRENT_SLOT_KEY, slotId);
      return true;
    } catch {
      return false;
    }
  }, []);

  const deleteSlot = useCallback((slotId) => {
    localStorage.removeItem(`${SAVE_KEY_PREFIX}${slotId}`);
    let slots = JSON.parse(localStorage.getItem(SLOTS_INDEX_KEY) || '[]');
    slots = slots.filter(s => s.id !== slotId);
    localStorage.setItem(SLOTS_INDEX_KEY, JSON.stringify(slots));
    dispatch({ type: 'LOAD_SLOTS', slots });
  }, []);

  const startNewGame = useCallback((anatomy, orientation) => {
    const slotId = crypto.randomUUID();
    dispatch({ type: 'START_NEW_GAME', anatomy, orientation });
    dispatch({ type: 'SET_CURRENT_SLOT', slot: slotId });
    
    setTimeout(() => {
      const slotsJson = localStorage.getItem(SLOTS_INDEX_KEY);
      const slots = slotsJson ? JSON.parse(slotsJson) : [];
      dispatch({ type: 'LOAD_SLOTS', slots });
    }, 100);
  }, []);

  const addLog = useCallback((message, actionName = 'Event') => {
    dispatch({ type: 'ADD_LOG', message, actionName });
  }, []);

  const updatePlayer = useCallback((updates) => {
    dispatch({ type: 'UPDATE_PLAYER', updates });
  }, []);

  const clampStats = useCallback(() => {
    if (!state.player) return;
    const clamped = {};
    ['happiness', 'health', 'smarts', 'social', 'occultMeter'].forEach(stat => {
      if (state.player[stat] !== undefined) {
        clamped[stat] = Math.max(0, Math.min(100, state.player[stat]));
      }
    });
    if (Object.keys(clamped).length > 0) {
      dispatch({ type: 'UPDATE_PLAYER', updates: clamped });
    }
  }, [state.player]);

  const ageUp = useCallback(() => {
    if (!state.player?.alive) return;
    
    const player = state.player;
    const updates = { age: player.age + 1, yearsPlayed: player.yearsPlayed + 1 };
    
    if (player.job && !player.inPrison && !player.scpContained) {
      updates.money = (player.money || 0) + player.job.salary;
    }
    
    if (player.studentDebt > 0) {
      updates.studentDebt = Math.floor(player.studentDebt * 1.05);
      const payment = Math.min(updates.studentDebt, 5000);
      updates.money = (updates.money || player.money) - payment;
      updates.studentDebt -= payment;
    }
    
    if (player.enrolledEducation && player.educationYearsLeft > 0) {
      updates.educationYearsLeft = player.educationYearsLeft - 1;
      if (updates.educationYearsLeft <= 0) {
        updates.education = player.enrolledEducation;
        updates.enrolledEducation = null;
        addLog(`Graduated with a ${player.enrolledEducation} degree!`, 'Education');
      }
    }
    
    if (player.inPrison && player.prisonYearsLeft > 0) {
      updates.prisonYearsLeft = player.prisonYearsLeft - 1;
      if (updates.prisonYearsLeft <= 0) {
        updates.inPrison = false;
        addLog('Released from prison!', 'Prison');
      }
    }
    
    player.properties?.forEach(prop => {
      if (prop.rented) {
        updates.money = (updates.money || player.money) + (prop.baseRent * 12);
      }
      updates.money = (updates.money || player.money) - prop.upkeep;
    });
    
    player.vehicles?.forEach(vehicle => {
      updates.money = (updates.money || player.money) - vehicle.upkeep;
    });
    
    const occult = occultTypes[player.occult];
    if (occult && player.occult !== "Human") {
      updates.occultMeter = (player.occultMeter || 50) - (occult.meterDecay || 0);
      
      if (occult.healthPenaltyThreshold && updates.occultMeter <= occult.healthPenaltyThreshold) {
        updates.health = (player.health || 50) - (occult.healthPenalty || 0);
      }
      
      if (!player.scpContained && Math.random() < (occult.scpRisk || 0)) {
        updates.scpContained = true;
        updates.scpDesignation = generateSCPDesignation(player.occult);
        updates.job = null;
        addLog(`Captured by the SCP Foundation! Designated as ${updates.scpDesignation}`, 'SCP');
      }
    }
    
    if (occult?.healthDecay) {
      const decay = Math.floor(Math.random() * (occult.healthDecay.max - occult.healthDecay.min + 1)) + occult.healthDecay.min;
      updates.health = (updates.health || player.health) - decay;
    }
    
    player.family?.forEach((member, i) => {
      if (member.alive && member.age) {
        if (!updates.family) updates.family = [...player.family];
        updates.family[i] = { ...member, age: member.age + 1 };
      }
    });
    
    player.children?.forEach((child, i) => {
      if (!updates.children) updates.children = [...player.children];
      updates.children[i] = { ...child, age: child.age + 1 };
      
      if (child.hybridMutationCarrier && !child.mutationAwakened && child.age + 1 === 14) {
        updates.children[i].mutationAwakened = true;
        addLog(`${child.name} has awakened their latent ${child.inheritedOccultStrain} traits!`, 'Supernatural');
      }
    });
    
    dispatch({ type: 'UPDATE_PLAYER', updates });
    addLog('Another year passes...', 'Age');
    
    const newHealth = updates.health ?? player.health;
    const newAge = updates.age;
    
    if (newHealth <= 0) {
      dispatch({ type: 'DEATH' });
      return;
    }
    
    if (occult?.canDieOfAge && newAge > 80) {
      const deathChance = (newAge - 80) * 0.05;
      if (Math.random() < deathChance) {
        dispatch({ type: 'DEATH' });
        return;
      }
    }
    
    if (player.occult === "Human" && !player.scpContained && player.age > 16 && Math.random() < 0.04) {
      const event = getRandomSupernaturalEvent(player.age);
      if (event) {
        dispatch({
          type: 'SHOW_MODAL',
          modal: {
            title: event.name,
            description: event.description,
            options: [
              {
                text: `Accept the ${event.resultOccult} curse`,
                action: () => {
                  updatePlayer({ occult: event.resultOccult, occultMeter: 70 });
                  addLog(`Transformed into a ${event.resultOccult}!`, 'Supernatural');
                  dispatch({ type: 'HIDE_MODAL' });
                },
              },
              {
                text: 'Resist (50% chance)',
                action: () => {
                  if (Math.random() < 0.5) {
                    addLog('You fought off the supernatural influence!', 'Supernatural');
                  } else {
                    updatePlayer({ occult: event.resultOccult, occultMeter: 70 });
                    addLog(`Failed to resist! Transformed into a ${event.resultOccult}!`, 'Supernatural');
                  }
                  dispatch({ type: 'HIDE_MODAL' });
                },
              },
            ],
          },
        });
      }
    }
    
    clampStats();
    saveGame();
  }, [state.player, addLog, updatePlayer, clampStats, saveGame]);

  const showModal = useCallback((modal) => {
    dispatch({ type: 'SHOW_MODAL', modal });
  }, []);

  const hideModal = useCallback(() => {
    dispatch({ type: 'HIDE_MODAL' });
  }, []);

  const setTab = useCallback((tab) => {
    dispatch({ type: 'SET_TAB', tab });
  }, []);

  const goToMenu = useCallback(() => {
    if (state.player && state.currentSlot) {
      saveGame();
    }
    dispatch({ type: 'RESET_TO_MENU' });
  }, [state.player, state.currentSlot, saveGame]);

  const handleSuccession = useCallback((childIndex) => {
    const child = state.player.children[childIndex];
    if (!child) return;
    
    const newPlayer = {
      ...createInitialPlayer(state.player.anatomy, state.player.orientation),
      name: child.name,
      age: child.age,
      money: state.player.money + 20000,
      occult: child.inheritedOccultStrain || "Human",
      occultMeter: child.mutationAwakened ? 60 : 50,
      sessionLogs: [
        ...state.player.sessionLogs,
        { age: 0, time: new Date().toLocaleTimeString(), money: 0, action: 'Succession', outcome: `Now playing as ${child.name}` },
      ],
    };
    
    dispatch({ type: 'SUCCESSION', newPlayer });
    saveGame();
  }, [state.player, saveGame]);

  const value = {
    ...state,
    dispatch,
    saveGame,
    loadGame,
    deleteSlot,
    startNewGame,
    addLog,
    updatePlayer,
    ageUp,
    showModal,
    hideModal,
    setTab,
    goToMenu,
    handleSuccession,
    clampStats,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
