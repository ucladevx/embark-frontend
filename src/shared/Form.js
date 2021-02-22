import styled from "styled-components";
import { colors } from "../shared/config";
import { Form } from "formik";

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
`;

export const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 15px;
  margin-top: 2rem;
  padding-left: 5px;
`;

const PromptContainer = styled.div`
  font-size: 14px;
  position: absolute;
  top: 5vh;
  right: 4vw;
`;

export const Prompt = ({ link }) => {
  return link === "login" ? (
    <PromptContainer>
      Already a member? <a href="/login">Sign in</a>
    </PromptContainer>
  ) : (
    <PromptContainer>
      New to Embark? <a href="/">Sign up</a>
    </PromptContainer>
  );
};
