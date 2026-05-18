export const lifeEvents = {
  childhood: [
    {
      id: "bully",
      title: "School Bully",
      description: "A kid at school keeps picking on you. What do you do?",
      minAge: 6, maxAge: 12,
      options: [
        { text: "Fight back", effects: { social: -5, health: -10 }, outcomes: [
          { weight: 0.4, message: "You got beaten up badly.", effects: { health: -15, happiness: -10 } },
          { weight: 0.4, message: "You held your own! The bully backs off.", effects: { happiness: 10, social: 5 } },
          { weight: 0.2, message: "You won the fight! Kids respect you now.", effects: { social: 15, happiness: 15 } },
        ]},
        { text: "Tell a teacher", effects: {}, outcomes: [
          { weight: 0.5, message: "The teacher handled it. Bullying stopped.", effects: { happiness: 5 } },
          { weight: 0.3, message: "The bully got suspended but now hates you more.", effects: { happiness: -5 } },
          { weight: 0.2, message: "The teacher didn't believe you.", effects: { happiness: -10 } },
        ]},
        { text: "Ignore them", effects: {}, outcomes: [
          { weight: 0.6, message: "The bullying continued for months.", effects: { happiness: -15, social: -5 } },
          { weight: 0.4, message: "They eventually got bored and moved on.", effects: {} },
        ]},
      ]
    },
    {
      id: "talent_show",
      title: "School Talent Show",
      description: "Your school is having a talent show. Want to participate?",
      minAge: 8, maxAge: 14,
      options: [
        { text: "Perform!", effects: {}, outcomes: [
          { weight: 0.3, message: "You won first place! Everyone loved it!", effects: { happiness: 20, social: 15 } },
          { weight: 0.4, message: "You did pretty well. Nice applause.", effects: { happiness: 10, social: 5 } },
          { weight: 0.2, message: "You forgot your lines and froze on stage.", effects: { happiness: -15, social: -10 } },
          { weight: 0.1, message: "You fell off the stage. Embarrassing.", effects: { happiness: -20, social: -15, health: -5 } },
        ]},
        { text: "Just watch", effects: {}, outcomes: [
          { weight: 1.0, message: "You enjoyed watching your classmates perform.", effects: { happiness: 5 } },
        ]},
      ]
    },
    {
      id: "stray_pet",
      title: "Stray Animal",
      description: "You found a stray puppy on your way home from school!",
      minAge: 6, maxAge: 16,
      options: [
        { text: "Take it home", effects: {}, outcomes: [
          { weight: 0.6, message: "Your parents let you keep it! Best day ever!", effects: { happiness: 25 } },
          { weight: 0.4, message: "Your parents made you take it to a shelter.", effects: { happiness: -5 } },
        ]},
        { text: "Leave it", effects: {}, outcomes: [
          { weight: 1.0, message: "You walked away, hoping someone else helps it.", effects: { happiness: -5 } },
        ]},
      ]
    },
    {
      id: "science_fair",
      title: "Science Fair",
      description: "The science fair is coming up. Your project could win!",
      minAge: 10, maxAge: 16,
      options: [
        { text: "Work hard on it", effects: { smarts: 3 }, outcomes: [
          { weight: 0.25, message: "First place! You're a genius!", effects: { smarts: 10, happiness: 15 } },
          { weight: 0.35, message: "Second place. Still impressive!", effects: { smarts: 5, happiness: 10 } },
          { weight: 0.3, message: "Honorable mention. Good effort.", effects: { smarts: 3, happiness: 5 } },
          { weight: 0.1, message: "Your volcano exploded everywhere.", effects: { happiness: -10 } },
        ]},
        { text: "Do minimal effort", effects: {}, outcomes: [
          { weight: 0.8, message: "Your project was forgettable.", effects: {} },
          { weight: 0.2, message: "Somehow you still got third place!", effects: { happiness: 10, smarts: 2 } },
        ]},
      ]
    },
  ],

  teen: [
    {
      id: "house_party",
      title: "House Party",
      description: "Someone's parents are out of town. Party at their place?",
      minAge: 14, maxAge: 19,
      options: [
        { text: "Party hard!", effects: {}, outcomes: [
          { weight: 0.35, message: "Best party ever! Made tons of friends.", effects: { happiness: 20, social: 15 } },
          { weight: 0.25, message: "The party was fun but nothing special.", effects: { happiness: 10, social: 5 } },
          { weight: 0.2, message: "Cops showed up. You barely escaped.", effects: { happiness: -5 } },
          { weight: 0.1, message: "You got caught by police. Parents are furious.", effects: { happiness: -20, social: -10 } },
          { weight: 0.1, message: "You drank too much and got sick.", effects: { health: -10, happiness: -10 } },
        ]},
        { text: "Stay home", effects: {}, outcomes: [
          { weight: 0.6, message: "You missed out but stayed out of trouble.", effects: {} },
          { weight: 0.4, message: "Everyone's talking about what you missed.", effects: { social: -5, happiness: -5 } },
        ]},
      ]
    },
    {
      id: "first_job_offer",
      title: "Job Opportunity",
      description: "A local store is hiring part-time workers.",
      minAge: 15, maxAge: 18,
      options: [
        { text: "Apply", effects: {}, outcomes: [
          { weight: 0.7, message: "You got the job! Making your own money now.", effects: { money: 500, happiness: 10 } },
          { weight: 0.3, message: "They said they'll call you back. They didn't.", effects: { happiness: -5 } },
        ]},
        { text: "Not interested", effects: {}, outcomes: [
          { weight: 1.0, message: "You decided to focus on other things.", effects: {} },
        ]},
      ]
    },
    {
      id: "prom",
      title: "Prom Night",
      description: "Prom is coming up! Big night ahead.",
      minAge: 16, maxAge: 18,
      options: [
        { text: "Go all out", effects: { money: -200 }, outcomes: [
          { weight: 0.3, message: "You were crowned prom royalty!", effects: { happiness: 25, social: 20 } },
          { weight: 0.4, message: "Amazing night! Memories for life.", effects: { happiness: 20, social: 10 } },
          { weight: 0.2, message: "It was okay. A bit overrated.", effects: { happiness: 5 } },
          { weight: 0.1, message: "Your date ditched you. Terrible night.", effects: { happiness: -20, social: -10 } },
        ]},
        { text: "Skip it", effects: {}, outcomes: [
          { weight: 0.5, message: "You hung out with friends who also skipped.", effects: { happiness: 5 } },
          { weight: 0.5, message: "You kind of regret not going.", effects: { happiness: -5 } },
        ]},
      ]
    },
    {
      id: "dare",
      title: "Truth or Dare",
      description: "Friends are playing truth or dare. You picked dare.",
      minAge: 13, maxAge: 19,
      options: [
        { text: "Do the dare", effects: {}, outcomes: [
          { weight: 0.4, message: "You did it! Everyone was impressed.", effects: { social: 15, happiness: 10 } },
          { weight: 0.3, message: "That was embarrassing but funny.", effects: { social: 5, happiness: 5 } },
          { weight: 0.2, message: "You hurt yourself doing something stupid.", effects: { health: -15, happiness: -5 } },
          { weight: 0.1, message: "You got in serious trouble.", effects: { happiness: -15 } },
        ]},
        { text: "Chicken out", effects: {}, outcomes: [
          { weight: 0.6, message: "Everyone called you a coward.", effects: { social: -10 } },
          { weight: 0.4, message: "Nobody really cared.", effects: {} },
        ]},
      ]
    },
  ],

  adult: [
    {
      id: "promotion",
      title: "Promotion Opportunity",
      description: "Your boss mentions there's a management position opening up.",
      minAge: 22, maxAge: 60,
      requiresJob: true,
      options: [
        { text: "Go for it", effects: {}, outcomes: [
          { weight: 0.4, message: "You got the promotion! Salary increased.", effects: { money: 15000, happiness: 15, smarts: 3 } },
          { weight: 0.35, message: "They went with someone else.", effects: { happiness: -10 } },
          { weight: 0.25, message: "Promotion denied, but you got a small raise.", effects: { money: 5000, happiness: 5 } },
        ]},
        { text: "Not ready yet", effects: {}, outcomes: [
          { weight: 0.7, message: "You stayed in your comfort zone.", effects: {} },
          { weight: 0.3, message: "Your boss seems disappointed in you.", effects: { happiness: -5 } },
        ]},
      ]
    },
    {
      id: "car_accident",
      title: "Car Accident",
      description: "You were in a car accident!",
      minAge: 16, maxAge: 90,
      options: [
        { text: "Assess the damage", effects: {}, outcomes: [
          { weight: 0.3, message: "Just a fender bender. You're fine.", effects: { money: -2000 } },
          { weight: 0.35, message: "Moderate injuries. Hospital bills incoming.", effects: { health: -20, money: -8000 } },
          { weight: 0.25, message: "Serious injuries. Long recovery ahead.", effects: { health: -40, money: -25000, happiness: -20 } },
          { weight: 0.1, message: "Miraculously walked away without a scratch!", effects: { happiness: 10 } },
        ]},
      ]
    },
    {
      id: "lottery",
      title: "Lottery Ticket",
      description: "You found a $5 lottery ticket on the ground.",
      minAge: 18, maxAge: 90,
      options: [
        { text: "Scratch it", effects: {}, outcomes: [
          { weight: 0.5, message: "Nothing. Just your luck.", effects: {} },
          { weight: 0.25, message: "Won $20! Small victory.", effects: { money: 20, happiness: 5 } },
          { weight: 0.15, message: "Won $500! Nice!", effects: { money: 500, happiness: 15 } },
          { weight: 0.07, message: "Won $5,000! Lucky day!", effects: { money: 5000, happiness: 25 } },
          { weight: 0.025, message: "Won $50,000! This is life changing!", effects: { money: 50000, happiness: 40 } },
          { weight: 0.005, message: "JACKPOT! $500,000!!!", effects: { money: 500000, happiness: 50 } },
        ]},
        { text: "Leave it", effects: {}, outcomes: [
          { weight: 1.0, message: "Someone else will find it.", effects: {} },
        ]},
      ]
    },
    {
      id: "investment_tip",
      title: "Hot Stock Tip",
      description: "A friend says they have a 'guaranteed' stock tip.",
      minAge: 21, maxAge: 70,
      options: [
        { text: "Invest $5,000", effects: { money: -5000 }, minMoney: 5000, outcomes: [
          { weight: 0.15, message: "The stock 10x'd! You're rich!", effects: { money: 50000, happiness: 30 } },
          { weight: 0.25, message: "Made a nice profit.", effects: { money: 12000, happiness: 15 } },
          { weight: 0.25, message: "Broke even. At least you didn't lose.", effects: { money: 5000 } },
          { weight: 0.25, message: "Lost most of it.", effects: { money: 1000, happiness: -15 } },
          { weight: 0.1, message: "Total loss. It was a scam.", effects: { happiness: -25 } },
        ]},
        { text: "Invest $1,000", effects: { money: -1000 }, minMoney: 1000, outcomes: [
          { weight: 0.15, message: "The stock 10x'd!", effects: { money: 10000, happiness: 20 } },
          { weight: 0.25, message: "Made a nice profit.", effects: { money: 2400, happiness: 10 } },
          { weight: 0.25, message: "Broke even.", effects: { money: 1000 } },
          { weight: 0.25, message: "Lost most of it.", effects: { money: 200, happiness: -10 } },
          { weight: 0.1, message: "Total loss.", effects: { happiness: -15 } },
        ]},
        { text: "Pass", effects: {}, outcomes: [
          { weight: 0.5, message: "Probably for the best.", effects: {} },
          { weight: 0.3, message: "The stock actually did well. Oh well.", effects: { happiness: -5 } },
          { weight: 0.2, message: "It was indeed a scam. Dodged a bullet!", effects: { happiness: 5 } },
        ]},
      ]
    },
    {
      id: "mugging",
      title: "Mugging",
      description: "Someone pulls a knife on you in an alley and demands your wallet!",
      minAge: 16, maxAge: 80,
      options: [
        { text: "Hand it over", effects: {}, outcomes: [
          { weight: 0.85, message: "They took your money and ran.", effects: { money: -500, happiness: -15 } },
          { weight: 0.15, message: "They knocked you down anyway.", effects: { money: -500, health: -15, happiness: -20 } },
        ]},
        { text: "Fight back", effects: {}, outcomes: [
          { weight: 0.25, message: "You fought them off! Kept your wallet.", effects: { happiness: 10 } },
          { weight: 0.35, message: "You got stabbed but survived.", effects: { health: -35, money: -10000, happiness: -25 } },
          { weight: 0.3, message: "You got beaten up badly.", effects: { health: -25, money: -500, happiness: -20 } },
          { weight: 0.1, message: "A bystander helped! Mugger arrested.", effects: { happiness: 15 } },
        ]},
        { text: "Run!", effects: {}, outcomes: [
          { weight: 0.6, message: "You escaped! Heart pounding.", effects: { happiness: 5 } },
          { weight: 0.3, message: "They caught up and took your stuff.", effects: { money: -500, health: -10, happiness: -15 } },
          { weight: 0.1, message: "You tripped and hurt yourself.", effects: { health: -10, money: -500, happiness: -10 } },
        ]},
      ]
    },
    {
      id: "jury_duty",
      title: "Jury Duty",
      description: "You've been summoned for jury duty.",
      minAge: 18, maxAge: 75,
      options: [
        { text: "Serve", effects: {}, outcomes: [
          { weight: 0.5, message: "Boring but you did your civic duty.", effects: { happiness: -5, smarts: 2 } },
          { weight: 0.3, message: "Interesting case! Learned a lot.", effects: { smarts: 5, happiness: 5 } },
          { weight: 0.2, message: "High-profile case. Stressful experience.", effects: { smarts: 3, happiness: -10 } },
        ]},
        { text: "Try to get out of it", effects: {}, outcomes: [
          { weight: 0.6, message: "You were excused.", effects: {} },
          { weight: 0.3, message: "Nice try. You have to serve anyway.", effects: { happiness: -10 } },
          { weight: 0.1, message: "The judge was not amused. Contempt of court.", effects: { money: -1000, happiness: -15 } },
        ]},
      ]
    },
    {
      id: "inheritance",
      title: "Unexpected Inheritance",
      description: "A distant relative you barely knew has passed away and left you something.",
      minAge: 25, maxAge: 90,
      options: [
        { text: "Check the will", effects: {}, outcomes: [
          { weight: 0.1, message: "They left you their fortune!", effects: { money: 200000, happiness: 30 } },
          { weight: 0.25, message: "A nice sum of money.", effects: { money: 50000, happiness: 20 } },
          { weight: 0.3, message: "A modest inheritance.", effects: { money: 15000, happiness: 10 } },
          { weight: 0.2, message: "Just some old furniture.", effects: { money: 2000, happiness: 5 } },
          { weight: 0.1, message: "They left you their debts too.", effects: { money: 10000, happiness: -10 } },
          { weight: 0.05, message: "A mysterious antique worth a fortune!", effects: { money: 100000, happiness: 25 } },
        ]},
      ]
    },
    {
      id: "health_scare",
      title: "Health Scare",
      description: "You've been having concerning symptoms. Doctor wants to run tests.",
      minAge: 30, maxAge: 90,
      options: [
        { text: "Get tested", effects: { money: -2000 }, outcomes: [
          { weight: 0.6, message: "False alarm! Everything is fine.", effects: { happiness: 15 } },
          { weight: 0.25, message: "Minor issue, easily treatable.", effects: { health: -5, money: -3000 } },
          { weight: 0.1, message: "Serious condition. Treatment required.", effects: { health: -20, money: -20000, happiness: -20 } },
          { weight: 0.05, message: "Critical diagnosis. Life will change.", effects: { health: -40, money: -50000, happiness: -30 } },
        ]},
        { text: "Ignore it", effects: {}, outcomes: [
          { weight: 0.5, message: "Symptoms went away on their own.", effects: { happiness: 5 } },
          { weight: 0.3, message: "Got worse. Should have gone earlier.", effects: { health: -25, money: -15000 } },
          { weight: 0.2, message: "Symptoms persist but you live with it.", effects: { health: -10, happiness: -10 } },
        ]},
      ]
    },
  ],

  senior: [
    {
      id: "retirement_party",
      title: "Retirement",
      description: "After years of work, it's time to retire.",
      minAge: 60, maxAge: 75,
      requiresJob: true,
      options: [
        { text: "Retire gracefully", effects: {}, outcomes: [
          { weight: 0.7, message: "Your coworkers threw you a wonderful party!", effects: { happiness: 25, money: 10000 } },
          { weight: 0.3, message: "Quiet retirement. Time for new adventures.", effects: { happiness: 15 } },
        ]},
        { text: "Keep working", effects: {}, outcomes: [
          { weight: 0.6, message: "You still got it! Work continues.", effects: { happiness: 5 } },
          { weight: 0.4, message: "Boss hints you should consider retiring.", effects: { happiness: -10 } },
        ]},
      ]
    },
    {
      id: "grandchild",
      title: "Grandchild Born",
      description: "One of your children is having a baby!",
      minAge: 45, maxAge: 90,
      requiresChildren: true,
      options: [
        { text: "Celebrate!", effects: {}, outcomes: [
          { weight: 1.0, message: "You're a grandparent! What a blessing.", effects: { happiness: 30 } },
        ]},
      ]
    },
    {
      id: "old_friend",
      title: "Reconnection",
      description: "An old friend from your youth reaches out.",
      minAge: 50, maxAge: 90,
      options: [
        { text: "Meet up", effects: {}, outcomes: [
          { weight: 0.7, message: "Wonderful reunion! So many memories.", effects: { happiness: 20, social: 10 } },
          { weight: 0.2, message: "They've changed a lot. Bittersweet.", effects: { happiness: 5 } },
          { weight: 0.1, message: "They wanted to sell you something. Disappointing.", effects: { happiness: -10 } },
        ]},
        { text: "Ignore them", effects: {}, outcomes: [
          { weight: 1.0, message: "Some bridges stay burned.", effects: {} },
        ]},
      ]
    },
  ],

  random: [
    {
      id: "found_money",
      title: "Lucky Find",
      description: "You found cash on the ground!",
      minAge: 6, maxAge: 90,
      options: [
        { text: "Keep it", effects: {}, outcomes: [
          { weight: 0.5, message: "Found $20! Nice.", effects: { money: 20, happiness: 5 } },
          { weight: 0.3, message: "Found $100!", effects: { money: 100, happiness: 10 } },
          { weight: 0.15, message: "Found $500 in an envelope!", effects: { money: 500, happiness: 15 } },
          { weight: 0.05, message: "A wallet with $2000! No ID inside.", effects: { money: 2000, happiness: 20 } },
        ]},
        { text: "Turn it in", effects: {}, outcomes: [
          { weight: 0.3, message: "The owner was found and gave you a reward!", effects: { money: 100, happiness: 15 } },
          { weight: 0.5, message: "Good karma. Feels right.", effects: { happiness: 10 } },
          { weight: 0.2, message: "Nobody claimed it. It's yours now!", effects: { money: 200, happiness: 10 } },
        ]},
      ]
    },
    {
      id: "random_encounter",
      title: "Chance Meeting",
      description: "You bump into someone interesting.",
      minAge: 16, maxAge: 90,
      options: [
        { text: "Strike up conversation", effects: {}, outcomes: [
          { weight: 0.3, message: "Made a new friend!", effects: { social: 10, happiness: 10 } },
          { weight: 0.25, message: "They gave you a business opportunity.", effects: { money: 3000, social: 5 } },
          { weight: 0.25, message: "Pleasant chat but nothing more.", effects: { happiness: 5 } },
          { weight: 0.1, message: "They were a famous person in disguise!", effects: { happiness: 20, social: 15 } },
          { weight: 0.1, message: "Turns out they were creepy. Yikes.", effects: { happiness: -5 } },
        ]},
        { text: "Keep walking", effects: {}, outcomes: [
          { weight: 1.0, message: "You went about your day.", effects: {} },
        ]},
      ]
    },
    {
      id: "contest",
      title: "Contest Entry",
      description: "You entered a random online contest months ago. They're calling!",
      minAge: 13, maxAge: 80,
      options: [
        { text: "Answer the call", effects: {}, outcomes: [
          { weight: 0.3, message: "You won a vacation trip!", effects: { happiness: 30, money: 5000 } },
          { weight: 0.3, message: "You won some electronics!", effects: { happiness: 15, money: 1000 } },
          { weight: 0.2, message: "You won a gift card.", effects: { happiness: 10, money: 200 } },
          { weight: 0.15, message: "It was actually a scam call.", effects: { happiness: -5 } },
          { weight: 0.05, message: "Grand prize! A new car!", effects: { happiness: 40, money: 25000 } },
        ]},
      ]
    },
    {
      id: "viral_moment",
      title: "Viral Fame",
      description: "A video of you went viral on social media!",
      minAge: 13, maxAge: 70,
      options: [
        { text: "Embrace the fame", effects: {}, outcomes: [
          { weight: 0.4, message: "You became internet famous! Opportunities rolling in.", effects: { social: 20, happiness: 20, money: 5000 } },
          { weight: 0.3, message: "15 minutes of fame. It was fun while it lasted.", effects: { social: 10, happiness: 10 } },
          { weight: 0.2, message: "Some negative comments too. Mixed feelings.", effects: { social: 5, happiness: -5 } },
          { weight: 0.1, message: "It was embarrassing footage. You're a meme now.", effects: { social: -15, happiness: -20 } },
        ]},
        { text: "Try to remove it", effects: {}, outcomes: [
          { weight: 0.3, message: "Too late. The internet never forgets.", effects: { happiness: -10 } },
          { weight: 0.4, message: "Managed to get it taken down.", effects: { happiness: 5 } },
          { weight: 0.3, message: "Trying to remove it made it more popular.", effects: { social: 10, happiness: -15 } },
        ]},
      ]
    },
    {
      id: "natural_disaster",
      title: "Natural Disaster",
      description: "A severe storm/earthquake hit your area!",
      minAge: 5, maxAge: 90,
      options: [
        { text: "Take shelter", effects: {}, outcomes: [
          { weight: 0.5, message: "Rode it out safely. Minor property damage.", effects: { money: -5000 } },
          { weight: 0.25, message: "Significant damage but you're okay.", effects: { money: -20000, happiness: -15 } },
          { weight: 0.15, message: "You helped neighbors evacuate. Hero!", effects: { social: 15, happiness: 10, money: -3000 } },
          { weight: 0.08, message: "Home destroyed. Insurance covers most.", effects: { money: -50000, happiness: -30 } },
          { weight: 0.02, message: "You were injured in the disaster.", effects: { health: -30, money: -15000, happiness: -25 } },
        ]},
      ]
    },
    {
      id: "pet_situation",
      title: "Pet Emergency",
      description: "Your pet is sick and needs emergency vet care.",
      minAge: 10, maxAge: 90,
      options: [
        { text: "Pay for treatment", effects: {}, outcomes: [
          { weight: 0.7, message: "Your pet made a full recovery!", effects: { money: -3000, happiness: 10 } },
          { weight: 0.2, message: "Treatment helped but ongoing care needed.", effects: { money: -5000, happiness: -5 } },
          { weight: 0.1, message: "Despite best efforts, you lost your pet.", effects: { money: -2000, happiness: -30 } },
        ]},
        { text: "Can't afford it", effects: {}, outcomes: [
          { weight: 0.3, message: "Pet recovered on its own!", effects: { happiness: 5 } },
          { weight: 0.4, message: "Pet got worse but survived.", effects: { happiness: -15 } },
          { weight: 0.3, message: "You lost your beloved pet.", effects: { happiness: -35 } },
        ]},
      ]
    },
    {
      id: "identity_theft",
      title: "Identity Theft",
      description: "Someone stole your identity and racked up debt!",
      minAge: 18, maxAge: 90,
      options: [
        { text: "Report it immediately", effects: {}, outcomes: [
          { weight: 0.5, message: "Caught early. Minimal damage.", effects: { money: -2000, happiness: -10 } },
          { weight: 0.3, message: "Took months to resolve. Stressful.", effects: { money: -8000, happiness: -20 } },
          { weight: 0.2, message: "Thief was caught! Got most money back.", effects: { money: -1000, happiness: 5 } },
        ]},
      ]
    },
    {
      id: "skill_discovery",
      title: "Hidden Talent",
      description: "You discovered you have a natural talent!",
      minAge: 10, maxAge: 60,
      options: [
        { text: "Develop it", effects: {}, outcomes: [
          { weight: 0.4, message: "You became quite skilled!", effects: { smarts: 10, happiness: 15 } },
          { weight: 0.3, message: "A fun new hobby at least.", effects: { happiness: 10, smarts: 5 } },
          { weight: 0.2, message: "Made some money from it!", effects: { money: 5000, happiness: 10, smarts: 5 } },
          { weight: 0.1, message: "Could become a new career path!", effects: { smarts: 15, happiness: 20, money: 10000 } },
        ]},
        { text: "Not interested", effects: {}, outcomes: [
          { weight: 1.0, message: "Some talents go unexplored.", effects: {} },
        ]},
      ]
    },
  ],

  occult_human: [
    {
      id: "strange_dreams",
      title: "Strange Dreams",
      description: "You've been having vivid, disturbing dreams about darkness and hunger...",
      minAge: 16, maxAge: 90,
      options: [
        { text: "Investigate", effects: {}, outcomes: [
          { weight: 0.7, message: "Just stress. Nothing supernatural.", effects: { happiness: -5 } },
          { weight: 0.2, message: "The dreams stopped as mysteriously as they started.", effects: {} },
          { weight: 0.1, message: "Something is definitely watching you...", effects: { happiness: -15 }, supernatural: true },
        ]},
        { text: "Ignore them", effects: {}, outcomes: [
          { weight: 0.8, message: "They faded over time.", effects: {} },
          { weight: 0.2, message: "The dreams intensified.", effects: { happiness: -10, health: -5 } },
        ]},
      ]
    },
    {
      id: "mysterious_stranger",
      title: "Mysterious Stranger",
      description: "A pale, elegant stranger seems very interested in you at a bar...",
      minAge: 21, maxAge: 70,
      options: [
        { text: "Talk to them", effects: {}, outcomes: [
          { weight: 0.4, message: "Fascinating conversation. They left mysteriously.", effects: { social: 5 } },
          { weight: 0.3, message: "They offered you 'eternal life'. You declined.", effects: { happiness: 5 } },
          { weight: 0.2, message: "Just a weird person. Nothing supernatural.", effects: {} },
          { weight: 0.1, message: "They bit your neck! You're changing...", effects: {}, transform: "Vampire" },
        ]},
        { text: "Avoid them", effects: {}, outcomes: [
          { weight: 0.9, message: "They watched you leave with an unsettling smile.", effects: {} },
          { weight: 0.1, message: "They followed you outside...", effects: { happiness: -10 }, supernatural: true },
        ]},
      ]
    },
    {
      id: "full_moon_hike",
      title: "Full Moon Hike",
      description: "Friends invite you for a night hike during the full moon.",
      minAge: 16, maxAge: 60,
      options: [
        { text: "Go hiking", effects: {}, outcomes: [
          { weight: 0.5, message: "Beautiful night! Great memories.", effects: { happiness: 15, social: 10 } },
          { weight: 0.25, message: "Got lost briefly. Scary but fine.", effects: { happiness: -5 } },
          { weight: 0.15, message: "Heard howling. Probably just wolves... right?", effects: { happiness: -10 } },
          { weight: 0.1, message: "Something attacked the group! You were bitten...", effects: { health: -20 }, transform: "Werewolf" },
        ]},
        { text: "Stay home", effects: {}, outcomes: [
          { weight: 1.0, message: "Quiet night in. Friends said you missed out.", effects: { social: -5 } },
        ]},
      ]
    },
  ],
};

