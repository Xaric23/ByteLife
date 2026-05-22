import { createContext, useContext } from 'react';

export const GameStateContext = createContext(null);
export const GameActionsContext = createContext(null);

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}

export function useGameActions() {
  const context = useContext(GameActionsContext);
  if (!context) {
    throw new Error('useGameActions must be used within a GameProvider');
  }
  return context;
}

export function useGame() {
  const state = useGameState();
  const actions = useGameActions();
  return { ...state, ...actions };
}

export const GameContext = createContext(null);
