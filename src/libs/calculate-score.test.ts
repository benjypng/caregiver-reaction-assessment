import { describe, expect, it } from 'vitest'

import { calculateScore } from './calculate-score'

describe('calculateScore', () => {
  it('correctly calculates domain averages based on item answers', () => {
    const data: Record<string, number> = {
      qn1: 2,
      qn2: 5,
      qn3: 3,
      qn4: 4,
      qn5: 4,
      qn6: 3,
      qn7: 4,
      qn8: 3,
      qn9: 2,
      qn10: 5,
      qn11: 3,
      qn12: 4,
      qn13: 5,
      qn14: 2,
      qn15: 3,
      qn16: 2,
      qn17: 4,
      qn18: 3,
      qn19: 2,
      qn20: 5,
      qn21: 4,
    }

    const result = calculateScore(data as any)

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

    const poorHealthAvg =
      poorHealthItems.reduce((s, i) => s + data[i], 0) / poorHealthItems.length
    const financesAvg =
      financesItems.reduce((s, i) => s + data[i], 0) / financesItems.length
    const familyAvg =
      (reverseScore(data['qn2']) +
        data['qn8'] +
        data['qn10'] +
        data['qn12'] +
        data['qn15']) /
      familyItems.length
    const esteemAvg =
      esteemItems.reduce((s, i) => s + data[i], 0) / esteemItems.length

    expect(result.poor_health).toBe(poorHealthAvg)
    expect(result.lack_of_finances).toBe(financesAvg)
    expect(result.lack_of_family_support).toBe(familyAvg)
    expect(result.esteem).toBe(esteemAvg)
  })
})
