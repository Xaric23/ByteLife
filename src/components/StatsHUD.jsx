import { useGame } from '../context/GameContext';
import { occultTypes } from '../data/occults';
import { StatBar } from './ui';
import styles from './StatsHUD.module.css';

export default function StatsHUD() {
  const { player } = useGame();
  
  if (!player) return null;

  const occult = occultTypes[player.occult];
  const isOccult = player.occult !== "Human";

  const getHappinessBar = () => {
    if (isOccult && occult) {
      return (
        <StatBar
          label={occult.meterName}
          value={player.occultMeter}
          icon={occult.meterIcon}
          color={occult.meterColor}
        />
      );
    }
    return (
      <StatBar
        label="Happiness"
        value={player.happiness}
        icon="😊"
        color="var(--happy-color)"
      />
    );
  };

  return (
    <div className={styles.hud}>
      {getHappinessBar()}
      <StatBar
        label="Health"
        value={player.health}
        icon="❤️"
        color="var(--health-color)"
      />
      <StatBar
        label="Smarts"
        value={player.smarts}
        icon="🧠"
        color="var(--smart-color)"
      />
      <StatBar
        label="Social"
        value={player.social}
        icon="🤝"
        color="var(--social-color)"
      />
    </div>
  );
}
