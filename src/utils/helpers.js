export const safeUUID = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const clamp = (value, min = 0, max = 100) => 
  Math.max(min, Math.min(max, value));

export const rollChance = (chance) => Math.random() < chance;

export const randomBetween = (min, max) => min + Math.random() * (max - min);

export const clampPlayerStats = (player) => {
  if (!player) return player;
  
  const statKeys = ['happiness', 'health', 'smarts', 'social', 'occultMeter', 'karma'];
  const clamped = { ...player };
  
  statKeys.forEach(key => {
    if (clamped[key] !== undefined) {
      clamped[key] = clamp(clamped[key]);
    }
  });
  
  return clamped;
};

export const safeParseName = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return { first: 'Unknown', last: '' };
  const parts = fullName.trim().split(/\s+/);
  return {
    first: parts[0] || 'Unknown',
    last: parts.slice(1).join(' ') || '',
  };
};

export const safeLocalStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error(`Failed to read localStorage key "${key}":`, e);
      return null;
    }
  },
  
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error(`Failed to write localStorage key "${key}":`, e);
      return false;
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Failed to remove localStorage key "${key}":`, e);
      return false;
    }
  },
  
  parseJSON: (json, fallback = null) => {
    if (!json) return fallback;
    try {
      return JSON.parse(json);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return fallback;
    }
  },
};

export const formatMoney = (amount) => {
  if (amount === undefined || amount === null) return '$0';
  return `$${amount.toLocaleString()}`;
};
