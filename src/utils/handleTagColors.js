import { colors } from "../shared/config";

export const handleTagColor = (tag) => {
  switch (tag) {
    case "Product Management":
      return colors.red1;
    case "Computer Science":
      return colors.blue3;
    case "Product Design":
      return colors.darkyellow;
    case "law":
      return colors.gray2;
    case "medicine":
      return colors.pink;
    case "tech":
      return colors.blue2;
    default:
      return "#222";
  }
};
