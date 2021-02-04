export const mediaQueries = {
  mobile: "@media screen and (max-width: 700px)",
};

export const colors = {
  white: "#FFFFFF",
  lightpurple: "#E6EFFF",
  purple: "#A278F1",
  silver: "#ADAFB0",
  blue1: "#C3DAFE",
  blue2: "#F3F6F9",
  blue3: "#8DC5D7",
  pink: "#FFBFBF",
  black: "#000000",
  gray: "#E5E5E5",
  gray1: "#EDEDED",
  gray2: "#C4C4C4",
  gray3: "#5F6368",
  gray4: "#DCDCDC",
  gray5: "#6E6D79",
  red1: "#EBAFAF",
  darkyellow: "#EFD69A",
  green1: "rgba(89, 193, 122, 0.4);",
  darkgreen: "#4C9C65",
};

export const font = {
  text: "Arial",
};

export const handleTagColor = tag => {
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