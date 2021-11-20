import React from "react";
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
import { header4 } from "../../shared/config";
import AuthButtons from "../../shared/AuthButtons";
import { CLEAR_ERRORS } from "../../redux/types";
import { TitleText } from "../../shared/Text/TitleText";
import { useState } from "react";

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

const AccountDisabledBtn = styled(AccountBtn)`
  width: 200px;
  height: 38px;
  margin-top: 15px;
  background: #878787;
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

  const [password, setPassword] = useState("");
  const [passwordPopOver, setPasswordPopOver] = useState(false);

  const numerialCharReg = new RegExp("^(?=.*\\d).+$");
  const upperCaseReg = new RegExp("^(?=.*[A-Z])");
  const lowercaseReg = new RegExp("^(?=.*[a-z])");
  const specialCharReg = new RegExp("^(?=.*[-+_!@#$%^&*.,?])");

  return (
    <FormContainer>
      <LeftFormContainer />
      <RightFormContainer>
        <Prompt></Prompt>
        <TitleText>Sign up to Embark</TitleText>
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

            const handlePasswordFocus = () => {
              handleFocus();
              setPasswordPopOver(true);
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
                    onFocus={handlePasswordFocus}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    onBlur={() => setPasswordPopOver(false)}
                  ></Field>
                  {passwordPopOver &&
                    (password.length <= 8 ||
                      !numerialCharReg.test(password) ||
                      !upperCaseReg.test(password) ||
                      !lowercaseReg.test(password) ||
                      !specialCharReg.test(password)) && (
                      <ErrorPrompt
                        error={passwordPopOver}
                        style={{ height: 100 }}
                      >
                        <p style={{ fontSize: "100%" }}>
                          Password Still Needs to Have:
                        </p>
                        {password.length <= 8 && (
                          <React.Fragment>
                            <p style={{ fontSize: "100%" }}>- 8+ characters</p>
                          </React.Fragment>
                        )}
                        {!numerialCharReg.test(password) && (
                          <React.Fragment>
                            <p style={{ fontSize: "100%" }}>
                              - At least one number
                            </p>
                          </React.Fragment>
                        )}
                        {!upperCaseReg.test(password) && (
                          <React.Fragment>
                            <p style={{ fontSize: "100%" }}>
                              - At least one upper case character
                            </p>
                          </React.Fragment>
                        )}
                        {!lowercaseReg.test(password) && (
                          <React.Fragment>
                            <p style={{ fontSize: "100%" }}>
                              - At least one lower case character
                            </p>
                          </React.Fragment>
                        )}
                        {!specialCharReg.test(password) && (
                          <React.Fragment>
                            <p style={{ fontSize: "100%" }}>
                              - At least one special character
                            </p>
                          </React.Fragment>
                        )}
                      </ErrorPrompt>
                    )}
                </FieldContainer>
                <ErrorPrompt error={hasError}>
                  Invalid name, email, or password
                </ErrorPrompt>

                {passwordPopOver ? (
                  <AccountDisabledBtn type="submit" disabled>
                    Create Account
                  </AccountDisabledBtn>
                ) : (
                  <AccountBtn type="submit">Create Account</AccountBtn>
                )}
              </FormWrapper>
            );
          }}
        </Formik>
      </RightFormContainer>
    </FormContainer>
  );
};
export default FormUserDetails;
