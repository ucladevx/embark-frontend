import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core";
import { BoldTypography } from "../../shared/Typography";
import { IndustryFilters } from "../../shared/dropdown";
import { colors } from "../../shared/config";
import close_window_x from "../../images/close_window_x.png";
import checked from "../../images/checked_24px.png";
import unchecked from "../../images/unchecked_24px.png";
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
import {
  DropDownBox,
  DropDownTitle,
  DropDownContent,
  DropDownCheckBox,
  Finished,
} from "../../shared/dropdown";
import DropdownArrow from "../../images/DropdownArrow.png";
import lawn from "../../images/lawn.png";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { ActionButton } from "../../shared/Buttons";
import MultiDropDown from "../../shared/Dropdown/MultiDropDown";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    "&:hover": {
      backgroundColor: "transparent",
    },
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

  //check if there is any changes
  const saveClub = () => {
    return (
      (user.about === about || about === "") &&
      (user.description === description || description === "") &&
      JSON.stringify(user.tags.sort()) === JSON.stringify(industries.sort()) &&
      (user.website === website || website === "")
    );
  };

  //dropdown toggle
  const [openInd, setOpenInd] = useState(false);
  const toggleOpenInd = () => {
    setOpenInd(!openInd);
  };

  // Redux
  const dispatch = useDispatch();

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const removeIndustries = (name) => {
    const newIndustries = industries.filter((ind) => ind !== name);
    setIndustries(newIndustries);
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

  const handleWebsite = (e) => {
    setWebsite(e.target.value);
  };

  const handleAbout = (e) => {
    setAbout(e.target.value);
  };

  const handleClubProfileURL = (e) => {
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

  const handleClubCoverURL = (e) => {
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
    if (name && name.length > 100) {
      alert("Name is too long! Please limit to <100 characters");
      return;
    }
    if (description && description.length > 10000) {
      alert("Description is too long! Please limit to <10000 characters");
      return;
    }
    if (website && website.length > 200) {
      alert("Website link is too long! Please limit to <200 characters");
      return;
    }
    const updatedProfile = {
      name,
      industries,
      description,
      website,
    };
    //is there a rdux like this for club?
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
          <img
            src={close_window_x}
            style={{ float: "right" }}
            onClick={handleClose}
          ></img>
        </EditProfileTitle>
        <IconButton
          className={classes.button}
          style={{ padding: "0" }}
          onClick={handleClose}
        >
          <img src={close_window_x}></img>
        </IconButton>
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
          onChange={handleClubProfileURL}
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
          onChange={handleClubCoverURL}
        />

        {/* Description */}
        <TextFieldWrapper>
          <BoldTypography sz={"16px"}>Description:</BoldTypography>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder={"Add your description"}
            type="email"
            fullWidth
            multiline
            rows={3}
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
                padding: "8px 16px",
              },
            }}
            style={{
              padding: "10px 2px",
              marginTop: "0px",
              borderRadius: "10px",
              backgroundColor: "#EDEDED",
            }}
            onChange={handleDescription}
          />
        </TextFieldWrapper>

        {/* Relevant Industries */}
        <TextFieldWrapper>
          <BoldTypography sz={"16px"}>Relevant Industries:</BoldTypography>

          {/* Industry filters */}
          <ExploreFilter>
            {industry &&
              industry.map((name) => (
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
                padding: "8px 16px",
              },
            }}
            style={{
              padding: "0px",
              marginTop: "0px",
              borderRadius: "10px",
              backgroundColor: "#EDEDED",
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
            placeholder={"Add an About Section to your Page"}
            type="email"
            fullWidth
            multiline
            rows={3}
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
                padding: "8px 16px",
              },
            }}
            style={{
              padding: "10px 2px",
              marginTop: "0px",
              borderRadius: "10px",
              backgroundColor: "#EDEDED",
            }}
            onChange={handleAbout}
          />
        </TextFieldWrapper>

        {/* Done Button */}
        <EditProfileDone>
          <DoneBtn
            onClick={handleSubmit}
            bgcolor={saveClub() ? colors.gray : "#5473bb"}
          >
            Save
          </DoneBtn>
        </EditProfileDone>
      </EditProfileContent>
    </EditProfileContainer>
  );
};

export default EditClubProfile;
