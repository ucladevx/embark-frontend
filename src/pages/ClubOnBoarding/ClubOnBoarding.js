import React, {useState} from 'react';
import FormClubAccount from './FormClubAccount.js';
import FormClubInfo from './FormClubInfo.js';

const ClubOnBoarding = () => {
  const [user, setUser] = useState({});
  const [step, setStep] = useState(0);

  switch (step) {
    case 0:
      return <FormClubAccount handleUser={setUser} handleStep={setStep} />;
    case 1:
      return <FormClubInfo user={user} />;
    default:
      return null;
  }
};
export default ClubOnBoarding;