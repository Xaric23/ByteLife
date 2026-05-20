import { GameProvider, useGame } from './context/GameContext';
import MainMenu from './components/MainMenu';
import GameScreen from './components/GameScreen';
import DeathScreen from './components/DeathScreen';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/global.css';

function GameRouter() {
  const { gamePhase } = useGame();

  switch (gamePhase) {
    case 'menu':
      return <MainMenu />;
    case 'playing':
      return <GameScreen />;
    case 'death':
      return <DeathScreen />;
    default:
      return <MainMenu />;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <GameRouter />
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;
