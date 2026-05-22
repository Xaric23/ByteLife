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
    {
      id: "rival_blackmail",
      title: "Proof in the Wrong Hands",
      description: "Someone claims they can prove one of your secrets.",
      minAge: 16, maxAge: 90,
      requiresSecret: true,
      options: [
        { text: "Pay them off", minMoney: 3000, effects: { money: -3000, happiness: -6 }, outcomes: [
          { weight: 0.7, message: "The evidence disappeared. For now.", effects: {} },
          { weight: 0.3, message: "They took the money and kept a copy.", effects: { happiness: -12 } },
        ]},
        { text: "Call their bluff", effects: {}, outcomes: [
          { weight: 0.45, message: "They had nothing. Nice read.", effects: { happiness: 8, social: 3 } },
          { weight: 0.35, message: "They leaked enough to make people suspicious.", effects: { happiness: -12 }, secret: "occult_identity" },
          { weight: 0.2, message: "The leak reached dangerous circles.", effects: { happiness: -18, factions: { foundation: 10, hunterOrder: 8 } } },
        ]},
      ]
    },
    {
      id: "estate_sale_relic",
      title: "Estate Sale Relic",
      description: "A dusty box at an estate sale vibrates when you touch it.",
      minAge: 18, maxAge: 90,
      options: [
        { text: "Buy it", minMoney: 1200, effects: { money: -1200, artifact: "scrying_mirror" }, outcomes: [
          { weight: 0.65, message: "The relic is real. It shows impossible reflections.", effects: { smarts: 4 } },
          { weight: 0.25, message: "It is real, and someone else wanted it too.", effects: { happiness: -8, factions: { serpentHand: 5, foundation: -4 } } },
          { weight: 0.1, message: "The box was empty by morning, but your dreams changed.", effects: { happiness: -8 }, transform: "Psychic" },
        ]},
        { text: "Walk away", effects: {}, outcomes: [
          { weight: 0.7, message: "Probably just a weird antique.", effects: {} },
          { weight: 0.3, message: "You still hear it humming in your sleep.", effects: { happiness: -5 } },
        ]},
      ]
    },
    {
      id: "faction_offer",
      title: "A Quiet Offer",
      description: "A faction sends a polite, unsigned invitation to meet.",
      minAge: 18, maxAge: 90,
      options: [
        { text: "Meet them", effects: {}, outcomes: [
          { weight: 0.3, message: "Foundation contacts offered a consultant file.", effects: { money: 5000, factions: { foundation: 12, serpentHand: -8 } } },
          { weight: 0.3, message: "Occult liberators gave you a safehouse number.", effects: { social: 5, factions: { serpentHand: 12, foundation: -8 } } },
          { weight: 0.25, message: "The Night Court appreciated your manners.", effects: { happiness: 6, factions: { nightCourt: 12 } } },
          { weight: 0.15, message: "Hunters tested you and left unconvinced.", effects: { health: -5, factions: { hunterOrder: 8 } } },
        ]},
        { text: "Ignore it", effects: {}, outcomes: [
          { weight: 1.0, message: "The envelope vanished from your desk by morning.", effects: { happiness: -3 } },
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
          { weight: 0.5, message: "Just stress. Nothing supernatural.", effects: { happiness: -5 } },
          { weight: 0.2, message: "The dreams stopped as mysteriously as they started.", effects: {} },
          { weight: 0.3, message: "Something is definitely watching you...", effects: { happiness: -15 }, supernatural: true },
        ]},
        { text: "Ignore them", effects: {}, outcomes: [
          { weight: 0.7, message: "They faded over time.", effects: {} },
          { weight: 0.3, message: "The dreams intensified.", effects: { happiness: -10, health: -5 } },
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
          { weight: 0.3, message: "Fascinating conversation. They left mysteriously.", effects: { social: 5 } },
          { weight: 0.2, message: "They offered you 'eternal life'. You declined.", effects: { happiness: 5 } },
          { weight: 0.2, message: "Just a weird person. Nothing supernatural.", effects: {} },
          { weight: 0.3, message: "They bit your neck! You're changing...", effects: {}, transform: "Vampire" },
        ]},
        { text: "Avoid them", effects: {}, outcomes: [
          { weight: 0.7, message: "They watched you leave with an unsettling smile.", effects: {} },
          { weight: 0.3, message: "They followed you outside...", effects: { happiness: -10 }, transform: "Vampire" },
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
          { weight: 0.4, message: "Beautiful night! Great memories.", effects: { happiness: 15, social: 10 } },
          { weight: 0.2, message: "Got lost briefly. Scary but fine.", effects: { happiness: -5 } },
          { weight: 0.15, message: "Heard howling. Probably just wolves... right?", effects: { happiness: -10 } },
          { weight: 0.25, message: "Something attacked the group! You were bitten...", effects: { health: -20 }, transform: "Werewolf" },
        ]},
        { text: "Stay home", effects: {}, outcomes: [
          { weight: 1.0, message: "Quiet night in. Friends said you missed out.", effects: { social: -5 } },
        ]},
      ]
    },
    {
      id: "abandoned_building",
      title: "Abandoned Building",
      description: "You and friends dare each other to explore an abandoned asylum...",
      minAge: 16, maxAge: 45,
      options: [
        { text: "Go inside", effects: {}, outcomes: [
          { weight: 0.3, message: "Creepy but empty. Good story to tell.", effects: { social: 5 } },
          { weight: 0.2, message: "Found some interesting graffiti and old records.", effects: { smarts: 3 } },
          { weight: 0.2, message: "Something chased you out! You ran for your life.", effects: { happiness: -15, health: -5 } },
          { weight: 0.3, message: "A ghoulish figure emerged from the darkness and attacked!", effects: { health: -15 }, transform: "Ghoul" },
        ]},
        { text: "Stay outside", effects: {}, outcomes: [
          { weight: 1.0, message: "Your friends called you a coward, but at least you're safe.", effects: { social: -5 } },
        ]},
      ]
    },
    {
      id: "blood_craving",
      title: "Strange Craving",
      description: "Lately, the sight of blood doesn't disgust you... it fascinates you.",
      minAge: 18, maxAge: 80,
      options: [
        { text: "Embrace it", effects: {}, outcomes: [
          { weight: 0.4, message: "It passed. Probably just iron deficiency.", effects: {} },
          { weight: 0.3, message: "You found yourself at a blood bank late at night...", effects: { happiness: -10 } },
          { weight: 0.3, message: "The transformation completes itself. You crave blood now.", effects: {}, transform: "Vampire" },
        ]},
        { text: "Seek help", effects: {}, outcomes: [
          { weight: 0.6, message: "Doctor says you're fine. Weird.", effects: { money: -500 } },
          { weight: 0.4, message: "The doctor noticed something strange in your blood work...", effects: { money: -500, happiness: -10 }, supernatural: true },
        ]},
      ]
    },
    {
      id: "cemetery_shortcut",
      title: "Cemetery Shortcut",
      description: "It's late at night. The cemetery is the fastest way home...",
      minAge: 16, maxAge: 70,
      options: [
        { text: "Walk through", effects: {}, outcomes: [
          { weight: 0.4, message: "Made it through fine. Spooky atmosphere though.", effects: { happiness: -5 } },
          { weight: 0.2, message: "Swear you saw something moving between the graves.", effects: { happiness: -10 } },
          { weight: 0.15, message: "Tripped over a freshly dug grave. Unsettling.", effects: { happiness: -15 } },
          { weight: 0.25, message: "Something crawled out of a grave and bit you!", effects: { health: -20 }, transform: "Zombie" },
        ]},
        { text: "Take the long way", effects: {}, outcomes: [
          { weight: 1.0, message: "Took longer but you feel better about it.", effects: {} },
        ]},
      ]
    },
    {
      id: "occult_shop",
      title: "Mysterious Shop",
      description: "A new occult shop opened downtown. Curiosity gets the better of you...",
      minAge: 18, maxAge: 70,
      options: [
        { text: "Browse inside", effects: {}, outcomes: [
          { weight: 0.3, message: "Mostly fake stuff. Bought a cool necklace though.", effects: { money: -50, happiness: 5 } },
          { weight: 0.25, message: "The shopkeeper gave you a knowing look. Unsettling.", effects: { happiness: -5 } },
          { weight: 0.2, message: "Found a genuinely ancient artifact!", effects: { money: -200, smarts: 5 } },
          { weight: 0.25, message: "Touched a cursed object. You feel... different.", effects: {}, transform: "Fae" },
        ]},
        { text: "Keep walking", effects: {}, outcomes: [
          { weight: 1.0, message: "Probably for the best.", effects: {} },
        ]},
      ]
    },
    {
      id: "forest_encounter",
      title: "Lost in the Woods",
      description: "A hiking trip went wrong. You're lost as night falls...",
      minAge: 16, maxAge: 60,
      options: [
        { text: "Keep moving", effects: {}, outcomes: [
          { weight: 0.3, message: "Found your way back to the trail!", effects: { happiness: 10 } },
          { weight: 0.25, message: "Spent the night in the woods. Terrifying.", effects: { happiness: -20, health: -10 } },
          { weight: 0.2, message: "Something stalked you all night. You barely escaped.", effects: { happiness: -25, health: -15 } },
          { weight: 0.25, message: "The hunger took over. You don't remember what happened, but you're different now.", effects: { health: -10 }, transform: "Wendigo" },
        ]},
        { text: "Make camp", effects: {}, outcomes: [
          { weight: 0.5, message: "Rough night but you survived. Found help in the morning.", effects: { happiness: -10 } },
          { weight: 0.3, message: "Strange dreams all night. Woke up feeling changed.", effects: { happiness: -15 }, supernatural: true },
          { weight: 0.2, message: "Something visited your camp...", effects: { health: -15 }, transform: "Werewolf" },
        ]},
      ]
    },
    {
      id: "seance",
      title: "Séance Invitation",
      description: "A friend invites you to a séance. They say it's just for fun...",
      minAge: 18, maxAge: 60,
      options: [
        { text: "Participate", effects: {}, outcomes: [
          { weight: 0.35, message: "Nothing happened. Good laughs though.", effects: { social: 5, happiness: 5 } },
          { weight: 0.25, message: "The candles flickered. Probably just wind.", effects: { happiness: -5 } },
          { weight: 0.15, message: "You felt a cold presence. Everyone freaked out.", effects: { happiness: -15, social: 5 } },
          { weight: 0.25, message: "Something answered. And it chose you as its vessel.", effects: {}, transform: "Demon" },
        ]},
        { text: "Decline", effects: {}, outcomes: [
          { weight: 1.0, message: "You stayed home. Your friend said nothing happened anyway.", effects: {} },
        ]},
      ]
    },
    {
      id: "near_death",
      title: "Near Death Experience",
      description: "You almost died in an accident. You saw... something on the other side.",
      minAge: 16, maxAge: 80,
      options: [
        { text: "Accept what you saw", effects: {}, outcomes: [
          { weight: 0.4, message: "Maybe it was just your brain shutting down. You recovered fine.", effects: { health: -10, happiness: 5 } },
          { weight: 0.3, message: "You can't forget what you saw. It haunts you.", effects: { health: -10, happiness: -20 } },
          { weight: 0.3, message: "You came back... but not entirely. Part of you stayed in the darkness.", effects: { health: -15 }, transform: "Revenant" },
        ]},
        { text: "Deny it happened", effects: {}, outcomes: [
          { weight: 0.7, message: "Pushed it out of your mind. Life goes on.", effects: { health: -10 } },
          { weight: 0.3, message: "You can't escape what you experienced.", effects: { health: -10, happiness: -15 }, supernatural: true },
        ]},
      ]
    },
    {
      id: "ufo_sighting",
      title: "Strange Lights",
      description: "You wake up to blinding lights outside your window. Your clock reads 3:33 AM.",
      minAge: 16, maxAge: 90,
      options: [
        { text: "Investigate", effects: {}, outcomes: [
          { weight: 0.45, message: "Just a helicopter with a searchlight. Weird time for it though.", effects: { happiness: -5 } },
          { weight: 0.3, message: "The lights vanished before you got outside.", effects: { happiness: -10 } },
          { weight: 0.15, message: "You have no memory of the next few hours...", effects: { happiness: -20 }, supernatural: true },
          { weight: 0.1, message: "A beam of light engulfed you. You woke up... changed.", effects: {}, transform: "Alien" },
        ]},
        { text: "Go back to sleep", effects: {}, outcomes: [
          { weight: 0.7, message: "Strange dreams, but morning came normally.", effects: {} },
          { weight: 0.25, message: "You woke up in a field miles from home. No memory of how.", effects: { happiness: -25 }, supernatural: true },
          { weight: 0.05, message: "You woke up with a strange implant scar. Something happened.", effects: { health: -5 }, transform: "Alien" },
        ]},
      ]
    },
    {
      id: "crop_circles",
      title: "Crop Circle Discovery",
      description: "You stumble upon a fresh crop circle while hiking through farmland...",
      minAge: 16, maxAge: 70,
      options: [
        { text: "Walk into the center", effects: {}, outcomes: [
          { weight: 0.45, message: "Just flattened wheat. Probably a prank.", effects: { smarts: 2 } },
          { weight: 0.3, message: "You felt dizzy and disoriented in the center.", effects: { happiness: -10, health: -5 } },
          { weight: 0.15, message: "Your electronics all stopped working. Creepy.", effects: { money: -500 } },
          { weight: 0.1, message: "Time seemed to stop. When you 'woke up', you were different.", effects: {}, transform: "Alien" },
        ]},
        { text: "Stay at the edge", effects: {}, outcomes: [
          { weight: 0.9, message: "Took some photos. Cool story at least.", effects: { social: 5 } },
          { weight: 0.1, message: "Something pulled you into the center anyway...", effects: { happiness: -15 }, transform: "Alien" },
        ]},
      ]
    },
    {
      id: "missing_time",
      title: "Missing Time",
      description: "You were driving home when suddenly it's 4 hours later. You have no memory of what happened.",
      minAge: 18, maxAge: 80,
      options: [
        { text: "Try to remember", effects: {}, outcomes: [
          { weight: 0.4, message: "Flashes of bright lights, metal surfaces... probably just a dream.", effects: { happiness: -10 } },
          { weight: 0.3, message: "You remember beings with large eyes. Impossible.", effects: { happiness: -20 }, supernatural: true },
          { weight: 0.1, message: "Memory suppression failed. They changed you.", effects: {}, transform: "Alien" },
          { weight: 0.2, message: "The memories are blocked. Probably for the best.", effects: { happiness: -5 } },
        ]},
        { text: "Forget about it", effects: {}, outcomes: [
          { weight: 0.6, message: "Life continues. Some things are better unknown.", effects: {} },
          { weight: 0.4, message: "The dreams won't stop. Something happened to you.", effects: { happiness: -15 }, supernatural: true },
        ]},
      ]
    },
    {
      id: "government_facility",
      title: "Restricted Area",
      description: "You accidentally wandered near a classified government facility. Helicopters appear overhead.",
      minAge: 18, maxAge: 60,
      options: [
        { text: "Run", effects: {}, outcomes: [
          { weight: 0.6, message: "You escaped without incident. Close call.", effects: { happiness: -5 } },
          { weight: 0.3, message: "They detained you briefly. Very intimidating questions.", effects: { happiness: -20, social: -5 } },
          { weight: 0.1, message: "They caught you and used you for an 'experiment'...", effects: { health: -10 }, transform: "Alien" },
        ]},
        { text: "Surrender", effects: {}, outcomes: [
          { weight: 0.5, message: "Released after questioning. They erased your memory... mostly.", effects: { happiness: -10 } },
          { weight: 0.4, message: "Detained for 'debriefing'. Something was done to you.", effects: { happiness: -25 }, supernatural: true },
          { weight: 0.1, message: "You saw things inside that facility. They made sure you'd never tell.", effects: {}, transform: "Alien" },
        ]},
      ]
    },
    {
      id: "coven_grimoire",
      title: "Book That Knows Your Name",
      description: "A book opens to a page written in your handwriting, though you have never seen it before.",
      minAge: 16, maxAge: 80,
      options: [
        { text: "Read the page aloud", effects: {}, outcomes: [
          { weight: 0.45, message: "The words burn themselves into your memory.", effects: { smarts: 8 }, transform: "Witch" },
          { weight: 0.35, message: "The page goes blank. You feel watched.", effects: { happiness: -8, secret: "forbidden_artifact" } },
          { weight: 0.2, message: "A coven heard you from very far away.", effects: { social: 5, factions: { serpentHand: 8, hunterOrder: -5 } } },
        ]},
        { text: "Shut the book", effects: {}, outcomes: [
          { weight: 0.8, message: "The book stays shut. Mostly.", effects: { happiness: -4 } },
          { weight: 0.2, message: "Ink leaks through the cover and stains your hands.", effects: { happiness: -8 }, transform: "Witch" },
        ]},
      ]
    },
    {
      id: "thought_broadcast",
      title: "Thought Broadcast",
      description: "For one terrible minute, every stranger's fear arrives inside your skull.",
      minAge: 12, maxAge: 80,
      options: [
        { text: "Focus on one voice", effects: {}, outcomes: [
          { weight: 0.45, message: "The voice becomes a signal. You understand too much now.", effects: { smarts: 6, happiness: -8 }, transform: "Psychic" },
          { weight: 0.35, message: "You helped someone avoid a disaster they never saw coming.", effects: { happiness: 10, social: 8 } },
          { weight: 0.2, message: "The signal looked back.", effects: { happiness: -15, factions: { foundation: 8 } } },
        ]},
        { text: "Block it out", effects: {}, outcomes: [
          { weight: 0.7, message: "The static faded, leaving a headache.", effects: { health: -5 } },
          { weight: 0.3, message: "You cannot fully close the door again.", effects: { happiness: -8 }, transform: "Psychic" },
        ]},
      ]
    },
  ],
};

