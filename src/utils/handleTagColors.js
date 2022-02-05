import { colors } from "../shared/config";

export function handleTagColor(tag) {
  switch (tag) {
    case "medical":
    case "product":
    case "investment banking":
    case "financial Technology":
      return colors.red;
    case "dentistry":
    case "computer science":
    case "commercial banking":
      return colors.orange;
    case "pharmacy":
    case "software development":
    case "financial planning":
      return colors.yellow;
    case "nursing":
    case "product management":
    case "private equity/venture capital":
      return colors.green;
    case "health":
    case "product design":
    case "insurance":
      return colors.lightBlue;
    case "engineering":
    case "ui/ux design":
    case "marketing":
      return colors.darkBlue;
    case "electrical engineering":
    case "design":
    case "real estate":
      return colors.purple;
    case "mechanical engineering":
    case "consulting":
    case "accounting":
      return colors.pink;
    case "tech":
    case "strategy operations":
    case "corporate finance":
      return colors.brown;
    case "resource":
      return colors.blue3;
    default:
      return colors.gray;
  }
}

// We want to make this case insensitive (going to call .lowercase() so need this to be in lowercase)
/*
export function handleTagColor(tag) {
  switch (tag) {
    case "Medical":
    case "Product":
    case "Investment banking":
    case "Financial Technology":
      return colors.red;
    case "Dentistry":
    case "Computer Science":
    case "Commercial banking":
      return colors.orange;
    case "Pharmacy":
    case "Software Development":
    case "Financial planning":
      return colors.yellow;
    case "Nursing":
    case "Product Management":
    case "Private Equity/Venture Capital":
      return colors.green;
    case "Health":
    case "Product Design":
    case "Insurance":
      return colors.lightBlue;
    case "Engineering":
    case "UI/UX Design":
    case "Marketing":
      return colors.darkBlue;
    case "Electrical Engineering":
    case "Design":
    case "Real Estate":
      return colors.purple;
    case "Mechanical Engineering":
    case "Consulting":
    case "Accounting":
      return colors.pink;
    case "Tech":
    case "Strategy Operations":
    case "Corporate Finance":
      return colors.brown;
    case "resource":
      return colors.blue3;
    default:
      return colors.gray;
  }
}
*/
export const handleGoingBColor = (flag) => {
  if (flag) {
    return colors.green1;
  } else {
    return colors.gray1;
  }
};

export const handleGoingFColor = (flag) => {
  if (flag) {
    return colors.darkgreen;
  } else {
    return colors.gray2;
  }
};
