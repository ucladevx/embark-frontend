export const eventCheck = (props) => {
  const title = props.title;
  const description = props.description;
  const location = props.location;
  console.log(title);

  if (title && title.length > 100) {
    alert("Title is too long! Please limit to <100 characters");
    return false;
  }
  if (description && description.length > 5000) {
    alert("Description is too long! Please limit to <5000 characters");
    return false;
  }
  if (location && location.length > 100) {
    alert("Location is too long! Please limit to <100 characters");
    return false;
  }
  return true;
};
