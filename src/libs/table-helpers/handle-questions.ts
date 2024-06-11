export const handleQuestions = (str: string) => {
  switch (str) {
    case '1':
      return 'Strongly Agree';
    case '2':
      return 'Agree';
    case '3':
      return 'Neither Agree nor Disagree';
    case '4':
      return 'Disagree';
    case '5':
      return 'Strongly Disagree';
    default:
  }
};
