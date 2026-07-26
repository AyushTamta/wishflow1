export interface SRKQuizQuestion {
  movie: string;
  clue: string;
  options: string[];
  answer: number;
  poster: string;
  image: string;
  dialogue: string;
  reward: string;
}

export const srkQuiz: SRKQuizQuestion[] = [
  {
    movie: "Dilwale Dulhania Le Jayenge",
    clue: "This journey begins with Raj and Simran on a European trip.",
    options: ["Dil Se..", "Dilwale Dulhania Le Jayenge", "Pardes", "Duplicate"],
    answer: 1,
    poster: "/posters/ddlj-poster.jpg",
    image: "/srk/ddlj-srk.png",
    dialogue: "/audio/ddlj-dialogue.mp3",
    reward: "A timeless train-platform kind of answer. ✨",
  },
  {
    movie: "Kuch Kuch Hota Hai",
    clue: "Rahul, Anjali, and an eight-year-old letter-writing mastermind.",
    options: ["Kuch Kuch Hota Hai", "Kabhi Khushi Kabhie Gham", "Yes Boss", "Josh"],
    answer: 0,
    poster: "/posters/kuch-kuch-hota-hai-poster.jpg",
    image: "/srk/kuch-kuch-hota-hai-srk.png",
    dialogue: "/audio/kuch-kuch-hota-hai-dialogue.mp3",
    reward: "Friendship, basketball, and peak 90s magic. 🏀",
  },
  {
    movie: "Kal Ho Naa Ho",
    clue: "A bittersweet New York story led by Aman, Naina, and Rohit.",
    options: ["Veer-Zaara", "Kabhi Alvida Naa Kehna", "Kal Ho Naa Ho", "Paheli"],
    answer: 2,
    poster: "/posters/kal-ho-naa-ho-poster.jpg",
    image: "/srk/kal-ho-naa-ho-srk.png",
    dialogue: "/audio/kal-ho-naa-ho-dialogue.mp3",
    reward: "Live every moment. You knew this one. ❤️",
  },
  {
    movie: "Main Hoon Na",
    clue: "An undercover mission, a college campus, and Major Ram Prasad Sharma.",
    options: ["Main Hoon Na", "Don", "Ra.One", "Baadshah"],
    answer: 0,
    poster: "/posters/main-hoon-na-poster.jpg",
    image: "/srk/main-hoon-na-srk.png",
    dialogue: "/audio/main-hoon-na-dialogue.mp3",
    reward: "Mission accomplished, agent Ambay. 🎓",
  },
  {
    movie: "Om Shanti Om",
    clue: "A reincarnation story with Om, Shantipriya, and old Bollywood sparkle.",
    options: ["Happy New Year", "Om Shanti Om", "Fan", "Chennai Express"],
    answer: 1,
    poster: "/posters/om-shanti-om-poster.jpg",
    image: "/srk/om-shanti-om-srk.png",
    dialogue: "/audio/om-shanti-om-dialogue.mp3",
    reward: "Of course the cinephile got this one. 🎞️",
  },
  {
    movie: "Chak De! India",
    clue: "A disgraced hockey captain returns to coach the Indian women's team.",
    options: ["Swades", "Chak De! India", "Pardes", "Dear Zindagi"],
    answer: 1,
    poster: "/posters/chak-de-india-poster.jpg",
    image: "/srk/chak-de-india-srk.png",
    dialogue: "/audio/chak-de-india-dialogue.mp3",
    reward: "That answer deserves a stadium-sized cheer. 🏑",
  },
  {
    movie: "Swades",
    clue: "Mohan Bhargava leaves NASA and travels back to a village in India.",
    options: ["Swades", "Ashoka", "Kabhi Haan Kabhi Naa", "Zero"],
    answer: 0,
    poster: "/posters/swades-poster.jpg",
    image: "/srk/swades-srk.png",
    dialogue: "/audio/swades-dialogue.mp3",
    reward: "Home, heart, and a brilliant answer. 🌾",
  },
  {
    movie: "Veer-Zaara",
    clue: "A love story that crosses borders, told through Veer Pratap Singh's memories.",
    options: ["Jab Tak Hai Jaan", "Veer-Zaara", "Dil Se..", "Rab Ne Bana Di Jodi"],
    answer: 1,
    poster: "/posters/veer-zaara-poster.jpg",
    image: "/srk/veer-zaara-srk.png",
    dialogue: "/audio/veer-zaara-dialogue.mp3",
    reward: "Some stories really do wait for their moment. 🌹",
  },
  {
    movie: "My Name Is Khan",
    clue: "Rizwan Khan's cross-country journey begins after a devastating loss.",
    options: ["My Name Is Khan", "Dear Zindagi", "Fan", "Jawan"],
    answer: 0,
    poster: "/posters/my-name-is-khan-poster.jpg",
    image: "/srk/my-name-is-khan-srk.png",
    dialogue: "/audio/my-name-is-khan-dialogue.mp3",
    reward: "A beautifully remembered chapter. 🤍",
  },
  {
    movie: "Don",
    clue: "The king of the underworld returns with one impossible-to-forget identity.",
    options: ["Baazigar", "Don", "Duplicate", "Raees"],
    answer: 1,
    poster: "/posters/don-poster.jpg",
    image: "/srk/don-srk.png",
    dialogue: "/audio/don-dialogue.mp3",
    reward: "Final reel: absolutely iconic. 🖤",
  },
];
