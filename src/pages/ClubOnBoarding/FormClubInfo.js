import React, { useState } from "react";
import { Select,
  Checkbox,
  ListItemText, } from "@material-ui/core";
import TypeBox from "../../shared/TypeBox";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { ActionButton } from "../../shared/Buttons";
import { header4 } from "../../shared/config";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  FormControlC,
  TextFieldWrapper,
} from "./StyleEditProfile";

import {
  LeftFormContainer,
  RightFormContainer,
  FormWrapper,
  FormContainer,
} from "../../shared/Form";

import { BoldTypography } from "../../shared/Typography";
import styled from "styled-components";
import { colors } from "../../shared/config.js";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { editStudentDetails } from "../../redux/actions/userActions";
import { IndustryFilters } from "../../shared/dropdown";

import { ExploreObj, ExploreFilter, NameDescription } from "./StyleProfile";

const industry = IndustryFilters;

const EditClubProfile = ({ open, handleClose, currentAbout }) => {
const [industries, setIndustries] = useState(user.tags);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 300,
  },
}));

const classes = useStyles();

const user = useSelector((state) => state.user);

const handleIndustries = (e) => {
  setIndustries(e.target.value);
};


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
  font-weight: normal;
`;

const FieldSubtitile = styled.p`
  color: ${colors.gray3};
  font-size: 10px;
  line-height: 16px;
  font-weight: normal;
`;

const DoneBtn = styled(ActionButton)`
  width: 120px;
  height: 40px;
`;

const FieldName = styled.p`
  ${header4}
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 380px;
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
  const dispatch = useDispatch();

dispatch(editStudentDetails(updatedProfile));
  handleClose();
};

  return (
    <FormContainer>
      <LeftFormContainer />
      <RightFormContainer>
        <HeyTitle>
          Hey {user.clubName}! <br /> Welcome to Embark
        </HeyTitle>
        <HeySubtitile>
          Before we begin, choose the industries or career paths that are relevant to you club and provide a link to you club website.
        </HeySubtitile>
        <Formik
          initialValues={{
            industries: "",
            website: "",
          }}
          validationSchema={validateSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values) => {
            const { industries, website } = values;
            const profile = {
              tags: [industry],
              website
            };
            dispatch(editStudentDetails(profile));
            history.push("/landing");
          }}
        >
          {({ errors }) => (
            <FormWrapper>
              
              <TextFieldWrapper>
          <BoldTypography sz={"16px"}>Relevant Industries:</BoldTypography>
          <ExploreFilter>
            <ExploreObj bgcolor={colors.red1}>Product Management</ExploreObj>
            <ExploreObj bgcolor={colors.darkyellow}>Product Design</ExploreObj>
          </ExploreFilter>
          <FormControlC>
            <Select
              multiple
              disableUnderline
              value={user.tags}
              onChange={handleIndustries}
              MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                classes: { paper: classes.menuPaper },
              }}
            >
              {industry &&
                industry.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      checked={industries && industries.includes(name)}
                      color="default"
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControlC>
        </TextFieldWrapper>
        
              <FieldContainer> <FieldName>Club Website: </FieldName>

              <Field
                as={TypeBox}
                select
                placeholder="Copy your club website"
                margin="normal"
                name="linkedIn"
              ></Field>
              </FieldContainer>
              <DoneBtn type="submit">Done</DoneBtn>
            </FormWrapper>

            
          )}
        </Formik>
      </RightFormContainer>
    </FormContainer>
  );
};
export default FormPersonalDetails;
