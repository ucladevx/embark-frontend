import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { BoldTypography } from "../../shared/Typography";
import { IndustryFilters } from "../../shared/dropdown";
import { colors } from "../../shared/config";
import close_window_x from "../../images/close_window_x.png";
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
  const [done, setDone] = useState("Cancel");
  const hiddenProfileInput = React.useRef(null);
  const hiddenCoverInput = React.useRef(null);

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
          {/* <BoldTypography sz={"16px"}>Description:</BoldTypography>
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
          /> */}
          <BoldTypography sz={"16px"}>Major:</BoldTypography>
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
                  // onClick={() => {
                  //   removeIndustries(name);
                  // }}
                >
                  &times; {name}
                </ExploreObj>
              ))}
          </ExploreFilter>

          {/* dropdown menu */}
          <DropDownTitle wd={"312px"} hg={"35px"} onClick={toggleOpenInd}>
            <Typography style={{ display: "inline" }}>
              Select all that apply
            </Typography>
            <img src={DropdownArrow} style={{ float: "right" }}></img>
          </DropDownTitle>
          {openInd && (
            <DropDownBox wd={"314px"} hg={"202px"} top={"122px"}>
              <DropDownContent wd={"312px"} hg={"248px"} overflow={"scroll"}>
                {industry.map((name, index) => (
                  <div
                    key={name}
                    style={{
                      paddingLeft: "19px",
                      height: "25px",
                      marginTop: "14px",
                      marginBottom: "14px",
                    }}
                  >
                    <DropDownCheckBox
                    // onClick={() => {
                    //   handleIndustries(name);
                    // }}
                    // src={
                    //   industries && industries.includes(name)
                    //     ? checked
                    //     : unchecked
                    // }
                    ></DropDownCheckBox>
                    <Typography
                      style={{
                        fontSize: "18px",
                        marginLeft: "3px",
                        padding: "0px",
                        display: "inline",
                      }}
                    >
                      {name}
                    </Typography>
                  </div>
                ))}
              </DropDownContent>

              <Finished wd={"314px"} hg={"46px"} onClick={toggleOpenInd}>
                Finished
              </Finished>
            </DropDownBox>
          )}
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
          <DoneBtn onClick={handleSubmit}>{done}</DoneBtn>
        </EditProfileDone>
      </EditProfileContent>
    </EditProfileContainer>
  );
};

export default EditClubProfile;
