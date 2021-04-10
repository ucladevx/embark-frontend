import React, { useState, useEffect } from "react";
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
import { IndustryFilters } from "../../shared/dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  editStudentDetails,
  uploadImage,
} from "../../redux/actions/userActions";
import styled from "styled-components";
import { ExploreObj, ExploreFilter, LinkedInIconC } from "./StyleProfile";
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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import ImageUploader from 'react-images-upload';

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

const EditProfile = ({ open, user, handleClose, allTags }) => {
  const classes = useStyles();
  const years = ["2021", "2022", "2023", "2024"];
  const industry = IndustryFilters;
  //const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [major, setMajor] = useState(user.major);
  const [year, setYear] = useState(user.year);
  const [industries, setIndustries] = useState(allTags);
  const [bio, setBio] = useState(user.bio);
  const [linkedin, setLinkedin] = useState(user.linkedIn);
  const [profileURL, setProfileURL] = useState({ url: user.profilePicURL });
  const [coverURL, setCoverURL] = useState({ url: user.coverPicURL });
  const hiddenProfileInput = React.useRef(null);
  const hiddenCoverInput = React.useRef(null);

  useEffect(()=>{
    console.log("useEffect")
    setYear(user.year)
    setMajor(user.major)
    setIndustries(user.tags)

    return function cleanUp(){
      console.log("clean it up")
    }
  }, [])
  // Redux
  const dispatch = useDispatch();

  const handleYear = (e) => {
    setYear(e.target.value);
  };
  const handleMajor = (e) => {
    setMajor(e.target.value);
  };

  const addIndustries = (e) => {
    console.log("change industries to ", e.target.value)
    setIndustries(e.target.value);
  };

  const handlelinkedIn = (e) => {
    setLinkedin(e.target.value);
    console.log(linkedin);
  };

  const handleProfileURL = (e) => {
    setProfileURL({ url: URL.createObjectURL(e.target.files[0]) });
    console.log("changed profileURL=", URL.createObjectURL(e.target.files[0]));
    const formData = new FormData();
    formData.append("image", e.target.files[0]); // appending file
    axios.post(
      "http://localhost:9000/student/profile/image?pictureType=profile",
      formData,
    );
  };

  const handleCoverURL = (e) => {
    console.log("handle cover");
    const formData = new FormData();
    formData.append("image", e.target.files[0]); // appending file
    console.log(formData);
    setCoverURL({ url: URL.createObjectURL(e.target.files[0]) });
    // dispatch(uploadImage(formData))
    axios.post(
      "http://localhost:9000/student/profile/image?pictureType=cover",
      formData,
    );
  };

  const handleSubmit = async () => {
    //create an array of tags (deleted ones have rm before it)
    let updatedTags = [];
    industry.forEach(function (ind) {
      if (industries && industries.includes(ind)) {
        updatedTags.push(ind);
      } else {
        updatedTags.push("rm" + ind);
      }
    });
    const updatedProfile = {
      name,
      major,
      year,
      tags: updatedTags,
      bio,
      linkedIn: linkedin,
    };
    dispatch(editStudentDetails(updatedProfile));
    handleClose();
  };

  const onClose = () =>{
    setYear(user.year)
    setMajor(user.major)
    setIndustries(user.tags)
    setLinkedin(user.linkedIn)
    setProfileURL(user.profilePicURL)
    setCoverURL(user.coverPicURL)
    handleClose();
  }

  return (
    <EditProfileContainer scroll={"body"} open={open} onClose={onClose}>
      <TitleContainer id="scroll-dialog-title">
        <EditProfileTitle align="center" sz={"18px"}>
          Edit Profile
        </EditProfileTitle>
      </TitleContainer>
      {console.log(user)}
      {console.log("industries=",industries)}
      <EditProfileContent id="scroll-dialog-description">
        {/* Avatar */}
        <EditProfileAvatar
          src={profileURL.url}
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
        {console.log("profileURL=", user.profilePicURL)}

        {/* Cover Picture */}
        <TextFieldWrapper>
          <EditCoverImage src={coverURL.url}></EditCoverImage>
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
        {/* year */}
        <TextFieldWrapper>
          <BoldTypography sz={"18px"}>Year:</BoldTypography>
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

        {/* major */}
        <TextFieldWrapper>
          <BoldTypography sz={"18px"}>Major:</BoldTypography>
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

        {/* interested industries */}
        <TextFieldWrapper>
          <BoldTypography sz={"18px"}>Interested Industries:</BoldTypography>
          <ExploreFilter>
            {console.log("print user tags", user.tags)}
            {industries &&
              industries.map((name) => (
                <ExploreObj key={name} bgcolor={colors.gray1}>
                  &times; {name}
                </ExploreObj>
              ))}
          </ExploreFilter>
          <FormControlC>
            <Select
              multiple
              disableUnderline
              value={industries ? industries : allTags}
              onChange={addIndustries}
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

        {/* linkedIn */}
        <TextFieldWrapper>
          <BoldTypography sz={"18px"}>
            LinkedIn Profile (Optional):
          </BoldTypography>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder={user.linkedIn}
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

        {/* Done button */}
        <EditProfileDone>
          <DoneBtn onClick={handleSubmit}>Done</DoneBtn>
        </EditProfileDone>
      </EditProfileContent>
    </EditProfileContainer>
  );
};

export default EditProfile;
