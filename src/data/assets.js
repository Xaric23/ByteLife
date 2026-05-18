export const realEstate = [
  { id: "trailer", title: "Mobile Home", price: 25000, upkeep: 800, baseRent: 450, description: "Humble beginnings" },
  { id: "studio", title: "Studio Apartment", price: 85000, upkeep: 1200, baseRent: 750, description: "Compact city living" },
  { id: "condo", title: "Downtown Condo", price: 175000, upkeep: 2400, baseRent: 1400, description: "Modern urban dwelling" },
  { id: "townhouse", title: "Townhouse", price: 280000, upkeep: 3200, baseRent: 2000, description: "Multi-level living" },
  { id: "suburb", title: "Suburban Home", price: 420000, upkeep: 4800, baseRent: 2800, description: "Family-friendly neighborhood" },
  { id: "luxury_apt", title: "Luxury Penthouse", price: 850000, upkeep: 8000, baseRent: 5500, description: "Top floor with a view" },
  { id: "mansion", title: "Mansion", price: 2500000, upkeep: 25000, baseRent: 12000, description: "Sprawling estate" },
  { id: "castle", title: "Historic Castle", price: 8000000, upkeep: 80000, baseRent: 35000, description: "Live like royalty" },
];

export const stocks = [
  { id: "fruitcorp", title: "FruitCorp Systems (FRUT)", basePrice: 145, volatility: 0.15, description: "Tech giant" },
  { id: "petrox", title: "PetroX Energy (PETX)", basePrice: 78, volatility: 0.20, description: "Oil and gas" },
  { id: "biomedix", title: "BioMedix Health (BMED)", basePrice: 220, volatility: 0.25, description: "Pharmaceutical company" },
  { id: "quantech", title: "QuanTech Industries (QNTC)", basePrice: 340, volatility: 0.30, description: "Quantum computing" },
  { id: "greenleaf", title: "GreenLeaf Sustainable (GRLF)", basePrice: 55, volatility: 0.22, description: "Renewable energy" },
  { id: "luxbrand", title: "LuxBrand Holdings (LUXB)", basePrice: 890, volatility: 0.12, description: "Luxury goods conglomerate" },
];

export const crypto = [
  { id: "bytecoin", title: "ByteCoin (BTC)", basePrice: 42000, volatility: 0.35, description: "The original cryptocurrency" },
  { id: "ethex", title: "Ethex (ETX)", basePrice: 2800, volatility: 0.40, description: "Smart contract platform" },
  { id: "dogex", title: "DogeX (DGX)", basePrice: 0.15, volatility: 0.60, description: "Meme coin with staying power" },
  { id: "solux", title: "Solux (SLX)", basePrice: 95, volatility: 0.45, description: "High-speed blockchain" },
  { id: "moonshot", title: "MoonShot (MOON)", basePrice: 0.002, volatility: 0.80, description: "High risk, high reward" },
];

export const calculateMarketPrice = (asset, yearsPassed = 0) => {
  const trend = Math.sin(yearsPassed * 0.3) * 0.2;
  const randomFactor = 1 + (Math.random() - 0.5) * asset.volatility * 2;
  const trendFactor = 1 + trend;
  return Math.max(asset.basePrice * 0.1, Math.round(asset.basePrice * randomFactor * trendFactor * 100) / 100);
};

export const vehicles = [
  { id: "beater", title: "Used Beater Car", price: 3500, upkeep: 1200, prestige: 0 },
  { id: "sedan", title: "Reliable Sedan", price: 25000, upkeep: 1800, prestige: 5 },
  { id: "suv", title: "Family SUV", price: 45000, upkeep: 2400, prestige: 10 },
  { id: "sports", title: "Sports Car", price: 85000, upkeep: 4000, prestige: 25 },
  { id: "luxury", title: "Luxury Vehicle", price: 150000, upkeep: 6000, prestige: 40 },
  { id: "supercar", title: "Supercar", price: 350000, upkeep: 15000, prestige: 70 },
  { id: "hypercar", title: "Hypercar", price: 2000000, upkeep: 50000, prestige: 100 },
  { id: "yacht", title: "Yacht", price: 5000000, upkeep: 100000, prestige: 150, type: "boat" },
  { id: "jet", title: "Private Jet", price: 15000000, upkeep: 500000, prestige: 200, type: "aircraft" },
];
