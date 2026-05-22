# ByteLife

A life simulation web game built with React + Vite. Live your virtual life, make choices, and see where fate takes you.

🎮 **[Play Now](https://xaric23.github.io/ByteLife/)**

## Features

### Core Gameplay
- **Life Simulation** - Age up year by year, make decisions that affect your stats
- **Multiple Save Slots** - Save and load different lives
- **Generational Play** - When you die, continue as your children
- **50+ Random Events** - Childhood, teen, adult, and senior life events with branching outcomes

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

### Supernatural System (12 occult types)
- **Vampire** - Immortal bloodsucker, needs blood, avoids sunlight
- **Werewolf** - Ages normally, must control primal fury
- **Zombie** - Undead, constant decay prevention needed
- **Ghoul** - Graveyard dweller feeding on the dead
- **Demon** - Infernal soul harvester
- **Fae** - Ancient fairy creature with glamour magic
- **Revenant** - Vengeful spirit returned from death
- **Wendigo** - Cannibalistic hunger spirit
- **Alien** - Extraterrestrial or human modified by alien technology
- **Witch** - Practitioner of old magic
- **Psychic** - Mind reader with telepathic powers
- **Ghost** - Ethereal spirit between worlds
- **Abomination** - Rare hybrid offspring of multiple occult types

### SCP Foundation Integration
- Supernatural beings risk capture by the Foundation
- **12 containment events** including:
  - Experimental chemical compounds (can cure or mutate you)
  - Radiation chamber testing
  - Anomalous blood transfusions
  - Cognitohazard exposure
  - Artifact interaction tests
  - Cross-testing with other anomalies
  - Termination attempts
  - Escape opportunities during containment breaches
- Different SCP designations (Standard, Keter, Apollyon) based on threat level
- Transformations possible during containment experiments

### Faction System
- **SCP Foundation** - Containment organization
- **Serpent's Hand** - Occult liberation cells
- **Night Court** - Vampire/Fae aristocracy
- **Hunter Order** - Human monster hunters

### Story Systems
- **Secrets** - Hidden aspects of your life that can be exposed
- **Rivals** - Enemies who scheme against you
- **Artifacts** - Mysterious objects with powers and faction effects
- **Reputation** - How the world sees you

### Assets & Economy
- Real estate (8 property types)
- Stock market (6 stocks)
- Cryptocurrency (5 coins)
- Vehicles (9 types including yacht and jet)

### Family System
- Dating and relationships
- Children with genetic inheritance
- Supernatural traits can pass to offspring
- Hybrid mutations can awaken in children

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run build && npx gh-pages -d dist
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
├── context/         # React Context for state (split state/actions)
├── data/            # Game data (careers, occults, events, etc.)
├── game/            # Game logic (playerModel, applyOutcome)
├── hooks/           # Custom React hooks
├── styles/          # Global styles and variables
└── utils/           # Utility functions
```

## Recent Updates
- Added Alien occult type with abduction events
- Added 12 interactive SCP containment events with transformation mechanics
- Code optimizations: log capping, lazy-loaded events, split contexts
- Balanced supernatural encounter rates

## License
MIT
