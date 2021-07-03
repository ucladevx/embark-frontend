import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { ActionButton } from "../Buttons";
import { ErrorPopup } from "../../components/ErrorPopup.js";
import { colors, HomeAddress } from "../config";
import GoogleIcon from "../../images/google.svg";
import LinkedInIcon from "../../images/linkedinAuth.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  studentGoogleSignIn,
  studentGoogleSignUp,
} from "../../redux/actions/userActions";
import { useLocation, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { LinkedIn } from "react-linkedin-login-oauth2";
import "./AuthButtons.css";

const AuthBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 30px;
`;

const AuthButtons = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.userType);
  const history = useHistory();
  const page = useLocation().pathname;
  const googleRef = useRef();
  const linkedinRef = useRef();
  const [errorPopup, setErrorPopup] = useState(false);

  const RenderBtnStyle = useCallback((ref, id, icon, prompt) => {
    const btn = ref.current.firstChild;
    btn.style = "";
    btn.innerHTML = "";
    const svg = document.createElement("img");
    svg.src = icon;
    btn.appendChild(svg);
    const text = document.createElement("span");
    text.innerText = prompt;
    if (id === "linkedinbtn") text.style.marginLeft = "-4px";
    btn.appendChild(text);
    btn.id = id;
  }, []);

  const responseAuth = (response) => {
    if (page !== "/login") {
      const { email, familyName, givenName } = response.profileObj;
      const profile = {
        firstName: givenName,
        lastName: familyName,
        email,
      };
      dispatch(studentGoogleSignUp(profile, history));
    } else {
      const { email } = response.profileObj;
      const profile = { email };
      dispatch(studentGoogleSignIn(profile));
    }
  };

  useEffect(() => {
    if (page !== "/login") {
      RenderBtnStyle(googleRef, "googlebtn", GoogleIcon, "Sign up with Google");
      RenderBtnStyle(
        linkedinRef,
        "linkedinbtn",
        LinkedInIcon,
        "Sign up with linkedin",
      );
    } else {
      // login
      RenderBtnStyle(googleRef, "googlebtn", GoogleIcon, "Log in with Google");
      RenderBtnStyle(
        linkedinRef,
        "linkedinbtn",
        LinkedInIcon,
        "Log in with linkedin",
      );
    }
  }, [page, RenderBtnStyle]);

  return (
    <AuthBtnWrapper id="authBtns">
      <ErrorPopup open={errorPopup} onClose={() => setErrorPopup(false)} />
      <span ref={googleRef}>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={responseAuth}
          onFailure={() => {
            console.log("Google Auth Failed");
          }}
          cookiePolicy={"single_host_origin"}
          redirectUri={HomeAddress}
        />
      </span>
      <div onClick={() => setErrorPopup(true)}>
        <span ref={linkedinRef}>
          <LinkedIn
            clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
            redirectUri="http%3A%2F%2Flocalhost%3A9000%2Fauth%2Flinkedin%2Fredirect"
            onSuccess={responseAuth}
            onFailure={responseAuth}
          ></LinkedIn>
        </span>
      </div>
    </AuthBtnWrapper>
  );
};
// http%3A%2F%2Flocalhost%3A9000%2Fauth%2Flinkedin%2Fredirect
export default AuthButtons;
