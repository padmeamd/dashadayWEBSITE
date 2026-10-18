/**
 * WHICH ALDERWICK SOCIETY WOULD CHOOSE YOU?
 *
 * Twelve questions, weighted. The questions are about conduct rather than
 * taste — what you do with a secret, a rule, a certainty you cannot prove —
 * because "do you prefer art or science" sorts nobody into anything.
 *
 * Several answers are deliberately worth something to two houses. A person
 * who keeps a secret in order to prevent harm is not purely one thing, and
 * the scoring should not pretend otherwise.
 *
 * Scoring lives here as a pure function so it can be read, changed and tested
 * without rendering anything.
 */

import { SOCIETIES } from "@/data/societies";

export type SocietyId = "vesper" | "linnaean" | "aurelian";

export type QuizAnswer = {
  id: string;
  text: string;
  /** Points to each house. Absent house means nothing. */
  weights: Partial<Record<SocietyId, number>>;
};

export type QuizQuestion = {
  id: string;
  /** The archive's framing of the question. */
  prompt: string;
  answers: QuizAnswer[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "letter",
    prompt: "A sealed letter, not addressed to you, has been left where you were certain to find it.",
    answers: [
      { id: "read", text: "Read it. Someone chose that place for a reason.", weights: { vesper: 3, aurelian: 1 } },
      { id: "return", text: "Return it unopened — and note who had access to the room.", weights: { linnaean: 3, vesper: 1 } },
      { id: "leave", text: "Leave it exactly as it is, and mention it to no one.", weights: { linnaean: 2, aurelian: 1 } },
      { id: "ask", text: "Ask openly whose it is, in front of whoever is nearest.", weights: { aurelian: 3, linnaean: 1 } },
    ],
  },
  {
    id: "worse",
    prompt: "Which would you find hardest to bear?",
    answers: [
      { id: "deceived", text: "Being deceived by someone you trusted.", weights: { vesper: 3, linnaean: 1 } },
      { id: "forgotten", text: "Being forgotten entirely.", weights: { aurelian: 3 } },
      { id: "misunderstood", text: "Being understood as something you are not.", weights: { aurelian: 2, vesper: 1 } },
      { id: "unproven", text: "Being right, and unable to prove it.", weights: { linnaean: 3, vesper: 1 } },
    ],
  },
  {
    id: "secret",
    prompt: "A friend asks you to keep a secret that may bring harm to someone else.",
    answers: [
      { id: "keep-prevent", text: "Keep it — and quietly make certain the harm never arrives.", weights: { vesper: 3, aurelian: 1 } },
      { id: "refuse", text: "Refuse. A promise cannot outrank a consequence.", weights: { linnaean: 3 } },
      { id: "once", text: "Keep this one, and tell them plainly there will not be another.", weights: { aurelian: 2, linnaean: 1 } },
      { id: "afraid", text: "Ask what they are actually afraid of.", weights: { vesper: 2, aurelian: 2 } },
    ],
  },
  {
    id: "concealed",
    prompt: "An institution you admire has concealed part of its own history.",
    answers: [
      { id: "find-out", text: "Find out what, before deciding how to feel about it.", weights: { linnaean: 3, vesper: 1 } },
      { id: "benefits", text: "Ask who the silence has been protecting.", weights: { vesper: 3 } },
      { id: "unchanged", text: "It changes nothing about what the place built.", weights: { aurelian: 3 } },
      { id: "publicly", text: "Say so, publicly. The concealment is the harm.", weights: { aurelian: 2, linnaean: 2 } },
    ],
  },
  {
    id: "dangerous",
    prompt: "You are offered the chance to uncover a dangerous truth. What matters most?",
    answers: [
      { id: "true", text: "That it is true, and can be shown to be true.", weights: { linnaean: 3 } },
      { id: "needed", text: "That someone is living without it who should not be.", weights: { vesper: 3 } },
      { id: "mine", text: "That it is mine to tell, and told in my own words.", weights: { aurelian: 3, vesper: 1 } },
      { id: "cost", text: "What it will cost the people in it, including me.", weights: { linnaean: 1, vesper: 2 } },
    ],
  },
  {
    id: "unnamed",
    prompt: "Your work will outlive you — but under someone else's name.",
    answers: [
      { id: "agree", text: "Agree without hesitation. The work is the point.", weights: { linnaean: 3, vesper: 1 } },
      { id: "refuse-name", text: "Refuse. The name is part of the work.", weights: { aurelian: 3 } },
      { id: "proof", text: "Agree — and keep proof of what was mine.", weights: { aurelian: 2, linnaean: 1, vesper: 1 } },
    ],
  },
  {
    id: "watched",
    prompt: "You realise you have been watched, carefully, for some time.",
    answers: [
      { id: "let-continue", text: "Let it continue. Whoever it is will reveal what they want.", weights: { vesper: 3 } },
      { id: "confront", text: "Put yourself directly in front of them and ask.", weights: { aurelian: 3 } },
      { id: "when", text: "Work out when it began, and what changed just before.", weights: { linnaean: 3, vesper: 1 } },
    ],
  },
  {
    id: "room",
    prompt: "A crowded room. What takes your attention first?",
    answers: [
      { id: "silent", text: "The one person who has not spoken all evening.", weights: { vesper: 3 } },
      { id: "listened", text: "The one everybody has stopped to listen to.", weights: { aurelian: 3 } },
      { id: "unexplained", text: "The object in the room that nobody has explained.", weights: { linnaean: 3 } },
    ],
  },
  {
    id: "rule",
    prompt: "A long-standing rule exists, and nobody now alive can explain why.",
    answers: [
      { id: "keep", text: "Keep it until the reason is found. It was written for something.", weights: { linnaean: 3 } },
      { id: "break", text: "Break it once, carefully, to see what it was protecting.", weights: { vesper: 3, linnaean: 1 } },
      { id: "replace", text: "Replace it with a better one, and make the better one stick.", weights: { aurelian: 3 } },
    ],
  },
  {
    id: "certain",
    prompt: "You are certain of something you cannot prove.",
    answers: [
      { id: "wait", text: "Wait. Certainty is not evidence.", weights: { linnaean: 3 } },
      { id: "act", text: "Act on it quietly, and tell no one why.", weights: { vesper: 3 } },
      { id: "aloud", text: "Say it aloud, and let it be argued with.", weights: { aurelian: 3, linnaean: 1 } },
    ],
  },
  {
    id: "century",
    prompt: "A century from now, what would you want written about you?",
    answers: [
      { id: "right", text: "That she was right about something nobody believed.", weights: { vesper: 2, linnaean: 2 } },
      { id: "outlived", text: "That something she made outlived her.", weights: { aurelian: 3 } },
      { id: "careful", text: "That she was careful with what she knew.", weights: { linnaean: 2, vesper: 2 } },
      { id: "argued", text: "That she is still being argued about.", weights: { aurelian: 2, vesper: 1 } },
    ],
  },
  {
    id: "solved",
    prompt: "You solve a mystery that nobody asked you to solve. What becomes of the answer?",
    answers: [
      { id: "keep-answer", text: "You keep it. Not every answer belongs to everyone.", weights: { vesper: 3 } },
      { id: "record", text: "You write it down properly, so that it can be checked.", weights: { linnaean: 3 } },
      { id: "make", text: "You make something out of it that people will remember.", weights: { aurelian: 3 } },
    ],
  },
];

