import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { ActionButton } from "../../shared/Buttons";
import { useState } from "react";

import {
  LeftFormContainer,
  RightFormContainer,
  FormWrapper,
  FormContainer,
  Prompt,
} from "../../shared/Form";
import websiteIcon from "../../images/website.svg";

import styled from "styled-components";
import { colors } from "../../shared/config.js";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { editStudentDetails } from "../../redux/actions/userActions";
import { IndustryFilters } from "../../shared/Dropdown/StyleDropdown";
import MultiDropDown from "../../shared/Dropdown/MultiDropDown";
import { useIndustry } from "../../shared/Hook";

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

const DoneBtn = styled(ActionButton)`
  width: 120px;
  height: 40px;
`;

const validateSchema = Yup.object({
  industry: Yup.string().required(),
});

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

const FormPersonalDetails = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [industries, openInd, handleIndustries, handleOpenInd] = useIndustry();

  return (
    <FormContainer>
      <LeftFormContainer />
      <RightFormContainer>
        <Prompt link={"login"}></Prompt>
        <HeyTitle>
          Hey {user.firstName}! <br /> Welcome to Embark
        </HeyTitle>
        <HeySubtitile>
          Before we begin, choose the industries or career paths that are
          relevant to your club and provide a link to your club website
        </HeySubtitile>
        <Formik
          initialValues={{
            website: "",
          }}
          validationSchema={validateSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values) => {
            const { website } = values;
            const profile = {
              tags: industries,
              website,
            };
            dispatch(editStudentDetails(profile));
            history.push("/home");
          }}
        >
          {({ errors }) => (
            <FormWrapper>
              Relavent industries to your club:
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
              <p>You can change your interested industries in your Profile.</p>
              Club Website
              <Field
                as={MajorField}
                label="website"
                margin="normal"
                name="website"
              ></Field>
              <DoneBtn type="submit">Done</DoneBtn>
            </FormWrapper>
          )}
        </Formik>
      </RightFormContainer>
    </FormContainer>
  );
};
export default FormPersonalDetails;
