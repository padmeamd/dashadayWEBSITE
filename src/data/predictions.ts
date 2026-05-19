export type Prediction = {
  song: string;
  lyric: string;
};

export const PREDICTIONS: Prediction[] = [
  { song: "Blockbuster", lyric: "Now your life is a blockbuster:\nthere's no love but there is action" },
  { song: "Venom", lyric: "Come and feed my ego,\nit's gasping for attention" },
  { song: "Cinematic", lyric: "What if we're just meant to be?\nIt isn't just a fantasy" },
  { song: "So Confusing", lyric: "Fuck, you're so confusing" },
  {
    song: "Love You Like You Do",
    lyric: "You could've just said let's be friends\nYou could've but you wouldn't want that",
  },
  { song: "Be That", lyric: "Be the one who walks through smoke,\nHolds the dream you never spoke." },
  {
    song: "Feel The Same",
    lyric:
      "We both know about manipulation...\nMaybe we should get back 'cuz fuck it,man, I still love the tension...",
  },
  {
    song: "Expectations",
    lyric: "If you hear this song\nCall me, say you're sorry\nSay it meant something at all",
  },
  {
    song: "Darker Than Lust",
    lyric: "Your heat is heaven, then it's hush\nYou want my heart, but not my trust",
  },
  { song: "Marylebone Road", lyric: "London is the best place for a heartbreak" },
  {
    song: "Lied to You",
    lyric: "I've been to Oxford once again...\nand it is good you weren't there",
  },
  {
    song: "ur time is up",
    lyric: "I forgot how your voice used to burn...\nbut maybe not fully",
  },
  {
    song: "Season of Rollercoasters",
    lyric: "But it's over -\nthe season of rollercoasters",
  },
  {
    song: "Not My Circus",
    lyric: "Thought I'd cry, beg for the role,\nBut darling -\nI'd rather binge a show alone.",
  },
  { song: "That Boy Was a Mistake", lyric: "That boy was a mistake" },
  { song: "SUFM", lyric: "If my voice is too loud for you\nThen baby, that's your issue" },
  {
    song: "Give Up On Love",
    lyric: "My egos in bruises\nbut hearts filled with hope",
  },
  {
    song: "Back to My Old Ways",
    lyric: "Your melancholy killed my vibe\nAlmost forgot that I'm fine",
  },
];

export function pickNextPredictionIndex(prev: number | null): number {
  if (PREDICTIONS.length <= 1) return 0;
  const current = prev ?? -1;
  let next = Math.floor(Math.random() * PREDICTIONS.length);
  let guard = 0;
  while (next === current && guard < 12) {
    next = Math.floor(Math.random() * PREDICTIONS.length);
    guard += 1;
  }
  return next;
}
