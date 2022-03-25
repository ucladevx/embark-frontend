import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { editStudentDetails } from "../../redux/actions/userActions";
import { CLEAR_ERRORS, SET_ERRORS } from "../../redux/types";
import SingleDropDown from "../../shared/Dropdown/SingleDropdown";
import MultiDropDown from "../../shared/Dropdown/MultiDropDown";
import { useIndustry } from "../../shared/Hook";
import { IndustryFilters } from "../../shared/Dropdown/StyleDropdown";

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

// gets the next 4 years from now (to calculate the set of possible grad years)
const getPossibleGraduatingYears = () => {
  const d = new Date();
  let year = d.getFullYear();
  let grad = [];
  for (let i = 0; i < 4; i++) {
    grad.push(String(i + year));
  }
  return grad;
};

const FormPersonalDetails = ({ user }) => {
  const history = useHistory();
  const [year, setYear] = useState("");
  const [yearOpen, setYearOpen] = useState(false);
  const grad_years = getPossibleGraduatingYears();
  //console.log(grad_years);
  const years = grad_years;
  const dispatch = useDispatch();
  const [industries, openInd, handleIndustries, handleOpenInd] = useIndustry();

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
            if (!year || !industries || !major) {
              dispatch({ type: SET_ERRORS, payload: "Onboarding failure" });
              return;
            }
            const profile = {
              year,
              major,
              linkedIn,
              tags: industries,
            };
            //console.log(profile);
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
                <MultiDropDown
                  onOpenClose={handleOpenInd}
                  onSelect={handleIndustries}
                  options={IndustryFilters}
                  selectedOptions={industries}
                  open={openInd}
                  title="Select all that apply"
                  ttwd="312px"
                  tthg="35px"
                  bwd="314px"
                  bhg="202px"
                  cef="312px"
                  chg="248px"
                  fwd="314px"
                  fhg="46px"
                ></MultiDropDown>
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
