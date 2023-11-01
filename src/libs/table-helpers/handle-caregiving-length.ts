import { caregiving_length } from "@prisma/client";

export const handleCaregivingLength = (str: caregiving_length) => {
  switch (str) {
    case "BELOW_1_YEAR":
      return "Less than 1 year";
    case "FROM_1_TO_3_YEARS":
      return "1 to 3 years";
    case "FROM_4_TO_6_YEARS":
      return "4 to 6 years";
    case "FROM_7_TO_10_YEARS":
      return "7 to 10 years";
    case "FROM_11_TO_20_YEARS":
      return "11 to 20 years";
    case "ABOVE_21_YEARS":
      return "More than 21 years";
    default:
      return "";
  }
};
