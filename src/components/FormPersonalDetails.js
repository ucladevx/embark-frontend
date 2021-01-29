import { TextField, Button } from "@material-ui/core";

import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";

import {
  LeftFormContainer,
  RightFormContainer,
  FormWrapper,
  FormContainer,
} from "../shared/Form";
import styled from "styled-components";
import { colors } from "../shared/config.js";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const HeyTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
`;

const HeySubtitile = styled.div`
  color: ${colors.gray3};
  font-size: 12px;
  margin: 20px 0;
  padding-right: 150px;
  line-height: 16px;
`;

const DoneBtn = styled(Button)`
  width: 120px;
  height: 40px;
  background: ${colors.blue1};
  font-weight: 700;
  font-size: 16px;
`;

const validateSchema = Yup.object({
  major: Yup.string().required("Major is required").max(20),
  industry: Yup.string().required(),
  year: Yup.string().required(),
});

const FormPersonalDetails = ({ user }) => {
  const history = useHistory();
  const years = ["2021", "2022", "2023", "2024"];
  const industry = ["Developer", "Design", "Marketing", "Product Mangement"];

  return (
    <FormWrapper>
      <LeftFormContainer />
      <RightFormContainer>
        <HeyTitle>
          Hey {user.firstName} {user.lastName}! <br /> Welcome to Embark
        </HeyTitle>
        <HeySubtitile>
          Before we begin, fill in your graduating year, area of study, and the
          industries or career paths you are interested in pursuing.
        </HeySubtitile>
        <Formik
          initialValues={{
            year: "",
            major: "",
            industry: "",
            linkedIn: "",
          }}
          validationSchema={validateSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={() => history.push("/landing")}
        >
          {({ errors }) => (
            <FormContainer>
              <Field
                as={TextField}
                select
                name="year"
                label="Year"
                helperText={errors.year}
                error={!!errors.year}
              >
                {years.map((y) => (
                  <MenuItem key={y} value={y} name="year">
                    {y}
                  </MenuItem>
                ))}
              </Field>
              <Field
                as={TextField}
                name="major"
                label="Major"
                helperText={errors.major}
                error={!!errors.major}
              ></Field>
              <Field
                as={TextField}
                name="industry"
                label="Interested Industries:"
                select
                error={!!errors.industry}
                helperText={errors.industry}
              >
                {industry.map((ind) => (
                  <MenuItem key={ind} value={ind} name="industry">
                    {ind}
                  </MenuItem>
                ))}
              </Field>
              <Field
                as={TextField}
                label="LinkedIn Profile: (Optional)"
                margin="normal"
                name="linkedIn"
              ></Field>
              <DoneBtn type="submit">Done</DoneBtn>
            </FormContainer>
          )}
        </Formik>
      </RightFormContainer>
    </FormWrapper>
  );
};
export default FormPersonalDetails;
