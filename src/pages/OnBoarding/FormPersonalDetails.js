import { useState } from "react";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { ActionButton } from "../../shared/Buttons";
import { Field, Formik } from "formik";

import {
  LeftFormContainer,
  RightFormContainer,
  FormWrapper,
  FormContainer,
  Prompt,
} from "../../shared/Form";

import styled from "styled-components";
import { colors, DropdownConfigs } from "../../shared/config.js";
// import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { editStudentDetails } from "../../redux/actions/userActions";
import { CLEAR_ERRORS, SET_ERRORS } from "../../redux/types";
import SingleDropDown from "../../shared/Dropdown/SingleDropdown";

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

const MajorField = styled.input`
  width: 310px;
  height: 40px;
  background-color: #e1dfdf;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  line-height: 22px;
  padding-left: 12px;
`;

const DoneBtn = styled(ActionButton)`
  width: 120px;
  height: 40px;
`;

const FormPersonalDetails = ({ user }) => {
  const history = useHistory();
  const [year, setYear] = useState("");
  const [yearOpen, setYearOpen] = useState(false);
  const [industry, setIndustry] = useState("");
  const [industryOpen, setIndustryOpen] = useState(false);
  const years = ["2021", "2022", "2023", "2024"];
  const industries = ["Developer", "Design", "Marketing", "Product Mangement"];
  const dispatch = useDispatch();

  return (
    <FormContainer>
      <LeftFormContainer />
      <RightFormContainer>
        <Prompt link={"login"}></Prompt>
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
          onSubmit={(values) => {
            const { major, linkedIn } = values;
            if (!year || !industry || !major) {
              dispatch({ type: SET_ERRORS, payload: "Onboarding failure" });
              return;
            }
            const profile = {
              year,
              major,
              linkedIn,
              tags: [industry],
            };
            console.log(profile);
            dispatch(editStudentDetails(profile));
            history.push("/home");
          }}
        >
          {(props) => {
            const { errors, setErrors } = props;
            const handleFocus = () => {
              setErrors({});
              dispatch({ type: CLEAR_ERRORS });
            };
            return (
              <FormWrapper>
                Year:
                <SingleDropDown
                  content={years}
                  onSelect={setYear}
                  open={yearOpen}
                  onOpenClose={() => setYearOpen(!yearOpen)}
                  title={year ? year : "Select"}
                  {...DropdownConfigs.small}
                  onClick={handleFocus}
                ></SingleDropDown>
                Major:
                <Field
                  as={MajorField}
                  name="major"
                  label="Major"
                  placeholder="Enter Your Major: "
                  helperText={errors.major}
                  onFocus={handleFocus}
                  error={!!errors.major}
                ></Field>
                Interested Industries:
                <SingleDropDown
                  content={industries}
                  open={industryOpen}
                  onOpenClose={() => setIndustryOpen(!industryOpen)}
                  onSelect={setIndustry}
                  title={industry ? industry : "Select"}
                ></SingleDropDown>
                <p>You can change your interested industires in your profile</p>
                Linkedin Profile(Optional):
                <Field
                  as={MajorField}
                  label="LinkedIn Profile: (Optional)"
                  margin="normal"
                  name="linkedIn"
                  placeholder="Copy your link"
                  onFocus={handleFocus}
                ></Field>
                <DoneBtn type="submit">Done</DoneBtn>
              </FormWrapper>
            );
          }}
        </Formik>
      </RightFormContainer>
    </FormContainer>
  );
};
export default FormPersonalDetails;
