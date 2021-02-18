import { TextField } from "@material-ui/core";
import styled from "styled-components";
import TypeBox from "../../shared/TypeBox";
import { OrSeperator } from "../../shared/Separators";
import {
  LeftFormContainer,
  RightFormContainer,
  FormContainer,
  FormWrapper,
  Prompt,
} from "../../shared/Form";
import { ActionButton } from "../../shared/Buttons";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { signupStudent } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { header1, header4 } from "../../shared/config";
import { GoogleBtn, LinkedInBtn } from "./AuthButtons";
import GoogleIcon from "../../images/google.svg";
import LinkedInIcon from "../../images/linkedin.svg";

const SignUpTitle = styled.div`
  ${header1};
  margin-bottom: 15px;
`;

const NameContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 22em;
`;

const FieldName = styled.p`
  ${header4}
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 22em;
`;

const AuthBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 30px;
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
  const dispatch = useDispatch();
  return (
    <FormContainer>
      <LeftFormContainer />
      <RightFormContainer>
        <Prompt link={"login"}></Prompt>
        <SignUpTitle>Sign up to Embark</SignUpTitle>
        <AuthBtnWrapper>
          <GoogleBtn>
            <img src={GoogleIcon} alt="google"></img>
            <span style={{ marginLeft: "5px" }}>Sign up with Google</span>
          </GoogleBtn>
          <LinkedInBtn>
            <img src={LinkedInIcon} alt="linkedin"></img>Sign up with Linkedin
          </LinkedInBtn>
        </AuthBtnWrapper>
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
            const { email, password } = values;
            const postUser = {
              name,
              email,
              password,
              userType: "student",
            };
            dispatch(signupStudent(postUser));
            handleUser(values);
            handleStep(1);
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors }) => (
            <FormWrapper>
              <NameContainer>
                <FieldContainer>
                  <FieldName>First Name</FieldName>
                  <Field
                    name="firstName"
                    as={TypeBox}
                    margin="normal"
                    helperText={errors.firstName}
                    error={!!errors.firstName}
                  ></Field>
                </FieldContainer>
                <FieldContainer>
                  <FieldName>Last Name</FieldName>
                  <Field
                    name="lastName"
                    as={TypeBox}
                    margin="normal"
                    helperText={errors.lastName}
                    error={!!errors.lastName}
                  ></Field>
                </FieldContainer>
              </NameContainer>
              <FieldContainer>
                <FieldName>Email</FieldName>
                <Field
                  name="email"
                  as={TypeBox}
                  margin="normal"
                  helperText={errors.email}
                  error={!!errors.email}
                ></Field>
              </FieldContainer>
              <FieldContainer>
                <FieldName>Password</FieldName>
                <Field
                  name="password"
                  as={TypeBox}
                  margin="normal"
                  helperText={errors.password}
                  error={!!errors.password}
                  type="password"
                  placeholder="8+ characters"
                ></Field>
              </FieldContainer>
              <AccountBtn type="submit">Create Account</AccountBtn>
            </FormWrapper>
          )}
        </Formik>
      </RightFormContainer>
    </FormContainer>
  );
};
export default FormUserDetails;
