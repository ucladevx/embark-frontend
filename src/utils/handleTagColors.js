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

export const handleGoingBColor = (flag) =>{
  if(flag){
    return colors.green1;
  }else{
    return colors.gray1;
  }
}

export const handleGoingFColor = (flag) =>{
  if(flag){
    return colors.darkgreen;
  }else{
    return colors.gray2;
  }
}