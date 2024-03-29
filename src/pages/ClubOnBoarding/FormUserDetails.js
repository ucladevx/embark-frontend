import styled from "styled-components";
import TypeBox from "../../shared/TypeBox";
import { OrSeperator } from "../../shared/Separators";
import {
  LeftFormContainer,
  RightFormContainer,
  FormContainer,
  FormWrapper,
  FieldContainer,
  ErrorPrompt,
} from "../../shared/Form";
import { ActionButton } from "../../shared/Buttons";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { signupClub } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { header4 } from "../../shared/config";
import AuthButtons from "../../shared/AuthButtons";
import { CLEAR_ERRORS } from "../../redux/types";
import { TitleText } from "../../shared/Text/TitleText";

const NameContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 380px;
`;

const FieldName = styled.p`
  ${header4}
`;

const AccountBtn = styled(ActionButton)`
  width: 200px;
  height: 38px;
  margin-top: 15px;
`;

const PromptContainer = styled.div`
  font-size: 14px;
  position: absolute;
  top: 5vh;
  right: 4vw;
`;

const SignupSchema = Yup.object().shape({
  clubName: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const Prompt = () => {
  return (
    <PromptContainer>
      Already a member? <a href="/login">Sign in</a>
      <br />
      <a href="/">Sign up as a student</a>
    </PromptContainer>
  );
};

const FormUserDetails = ({ handleUser, handleStep }) => {
  const backend_errors = useSelector((state) => state.ui.errors);
  const dispatch = useDispatch();

  return (
    <FormContainer>
      <LeftFormContainer />
      <RightFormContainer>
        <Prompt link={"login"}></Prompt>
        <TitleText>Sign up to Embark</TitleText>
        <AuthButtons />
        <OrSeperator />
        <Formik
          initialValues={{
            clubName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            const { clubName, email, password } = values;
            const postUser = {
              firstName: clubName,
              email,
              password,
              userType: "club",
            };
            dispatch(signupClub(postUser, handleUser, handleStep));
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(props) => {
            const { errors, setErrors } = props;
            const hasError =
              !!backend_errors ||
              !!errors.password ||
              !!errors.email ||
              !!errors.clubName;
            const handleFocus = () => {
              setErrors({});
              dispatch({ type: CLEAR_ERRORS });
            };

            return (
              <FormWrapper>
                <NameContainer>
                  <FieldContainer>
                    <FieldName>Club Name</FieldName>
                    <Field
                      name="clubName"
                      as={TypeBox}
                      margin="normal"
                      helperText={errors.firstName}
                      error={hasError}
                      onFocus={handleFocus}
                    ></Field>
                  </FieldContainer>
                </NameContainer>
                <FieldContainer>
                  <FieldName>Email</FieldName>
                  <Field
                    name="email"
                    as={TypeBox}
                    margin="normal"
                    error={hasError}
                    onFocus={handleFocus}
                  ></Field>
                </FieldContainer>
                <FieldContainer>
                  <FieldName>Password</FieldName>
                  <Field
                    name="password"
                    as={TypeBox}
                    margin="normal"
                    error={hasError}
                    type="password"
                    placeholder="8+ characters"
                    onFocus={handleFocus}
                  ></Field>
                </FieldContainer>
                <ErrorPrompt error={hasError}>
                  Invalid name, email, or password
                </ErrorPrompt>
                <AccountBtn type="submit">Create Account</AccountBtn>
              </FormWrapper>
            );
          }}
        </Formik>
      </RightFormContainer>
    </FormContainer>
  );
};
export default FormUserDetails;
