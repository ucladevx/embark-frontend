import React from "react";
import FormUserDetails from "../components/FormUserDetails.js";
import FormPersonalDetails from "../components/FormPersonalDetails.js";
import { useSelector } from "react-redux";

const OnBoarding = () => {
  const {
    register: { register_step },
  } = useSelector((state) => state.data);

  switch (register_step) {
    case 0:
      return <FormUserDetails />;
    case 1:
      return <FormPersonalDetails />;
    default:
      return null;
  }
};
export default OnBoarding;
