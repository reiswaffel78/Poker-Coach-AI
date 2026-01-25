export type RangeCategory = "raise" | "call" | "fold";

export interface RangePreset {
  id: string;
  name: string;
  position: string;
  description: string;
  scenario: string;
  ranges: Record<string, RangeCategory>;
}

const RANKS = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

function createHandKey(rank1: string, rank2: string, suited: boolean): string {
  if (rank1 === rank2) return `${rank1}${rank2}`;
  return suited ? `${rank1}${rank2}s` : `${rank1}${rank2}o`;
}

function generateAllHands(): string[] {
  const hands: string[] = [];
  for (let i = 0; i < RANKS.length; i++) {
    for (let j = 0; j < RANKS.length; j++) {
      if (i === j) {
        hands.push(`${RANKS[i]}${RANKS[j]}`);
      } else if (i < j) {
        hands.push(`${RANKS[i]}${RANKS[j]}s`);
      } else {
        hands.push(`${RANKS[j]}${RANKS[i]}o`);
      }
    }
  }
  return hands;
}

export const ALL_HANDS = generateAllHands();

function createRange(raiseHands: string[], callHands: string[] = []): Record<string, RangeCategory> {
  const ranges: Record<string, RangeCategory> = {};
  ALL_HANDS.forEach(hand => {
    if (raiseHands.includes(hand)) {
      ranges[hand] = "raise";
    } else if (callHands.includes(hand)) {
      ranges[hand] = "call";
    } else {
      ranges[hand] = "fold";
    }
  });
  return ranges;
}

export const rangePresets: RangePreset[] = [
  {
    id: "utg-open",
    name: "UTG Open Range",
    position: "UTG",
    description: "Tightest opening range from early position",
    scenario: "6-max cash game, 100BB deep",
    ranges: createRange(
      ["AA", "KK", "QQ", "JJ", "TT", "99", "88", 
       "AKs", "AQs", "AJs", "ATs", "KQs", "KJs",
       "AKo", "AQo"],
      ["77", "66", "A9s", "A8s", "KTs", "QJs", "JTs", "AJo"]
    )
  },
  {
    id: "mp-open",
    name: "MP Open Range", 
    position: "MP",
    description: "Slightly wider range from middle position",
    scenario: "6-max cash game, 100BB deep",
    ranges: createRange(
      ["AA", "KK", "QQ", "JJ", "TT", "99", "88", "77",
       "AKs", "AQs", "AJs", "ATs", "A9s", "KQs", "KJs", "KTs", "QJs",
       "AKo", "AQo", "AJo", "KQo"],
      ["66", "55", "A8s", "A7s", "QTs", "JTs", "T9s", "ATo"]
    )
  },
  {
    id: "co-open",
    name: "CO Open Range",
    position: "CO",
    description: "Wide range from cutoff with position advantage",
    scenario: "6-max cash game, 100BB deep",
    ranges: createRange(
      ["AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", "55",
       "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
       "KQs", "KJs", "KTs", "K9s", "QJs", "QTs", "JTs", "T9s", "98s",
       "AKo", "AQo", "AJo", "ATo", "KQo", "KJo", "QJo"],
      ["44", "33", "22", "K8s", "K7s", "Q9s", "J9s", "87s", "76s", "65s", "KTo", "QTo"]
    )
  },
  {
    id: "btn-open",
    name: "BTN Open Range",
    position: "BTN",
    description: "Widest opening range with best position",
    scenario: "6-max cash game, 100BB deep",
    ranges: createRange(
      ["AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22",
       "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
       "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s",
       "QJs", "QTs", "Q9s", "Q8s", "JTs", "J9s", "J8s", "T9s", "T8s", "98s", "97s", "87s", "76s", "65s", "54s",
       "AKo", "AQo", "AJo", "ATo", "A9o", "A8o", "A7o", "A6o", "A5o",
       "KQo", "KJo", "KTo", "K9o", "QJo", "QTo", "JTo"],
      ["K3s", "K2s", "Q7s", "Q6s", "J7s", "T7s", "96s", "86s", "75s", "64s", "53s", "43s",
       "A4o", "A3o", "A2o", "K8o", "Q9o", "J9o", "T9o"]
    )
  },
  {
    id: "sb-open",
    name: "SB Open Range",
    position: "SB",
    description: "Wide steal range vs BB only",
    scenario: "6-max cash game, 100BB deep, folded to SB",
    ranges: createRange(
      ["AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22",
       "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
       "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",
       "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s",
       "JTs", "J9s", "J8s", "J7s", "T9s", "T8s", "T7s", "98s", "97s", "96s", "87s", "86s", "76s", "75s", "65s", "64s", "54s", "53s",
       "AKo", "AQo", "AJo", "ATo", "A9o", "A8o", "A7o", "A6o", "A5o", "A4o", "A3o", "A2o",
       "KQo", "KJo", "KTo", "K9o", "K8o", "K7o", "QJo", "QTo", "Q9o", "JTo", "J9o", "T9o"],
      []
    )
  },
  {
    id: "bb-defend",
    name: "BB Defense Range",
    position: "BB",
    description: "Defending range vs BTN 2.5x open",
    scenario: "6-max cash game, 100BB deep, BTN opens 2.5x",
    ranges: createRange(
      ["AA", "KK", "QQ", "JJ", "TT", "AKs", "AQs", "AJs", "KQs", "AKo"],
      ["99", "88", "77", "66", "55", "44", "33", "22",
       "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
       "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",
       "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s",
       "JTs", "J9s", "J8s", "J7s", "J6s", "T9s", "T8s", "T7s", "T6s", "98s", "97s", "96s", "87s", "86s", "85s", "76s", "75s", "65s", "64s", "54s", "53s", "43s",
       "AQo", "AJo", "ATo", "A9o", "A8o", "A7o", "A6o", "A5o", "A4o", "A3o", "A2o",
       "KQo", "KJo", "KTo", "K9o", "K8o", "K7o", "K6o", "K5o",
       "QJo", "QTo", "Q9o", "Q8o", "JTo", "J9o", "J8o", "T9o", "T8o", "98o", "97o", "87o", "76o", "65o"]
    )
  }
];

export const RANKS_DISPLAY = RANKS;
