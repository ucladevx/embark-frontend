import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { BoldTypography } from "../../shared/Typography";
import {IndustryFilters} from "../../shared/dropdown";
import { colors } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";
import { editStudentDetails } from "../../redux/actions/userActions";
import styled from "styled-components";
import{
  ExploreObj,
  ExploreFilter,
  NameDescription,
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

const EditClubProfile = ({ open, handleClose, currentAbout}) => {
  const classes = useStyles();
  const years = ["2021", "2022", "2023", "2024"];
  const industry = IndustryFilters;
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("")
  const [profilePicURL, setProfilePicURL] = useState("")
  const [coverPicURL, setcoverPicURL] = useState("")
  const [description, setDescription] = useState(user.description);
  const [industries, setIndustries] = useState(user.tags)
  const [website, setWebsite] = useState(user.website);
  const [about, setAbout] = useState(currentAbout)


  // Redux
  const dispatch = useDispatch();

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };  
  
  const handleIndustries = (e) => {
    setIndustries(e.target.value);
  };

  const handleWebsite = (e) => {
    setWebsite(e.target.value);
  };

  const handleAbout = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = async () => {
    const updatedProfile = {
        name,
        industries,
        description,
        profilePicURL,
        coverPicURL,
        website
    };
    dispatch(editStudentDetails(updatedProfile));
    handleClose();
  };


  return (
    <EditProfileContainer 
    open={open} 
    onClose={handleClose} 
    scroll='body'
    aria-labelledby="scroll-dialog-title"
    aria-describedby="scroll-dialog-description">
      <TitleContainer>
        <EditProfileTitle align="center" sz={"18px"}>Edit Profile</EditProfileTitle>
      </TitleContainer>
      <EditProfileContent>
          <EditProfileAvatar rounded></EditProfileAvatar>
      <ChangeAvatarLink fontColor="red" align="center">Change Profile Photo</ChangeAvatarLink>
      <TextFieldWrapper>
        <EditCoverImage src={lawn}></EditCoverImage>        
      </TextFieldWrapper>

      <ChangeAvatarLink align="center">Change Cover Photo</ChangeAvatarLink>
      <TextFieldWrapper>
        <BoldTypography  sz={"16px"}>Description:</BoldTypography>
        <DialogTextField
            value={description}
            autoFocus
            margin="dense"
            id="name"
            placeholder="Add your description"
            type="email"
            fullWidth
            multiline
            rows={2}
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleDescription}
          />  
      </TextFieldWrapper>
      
      <TextFieldWrapper>
      <BoldTypography sz={"16px"}>Relevant Industries:</BoldTypography>
            <ExploreFilter>
            <ExploreObj bgcolor={colors.red1}>
              Product Management
            </ExploreObj>
            <ExploreObj bgcolor={colors.darkyellow}>
              Product Design
            </ExploreObj>
            </ExploreFilter> 
            <FormControlC>
              <Select 
              multiple 
              disableUnderline
              value={industry} 
              onChange={handleIndustries}
              MenuProps={{
                getContentAnchorEl: null, 
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                classes: { paper: classes.menuPaper },
              }}> 
              {industry && industry.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked = {industries && industries.includes(name)} color="default"/>
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
              </Select>
            </FormControlC>
            {/* <TextField
          select
          value="Select all that apply"
          onChange={handleTags}
          InputProps={{ disableUnderline: true }}q
          SelectProps={{
            native: true,
          }}
          variant="filled"
        >
          {industry.map((name) => (
            <MenuItem key={name} value={name}>
                <Checkbox checked = {tags.includes(name)} color="default"/>
                <ListItemText primary={name} />
            </MenuItem>
          ))}
        </TextField> */}

            {/* <FormControlC>
              <InputLabel >Select all that apply</InputLabel>
              <Select 
              disableUnderline
              multiple
              value = {industry}

              // defaultValue=""
              onChange={handleTags}
              >
                <Suggested>Suggested</Suggested>

                {industry.map((name, index) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked = {false} color="default"/>
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}

              </Select>
            </FormControlC> */}
      </TextFieldWrapper>

        <TextFieldWrapper>
        <BoldTypography  sz={"16px"}>Website:</BoldTypography>
          <DialogTextField
            value={website}
            autoFocus
            margin="dense"
            id="name"
            placeholder="Copy your Website URL"
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleWebsite}
          />          
        </TextFieldWrapper>
        
        
        <TextFieldWrapper>
        <BoldTypography  sz={"16px"}>About:</BoldTypography>
          <DialogTextField
            value = {about}
            autoFocus
            margin="dense"
            id="name"
            placeholder="Add an About Section to your Page"
            type="email"
            fullWidth
            multiline
            rows = {2}
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleAbout}
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

export default EditClubProfile;
