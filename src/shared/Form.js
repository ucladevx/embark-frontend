import styled from "styled-components";
import { colors } from "../shared/config";
import { Form } from "formik";

export const LeftFormContainer = styled.div`
  background: ${colors.blue1};
  width: 45%;
`;

export const RightFormContainer = styled.div`
  width: 55%;
  padding: 110px 0 0 120px;
`;

export const FormWrapper = styled.div`
  font-family: Open Sans, helvetica, arial, verdana, sans-serif;
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 20px;
`;
