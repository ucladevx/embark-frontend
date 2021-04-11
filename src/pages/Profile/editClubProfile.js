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
import { IndustryFilters } from "../../shared/dropdown";
import { colors } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";
import { editStudentDetails } from "../../redux/actions/userActions";
import styled from "styled-components";
import { ExploreObj, ExploreFilter, NameDescription } from "./StyleProfile";
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
} from "./StyleEditProfile";
import lawn from "../../images/lawn.png";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

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

const EditClubProfile = ({ open, handleClose }) => {
  const classes = useStyles();
  const industry = IndustryFilters;
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [profileURL, setProfileURL] = useState({ url: user.profilePicURL });
  const [coverURL, setCoverURL] = useState({ url: user.coverPicURL });
  const [description, setDescription] = useState(user.description);
  const [industries, setIndustries] = useState(user.tags);
  const [website, setWebsite] = useState(user.website);
  const [about, setAbout] = useState(user.about);
  const hiddenProfileInput = React.useRef(null);
  const hiddenCoverInput = React.useRef(null);

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

  const handleProfileURL = (e) => {
    console.log(e.target.files[0]);
    setProfileURL({ url: URL.createObjectURL(e.target.files[0]) });
    const formData = new FormData();
    formData.append("image", e.target.files[0]); // appending file
    console.log(formData);
    axios.post(
      "http://localhost:9000/club/profile/image?pictureType=profile",
      formData,
    );
  };

  const handleCoverURL = (e) => {
    setCoverURL({ url: URL.createObjectURL(e.target.files[0]) });
    const formData = new FormData();
    formData.append("image", e.target.files[0]); // appending file
    console.log(formData);

    axios.post(
      "http://localhost:9000/club/profile/image?pictureType=cover",
      formData,
    );
  };

  const handleSubmit = async () => {
    const updatedProfile = {
      name,
      industries,
      description,
      website,
    };
    dispatch(editStudentDetails(updatedProfile));
    handleClose();
  };

  return (
    <EditProfileContainer
      open={open}
      onClose={handleClose}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <TitleContainer>
        <EditProfileTitle align="center" sz={"18px"}>
          Edit Profile
        </EditProfileTitle>
      </TitleContainer>
      <EditProfileContent>

      {/* Avatar */}
      <EditProfileAvatar
          src={profileURL.url ? profileURL.url : user.profilePicURL}
          rounded="true"
        ></EditProfileAvatar>
        <ChangeAvatarLink
          fontColor="red"
          align="center"
          onClick={() => {
            hiddenProfileInput.current.click();
          }}
        >
          Change Profile Picture
        </ChangeAvatarLink>
        <input
          type="file"
          ref={hiddenProfileInput}
          style={{ display: "none" }}
          onChange={handleProfileURL}
        />

        {/* Cover Picture */}
        <TextFieldWrapper>
          <EditCoverImage
            src={coverURL.url ? coverURL.url : user.coverPicURL}
          ></EditCoverImage>
        </TextFieldWrapper>
        <ChangeAvatarLink
          align="center"
          onClick={() => {
            hiddenCoverInput.current.click();
          }}
        >
          Change Cover Photo
        </ChangeAvatarLink>
        <input
          type="file"
          ref={hiddenCoverInput}
          style={{ display: "none" }}
          onChange={handleCoverURL}
        />

        {/* Description */}
        <TextFieldWrapper>
          <BoldTypography sz={"16px"}>Description:</BoldTypography>
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

        {/* Relevant Industries */}
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
          
          {/* Website */}
        <TextFieldWrapper>
          <BoldTypography sz={"16px"}>Website:</BoldTypography>
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

          {/* About */}
        <TextFieldWrapper>
          <BoldTypography sz={"16px"}>About:</BoldTypography>
          <DialogTextField
            value={about}
            autoFocus
            margin="dense"
            id="name"
            placeholder="Add an About Section to your Page"
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
            onChange={handleAbout}
          />
        </TextFieldWrapper>

            {/* Done Button */}
        <EditProfileDone>
          <DoneBtn onClick={handleSubmit}>Done</DoneBtn>
        </EditProfileDone>
      </EditProfileContent>
    </EditProfileContainer>
  );
};

export default EditClubProfile;
