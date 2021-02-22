import React, { useState } from "react";
import FormUserDetails from "./FormUserDetails.js";
import FormPersonalDetails from "./FormPersonalDetails.js";
const OnBoarding = () => {
  const [user, setUser] = useState({});
  const [step, setStep] = useState(1);

  switch (step) {
    case 0:
      return <FormUserDetails handleUser={setUser} handleStep={setStep} />;
    case 1:
      return <FormPersonalDetails user={user} />;
    default:
      return null;
  }
};
export default OnBoarding;
