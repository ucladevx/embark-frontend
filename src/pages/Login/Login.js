import { Field, Formik } from "formik";
import { loginUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import styled from "styled-components";
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
import TypeBox from "../../shared/TypeBox";
import AuthButtons from "../../shared/AuthButtons";
import { ActionButton } from "../../shared/Buttons";
import { CLEAR_ERRORS } from "../../redux/types";

const SignUpTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
`;

const AccountBtn = styled(ActionButton)`
  width: 200px;
  height: 38px;
  margin-top: 15px;
`;
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const Login = () => {
  const back_end_errors = useSelector((state) => state.ui.errors);
  const dispatch = useDispatch();
  let history = useHistory();
  return (
    <FormContainer>
      <LeftFormContainer />
      <RightFormContainer>
        <Prompt link={"signup"}></Prompt>
        <SignUpTitle>Log in to Embark</SignUpTitle>
        <AuthButtons />
        <OrSeperator />
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            const { email, password } = values;
            const oldUser = {
              email,
              password,
            };
            dispatch(loginUser(oldUser, history));
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, setErrors }) => (
            <FormWrapper>
              <FieldContainer>
                <Field
                  name="email"
                  placeholder="Email"
                  as={TypeBox}
                  margin="normal"
                  error={!!errors.password || !!errors.email}
                  onFocus={() => {
                    setErrors({});
                    dispatch({ type: CLEAR_ERRORS });
                  }}
                ></Field>
              </FieldContainer>
              <FieldContainer>
                <Field
                  name="password"
                  placeholder="Password"
                  as={TypeBox}
                  margin="normal"
                  error={!!errors.password || !!errors.email}
                  type="password"
                  onFocus={() => {
                    setErrors({});
                    dispatch({ type: CLEAR_ERRORS });
                  }}
                ></Field>
              </FieldContainer>
              <ErrorPrompt
                error={!!back_end_errors || !!errors.password || !!errors.email}
              >
                Invliad email or password
              </ErrorPrompt>
              <AccountBtn type="submit">Log in</AccountBtn>
            </FormWrapper>
          )}
        </Formik>
      </RightFormContainer>
    </FormContainer>
  );
};

export default Login;
