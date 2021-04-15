import { colors } from "../shared/config";

export function handleTagColor(tag) {
  switch (tag) {
    case "Product Management":
      return colors.red1;
    case "Computer Science":
      return colors.blue3;
    case "Product Design":
      return colors.darkyellow;
    case "Law":
      return colors.gray2;
    case "Medicine":
      return colors.pink;
    case "Tech":
      return colors.blue2;
    default:
      return colors.gray;
  }
}

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