export const getEligibleEvents = (player) => {
  const eligible = [];
  const age = player.age;
  
  const categories = ['childhood', 'teen', 'adult', 'senior', 'random'];
  if (player.occult === "Human") categories.push('occult_human');
  
  for (const category of categories) {
    const events = lifeEvents[category] || [];
    for (const event of events) {
      if (age < event.minAge || age > event.maxAge) continue;
      if (event.requiresJob && !player.job) continue;
      if (event.requiresChildren && (!player.children || player.children.length === 0)) continue;
      eligible.push({ ...event, category });
    }
  }
  
  return eligible;
};

export const selectRandomEvent = (player) => {
  const eligible = getEligibleEvents(player);
  if (eligible.length === 0) return null;
  return eligible[Math.floor(Math.random() * eligible.length)];
};

export const resolveOutcome = (option) => {
  if (!option.outcomes || option.outcomes.length === 0) {
    return { message: "Nothing happened.", effects: option.effects || {} };
  }
  
  const totalWeight = option.outcomes.reduce((sum, o) => sum + o.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const outcome of option.outcomes) {
    random -= outcome.weight;
    if (random <= 0) {
      return {
        message: outcome.message,
        effects: { ...(option.effects || {}), ...(outcome.effects || {}) },
        transform: outcome.transform,
        supernatural: outcome.supernatural,
      };
    }
  }
  
  const last = option.outcomes[option.outcomes.length - 1];
  return {
    message: last.message,
    effects: { ...(option.effects || {}), ...(last.effects || {}) },
    transform: last.transform,
    supernatural: last.supernatural,
  };
};
