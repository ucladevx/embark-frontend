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
import { colors } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";
import { editStudentDetails } from "../../redux/actions/userActions";
import styled from "styled-components";
import{
  ExploreObj,
  ExploreFilter,
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
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const EditClubProfile = ({ open, handleClose, EditAbout, EditWebsite, EditDescription, currentAbout, currentWebsite, currentDescription }) => {
  const years = ["2021", "2022", "2023", "2024"];
  const industry = ["Business", "Computer Science", "Marketing", "Product Design", "Product Management", "Other"];

  const club = useSelector((state) => state.club);
  const [name, setName] = useState("")
  const [tags, setTags] = useState("")
  const [profilePicURL, setProfilePicURL] = useState("")
  const [coverPicURL, setcoverPicURL] = useState("")
  const [description, setDescription] = useState(currentDescription);
  //const [tags, setTags] = useState(user.tags);
  const [industries, setIndustries] = useState([]);  
  const [website, setWebsite] = useState(currentWebsite);
  const [about, setAbout] = useState(currentAbout)


  // Redux
  const dispatch = useDispatch();

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };  
  
  const handleIndustries = (e) => {
    let curIndustries = industries.slice();
    curIndustries.push(e.target.value)
    setIndustries(curIndustries)
  };

  const handleWebsite = (e) => {
    setWebsite(e.target.value);
  };

  const handleAbout = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = async () => {
    EditAbout(about);
    EditWebsite(website);
    EditDescription(description);

    const updatedProfile = {
        name,
        tags,
        description,
        profilePicURL,
        coverPicURL,
        website
    };
    dispatch(editStudentDetails(updatedProfile));
    handleClose();
  };

  return (
    <EditProfileContainer open={open} onClose={handleClose}>
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

            {/* <TextField
          select
          value="Select all that apply"
          onChange={handleIndustries}
          InputProps={{ disableUnderline: true }}
          SelectProps={{
            native: true,
          }}
          variant="filled"
        >
          {industry.map((name) => (
            <MenuItem key={name} value={name}>
                <Checkbox checked = {industries.includes(name)} color="default"/>
                <ListItemText primary={name} />
            </MenuItem>
          ))}
        </TextField> */}



            <FormControlC>
              <InputLabel >Select all that apply</InputLabel>
              <Select 
              disableUnderline
              // defaultValue=""
              onChange={handleIndustries}
              >
                {/* <Suggested>Suggested</Suggested> */}
                {industry.map((name, index) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked = {industries.includes(name)} color="default"/>
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}

              </Select>
            </FormControlC>  
      </TextFieldWrapper>

        <TextFieldWrapper>
        <BoldTypography  sz={"16px"}>Website:</BoldTypography>
          <DialogTextField
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
      </EditProfileContent>

      <EditProfileDone>
        <DoneBtn onClick={handleSubmit} >
          Done
        </DoneBtn>
      </EditProfileDone>

    </EditProfileContainer>
  );
};

export default EditClubProfile;