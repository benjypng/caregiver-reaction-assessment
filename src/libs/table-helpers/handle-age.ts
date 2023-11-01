import { age_group } from "@prisma/client";

export const handleAge = (str: age_group) => {
  switch (str) {
    case "BELOW_21":
      return "Below 21 years old";
    case "FROM_21_TO_30":
      return "21 to 30 years old";
    case "FROM_31_TO_40":
      return "31 to 40 years old";
    case "FROM_41_TO_50":
      return "41 to 50 years old";
    case "FROM_51_TO_60":
      return "51 to 60 years old";
    case "FROM_61_TO_70":
      return "61 to 70 years old";
    case "ABOVE_70":
      return "Above 70 years old";
    default:
      return "";
  }
};
