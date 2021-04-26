import styled from "styled-components";
import { colors } from "../shared/config";
import { Form } from "formik";
import { useLocation } from "react-router-dom";

export const LeftFormContainer = styled.div`
  background: ${colors.blue1};
  width: 43%;
`;

export const RightFormContainer = styled.div`
  width: 57%;
  padding: 13vh 0 0 12vw;
  position: relative;
`;

export const FormContainer = styled.div`
  font-family: Open Sans, helvetica, arial, verdana, sans-serif;
  display: flex;
  width: 100%;
  height: 100vh;
  padding-left: 5px;
`;

export const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 15px;
  margin-top: 2rem;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 380px;
`;

export const ErrorPrompt = styled.div`
  color: ${(props) => (props.error ? "#ffadad" : "transparent")};
  height: 20px;
`;

const PromptContainer = styled.div`
  font-size: 14px;
  position: absolute;
  top: 5vh;
  right: 4vw;
`;

export const Prompt = () => {
  const page = useLocation().pathname;
  return page === "/" ? (
    <PromptContainer>
      Already a member? <a href="/login">Sign in</a>
    </PromptContainer>
  ) : (
    <PromptContainer>
      New to Embark? <a href="/">Sign up</a>
    </PromptContainer>
  );
};
