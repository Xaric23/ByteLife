import { useGame } from '../../context/GameContext';
import { realEstate, stocks, crypto, vehicles } from '../../data/assets';
import { Button } from '../ui';
import styles from './Panel.module.css';

export default function MarketPanel() {
  const { player, updatePlayer, addLog, showModal, saveGame } = useGame();

  if (!player) return null;

  const buyStock = (stock, quantity = 1) => {
    const price = stock.basePrice * quantity;
    if (player.money < price) return;
    
    const newPortfolio = { ...player.portfolio };
    newPortfolio[stock.id] = (newPortfolio[stock.id] || 0) + quantity;
    
    updatePlayer({
      money: player.money - price,
      portfolio: newPortfolio,
    });
    addLog(`Bought ${quantity} share(s) of ${stock.title}.`, 'Investment');
    saveGame();
  };

  const sellStock = (stock, quantity = 1) => {
    const owned = player.portfolio[stock.id] || 0;
    if (owned < quantity) return;
    
    const price = stock.basePrice * quantity;
    const newPortfolio = { ...player.portfolio };
    newPortfolio[stock.id] = owned - quantity;
    
    updatePlayer({
      money: player.money + price,
      portfolio: newPortfolio,
    });
    addLog(`Sold ${quantity} share(s) of ${stock.title}.`, 'Investment');
    saveGame();
  };

  const buyProperty = (property) => {
    if (player.money < property.price) return;
    
    updatePlayer({
      money: player.money - property.price,
      properties: [...player.properties, { ...property, rented: false }],
    });
    addLog(`Purchased ${property.title} for $${property.price.toLocaleString()}.`, 'Real Estate');
    saveGame();
  };

  const toggleRent = (index) => {
    const newProperties = [...player.properties];
    newProperties[index] = {
      ...newProperties[index],
      rented: !newProperties[index].rented,
    };
    updatePlayer({ properties: newProperties });
    saveGame();
  };

  const sellProperty = (index) => {
    const property = player.properties[index];
    const salePrice = Math.floor(property.price * (0.8 + Math.random() * 0.4));
    
    const newProperties = player.properties.filter((_, i) => i !== index);
    updatePlayer({
      money: player.money + salePrice,
      properties: newProperties,
    });
    addLog(`Sold ${property.title} for $${salePrice.toLocaleString()}.`, 'Real Estate');
    saveGame();
  };

  const buyVehicle = (vehicle) => {
    if (player.money < vehicle.price) return;
    
    updatePlayer({
      money: player.money - vehicle.price,
      vehicles: [...(player.vehicles || []), { ...vehicle }],
    });
    addLog(`Purchased ${vehicle.title} for $${vehicle.price.toLocaleString()}.`, 'Purchase');
    saveGame();
  };

  const portfolioValue = Object.entries(player.portfolio || {}).reduce((total, [id, qty]) => {
    const stock = [...stocks, ...crypto].find(s => s.id === id);
    return total + (stock ? stock.basePrice * qty : 0);
  }, 0);

  const propertyValue = (player.properties || []).reduce((total, p) => total + p.price, 0);

  return (
    <div className={styles.panel}>
      <div className={styles.summaryBar}>
        <div>
          <small>Portfolio Value</small>
          <strong>${portfolioValue.toLocaleString()}</strong>
        </div>
        <div>
          <small>Property Value</small>
          <strong>${propertyValue.toLocaleString()}</strong>
        </div>
        <div>
          <small>Total Assets</small>
          <strong>${(player.money + portfolioValue + propertyValue).toLocaleString()}</strong>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Stocks</h3>
      {stocks.map(stock => {
        const owned = player.portfolio[stock.id] || 0;
        return (
          <div key={stock.id} className={styles.listRow}>
            <div className={styles.listInfo}>
              <strong>{stock.title}</strong>
              <small>
                ${stock.basePrice.toLocaleString()}/share • 
                Owned: {owned} • 
                Volatility: {Math.round(stock.volatility * 100)}%
              </small>
            </div>
            <div className={styles.actions}>
              <Button size="small" onClick={() => buyStock(stock)} disabled={player.money < stock.basePrice}>
                Buy
              </Button>
              <Button size="small" onClick={() => sellStock(stock)} disabled={owned < 1}>
                Sell
              </Button>
            </div>
          </div>
        );
      })}

      <h3 className={styles.sectionTitle}>Cryptocurrency</h3>
      {crypto.map(coin => {
        const owned = player.portfolio[coin.id] || 0;
        return (
          <div key={coin.id} className={styles.listRow}>
            <div className={styles.listInfo}>
              <strong>{coin.title}</strong>
              <small>
                ${coin.basePrice.toLocaleString()}/coin • 
                Owned: {owned} • 
                Volatility: {Math.round(coin.volatility * 100)}%
              </small>
            </div>
            <div className={styles.actions}>
              <Button size="small" onClick={() => buyStock(coin)} disabled={player.money < coin.basePrice}>
                Buy
              </Button>
              <Button size="small" onClick={() => sellStock(coin)} disabled={owned < 1}>
                Sell
              </Button>
            </div>
          </div>
        );
      })}

      <h3 className={styles.sectionTitle}>Your Properties</h3>
      {(player.properties || []).length === 0 ? (
        <div className={styles.empty}>No properties owned.</div>
      ) : (
        player.properties.map((prop, index) => (
          <div key={index} className={styles.listRow}>
            <div className={styles.listInfo}>
              <strong>{prop.title}</strong>
              <small>
                Value: ${prop.price.toLocaleString()} • 
                Upkeep: ${prop.upkeep.toLocaleString()}/yr •
                {prop.rented ? ` Renting: $${(prop.baseRent * 12).toLocaleString()}/yr` : ' Not rented'}
              </small>
            </div>
            <div className={styles.actions}>
              <Button size="small" onClick={() => toggleRent(index)}>
                {prop.rented ? 'Stop Renting' : 'Rent Out'}
              </Button>
              <Button size="small" variant="danger" onClick={() => sellProperty(index)}>
                Sell
              </Button>
            </div>
          </div>
        ))
      )}

      <h3 className={styles.sectionTitle}>Real Estate Market</h3>
      {realEstate.map(property => (
        <div key={property.id} className={styles.listRow}>
          <div className={styles.listInfo}>
            <strong>{property.title}</strong>
            <small>
              ${property.price.toLocaleString()} • 
              Upkeep: ${property.upkeep.toLocaleString()}/yr • 
              Rent: ${(property.baseRent * 12).toLocaleString()}/yr
            </small>
          </div>
          <Button 
            size="small" 
            onClick={() => buyProperty(property)}
            disabled={player.money < property.price}
          >
            Buy
          </Button>
        </div>
      ))}

      <h3 className={styles.sectionTitle}>Vehicles</h3>
      {(player.vehicles || []).length > 0 && (
        <div className={styles.ownedSection}>
          <small>Owned Vehicles:</small>
          {player.vehicles.map((v, i) => (
            <span key={i} className={styles.ownedBadge}>{v.title}</span>
          ))}
        </div>
      )}
      {vehicles.map(vehicle => (
        <div key={vehicle.id} className={styles.listRow}>
          <div className={styles.listInfo}>
            <strong>{vehicle.title}</strong>
            <small>
              ${vehicle.price.toLocaleString()} • 
              Upkeep: ${vehicle.upkeep.toLocaleString()}/yr
            </small>
          </div>
          <Button 
            size="small" 
            onClick={() => buyVehicle(vehicle)}
            disabled={player.money < vehicle.price}
          >
            Buy
          </Button>
        </div>
      ))}
    </div>
  );
}
