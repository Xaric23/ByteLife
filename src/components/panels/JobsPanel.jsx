import { useGame } from '../../context/GameContext';
import { careerPaths, getAvailableCareers } from '../../data/careers';
import { Button } from '../ui';
import styles from './Panel.module.css';

export default function JobsPanel() {
  const { player, updatePlayer, addLog, saveGame } = useGame();

  if (!player) return null;

  const availableCareers = getAvailableCareers(player);

  const applyForJob = (career) => {
    const baseChance = 0.5 + (player.smarts - career.reqSmarts) * 0.01;
    const chance = Math.min(0.95, Math.max(0.2, baseChance));
    
    if (Math.random() < chance) {
      updatePlayer({ job: career });
      addLog(`Got hired as a ${career.title}!`, 'Career');
    } else {
      addLog(`Application for ${career.title} was rejected.`, 'Career');
    }
    saveGame();
  };

  const quitJob = () => {
    if (player.job) {
      addLog(`Quit job as ${player.job.title}.`, 'Career');
      updatePlayer({ job: null });
      saveGame();
    }
  };

  return (
    <div className={styles.panel}>
      {player.job && (
        <div className={styles.currentSection}>
          <h3 className={styles.sectionTitle}>Current Job</h3>
          <div className={styles.listRow}>
            <div className={styles.listInfo}>
              <strong>{player.job.title}</strong>
              <small>
                {player.job.path} • Salary: ${player.job.salary.toLocaleString()}/yr
              </small>
            </div>
            <Button size="small" variant="danger" onClick={quitJob}>
              Quit
            </Button>
          </div>
        </div>
      )}

      <h3 className={styles.sectionTitle}>
        {player.job ? 'Other Opportunities' : 'Job Listings'}
      </h3>

      {player.inPrison && (
        <div className={styles.warning}>
          You cannot work while incarcerated.
        </div>
      )}

      {player.scpContained && (
        <div className={styles.warning}>
          Employment is not available during containment.
        </div>
      )}

      {!player.inPrison && !player.scpContained && (
        <>
          {Object.entries(careerPaths).map(([pathKey, path]) => {
            const pathCareers = path.careers.filter(c => 
              availableCareers.some(ac => ac.id === c.id)
            );
            
            if (pathCareers.length === 0) return null;

            return (
              <div key={pathKey} className={styles.careerPath}>
                <h4 className={styles.pathTitle}>{path.name}</h4>
                {pathCareers.map(career => (
                  <div key={career.id} className={styles.listRow}>
                    <div className={styles.listInfo}>
                      <strong>{career.title}</strong>
                      <small>
                        ${career.salary.toLocaleString()}/yr • 
                        Requires: {career.reqSmarts}% Smarts
                        {career.reqEducation && `, ${career.reqEducation}`}
                        {career.riskLevel && ` • Risk: ${Math.round(career.riskLevel * 100)}%`}
                      </small>
                      {career.description && (
                        <small className={styles.description}>{career.description}</small>
                      )}
                    </div>
                    <Button 
                      size="small" 
                      onClick={() => applyForJob(career)}
                      disabled={player.job?.id === career.id}
                    >
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
            );
          })}

          {availableCareers.length === 0 && (
            <div className={styles.empty}>
              No jobs available. Try improving your education or skills!
            </div>
          )}
        </>
      )}
    </div>
  );
}
