import { useGame } from '../../context/GameContext';
import { realEstate, stocks, crypto, vehicles } from '../../data/assets';
import { Button } from '../ui';
import styles from './Panel.module.css';

export default function MarketPanel() {
  const { player, applyAction, addLog } = useGame();

  if (!player) return null;

  const buyStock = (stock, quantity = 1) => {
    const price = stock.basePrice * quantity;
    if (player.money < price) {
      addLog(`Can't afford ${stock.title}.`, 'System');
      return;
    }
    
    const newPortfolio = { ...player.portfolio };
    newPortfolio[stock.id] = (newPortfolio[stock.id] || 0) + quantity;
    
    applyAction(
      { money: player.money - price, portfolio: newPortfolio },
      `Bought ${quantity} share(s) of ${stock.title}.`,
      'Investment'
    );
  };

  const sellStock = (stock, quantity = 1) => {
    const owned = player.portfolio?.[stock.id] || 0;
    if (owned < quantity) {
      addLog(`You don't own enough ${stock.title} to sell.`, 'System');
      return;
    }
    
    const price = stock.basePrice * quantity;
    const newPortfolio = { ...player.portfolio };
    newPortfolio[stock.id] = owned - quantity;
    
    applyAction(
      { money: player.money + price, portfolio: newPortfolio },
      `Sold ${quantity} share(s) of ${stock.title}.`,
      'Investment'
    );
  };

  const buyProperty = (property) => {
    if (player.money < property.price) {
      addLog(`Can't afford ${property.title}.`, 'System');
      return;
    }
    
    applyAction(
      { 
        money: player.money - property.price,
        properties: [...(player.properties || []), { ...property, rented: false }]
      },
      `Purchased ${property.title} for $${property.price.toLocaleString()}.`,
      'Real Estate'
    );
  };

  const toggleRent = (index) => {
    const property = player.properties?.[index];
    if (!property) return;
    
    const newProperties = [...player.properties];
    newProperties[index] = { ...property, rented: !property.rented };
    
    applyAction(
      { properties: newProperties },
      property.rented 
        ? `Stopped renting out ${property.title}.`
        : `Now renting out ${property.title} for $${(property.baseRent * 12).toLocaleString()}/year.`,
      'Real Estate'
    );
  };

  const sellProperty = (index) => {
    const property = player.properties?.[index];
    if (!property) return;
    
    const salePrice = Math.floor(property.price * (0.8 + Math.random() * 0.4));
    const newProperties = player.properties.filter((_, i) => i !== index);
    
    applyAction(
      { money: player.money + salePrice, properties: newProperties },
      `Sold ${property.title} for $${salePrice.toLocaleString()}.`,
      'Real Estate'
    );
  };

  const buyVehicle = (vehicle) => {
    if (player.money < vehicle.price) {
      addLog(`Can't afford ${vehicle.title}.`, 'System');
      return;
    }
    
    applyAction(
      { 
        money: player.money - vehicle.price,
        vehicles: [...(player.vehicles || []), { ...vehicle }]
      },
      `Purchased ${vehicle.title} for $${vehicle.price.toLocaleString()}.`,
      'Purchase'
    );
  };

  const portfolioValue = Object.entries(player.portfolio || {}).reduce((total, [id, qty]) => {
    const stock = [...stocks, ...crypto].find(s => s.id === id);
    return total + (stock ? stock.basePrice * qty : 0);
  }, 0);

  const propertyValue = (player.properties || []).reduce((total, p) => total + p.price, 0);
  const totalAssets = player.money + portfolioValue + propertyValue;

  return (
    <div className={styles.panel}>
      <div className={styles.summaryBar}>
        <div>
          <small>Cash</small>
          <strong>${player.money.toLocaleString()}</strong>
        </div>
        <div>
          <small>Portfolio</small>
          <strong>${portfolioValue.toLocaleString()}</strong>
        </div>
        <div>
          <small>Property</small>
          <strong>${propertyValue.toLocaleString()}</strong>
        </div>
        <div>
          <small>Total</small>
          <strong>${totalAssets.toLocaleString()}</strong>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Stocks</h3>
      {stocks.map(stock => {
        const owned = player.portfolio?.[stock.id] || 0;
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
        const owned = player.portfolio?.[coin.id] || 0;
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
          <div key={`prop-${index}`} className={styles.listRow}>
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
                {prop.rented ? 'Stop Rent' : 'Rent Out'}
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
          <small>Owned:</small>
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
