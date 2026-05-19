import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { occultTypes, generateSCPDesignation } from '../data/occults';
import { getRandomName } from '../data/names';
import { selectRandomEvent, resolveOutcome } from '../data/events';
import { safeUUID, clampPlayerStats, safeLocalStorage } from '../utils/helpers';

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
    { id: safeUUID(), name: getRandomName("Female"), relationship: 80, type: "Parent", role: "Mother", occult: "Human", alive: true, age: 25 },
    { id: safeUUID(), name: getRandomName("Male"), relationship: 75, type: "Parent", role: "Father", occult: "Human", alive: true, age: 27 },
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
  pendingEvents: [],
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
    
    case 'UPDATE_PLAYER': {
      const merged = { ...state.player, ...action.updates };
      return {
        ...state,
        player: clampPlayerStats(merged),
      };
    }
    
    case 'SET_PLAYER':
      return {
        ...state,
        player: clampPlayerStats(action.player),
      };
    
    case 'ADD_LOG':
      if (!state.player) return state;
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
    
    case 'DEATH':
      return {
        ...state,
        player: { ...state.player, alive: false },
        gamePhase: 'death',
      };
    
    case 'SUCCESSION':
      return {
        ...state,
        player: clampPlayerStats(action.newPlayer),
        gamePhase: 'playing',
      };
    
    case 'RESET_TO_MENU':
      return {
        ...state,
        player: null,
        currentSlot: null,
        gamePhase: 'menu',
        modal: null,
        pendingEvents: [],
      };
    
    case 'QUEUE_EVENT':
      return {
        ...state,
        pendingEvents: [...state.pendingEvents, action.event],
      };
    
    case 'CLEAR_PENDING_EVENT':
      return {
        ...state,
        pendingEvents: state.pendingEvents.slice(1),
      };
    
    default:
      return state;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const playerRef = useRef(state.player);
  const slotRef = useRef(state.currentSlot);
  
  useEffect(() => {
    playerRef.current = state.player;
    slotRef.current = state.currentSlot;
  }, [state.player, state.currentSlot]);

  useEffect(() => {
    const slotsJson = safeLocalStorage.getItem(SLOTS_INDEX_KEY);
    const slots = safeLocalStorage.parseJSON(slotsJson, []);
    dispatch({ type: 'LOAD_SLOTS', slots });
  }, []);

  const saveGame = useCallback((playerOverride = null, slotOverride = null) => {
    const playerToSave = playerOverride || playerRef.current;
    const slotId = slotOverride || slotRef.current;
    
    if (!playerToSave || !slotId) return false;
    
    const saveData = {
      player: playerToSave,
      savedAt: new Date().toISOString(),
      version: 1,
    };
    
    const saved = safeLocalStorage.setItem(
      `${SAVE_KEY_PREFIX}${slotId}`, 
      JSON.stringify(saveData)
    );
    
    if (!saved) return false;
    
    let slots = safeLocalStorage.parseJSON(
      safeLocalStorage.getItem(SLOTS_INDEX_KEY), 
      []
    );
    
    const existingIndex = slots.findIndex(s => s.id === slotId);
    const slotInfo = {
      id: slotId,
      name: playerToSave.name,
      age: playerToSave.age,
      occult: playerToSave.occult,
      savedAt: saveData.savedAt,
    };
    
    if (existingIndex >= 0) {
      slots[existingIndex] = slotInfo;
    } else {
      slots.push(slotInfo);
    }
    
    safeLocalStorage.setItem(SLOTS_INDEX_KEY, JSON.stringify(slots));
    safeLocalStorage.setItem(CURRENT_SLOT_KEY, slotId);
    dispatch({ type: 'LOAD_SLOTS', slots });
    dispatch({ type: 'SET_CURRENT_SLOT', slot: slotId });
    
    return true;
  }, []);

  const loadGame = useCallback((slotId) => {
    const saveJson = safeLocalStorage.getItem(`${SAVE_KEY_PREFIX}${slotId}`);
    const saveData = safeLocalStorage.parseJSON(saveJson);
    
    if (!saveData?.player) return false;
    
    dispatch({ type: 'LOAD_GAME', player: saveData.player, slot: slotId });
    safeLocalStorage.setItem(CURRENT_SLOT_KEY, slotId);
    return true;
  }, []);

  const deleteSlot = useCallback((slotId) => {
    safeLocalStorage.removeItem(`${SAVE_KEY_PREFIX}${slotId}`);
    let slots = safeLocalStorage.parseJSON(
      safeLocalStorage.getItem(SLOTS_INDEX_KEY), 
      []
    );
    slots = slots.filter(s => s.id !== slotId);
    safeLocalStorage.setItem(SLOTS_INDEX_KEY, JSON.stringify(slots));
    dispatch({ type: 'LOAD_SLOTS', slots });
  }, []);

  const startNewGame = useCallback((anatomy, orientation) => {
    const slotId = safeUUID();
    dispatch({ type: 'START_NEW_GAME', anatomy, orientation });
    dispatch({ type: 'SET_CURRENT_SLOT', slot: slotId });
  }, []);

  const addLog = useCallback((message, actionName = 'Event') => {
    dispatch({ type: 'ADD_LOG', message, actionName });
  }, []);

  const updatePlayer = useCallback((updates) => {
    dispatch({ type: 'UPDATE_PLAYER', updates });
  }, []);

  const applyAction = useCallback((updates, logMessage, logCategory = 'Action') => {
    if (!state.player) return;
    
    const nextPlayer = clampPlayerStats({ ...state.player, ...updates });
    dispatch({ type: 'SET_PLAYER', player: nextPlayer });
    
    if (logMessage) {
      dispatch({ type: 'ADD_LOG', message: logMessage, actionName: logCategory });
    }
    
    setTimeout(() => saveGame(nextPlayer), 0);
  }, [state.player, saveGame]);

  const ageUp = useCallback(() => {
    if (!state.player?.alive) return;
    
    const player = state.player;
    const updates = { age: player.age + 1, yearsPlayed: player.yearsPlayed + 1 };
    const logs = [];
    
    if (player.job && !player.inPrison && !player.scpContained) {
      updates.money = (player.money || 0) + player.job.salary;
    }
    
    if (player.studentDebt > 0) {
      updates.studentDebt = Math.floor(player.studentDebt * 1.05);
      const payment = Math.min(updates.studentDebt, 5000);
      updates.money = (updates.money ?? player.money) - payment;
      updates.studentDebt -= payment;
    }
    
    if (player.enrolledEducation && player.educationYearsLeft > 0) {
      updates.educationYearsLeft = player.educationYearsLeft - 1;
      if (updates.educationYearsLeft <= 0) {
        updates.education = player.enrolledEducation;
        updates.enrolledEducation = null;
        logs.push({ msg: `Graduated with a ${player.enrolledEducation} degree!`, cat: 'Education' });
      }
    }
    
    if (player.inPrison && player.prisonYearsLeft > 0) {
      updates.prisonYearsLeft = player.prisonYearsLeft - 1;
      if (updates.prisonYearsLeft <= 0) {
        updates.inPrison = false;
        logs.push({ msg: 'Released from prison!', cat: 'Prison' });
      }
    }
    
    let propertyIncome = 0;
    let propertyExpenses = 0;
    player.properties?.forEach(prop => {
      if (prop.rented) propertyIncome += (prop.baseRent * 12);
      propertyExpenses += prop.upkeep;
    });
    
    let vehicleExpenses = 0;
    player.vehicles?.forEach(vehicle => {
      vehicleExpenses += vehicle.upkeep;
    });
    
    updates.money = (updates.money ?? player.money) + propertyIncome - propertyExpenses - vehicleExpenses;
    
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
        logs.push({ msg: `Captured by the SCP Foundation! Designated as ${updates.scpDesignation}`, cat: 'SCP' });
      }
    }
    

    
    if (player.family?.length > 0) {
      updates.family = player.family.map(member => {
        if (member.alive && member.age !== undefined) {
          const newAge = member.age + 1;
          if (member.type === 'Parent' && newAge > 75 && Math.random() < (newAge - 75) * 0.03) {
            logs.push({ msg: `${member.name} has passed away.`, cat: 'Family' });
            return { ...member, age: newAge, alive: false };
          }
          return { ...member, age: newAge };
        }
        return member;
      });
    }
    
    if (player.children?.length > 0) {
      updates.children = player.children.map(child => {
        const newChild = { ...child, age: child.age + 1 };
        if (child.hybridMutationCarrier && !child.mutationAwakened && newChild.age === 14) {
          newChild.mutationAwakened = true;
          logs.push({ msg: `${child.name} has awakened their latent ${child.inheritedOccultStrain} traits!`, cat: 'Supernatural' });
        }
        return newChild;
      });
    }
    
    const nextPlayer = clampPlayerStats({ ...player, ...updates });
    dispatch({ type: 'SET_PLAYER', player: nextPlayer });
    
    logs.forEach(l => dispatch({ type: 'ADD_LOG', message: l.msg, actionName: l.cat }));
    dispatch({ type: 'ADD_LOG', message: 'Another year passes...', actionName: 'Age' });
    
    const newHealth = nextPlayer.health;
    const newAge = nextPlayer.age;
    
    if (newHealth <= 0) {
      dispatch({ type: 'DEATH' });
      saveGame(nextPlayer);
      return;
    }
    
    if (occult?.canDieOfAge && newAge > 80) {
      const deathChance = (newAge - 80) * 0.05;
      if (Math.random() < deathChance) {
        dispatch({ type: 'DEATH' });
        saveGame(nextPlayer);
        return;
      }
    }
    
    const eventChance = newAge < 10 ? 0.45 : newAge < 18 ? 0.6 : newAge < 60 ? 0.7 : 0.55;
    const numEventRolls = newAge < 5 ? 1 : newAge < 18 ? 2 : 3;
    
    const eventsToQueue = [];
    for (let i = 0; i < numEventRolls; i++) {
      if (Math.random() < eventChance) {
        const event = selectRandomEvent(nextPlayer);
        if (event && !eventsToQueue.find(e => e.id === event.id)) {
          eventsToQueue.push(event);
        }
      }
    }
    
    eventsToQueue.forEach(event => {
      dispatch({ type: 'QUEUE_EVENT', event });
    });
    
    saveGame(nextPlayer);
  }, [state.player, saveGame]);

  const showModal = useCallback((modal) => {
    dispatch({ type: 'SHOW_MODAL', modal });
  }, []);

  const hideModal = useCallback(() => {
    dispatch({ type: 'HIDE_MODAL' });
  }, []);

  const processNextEvent = useCallback(() => {
    dispatch({ type: 'CLEAR_PENDING_EVENT' });
  }, []);

  const showEventModal = useCallback((event) => {
    const currentPlayer = playerRef.current;
    if (!event || !currentPlayer) return;
    
    const options = event.options
      .filter(opt => {
        if (opt.minMoney && currentPlayer.money < opt.minMoney) return false;
        return true;
      })
      .map(opt => ({
        text: opt.text,
        action: () => {
          const player = playerRef.current;
          if (!player) return;
          
          const result = resolveOutcome(opt);
          const updates = {};
          
          if (result.effects) {
            Object.entries(result.effects).forEach(([key, value]) => {
              if (key === 'money') {
                updates.money = (player.money || 0) + value;
              } else if (['happiness', 'health', 'smarts', 'social', 'karma'].includes(key)) {
                updates[key] = (player[key] || 50) + value;
              }
            });
          }
          
          if (result.transform) {
            updates.occult = result.transform;
            updates.occultMeter = 70;
          }
          
          const nextPlayer = clampPlayerStats({ ...player, ...updates });
          dispatch({ type: 'SET_PLAYER', player: nextPlayer });
          
          if (result.transform) {
            dispatch({ type: 'ADD_LOG', message: `You have become a ${result.transform}!`, actionName: 'Supernatural' });
          }
          dispatch({ type: 'ADD_LOG', message: result.message, actionName: event.title });
          dispatch({ type: 'HIDE_MODAL' });
          processNextEvent();
          saveGame(nextPlayer);
        },
      }));

    dispatch({
      type: 'SHOW_MODAL',
      modal: {
        title: event.title,
        description: event.description,
        options,
      },
    });
  }, [saveGame, processNextEvent]);

  useEffect(() => {
    if (state.pendingEvents.length > 0 && !state.modal) {
      const timer = setTimeout(() => {
        showEventModal(state.pendingEvents[0]);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [state.pendingEvents, state.modal, showEventModal]);

  const setTab = useCallback((tab) => {
    dispatch({ type: 'SET_TAB', tab });
  }, []);

  const goToMenu = useCallback(() => {
    if (playerRef.current && slotRef.current) {
      saveGame(playerRef.current, slotRef.current);
    }
    dispatch({ type: 'RESET_TO_MENU' });
  }, [saveGame]);

  const handleSuccession = useCallback((childIndex) => {
    const player = state.player;
    const child = player?.children?.[childIndex];
    if (!child) return;
    
    const newPlayer = {
      ...createInitialPlayer(player.anatomy, player.orientation),
      name: child.name,
      age: child.age,
      money: player.money + 20000,
      occult: child.inheritedOccultStrain || "Human",
      occultMeter: child.mutationAwakened ? 60 : 50,
      sessionLogs: [
        ...player.sessionLogs,
        { age: 0, time: new Date().toLocaleTimeString(), money: 0, action: 'Succession', outcome: `Now playing as ${child.name}` },
      ],
    };
    
    dispatch({ type: 'SUCCESSION', newPlayer });
    setTimeout(() => saveGame(newPlayer), 0);
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
    applyAction,
    ageUp,
    showModal,
    hideModal,
    setTab,
    goToMenu,
    handleSuccession,
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
