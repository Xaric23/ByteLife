export const maleFirstNames = [
  "Arthur", "Edward", "Charles", "Vance", "Julian", "Marcus",
  "Alexander", "Benjamin", "Christopher", "Daniel", "Ethan",
  "Felix", "Gabriel", "Henry", "Isaac", "James", "Kevin",
  "Lucas", "Michael", "Nathan", "Oliver", "Patrick", "Quentin",
  "Robert", "Sebastian", "Theodore", "Victor", "William", "Xavier",
  "Zachary", "Adrian", "Blake", "Caleb", "Dylan", "Eli",
  "Finn", "Grant", "Hugo", "Ivan", "Jack", "Kyle",
  "Leo", "Mason", "Noah", "Owen", "Peter", "Quinn",
  "Ryan", "Samuel", "Tyler", "Vincent", "Wesley", "Xander"
];

export const femaleFirstNames = [
  "Victoria", "Eleanor", "Diana", "Seraphina", "Lydia", "Cassandra",
  "Abigail", "Beatrice", "Charlotte", "Delilah", "Emma", "Fiona",
  "Grace", "Hannah", "Isabella", "Julia", "Katherine", "Lily",
  "Madeline", "Natalie", "Olivia", "Penelope", "Quinn", "Rachel",
  "Sophia", "Tabitha", "Una", "Violet", "Willow", "Xena",
  "Yvonne", "Zoe", "Amelia", "Brooke", "Claire", "Daisy",
  "Elizabeth", "Faith", "Gemma", "Harper", "Iris", "Jade",
  "Kira", "Luna", "Maya", "Nicole", "Ophelia", "Paige",
  "Rose", "Scarlett", "Tessa", "Uma", "Vera", "Winter"
];

export const lastNames = [
  "Anderson", "Baker", "Campbell", "Davis", "Edwards", "Foster",
  "Garcia", "Harris", "Irving", "Johnson", "Kennedy", "Lewis",
  "Mitchell", "Nelson", "O'Brien", "Parker", "Quinn", "Roberts",
  "Smith", "Taylor", "Underwood", "Vance", "Williams", "Xavier",
  "Young", "Zimmerman", "Blackwood", "Crane", "Drake", "Ellis",
  "Fletcher", "Grey", "Hawthorne", "Ivory", "Jacobs", "Knight",
  "Lancaster", "Monroe", "Northwood", "Owens", "Price", "Reeves",
  "Sterling", "Thornton", "Valentine", "Whitmore", "Ashford", "Beaumont",
  "Carrington", "Davenport", "Everett", "Fitzgerald", "Grayson", "Holloway",
  "Kensington", "Langston", "Mercer", "Pemberton", "Sinclair", "Weston"
];

export const getRandomName = (gender) => {
  const firstNames = gender === "Male" ? maleFirstNames : femaleFirstNames;
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

export const getRandomFirstName = (gender) => {
  const names = gender === "Male" ? maleFirstNames : femaleFirstNames;
  return names[Math.floor(Math.random() * names.length)];
};
