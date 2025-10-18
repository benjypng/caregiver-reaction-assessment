export const handleQuestions = (str: string) => {
  switch (str) {
    case '1':
      return 'Strongly Disagree'
    case '2':
      return 'Disagree'
    case '3':
      return 'Neither Agree nor Disagree'
    case '4':
      return 'Agree'
    case '5':
      return 'Strongly Agree'
    default:
  }
}
