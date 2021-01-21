import React from "react";
import FormUserDetails from '../components/FormUserDetails.js';
import FormPersonalDetails from '../components/FormPersonalDetails.js';

import { useForm, useStep } from "react-hooks-helper";


const steps =[
  {id: "userSignUp"},
  {id: "userPersonalInfo"}
]

const defaultData = {
  firstName: "fname",
  lastName: "lname",

}

const OnBoarding = () => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;
  const props = { formData, setForm, navigation };

  switch(id) {
    case "userSignUp":
      return <FormUserDetails {...props}/>
    case "userPersonalInfo":
      return<FormPersonalDetails {...props}/>
    default:
      return null;
  }
}
export default OnBoarding;

