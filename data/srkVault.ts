import { srkQuiz } from "./srkQuiz";

const extras: Record<string, { year: string; tagline: string; funFact: string }> = {
  "Dilwale Dulhania Le Jayenge": { year: "1995", tagline: "The journey of Raj and Simran.", funFact: "A love story that made the train platform unforgettable." },
  "Kuch Kuch Hota Hai": { year: "1998", tagline: "Friendship has its own magic.", funFact: "Its basketball court is one of Hindi cinema's most recognisable settings." },
  "Kal Ho Naa Ho": { year: "2003", tagline: "Live every moment.", funFact: "The story brings Aman, Naina, and Rohit together in New York." },
  "Main Hoon Na": { year: "2004", tagline: "Mission, music, and Major Ram.", funFact: "It blends a campus caper with an undercover mission." },
  "Om Shanti Om": { year: "2007", tagline: "Reincarnation, romance, and reel-life sparkle.", funFact: "It marked Deepika Padukone's Hindi-film debut." },
  "Chak De! India": { year: "2007", tagline: "Seventeen players. One dream.", funFact: "SRK plays former hockey captain Kabir Khan." },
  Swades: { year: "2004", tagline: "A journey back to what matters.", funFact: "Mohan Bhargava returns from NASA to a village in India." },
  "Veer-Zaara": { year: "2004", tagline: "Some stories wait for their moment.", funFact: "Its love story unfolds across India and Pakistan." },
  "My Name Is Khan": { year: "2010", tagline: "A journey powered by conviction.", funFact: "SRK portrays Rizwan Khan on a cross-country journey." },
  Don: { year: "2006", tagline: "The king of the underworld returns.", funFact: "It reimagines the iconic 1978 thriller for a new generation." },
};

export const srkVault = srkQuiz.map((movie) => ({
  ...movie,
  ...extras[movie.movie],
}));

export type SRKVaultMovie = (typeof srkVault)[number];
