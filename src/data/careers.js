export const careerPaths = {
  service: {
    name: "Service Industry",
    careers: [
      { id: "fastfood", title: "Fast Food Worker", reqSmarts: 0, reqEducation: null, minAge: 16, salary: 18000, description: "Flipping burgers and taking orders" },
      { id: "cashier", title: "Retail Cashier", reqSmarts: 15, reqEducation: null, minAge: 16, salary: 24000, description: "Running registers and stocking shelves" },
      { id: "barista", title: "Barista", reqSmarts: 20, reqEducation: null, minAge: 16, salary: 26000, description: "Crafting caffeinated concoctions" },
      { id: "server", title: "Restaurant Server", reqSmarts: 25, reqEducation: null, minAge: 18, salary: 32000, description: "Tips make this worthwhile" },
      { id: "bartender", title: "Bartender", reqSmarts: 30, reqEducation: null, minAge: 21, salary: 45000, description: "Mixing drinks and hearing stories" },
      { id: "manager_retail", title: "Retail Manager", reqSmarts: 40, reqEducation: "High School", minAge: 21, salary: 52000, description: "Managing the floor and staff" },
    ]
  },
  corporate: {
    name: "Corporate",
    careers: [
      { id: "intern", title: "Corporate Intern", reqSmarts: 35, reqEducation: "High School", minAge: 18, salary: 28000, description: "Coffee runs and spreadsheets" },
      { id: "admin", title: "Administrative Assistant", reqSmarts: 40, reqEducation: "High School", minAge: 18, salary: 38000, description: "Keeping the office running" },
      { id: "analyst", title: "Business Analyst", reqSmarts: 55, reqEducation: "Bachelor", minAge: 22, salary: 65000, description: "Crunching numbers and making reports" },
      { id: "accountant", title: "Accountant", reqSmarts: 60, reqEducation: "Bachelor", minAge: 22, salary: 72000, description: "Managing financial records" },
      { id: "manager_corp", title: "Corporate Manager", reqSmarts: 65, reqEducation: "Bachelor", minAge: 25, salary: 95000, description: "Leading teams to success" },
      { id: "director", title: "Director", reqSmarts: 75, reqEducation: "Master", minAge: 30, salary: 145000, description: "Strategic leadership role" },
      { id: "vp", title: "Vice President", reqSmarts: 85, reqEducation: "Master", minAge: 35, salary: 220000, description: "Executive decision maker" },
      { id: "ceo", title: "CEO", reqSmarts: 95, reqEducation: "Master", minAge: 40, salary: 500000, description: "Running the entire company" },
    ]
  },
  tech: {
    name: "Technology",
    careers: [
      { id: "it_support", title: "IT Support Technician", reqSmarts: 40, reqEducation: "High School", minAge: 18, salary: 42000, description: "Have you tried turning it off and on?" },
      { id: "qa_tester", title: "QA Tester", reqSmarts: 45, reqEducation: "High School", minAge: 18, salary: 48000, description: "Breaking software professionally" },
      { id: "jr_dev", title: "Junior Developer", reqSmarts: 55, reqEducation: "Bachelor", minAge: 20, salary: 62000, description: "Writing code and fixing bugs" },
      { id: "developer", title: "Software Engineer", reqSmarts: 65, reqEducation: "Bachelor", minAge: 22, salary: 95000, description: "Building digital solutions" },
      { id: "sr_dev", title: "Senior Developer", reqSmarts: 75, reqEducation: "Bachelor", minAge: 26, salary: 135000, description: "Leading technical projects" },
      { id: "architect", title: "Software Architect", reqSmarts: 85, reqEducation: "Bachelor", minAge: 30, salary: 175000, description: "Designing system architecture" },
      { id: "cto", title: "CTO", reqSmarts: 92, reqEducation: "Master", minAge: 35, salary: 350000, description: "Chief Technology Officer" },
    ]
  },
  medical: {
    name: "Medical",
    careers: [
      { id: "orderly", title: "Hospital Orderly", reqSmarts: 20, reqEducation: null, minAge: 18, salary: 28000, description: "Assisting hospital staff" },
      { id: "emt", title: "EMT", reqSmarts: 40, reqEducation: "High School", minAge: 18, salary: 38000, description: "First responder saving lives" },
      { id: "nurse", title: "Registered Nurse", reqSmarts: 55, reqEducation: "Bachelor", minAge: 22, salary: 75000, description: "Patient care specialist" },
      { id: "pa", title: "Physician Assistant", reqSmarts: 70, reqEducation: "Master", minAge: 26, salary: 115000, description: "Medical diagnosis and treatment" },
      { id: "doctor", title: "Doctor", reqSmarts: 85, reqEducation: "Doctorate", minAge: 30, salary: 220000, description: "Medical Doctor" },
      { id: "surgeon", title: "Surgeon", reqSmarts: 92, reqEducation: "Doctorate", minAge: 34, salary: 380000, description: "Performing surgical procedures" },
      { id: "chief_med", title: "Chief of Medicine", reqSmarts: 95, reqEducation: "Doctorate", minAge: 40, salary: 450000, description: "Leading the medical department" },
    ]
  },
  legal: {
    name: "Legal",
    careers: [
      { id: "paralegal", title: "Paralegal", reqSmarts: 50, reqEducation: "Bachelor", minAge: 22, salary: 55000, description: "Legal research and support" },
      { id: "legal_assistant", title: "Legal Assistant", reqSmarts: 45, reqEducation: "High School", minAge: 20, salary: 42000, description: "Administrative legal work" },
      { id: "associate", title: "Associate Attorney", reqSmarts: 75, reqEducation: "Doctorate", minAge: 26, salary: 125000, description: "Junior lawyer at a firm" },
      { id: "lawyer", title: "Corporate Attorney", reqSmarts: 82, reqEducation: "Doctorate", minAge: 28, salary: 180000, description: "Experienced corporate lawyer" },
      { id: "partner", title: "Law Partner", reqSmarts: 88, reqEducation: "Doctorate", minAge: 35, salary: 350000, description: "Partner at a law firm" },
      { id: "judge", title: "Judge", reqSmarts: 92, reqEducation: "Doctorate", minAge: 45, salary: 200000, description: "Presiding over cases" },
    ]
  },
  creative: {
    name: "Creative Arts",
    careers: [
      { id: "freelance_artist", title: "Freelance Artist", reqSmarts: 30, reqEducation: null, minAge: 18, salary: 25000, description: "Commission-based artwork" },
      { id: "graphic_designer", title: "Graphic Designer", reqSmarts: 45, reqEducation: "Bachelor", minAge: 20, salary: 52000, description: "Creating visual content" },
      { id: "photographer", title: "Photographer", reqSmarts: 35, reqEducation: null, minAge: 18, salary: 45000, description: "Capturing moments" },
      { id: "writer", title: "Content Writer", reqSmarts: 50, reqEducation: "Bachelor", minAge: 20, salary: 48000, description: "Writing articles and copy" },
      { id: "author", title: "Published Author", reqSmarts: 65, reqEducation: "Bachelor", minAge: 25, salary: 85000, description: "Writing books" },
      { id: "art_director", title: "Art Director", reqSmarts: 70, reqEducation: "Bachelor", minAge: 28, salary: 110000, description: "Leading creative vision" },
      { id: "creative_director", title: "Creative Director", reqSmarts: 80, reqEducation: "Bachelor", minAge: 32, salary: 165000, description: "Head of creative department" },
    ]
  },
  criminal: {
    name: "Criminal Underworld",
    careers: [
      { id: "pickpocket", title: "Pickpocket", reqSmarts: 20, reqEducation: null, minAge: 16, salary: 15000, description: "Lifting wallets on the street", riskLevel: 0.15 },
      { id: "dealer", title: "Street Dealer", reqSmarts: 25, reqEducation: null, minAge: 18, salary: 45000, description: "Moving product on corners", riskLevel: 0.20 },
      { id: "burglar", title: "Burglar", reqSmarts: 35, reqEducation: null, minAge: 18, salary: 65000, description: "Breaking and entering", riskLevel: 0.25 },
      { id: "hacker_crime", title: "Black Hat Hacker", reqSmarts: 70, reqEducation: null, minAge: 18, salary: 120000, description: "Cybercrime specialist", riskLevel: 0.18 },
      { id: "enforcer", title: "Mob Enforcer", reqSmarts: 30, reqEducation: null, minAge: 21, salary: 85000, description: "Collecting debts by force", riskLevel: 0.30 },
      { id: "underboss", title: "Underboss", reqSmarts: 60, reqEducation: null, minAge: 30, salary: 200000, description: "Second in command", riskLevel: 0.22 },
      { id: "crime_boss", title: "Crime Boss", reqSmarts: 75, reqEducation: null, minAge: 35, salary: 500000, description: "Running the operation", riskLevel: 0.15 },
    ]
  },
  science: {
    name: "Science & Research",
    careers: [
      { id: "lab_tech", title: "Lab Technician", reqSmarts: 45, reqEducation: "Bachelor", minAge: 22, salary: 45000, description: "Running laboratory tests" },
      { id: "researcher", title: "Research Associate", reqSmarts: 60, reqEducation: "Bachelor", minAge: 24, salary: 62000, description: "Conducting experiments" },
      { id: "scientist", title: "Scientist", reqSmarts: 75, reqEducation: "Master", minAge: 28, salary: 95000, description: "Publishing research papers" },
      { id: "sr_scientist", title: "Senior Scientist", reqSmarts: 85, reqEducation: "Doctorate", minAge: 32, salary: 135000, description: "Leading research teams" },
      { id: "professor", title: "University Professor", reqSmarts: 88, reqEducation: "Doctorate", minAge: 35, salary: 125000, description: "Teaching and research" },
      { id: "research_director", title: "Research Director", reqSmarts: 92, reqEducation: "Doctorate", minAge: 40, salary: 200000, description: "Directing research programs" },
    ]
  },
  government: {
    name: "Government & Military",
    careers: [
      { id: "clerk_gov", title: "Government Clerk", reqSmarts: 35, reqEducation: "High School", minAge: 18, salary: 38000, description: "Processing paperwork" },
      { id: "military_enlisted", title: "Military Enlisted", reqSmarts: 30, reqEducation: "High School", minAge: 18, salary: 35000, description: "Serving your country" },
      { id: "police", title: "Police Officer", reqSmarts: 40, reqEducation: "High School", minAge: 21, salary: 55000, description: "Protecting and serving" },
      { id: "detective", title: "Detective", reqSmarts: 55, reqEducation: "Bachelor", minAge: 28, salary: 78000, description: "Solving crimes" },
      { id: "military_officer", title: "Military Officer", reqSmarts: 60, reqEducation: "Bachelor", minAge: 22, salary: 72000, description: "Leading military units" },
      { id: "fbi_agent", title: "FBI Agent", reqSmarts: 75, reqEducation: "Bachelor", minAge: 25, salary: 95000, description: "Federal investigations" },
      { id: "politician", title: "Politician", reqSmarts: 65, reqEducation: "Bachelor", minAge: 30, salary: 150000, description: "Elected official" },
      { id: "senator", title: "Senator", reqSmarts: 80, reqEducation: "Bachelor", minAge: 40, salary: 200000, description: "Serving in the Senate" },
    ]
  }
};