export const supernaturalEncounters = [
  {
    id: "vampire_attack",
    title: "Night Attack",
    description: "Walking home late at night, a figure moves impossibly fast toward you...",
    transform: "Vampire",
    minAge: 16,
  },
  {
    id: "werewolf_attack",
    title: "Beast Attack",
    description: "A massive wolf-like creature lunges from the shadows!",
    transform: "Werewolf",
    minAge: 16,
  },
  {
    id: "zombie_bite",
    title: "Infected Bite",
    description: "A shambling figure grabs you and sinks its teeth into your flesh!",
    transform: "Zombie",
    minAge: 16,
  },
  {
    id: "demon_possession",
    title: "Possession",
    description: "You feel something dark and ancient trying to take control of your body...",
    transform: "Demon",
    minAge: 21,
  },
  {
    id: "fae_touched",
    title: "Fairy Circle",
    description: "You accidentally stepped into a ring of mushrooms. The world shifts around you...",
    transform: "Fae",
    minAge: 16,
  },
  {
    id: "alien_abduction",
    title: "Abduction",
    description: "A blinding light descends from the sky. You feel yourself being lifted off the ground...",
    transform: "Alien",
    minAge: 16,
  },
  {
    id: "witch_coven",
    title: "Coven Invitation",
    description: "A stranger presses a black envelope into your hand. Inside: your name, written in ash.",
    transform: "Witch",
    minAge: 16,
  },
  {
    id: "psychic_static",
    title: "Psychic Static",
    description: "You hear a crowd of thoughts that no one has spoken aloud.",
    transform: "Psychic",
    minAge: 12,
  },
  {
    id: "ghost_crossing",
    title: "The Wrong Side",
    description: "For one breath, you see your own body from above.",
    transform: "Ghost",
    minAge: 16,
  },
];