/** The result copy, in the archive's voice. */
export const QUIZ_RESULTS: Record<SocietyId, string> = {
  vesper:
    "You have always sensed that there is more to the world than what you have been " +
    "shown. You trust your instincts, notice the smallest inconsistencies, and pursue " +
    "answers even when others would rather leave questions unanswered. But remember: " +
    "not every secret belongs to you.",
  linnaean:
    "You are not easily persuaded by appearances. You seek explanations, challenge " +
    "assumptions, and understand that knowledge demands patience. Your greatest " +
    "strength is your ability to question. Your greatest danger is believing that " +
    "everything can be explained.",
  aurelian:
    "You see possibility where others see the ordinary. You are driven to create, to " +
    "express, and to leave something meaningful behind. Beauty matters to you because " +
    "it can change how people experience the world. But even the brightest legacy " +
    "casts a shadow.",
};

export type QuizOutcome = {
  primary: SocietyId;
  /** Shown only when the runner-up is genuinely close. */
  secondary: SocietyId | null;
  scores: Record<SocietyId, number>;
  /** Primary's share of all points awarded, 0–1. */
  conviction: number;
};

/** Ties resolve in registry order, so the same answers always sort the same way. */
const ORDER = SOCIETIES.map((s) => s.id as SocietyId);

/** A runner-up this close to the primary is worth naming. */
const SECONDARY_RATIO = 0.72;

/**
 * Sum the weights of the chosen answers.
 *
 * `picks` maps question id to answer id. Unanswered questions simply score
 * nothing, so a partial run still returns a sensible result rather than
 * throwing — the UI does not allow it, but the function should not depend on
 * the UI for that.
 */
export function scoreQuiz(picks: Record<string, string>): QuizOutcome {
  const scores: Record<SocietyId, number> = { vesper: 0, linnaean: 0, aurelian: 0 };

  for (const question of QUIZ_QUESTIONS) {
    const answer = question.answers.find((a) => a.id === picks[question.id]);
    if (!answer) continue;
    for (const [house, points] of Object.entries(answer.weights)) {
      scores[house as SocietyId] += points ?? 0;
    }
  }

  const ranked = ORDER.slice().sort((a, b) => scores[b] - scores[a] || ORDER.indexOf(a) - ORDER.indexOf(b));
  const [primary, runnerUp] = ranked;
  const total = scores.vesper + scores.linnaean + scores.aurelian;

  return {
    primary,
    secondary: scores[runnerUp] >= scores[primary] * SECONDARY_RATIO && scores[runnerUp] > 0 ? runnerUp : null,
    scores,
    conviction: total ? scores[primary] / total : 0,
  };
}
