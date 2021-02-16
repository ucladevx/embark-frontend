import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  Divider,
  InputAdornment,
} from "@material-ui/core";
import { BoldTypography } from "../../shared/Typography";
import { colors } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import{
  ChangeAvatarLink,
  CoverImage,
  HeaderImage,
  ExploreObj,
  ExploreFilter,
  EditProfileAvatar,
} from "./StyleProfile";
import {
  EditProfileContainer,
  TitleContainer,
  EditProfileTitle,
  EditProfileContent,
  EditProfileDone,
  NewPostInfo,
  NewPostUser,
  FormControlC,
  Suggested,
  DialogTextField,
  TextFieldWrapper,
  PostBtn,
} from "./StyleEditProfile"
import lawn from "../../images/lawn.png";
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const EditProfile = ({ open, handleClose }) => {
  const [industry, setIndustry] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleIndustry = (e) => {
    setIndustry(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    const post = {
      title,
      body: description,
      tags: [industry],
    };
    //dispatch(newPost(post));
    handleClose();
  };

  return (
    <EditProfileContainer open={open} onClose={handleClose}>
      <TitleContainer>
        <EditProfileTitle align="center" sz={"18px"}>Edit Profile</EditProfileTitle>
      </TitleContainer>

      <EditProfileContent>
      <TextFieldWrapper>
          <EditProfileAvatar></EditProfileAvatar>
      </TextFieldWrapper>

      <ChangeAvatarLink fontColor="red" align="center">Change Profile Picture</ChangeAvatarLink>
      {/* <HeaderImage src={lawn}></HeaderImage> */}
      <TextFieldWrapper>
      <CoverImage src={lawn}></CoverImage>        
      </TextFieldWrapper>

      <ChangeAvatarLink align="center">Change Cover Photo</ChangeAvatarLink>

        <TextFieldWrapper>
        <BoldTypography  sz={"18px"}>Major:</BoldTypography>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Cognitive Science"
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleTitle}
          />          
        </TextFieldWrapper>
        
        <TextFieldWrapper>
        <BoldTypography  sz={"18px"}>Interested Industries:</BoldTypography>

        <ExploreFilter>
        <ExploreObj bgcolor={colors.red1}>
          &times; Product Management
        </ExploreObj>
        <ExploreObj bgcolor={colors.darkyellow}>
          &times; Product Design
        </ExploreObj>
      </ExploreFilter>

        <NewPostInfo>
          <NewPostUser>
            <BoldTypography sz={"16px"}>{user.name}</BoldTypography>
            <FormControlC>
              <InputLabel>Select all that apply</InputLabel>
              <Select value={industry} onChange={handleIndustry}>
                <Suggested>Suggested</Suggested>
                <MenuItem value={"Product Design"}>Product Design</MenuItem>
                <MenuItem value={"Product Management"}>
                  Product Management
                </MenuItem>
                <Divider />
                <MenuItem value={"Business"}>Business</MenuItem>
                <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
              </Select>
            </FormControlC>

          </NewPostUser>
        </NewPostInfo>
        </TextFieldWrapper>
          

        <TextFieldWrapper>
        <BoldTypography  sz={"18px"}>LinkedIn Profile: (Optional):</BoldTypography>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Copy your Profile Link"
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleTitle}
          />          
        </TextFieldWrapper>
      </EditProfileContent>

      <EditProfileDone>
        <PostBtn onClick={handleSubmit} >
          Done
        </PostBtn>
      </EditProfileDone>

    </EditProfileContainer>
  );
};

export default EditProfile;