export const educationLevels = {
  "High School": { duration: 0, cost: 0, minAge: 18 },
  "Bachelor": { duration: 4, cost: 45000, minAge: 18, reqSmarts: 40 },
  "Master": { duration: 2, cost: 65000, minAge: 22, reqSmarts: 60, reqEducation: "Bachelor" },
  "Doctorate": { duration: 4, cost: 120000, minAge: 24, reqSmarts: 75, reqEducation: "Master" },
};

export const getAllCareers = () => {
  const all = [];
  Object.values(careerPaths).forEach(path => {
    path.careers.forEach(career => {
      all.push({ ...career, path: path.name });
    });
  });
  return all;
};

export const getAvailableCareers = (player) => {
  return getAllCareers().filter(career => {
    const meetsSmarts = player.smarts >= career.reqSmarts;
    const meetsAge = player.age >= career.minAge;
    const meetsEducation = !career.reqEducation || 
      (player.education === career.reqEducation) ||
      (career.reqEducation === "High School" && ["Bachelor", "Master", "Doctorate"].includes(player.education)) ||
      (career.reqEducation === "Bachelor" && ["Bachelor", "Master", "Doctorate"].includes(player.education)) ||
      (career.reqEducation === "Master" && ["Master", "Doctorate"].includes(player.education));
    const notInPrison = !player.inPrison;
    const notContained = !player.scpContained;
    const notZombieForNormalJobs = player.occult !== "Zombie" || career.path === "Criminal Underworld";
    
    return meetsSmarts && meetsAge && meetsEducation && notInPrison && notContained && notZombieForNormalJobs;
  });
};