export const scpContainmentEvents = [
  {
    id: "scp_experiment",
    title: "Containment Experiment",
    description: "Foundation researchers want to run tests on your anomalous properties.",
    minAge: 0, maxAge: 200,
    options: [
      { text: "Cooperate", effects: {}, outcomes: [
        { weight: 0.4, message: "The tests were uncomfortable but quick.", effects: { health: -5, happiness: -10 } },
        { weight: 0.3, message: "They learned something new. Your privileges increased.", effects: { health: -10, happiness: 5 } },
        { weight: 0.2, message: "Painful procedures. You feel weaker.", effects: { health: -20, happiness: -15 } },
        { weight: 0.1, message: "The experiment went wrong. Critical condition.", effects: { health: -40, happiness: -25 } },
      ]},
      { text: "Resist", effects: {}, outcomes: [
        { weight: 0.3, message: "They sedated you and did it anyway.", effects: { health: -15, happiness: -20 } },
        { weight: 0.4, message: "Security was called. Solitary confinement.", effects: { happiness: -30 } },
        { weight: 0.2, message: "Your resistance was noted. Harsher containment procedures.", effects: { happiness: -25, health: -10 } },
        { weight: 0.1, message: "You injured a researcher. Keter reclassification pending.", effects: { happiness: -20 } },
      ]},
    ]
  },
  {
    id: "scp_interview",
    title: "Foundation Interview",
    description: "A researcher wants to document your history and abilities.",
    minAge: 0, maxAge: 200,
    options: [
      { text: "Tell the truth", effects: {}, outcomes: [
        { weight: 0.5, message: "Your cooperation is appreciated. Small comfort improvements.", effects: { happiness: 10 } },
        { weight: 0.3, message: "They found your story fascinating. Better treatment.", effects: { happiness: 15, health: 5 } },
        { weight: 0.2, message: "Your information led to the capture of others like you.", effects: { happiness: -10 } },
      ]},
      { text: "Lie", effects: {}, outcomes: [
        { weight: 0.4, message: "They believed you. For now.", effects: { happiness: 5 } },
        { weight: 0.3, message: "They detected inconsistencies. Trust decreased.", effects: { happiness: -15 } },
        { weight: 0.3, message: "Caught in the lie. Interrogation protocols activated.", effects: { happiness: -25, health: -10 } },
      ]},
      { text: "Stay silent", effects: {}, outcomes: [
        { weight: 0.6, message: "Interview terminated. No change in status.", effects: {} },
        { weight: 0.4, message: "Your silence is noted as non-compliance.", effects: { happiness: -10 } },
      ]},
    ]
  },
  {
    id: "scp_breach",
    title: "Containment Breach",
    description: "Alarms blare. Another anomaly has escaped. In the chaos, your cell door malfunctions...",
    minAge: 0, maxAge: 200,
    options: [
      { text: "Attempt escape", effects: {}, outcomes: [
        { weight: 0.15, message: "You made it out! Freedom at last!", effects: { happiness: 50 }, escape: true },
        { weight: 0.35, message: "Almost made it. Recaptured at the perimeter.", effects: { health: -20, happiness: -15 } },
        { weight: 0.3, message: "MTF units intercepted you. Back to containment.", effects: { health: -15, happiness: -20 } },
        { weight: 0.2, message: "You encountered another escaped anomaly. It didn't go well.", effects: { health: -35, happiness: -20 } },
      ]},
      { text: "Stay in cell", effects: {}, outcomes: [
        { weight: 0.7, message: "The breach was contained. Your compliance is noted.", effects: { happiness: 10 } },
        { weight: 0.2, message: "The escaping anomaly passed by your cell. Terrifying.", effects: { happiness: -15 } },
        { weight: 0.1, message: "Collateral damage from the breach. Your cell was damaged.", effects: { health: -15 } },
      ]},
    ]
  },
  {
    id: "scp_cell_life",
    title: "Cell Routine",
    description: "Another day in containment. The fluorescent lights never turn off.",
    minAge: 0, maxAge: 200,
    options: [
      { text: "Exercise", effects: {}, outcomes: [
        { weight: 0.7, message: "Staying fit helps maintain your sanity.", effects: { health: 5, happiness: 5 } },
        { weight: 0.3, message: "Exhausted yourself. At least you'll sleep tonight.", effects: { health: -5, happiness: 10 } },
      ]},
      { text: "Meditate", effects: {}, outcomes: [
        { weight: 0.6, message: "Found some inner peace despite the circumstances.", effects: { happiness: 10 } },
        { weight: 0.3, message: "Your powers stirred. The Foundation noticed.", effects: { happiness: -5 } },
        { weight: 0.1, message: "Deep meditation. You feel more in control of your abilities.", effects: { happiness: 15, smarts: 3 } },
      ]},
      { text: "Pace anxiously", effects: {}, outcomes: [
        { weight: 0.5, message: "The walls feel closer every day.", effects: { happiness: -10 } },
        { weight: 0.5, message: "A guard took pity and gave you a book.", effects: { happiness: 5, smarts: 2 } },
      ]},
    ]
  },
  {
    id: "scp_visitor",
    title: "Unexpected Visitor",
    description: "Someone has requested to see you. This is highly irregular.",
    minAge: 0, maxAge: 200,
    options: [
      { text: "Accept the visit", effects: {}, outcomes: [
        { weight: 0.3, message: "A family member! They've been searching for you.", effects: { happiness: 30, social: 10 } },
        { weight: 0.25, message: "A lawyer from a mysterious organization. They're working on your case.", effects: { happiness: 20 } },
        { weight: 0.25, message: "It was a Foundation psychologist. Standard evaluation.", effects: { happiness: -5 } },
        { weight: 0.2, message: "A member of the Serpent's Hand. They slipped you information.", effects: { happiness: 15 }, factions: { serpentHand: 15 } },
      ]},
      { text: "Refuse", effects: {}, outcomes: [
        { weight: 1.0, message: "The visitor left. You'll never know who it was.", effects: { happiness: -5 } },
      ]},
    ]
  },
];

