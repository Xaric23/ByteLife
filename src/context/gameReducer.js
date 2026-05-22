import { createInitialPlayer, normalizePlayer } from '../game/playerModel';

const MAX_LOG_ENTRIES = 500;

export const initialState = {
  player: null,
  currentSlot: null,
  slots: [],
  gamePhase: 'menu',
  modal: null,
  activeTab: 'log',
  pendingEvents: [],
  eventsLoaded: false,
};

export function gameReducer(state, action) {
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
        player: normalizePlayer(action.player),
        currentSlot: action.slot,
        gamePhase: 'playing',
      };
    
    case 'UPDATE_PLAYER': {
      const merged = { ...state.player, ...action.updates };
      return {
        ...state,
        player: normalizePlayer(merged),
      };
    }
    
    case 'SET_PLAYER':
      return {
        ...state,
        player: normalizePlayer(action.player),
      };
    
    case 'ADD_LOG': {
      if (!state.player) return state;
      
      const newLogs = [
        ...state.player.logs,
        `[Age ${state.player.age}] ${action.message}`,
      ].slice(-MAX_LOG_ENTRIES);
      
      const newSessionLogs = [
        ...state.player.sessionLogs,
        {
          age: state.player.age,
          time: new Date().toLocaleTimeString(),
          money: state.player.money,
          action: action.actionName || 'Event',
          outcome: action.message,
        },
      ].slice(-MAX_LOG_ENTRIES);
      
      return {
        ...state,
        player: {
          ...state.player,
          logs: newLogs,
          sessionLogs: newSessionLogs,
        },
      };
    }
    
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
        player: normalizePlayer(action.newPlayer),
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
    
    case 'SET_EVENTS_LOADED':
      return { ...state, eventsLoaded: true };
    
    default:
      return state;
  }
}
