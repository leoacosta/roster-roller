export type Sport = "soccer" | "netball";
export type Vibe = "punny" | "fierce" | "funny" | "random";

interface NameData {
  prefixes: string[];
  nouns: string[];
  punny: string[];
  fierce: string[];
  funny: string[];
}

const soccerNames: NameData = {
  prefixes: [
    "Raging",
    "Rolling",
    "Flying",
    "Kicking",
    "Blazing",
    "Speedy",
    "Mighty",
    "Wild",
    "Charging",
    "Screaming",
    "Relentless",
    "Reckless",
    "Furious",
    "Savage",
    "Electric",
    "Golden",
  ],
  nouns: [
    "Cleats",
    "Boots",
    "Strikers",
    "Headers",
    "Volleys",
    "Nutmegs",
    "Tackles",
    "Offsides",
    "Crossbars",
    "Corners",
    "Foxes",
    "Wolves",
    "Eagles",
    "Lions",
    "Sharks",
    "Rhinos",
  ],
  punny: [
    "Kick Jagger",
    "Messi Business",
    "Alley Oops",
    "Pitch Please",
    "Sole Mates",
    "Goal Diggers",
    "Net Results",
    "Bootleg FC",
    "Cleats Happen",
    "On a Roll",
    "Foul Play",
    "Offsides Story",
    "Header Bangers",
    "The Punt Intended",
    "Shin Guardians",
    "Balls to the Wall",
    "Turf Accountants",
    "The Beautiful Gamers",
    "Throw-In Towel FC",
    "Yellow Card Dealers",
  ],
  fierce: [
    "Death Squad FC",
    "Iron Cleats",
    "The Destroyers",
    "Skull Crushers",
    "Pitch Black",
    "Fear the Boot",
    "No Mercy XI",
    "The Untouchables",
    "Storm Front FC",
    "Ground Zero FC",
    "Bone Breakers",
    "The Executioners",
    "Wrath FC",
    "Reign of Terror",
    "Blood & Turf",
    "Apex Predators",
    "Warlords XI",
    "The Reckoning",
    "Savage United",
    "Death March FC",
  ],
  funny: [
    "Notts Your Mama",
    "Sprinkle FC",
    "We Like Big Nets",
    "Average Joes FC",
    "Glorious Failures",
    "The Dad Bod Squad",
    "Sore Losers FC",
    "Kickin It Old School",
    "Refs Hate Us",
    "Where's the Bench",
    "Casual Menace",
    "Nap Time United",
    "Post Game Beers FC",
    "Sunday Scaries XI",
    "Accidentally Athletic",
    "The Participation Trophies",
    "Run? In These Cleats?",
    "We Showed Up FC",
    "Unfit But Committed",
    "Mostly Harmless FC",
  ],
};

const netballNames: NameData = {
  prefixes: [
    "Blazing",
    "Flying",
    "Spinning",
    "Charging",
    "Relentless",
    "Fearless",
    "Mighty",
    "Raging",
    "Swift",
    "Fierce",
    "Savage",
    "Electric",
    "Golden",
    "Iron",
    "Wild",
    "Ruthless",
  ],
  nouns: [
    "Shooters",
    "Defenders",
    "Centres",
    "Wings",
    "Posts",
    "Pivots",
    "Bibs",
    "Circles",
    "Hoops",
    "Interceptors",
    "Eagles",
    "Wolves",
    "Vipers",
    "Falcons",
    "Sharks",
    "Lions",
  ],
  punny: [
    "Bib Fortuna",
    "Nothing But Net",
    "Centre of Attention",
    "Wing It FC",
    "Pass Aggressive",
    "Net Worth",
    "Circle of Trust",
    "The Bib Deal",
    "Post Mates",
    "Pivot Pivot Pivot",
    "Step Right Up",
    "No Contact Sport (Allegedly)",
    "The Third Thirds",
    "Obstruction Notice",
    "Goal Attack Plan",
    "Short Pass Long Career",
    "Hoop Dreams",
    "Out of Court Settlement",
    "The Penalty Passes",
    "Goal Mouth to Mouth",
  ],
  fierce: [
    "The Interceptors",
    "Iron Circle",
    "Court Commanders",
    "Shadow Defence",
    "Reign Supreme",
    "The Dominators",
    "Storm Circle",
    "Apex Shooters",
    "Zero Mercy",
    "The Invincibles",
    "Ironclad Defence",
    "Ruthless Precision",
    "Total Domination",
    "Death Row GS",
    "The Relentless",
    "Wrath of the Post",
    "Blood on Court",
    "Savage Precision",
    "The Executioners",
    "Reign of Terror",
  ],
  funny: [
    "Step Sisters",
    "Contact? What Contact?",
    "The Obstruction Club",
    "We Forgot the Bibs",
    "Penalty Pass FC",
    "Footwork Issues",
    "The Held Balls",
    "Post Traumatic",
    "Centre Pass Disasters",
    "Where's My Bib",
    "Rolled Ankles United",
    "Shooters Gonna Miss",
    "The Late Subs",
    "Barely Vertical",
    "Running On Rosé",
    "Accidental Athletes",
    "Can't Stop Stepping",
    "Three Seconds or Less",
    "Technically Defending",
    "Nah We're Fine",
  ],
};

const namesBySport: Record<Sport, NameData> = {
  soccer: soccerNames,
  netball: netballNames,
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateCombined(data: NameData, count: number): string[] {
  const results: string[] = [];
  const prefixes = shuffle(data.prefixes);
  const nouns = shuffle(data.nouns);
  for (let i = 0; i < count; i++) {
    results.push(`${prefixes[i % prefixes.length]} ${nouns[i % nouns.length]}`);
  }
  return results;
}

export function generateNames(sport: Sport, vibe: Vibe, count = 8): string[] {
  const data = namesBySport[sport];

  if (vibe === "punny") return shuffle(data.punny).slice(0, count);
  if (vibe === "fierce") return shuffle(data.fierce).slice(0, count);
  if (vibe === "funny") return shuffle(data.funny).slice(0, count);

  // random: mix from all categories
  const all = [
    ...shuffle(data.punny).slice(0, 2),
    ...shuffle(data.fierce).slice(0, 2),
    ...shuffle(data.funny).slice(0, 2),
    ...generateCombined(data, 2),
  ];
  return shuffle(all).slice(0, count);
}
