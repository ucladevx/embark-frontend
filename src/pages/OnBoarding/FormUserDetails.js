import styled from "styled-components";
import TypeBox from "../../shared/TypeBox";
import { OrSeperator } from "../../shared/Separators";
import {
  LeftFormContainer,
  RightFormContainer,
  FormContainer,
  FormWrapper,
  Prompt,
  FieldContainer,
  ErrorPrompt,
} from "../../shared/Form";
import { ActionButton } from "../../shared/Buttons";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { signupStudent } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { header1, header4 } from "../../shared/config";
import AuthButtons from "../../shared/AuthButtons";
import { CLEAR_ERRORS } from "../../redux/types";

const SignUpTitle = styled.div`
  ${header1};
  margin-bottom: 15px;
`;

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

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const FormUserDetails = ({ handleUser, handleStep }) => {
  const backend_errors = useSelector((state) => state.ui.errors);
  const dispatch = useDispatch();

  return (
    <FormContainer>
      <LeftFormContainer />
      <RightFormContainer>
        <Prompt link={"login"}></Prompt>
        <SignUpTitle>Sign up to Embark</SignUpTitle>
        <AuthButtons />
        <OrSeperator />
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            const name = values.firstName + " " + values.lastName;
            const { firstName, lastName, email, password } = values;
            const postUser = {
              firstName,
              lastName,
              email,
              password,
              userType: "student",
            };
            dispatch(signupStudent(postUser, handleUser, handleStep));
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
              !!errors.firstName ||
              !!errors.lastName;
            const handleFocus = () => {
              setErrors({});
              dispatch({ type: CLEAR_ERRORS });
            };

            return (
              <FormWrapper>
                <NameContainer>
                  <FieldContainer>
                    <FieldName>First Name</FieldName>
                    <Field
                      name="firstName"
                      as={TypeBox}
                      margin="normal"
                      helperText={errors.firstName}
                      error={hasError}
                      onFocus={handleFocus}
                    ></Field>
                  </FieldContainer>
                  <FieldContainer>
                    <FieldName>Last Name</FieldName>
                    <Field
                      name="lastName"
                      as={TypeBox}
                      margin="normal"
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
