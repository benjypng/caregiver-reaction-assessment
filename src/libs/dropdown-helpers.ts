import { handleAge } from './table-helpers/handle-age';
import { handleCapitalise } from './table-helpers/handle-capitalise';
import { handleCaregivingLength } from './table-helpers/handle-caregiving-length';

export const dropdownHelper = (property: string, options: object) => {
  switch (property) {
    case 'age_group':
      return Object.values(options).map((i) => ({
        value: i,
        label: handleAge(i),
      }));
    case 'gender':
    case 'race':
      return Object.values(options).map((i) => ({
        value: i,
        label: handleCapitalise(i),
      }));
    case 'marital_status':
      return Object.values(options).map((i) => ({
        value: i,
        label: handleCapitalise(i),
      }));
    case 'education_level':
      return Object.values(options).map((i) => ({
        value: i,
        label: handleCapitalise(i),
      }));
    case 'employment_status':
      return Object.values(options).map((i) => ({
        value: i,
        label: handleCapitalise(i),
      }));
    case 'caregiving_length':
      return Object.values(options).map((i) => ({
        value: i,
        label: handleCaregivingLength(i),
      }));
    default:
      return [];
  }
};
