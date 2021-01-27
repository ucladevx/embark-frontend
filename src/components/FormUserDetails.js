import { TextField, Button } from "@material-ui/core";
import GoogleButton from "react-google-button";
import styled from "styled-components";
import { colors } from "../shared/config";
import OrSeperator from "./OrSeperator";
import { useDispatch } from "react-redux";
import { registerNextStep } from "../redux/actions/dataActions";
import {
  LeftFormContainer,
  RightFormContainer,
  FormWrapper,
  FormContainer,
} from "../shared/Form";
import { Field, Formik } from "formik";
import * as Yup from "yup";

const SignUpTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
`;

const NameContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const AccountBtn = styled(Button)`
  width: 200px;
  height: 38px;
  background: ${colors.blue1};
  font-weight: 700;
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
  return (
    <FormWrapper>
      <LeftFormContainer />
      <RightFormContainer>
        <SignUpTitle>Sign up to Embark</SignUpTitle>
        <div style={{ marginBottom: "40px" }}>
          <GoogleButton
            onClick={() => {
              console.log("Google button clicked");
            }}
          />
        </div>
        <OrSeperator />
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            handleUser(values);
            handleStep(1);
            actions.setSubmitting(false);
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, isSubmitting }) => (
            <FormContainer>
              <NameContainer>
                <Field
                  name="firstName"
                  as={TextField}
                  placeholder="First Name"
                  margin="normal"
                  helperText={errors.firstName}
                  error={!!errors.firstName}
                ></Field>
                <Field
                  name="lastName"
                  as={TextField}
                  placeholder="Last Name"
                  margin="normal"
                  helperText={errors.lastName}
                  error={!!errors.lastName}
                ></Field>
              </NameContainer>
              <Field
                name="email"
                placeholder="Email"
                as={TextField}
                margin="normal"
                helperText={errors.email}
                error={!!errors.email}
              ></Field>
              <Field
                name="password"
                placeholder="Password"
                as={TextField}
                margin="normal"
                helperText={errors.password}
                error={!!errors.password}
                type="password"
              ></Field>
              <AccountBtn type="submit" disabled={isSubmitting}>
                Create Account
              </AccountBtn>
            </FormContainer>
          )}
        </Formik>
      </RightFormContainer>
    </FormWrapper>
  );
};
export default FormUserDetails;
