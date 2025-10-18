import { Form } from '@prisma/client'

// Scoring Rubrics
// Disturbed schedule and poor health: 	Items 1, 4, 6, 7, 13, 14, 16 and 18.
// Lack of finances: 			Items 20 and 21.
// Lack of family support: 		Items 2, 8, 10, 12 and 15. (Note that Item 2 has to be reverse scored, to align it with the rest of the items in this subscale/domain)
// Caregiver esteem: 			Items 3, 5, 9, 11, 17 and 19.

type ScoreResult = {
  poor_health: number
  lack_of_finances: number
  lack_of_family_support: number
  esteem: number
}

const poorHealthItems = [
  'qn1',
  'qn4',
  'qn6',
  'qn7',
  'qn13',
  'qn14',
  'qn16',
  'qn18',
]
const financesItems = ['qn20', 'qn21']
const familyItems = ['qn2', 'qn8', 'qn10', 'qn12', 'qn15']
const esteemItems = ['qn3', 'qn5', 'qn9', 'qn11', 'qn17', 'qn19']

const reverseScore = (score: number) => {
  return 6 - score
}

const extractQnScore = (data: Record<string, any>) => {
  const qnEntries = Object.entries(data)
    .filter(([key]) => key.startsWith('qn')) // only qn1–qn21 etc.
    .map(([key, value]) => [key, Number(value)]) // convert all to numbers

  return Object.fromEntries(qnEntries) as Record<string, number>
}

export const calculateScore = (data: Form): ScoreResult => {
  const formData = extractQnScore(data)

  const poorHealthAvg =
    poorHealthItems.reduce((s, i) => s + formData[i], 0) /
    poorHealthItems.length
  const financesAvg =
    financesItems.reduce((s, i) => s + formData[i], 0) / financesItems.length
  const familyAvg =
    (reverseScore(formData['qn2']) +
      formData['qn8'] +
      formData['qn10'] +
      formData['qn12'] +
      formData['qn15']) /
    familyItems.length
  const esteemAvg =
    esteemItems.reduce((s, i) => s + formData[i], 0) / esteemItems.length

  return {
    poor_health: poorHealthAvg,
    lack_of_finances: financesAvg,
    lack_of_family_support: familyAvg,
    esteem: esteemAvg,
  }
}
