import { Form } from '@prisma/client';

// Scoring Rubrics
// Disturbed schedule and poor health: 	Items 1, 4, 6, 7, 13, 14, 16 and 18.
// Lack of finances: 			Items 20 and 21.
// Lack of family support: 		Items 2, 8, 10, 12 and 15. (Note that Item 2 has to be reverse scored, to align it with the rest of the items in this subscale/domain)
// Caregiver esteem: 			Items 3, 5, 9, 11, 17 and 19.

type ScoreCategory =
  | 'poor_health'
  | 'lack_of_finances'
  | 'lack_of_family_support'
  | 'esteem';

type ScoreResult = Record<ScoreCategory, number>;

const MAX_SCORE_PER_QUESTION = 5;

const QUESTIONS: Record<ScoreCategory, number[]> = {
  poor_health: [1, 4, 6, 7, 13, 14, 16, 18],
  lack_of_finances: [20, 21],
  lack_of_family_support: [8, 10, 12, 15],
  esteem: [3, 5, 9, 11, 17, 19],
};

const answerKey = (qnNumber: number): keyof Form =>
  `qn${qnNumber}` as keyof Form;

const getAnswer = (data: Form, qnNumber: number): number => {
  const raw = data[answerKey(qnNumber)];
  const value = Number(raw);
  if (!Number.isFinite(value)) {
    throw new Error(
      `Question ${qnNumber} is missing or not a number: "${raw}"`,
    );
  }
  return value;
};

const averageFromQuestions = (
  data: Form,
  questionNumbers: number[],
): number => {
  const total = questionNumbers.reduce(
    (sum, qn) => sum + getAnswer(data, qn),
    0,
  );
  return total / questionNumbers.length;
};

const reverseScore = (value: number): number =>
  MAX_SCORE_PER_QUESTION + 1 - value;

export const calculateScore = (data: Form): ScoreResult => {
  const poorHealth = averageFromQuestions(data, QUESTIONS.poor_health);
  const finances = averageFromQuestions(data, QUESTIONS.lack_of_finances);

  // Reverse q2
  const q2Reversed = reverseScore(getAnswer(data, 2));
  const familySupportSum =
    q2Reversed +
    QUESTIONS.lack_of_family_support.reduce(
      (sum, qn) => sum + getAnswer(data, qn),
      0,
    );
  const familySupportAvg =
    familySupportSum / (QUESTIONS.lack_of_family_support.length + 1);

  const esteem = averageFromQuestions(data, QUESTIONS.esteem);

  return {
    poor_health: poorHealth,
    lack_of_finances: finances,
    lack_of_family_support: familySupportAvg,
    esteem,
  };
};
