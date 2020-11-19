import React from "react";

const User = (props) => {
  const userid = props.match.params.id;
  return (
    <div>
      <h1>User</h1>
      <h3>{userid}</h3>
    </div>
  );
};

export default User;
