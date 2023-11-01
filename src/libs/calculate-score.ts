import { Form } from "@prisma/client";

// Scoring Rubrics
// Disturbed schedule and poor health: 	Items 1, 4, 6, 7, 13, 14, 16 and 18.
// Lack of finances: 			Items 20 and 21.
// Lack of family support: 		Items 2, 8, 10, 12 and 15. (Note that Item 2 has to be reverse scored, to align it with the rest of the items in this subscale/domain)
// Caregiver esteem: 			Items 3, 5, 9, 11, 17 and 19.

export const calculateScore = (data: Form) => {
  const scoreDescription = {
    poor_health: 0,
    lack_of_finances: 0,
    lack_of_family_support: 0,
    esteem: 0,
  };

  scoreDescription.poor_health =
    (parseInt(data.qn1) +
      parseInt(data.qn4) +
      parseInt(data.qn6) +
      parseInt(data.qn7) +
      parseInt(data.qn13) +
      parseInt(data.qn14) +
      parseInt(data.qn16) +
      parseInt(data.qn18)) /
    8;

  scoreDescription.lack_of_finances =
    (parseInt(data.qn20) + parseInt(data.qn21)) / 2;

  scoreDescription.lack_of_family_support =
    (Math.abs(parseInt(data.qn2) - 6) +
      parseInt(data.qn8) +
      parseInt(data.qn10) +
      parseInt(data.qn12) +
      parseInt(data.qn15)) /
    5;

  scoreDescription.esteem =
    (parseInt(data.qn3) +
      parseInt(data.qn5) +
      parseInt(data.qn9) +
      parseInt(data.qn11) +
      parseInt(data.qn17) +
      parseInt(data.qn19)) /
    6;

  return scoreDescription;
};
