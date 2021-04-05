import React from "react";
import styled from "styled-components";
import { ActionButton } from "./Buttons";
import { colors } from "./config";
import GoogleIcon from "../images/google.svg";
import LinkedInIcon from "../images/linkedin.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  studentGoogleSignIn,
  studentGoogleSignUp,
} from "../redux/actions/userActions";
import { useLocation } from "react-router-dom";
import GoogleLogin from "react-google-login";

const GoogleBtn = styled(ActionButton)`
  background: ${colors.blue4};
  display: flex;
  padding-left: 6em;
  align-items: center;
  gap: 13px;
  width: 380px;
  height: 35px;
`;

const LinkedInBtn = styled(GoogleBtn)`
  background: ${colors.blue5};
`;

const AuthBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 30px;
`;

const AuthButtons = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.userType);
  const page = useLocation().pathname;

  const handleGoogleClick = () => {
    if (userType === "student" && page === "/") {
      dispatch(studentGoogleSignUp());
    } else if (userType === "student" && page === "/login") {
      dispatch(studentGoogleSignIn());
    }
  };
  const responseGoogle = (response) => {
    console.log(response);
  };

  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  return (
    <AuthBtnWrapper>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      ,
      {/* <GoogleBtn onClick={handleGoogleClick}>
        <img src={GoogleIcon} alt="google"></img>
        <span style={{ marginLeft: "5px" }}>Sign up with Google</span>
      </GoogleBtn> */}
      <LinkedInBtn>
        <img src={LinkedInIcon} alt="linkedin"></img>Sign up with Linkedin
      </LinkedInBtn>
    </AuthBtnWrapper>
  );
};

export default AuthButtons;
