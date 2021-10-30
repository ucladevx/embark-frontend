import styled from "styled-components";
import TypeBox from "../../shared/TypeBox";
import React, { useState, useMemo } from "react";
import {
  LeftFormContainer,
  RightFormContainer,
  FormContainer,
  FormWrapper,
  FieldContainer,
  ErrorPrompt,
} from "../../shared/Form";
import { BoldTypography } from "../../shared/Typography";
import { Typography } from "@material-ui/core";
import { ActionButton } from "../../shared/Buttons";
import { Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { header4 } from "../../shared/config";
import { CLEAR_ERRORS } from "../../redux/types";
import { TitleText } from "../../shared/Text/TitleText";

import { colors } from "../../shared/config.js";
import { IndustryFilters } from "../../shared/Dropdown/StyleDropdown";
import MultiDropDown from "../../shared/Dropdown/MultiDropDown";
import { LinkedinAdornment } from "../../shared/LinkedinAdornment";

const PromptContainer = styled.div`
  font-size: 14px;
  position: absolute;
  top: 5vh;
  right: 4vw;
`;

const HeySubtitile = styled.div`
  color: ${colors.gray3};
  font-size: 12px;
  margin: 0px 0;
  padding-right: 150px;
  line-height: 16px;
`;

const SmallSubtitile = styled.div`
  color: ${colors.gray3};
  font-size: 10px;
  margin: 5px 0;
  padding-right: 50px;
  line-height: 12px;
`;

const DoneBtn = styled(ActionButton)`
  width: 120px;
  height: 40px;
`;

const FieldName = styled.p`
  ${header4}
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 4em;
  position: relative;
`;

const ExploreObj = styled(Typography)`
  height: 26px;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => (props.textColor ? props.textColor : colors.black)};
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 8px;
  font-size: 14px;
  margin: 5px;
`;

const ExploreFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  width: 448px;
`;

const Prompt = () => {
  return (
    <PromptContainer>
      Already a member? <a href="/login">Sign in</a>
      <br />
      <a href="/">Sign up as a student</a>
    </PromptContainer>
  );
};

const FormPersonalDetails = ({ handleUser, handleStep }) => {
  const backend_errors = useSelector((state) => state.ui.errors);
  const dispatch = useDispatch();
  const industry = useMemo(() => IndustryFilters, []);
  const user = useSelector((state) => state.user);
  const [industries, setIndustries] = useState(user.tags);
  const [openInd, setOpenInd] = useState(false);

  const toggleOpenInd = () => {
    setOpenInd(!openInd);
  };

  const handleIndustries = (name) => {
    if (industries && industries.includes(name)) {
      const newIndustries = industries.filter((ind) => ind !== name);
      setIndustries(newIndustries);
    } else {
      const newIndustries = [...industries, name];
      setIndustries(newIndustries);
    }
  };

  const removeIndustries = (name) => {
    const newIndustries = industries.filter((ind) => ind !== name);
    setIndustries(newIndustries);
  };

  return (
    <FormContainer>
      <LeftFormContainer />
      <RightFormContainer>
        <Prompt link={"/"}></Prompt>
        <TitleText>
          Hey Club Name! <br /> Welcome to Embark
        </TitleText>
        <HeySubtitile>
          Before we begin, choose the industries or career paths that are
          relevant to your club and provide a link to your club website
        </HeySubtitile>
        <Formik
          initialValues={{ website: "" }}
          onSubmit={(values) => {}}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(props) => {
            const { errors, setErrors } = props;
            const hasError = !!backend_errors || !!errors.website;
            const handleFocus = () => {
              setErrors({});
              dispatch({ type: CLEAR_ERRORS });
            };
            return (
              <FormWrapper>
                <TextFieldWrapper>
                  <BoldTypography sz={"18px"}>
                    Relavent industries to your club:
                  </BoldTypography>
                  <ExploreFilter>
                    {industries &&
                      industries.map((name) => (
                        <ExploreObj
                          key={name}
                          bgcolor={colors.gray}
                          onClick={() => {
                            removeIndustries(name);
                          }}
                        >
                          &times; {name}
                        </ExploreObj>
                      ))}
                  </ExploreFilter>

                  {/* dropdown menu */}
                  <MultiDropDown
                    onOpenClose={toggleOpenInd}
                    onSelect={handleIndustries}
                    options={industry}
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
                  <SmallSubtitile>
                    You can change your interested industries in your Profile.
                  </SmallSubtitile>
                </TextFieldWrapper>
                <FieldContainer>
                  <FieldName>Club Website: </FieldName>
                  <Field
                    name="website"
                    as={TypeBox}
                    margin="normal"
                    error={hasError}
                    type="password"
                    placeholder="Copy your club website"
                    InputProps={{
                      startAdornment: <LinkedinAdornment />,
                      disableUnderline: true,
                      style: {
                        fontSize: 16,
                        fontWeight: 600,
                        padding: "8px 16px",
                      },
                    }}
                    onFocus={handleFocus}
                  ></Field>
                </FieldContainer>
                <ErrorPrompt error={hasError}>Invalid Website!</ErrorPrompt>
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