export const getEligibleEvents = (player) => {
  const eligible = [];
  const age = player.age;
  
  // If SCP contained, only return containment events
  if (player.scpContained) {
    for (const event of scpContainmentEvents) {
      if (age >= event.minAge && age <= event.maxAge) {
        eligible.push({ ...event, category: 'scp' });
      }
    }
    return eligible;
  }
  
  // If in prison, limit to prison-compatible events (for now, reduce event pool)
  if (player.inPrison) {
    return []; // Could add prison events later
  }
  
  const categories = ['childhood', 'teen', 'adult', 'senior', 'random'];
  if (player.occult === "Human") categories.push('occult_human');
  
  for (const category of categories) {
    const events = lifeEvents[category] || [];
    for (const event of events) {
      if (age < event.minAge || age > event.maxAge) continue;
      if (event.requiresJob && !player.job) continue;
      if (event.requiresChildren && (!player.children || player.children.length === 0)) continue;
      if (event.requiresSecret && (!player.secrets || player.secrets.length === 0)) continue;
      if (event.requiresRival && (!player.rivals || player.rivals.length === 0)) continue;
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
        artifact: outcome.artifact,
        secret: outcome.secret,
        factions: outcome.factions,
      };
    }
  }
  
  const last = option.outcomes[option.outcomes.length - 1];
  return {
    message: last.message,
    effects: { ...(option.effects || {}), ...(last.effects || {}) },
    transform: last.transform,
    supernatural: last.supernatural,
    artifact: last.artifact,
    secret: last.secret,
    factions: last.factions,
  };
};
