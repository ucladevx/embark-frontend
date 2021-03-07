import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  Input,
} from "@material-ui/core";
import { BoldTypography } from "../../shared/Typography";
import { colors } from "../../shared/config";
import {IndustryFilters} from "../../shared/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { editStudentDetails } from "../../redux/actions/userActions";
import styled from "styled-components";
import{
  ExploreObj,
  ExploreFilter,
  LinkedInIconC,
} from "./StyleProfile";
import {
  EditProfileContainer,
  EditProfileAvatar,
  ChangeAvatarLink,
  TitleContainer,
  EditProfileTitle,
  EditCoverImage,
  EditProfileContent,
  EditProfileDone,
  FormControlC,
  Suggested,
  DialogTextField,
  TextFieldWrapper,
  DoneBtn,
} from "./StyleEditProfile"
import lawn from "../../images/lawn.png";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  menuPaper: {
    maxHeight: 300
  }
}));

const EditProfile = ({ open, handleClose, allTags}) => {
  const classes = useStyles();
  const years = ["2021", "2022", "2023", "2024"];
  const industry = IndustryFilters;
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [major, setMajor] = useState(user.major)
  const [year, setYear] = useState(user.year)
  const [industries, setIndustries] = useState(allTags);
  const [bio, setBio] = useState(user.bio);
  const [linkedin, setLinkedin] = useState(user.linkedIn); 

  // Redux
  const dispatch = useDispatch();
  const handleYear = (e) => {
    setYear(e.target.value);
  };
  const handleMajor = (e) => {
    setMajor(e.target.value);
  };


  const addIndustries = (e) => {
    setIndustries(e.target.value);
  };

  const handlelinkedIn = (e) => {
    setLinkedin(e.target.value);
  };

  const handleSubmit = async () => {
    //create an array of tags (deleted ones have rm before it)
    let updatedTags = [];
    industry.forEach(function(ind){
      if(industries.includes(ind)){
        updatedTags.push(ind);
      }else{
        updatedTags.push("rm"+ind);
      }
    })
    const updatedProfile = {
      name, 
      major, 
      year, 
      tags: updatedTags,
      bio, 
      linkedin,
    };
    dispatch(editStudentDetails(updatedProfile));
    handleClose();
  };

  return (
    <EditProfileContainer 
    scroll={'body'} 
    open={open} 
    onClose={handleClose}>
      <TitleContainer id="scroll-dialog-title">
        <EditProfileTitle align="center" sz={"18px"}>Edit Profile</EditProfileTitle>
      </TitleContainer>

      <EditProfileContent id="scroll-dialog-description">
          <EditProfileAvatar rounded="true"></EditProfileAvatar>
      <ChangeAvatarLink fontColor="red" align="center">Change Profile Picture</ChangeAvatarLink>

      <TextFieldWrapper>
        <EditCoverImage src={lawn}></EditCoverImage>        
      </TextFieldWrapper>
      <ChangeAvatarLink align="center">Change Cover Photo</ChangeAvatarLink>
      <TextFieldWrapper>

        <BoldTypography  sz={"18px"}>Year:</BoldTypography>
        <FormControlC>
          <Select disableUnderline value={year} onChange={handleYear}>
          {years.map((y) => (
              <MenuItem key={y} value={y} name="year">
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControlC>        
      </TextFieldWrapper>
        <TextFieldWrapper>

        <BoldTypography  sz={"18px"}>Major:</BoldTypography>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder={user.major}
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleMajor}
          />          
        </TextFieldWrapper>
        
        <TextFieldWrapper>
        <BoldTypography  sz={"18px"}>Interested Industries:</BoldTypography>
          <ExploreFilter>
          {console.log("print user tags", user.tags)}
          {industries && industries.map((name) => (
            <ExploreObj key = {name} bgcolor={colors.gray1}>
                &times; {name}
            </ExploreObj>           
                  ))}
          </ExploreFilter>
            <FormControlC>
              <Select 
              multiple 
              disableUnderline
              value={industries? industries: allTags} 
              onChange={addIndustries}
              MenuProps={{
                getContentAnchorEl: null, 
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                classes: { paper: classes.menuPaper },
              }}> 
              {industry && industry.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked = {industries && industries.includes(name)} color="default"/>
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
              </Select>
            </FormControlC>
        </TextFieldWrapper>
          

        <TextFieldWrapper>
        <BoldTypography  sz={"18px"}>LinkedIn Profile (Optional):</BoldTypography>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder= {linkedin? linkedin :"Copy your Profile Link"}
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handlelinkedIn}
          />          
        </TextFieldWrapper>

      <EditProfileDone>
        <DoneBtn onClick={handleSubmit} >
          Done
        </DoneBtn>
      </EditProfileDone>

      </EditProfileContent>


    </EditProfileContainer>
  );
};

export default EditProfile;