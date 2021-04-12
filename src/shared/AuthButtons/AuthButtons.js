import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { ActionButton } from "../Buttons";
import { colors, HomeAddress } from "../config";
import GoogleIcon from "../../images/google.svg";
import LinkedInIcon from "../../images/linkedin.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  studentGoogleSignIn,
  studentGoogleSignUp,
} from "../../redux/actions/userActions";
import { useLocation } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { LinkedIn } from "react-linkedin-login-oauth2";
import "./AuthButtons.css";

const AuthBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 30px;
`;

const RenderBtnStyle = (ref, id, icon, prompt) => {
  const btn = ref.current.firstChild;
  btn.style = "";
  btn.innerHTML = "";
  const svg = document.createElement("img");
  svg.src = icon;
  btn.appendChild(svg);
  const text = document.createElement("span");
  text.innerText = prompt;
  btn.appendChild(text);
  btn.id = id;
};

const AuthButtons = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.userType);
  const page = useLocation().pathname;
  const googleRef = useRef();
  const linkedinRef = useRef();
  const handleGoogleClick = () => {
    if (userType === "student" && page === "/") {
      dispatch(studentGoogleSignUp());
    } else if (userType === "student" && page === "/login") {
      dispatch(studentGoogleSignIn());
    }
  };
  const responseAuth = (response) => {
    console.log(response);
  };
  useEffect(() => {
    RenderBtnStyle(googleRef, "googlebtn", GoogleIcon, "Sign up with Google");
    RenderBtnStyle(
      linkedinRef,
      "linkedinbtn",
      LinkedInIcon,
      "Sign up with linkedin",
    );
  }, []);
  return (
    <AuthBtnWrapper id="authBtns">
      <span ref={googleRef}>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={responseAuth}
          onFailure={responseAuth}
          cookiePolicy={"single_host_origin"}
          redirectUri={HomeAddress}
        />
      </span>
      <span ref={linkedinRef}>
        <LinkedIn
          clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
          onSuccess={responseAuth}
          onFailure={responseAuth}
          redirectUri={HomeAddress}
        ></LinkedIn>
      </span>
    </AuthBtnWrapper>
  );
};

export default AuthButtons;
