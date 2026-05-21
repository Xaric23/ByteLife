# ByteLife

A life simulation web game built with React + Vite. Live your virtual life, make choices, and see where fate takes you.

## Features

### Core Gameplay
- **Life Simulation** - Age up year by year, make decisions that affect your stats
- **Multiple Save Slots** - Save and load different lives
- **Generational Play** - When you die, continue as your children

### Career System (50+ jobs across 9 paths)
- Service Industry
- Corporate
- Technology
- Medical
- Legal
- Creative Arts
- Criminal Underworld
- Science & Research
- Government & Military

### Education System
- High School, Bachelor's, Master's, Doctorate degrees
- Student loans with interest
- Self-improvement activities

### Supernatural System (8+ occult types)
- **Vampire** - Immortal, needs blood, avoids sunlight
- **Werewolf** - Ages normally, must control fury
- **Zombie** - Undead, constant decay
- **Ghoul** - Graveyard dweller
- **Demon** - Soul harvester
- **Fae** - Fairy creature with glamour
- **Revenant** - Vengeful spirit
- **Wendigo** - Cannibalistic hunger spirit
- **Abomination** - Rare hybrid offspring

### SCP Foundation Integration
- Supernatural beings risk capture
- Containment affects gameplay
- Different SCP designations based on threat level

### Assets & Economy
- Real estate (8 property types)
- Stock market (6 stocks)
- Cryptocurrency (5 coins)
- Vehicles (9 types including yacht and jet)

### Family System
- Dating and relationships
- Children with genetic inheritance
- Supernatural traits can pass to offspring

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Tech Stack
- React 19
- Vite
- CSS Modules
- LocalStorage for persistence

## Project Structure

```text
src/
├── components/
│   ├── ui/          # Reusable UI components
│   └── panels/      # Game content panels
├── context/         # React Context for state
├── data/            # Game data (careers, occults, etc.)
├── hooks/           # Custom React hooks
├── styles/          # Global styles and variables
└── utils/           # Utility functions
```

## License
MIT
