import React, { useState, useEffect, useMemo } from "react";
import { IconButton } from "@material-ui/core";
import { BoldTypography } from "../../shared/Typography";
import { colors } from "../../shared/config";
import { IndustryFilters } from "../../shared/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { editStudentDetails } from "../../redux/actions/userActions";
import { ExploreObj, ExploreFilter } from "./StyleProfile";
import {
  EditProfileContainer,
  EditProfileAvatar,
  ChangeAvatarLink,
  TitleContainer,
  EditProfileTitle,
  EditCoverImage,
  EditProfileContent,
  EditProfileDone,
  DialogTextField,
  TextFieldWrapper,
  DoneBtn,
} from "./StyleEditProfile";

import SingleDropDown from "../../shared/Dropdown/SingleDropdown";
import close_window_x from "../../images/close_window_x.png";
import { LinkedinAdornment } from "../../shared/LinkedinAdornment";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import MultiDropDown from "../../shared/Dropdown/MultiDropDown";
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

const EditProfile = ({ open, handleClose, allTags }) => {
  const classes = useStyles();
  const years = ["2024", "2023", "2022", "2021"];
  const industry = useMemo(() => IndustryFilters, []);
  const user = useSelector((state) => state.user);
  const [name] = useState(user.name);
  const [major, setMajor] = useState(" ");
  const [year, setYear] = useState(user.year);
  const [industries, setIndustries] = useState(user.tags);
  const [bio] = useState(user.bio);
  const [linkedin, setLinkedin] = useState(" ");
  const [profileURL, setProfileURL] = useState({ url: user.profilePicURL });
  const [coverURL, setCoverURL] = useState({ url: user.coverPicURL });
  const hiddenProfileInput = React.useRef(null);
  const hiddenCoverInput = React.useRef(null);

  // Redux
  const dispatch = useDispatch();

  //dropdown toggle
  const [openYear, setOpenYear] = useState(false);
  const [openInd, setOpenInd] = useState(false);
  const toggleOpenYear = () => {
    setOpenYear(!openYear);
  };
  const toggleOpenInd = () => {
    setOpenInd(!openInd);
  };

  //check if there is any changes
  const saveStudent = () => {
    return (
      (user.major === major || major === "") &&
      parseInt(user.year) === year &&
      JSON.stringify(user.tags.sort()) === JSON.stringify(industries.sort()) &&
      (user.linkedIn === linkedin || linkedin === "") &&
      user.coverPicURL === coverURL &&
      user.profilePicURL === profileURL
    );
  };

  useEffect(() => {
    setYear(user.year);
    setMajor(user.major);
    setLinkedin(user.linkedIn);
    setIndustries(user.tags);
  }, [user.year, user.major, user.linkedIn, user.tags]);

  const handleYear = (e) => {
    setYear(e);
    toggleOpenYear();
  };

  const handleMajor = (e) => {
    setMajor(e.target.value);
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

  const handlelinkedIn = (e) => {
    setLinkedin(e.target.value);
    console.log(linkedin);
  };

  const handleProfileURL = (e) => {
    console.log(e.target.files[0]);
    setProfileURL({ url: URL.createObjectURL(e.target.files[0]) });
    const formData = new FormData();
    formData.append("image", e.target.files[0]); // appending file
    console.log(formData);
    axios.post(
      "http://localhost:9000/student/profile/image?pictureType=profile",
      formData,
    );
  };

  const handleCoverURL = (e) => {
    setCoverURL({ url: URL.createObjectURL(e.target.files[0]) });
    const formData = new FormData();
    formData.append("image", e.target.files[0]); // appending file
    console.log(formData);
    axios.post(
      "http://localhost:9000/student/profile/image?pictureType=cover",
      formData,
    );
  };

  const handleSubmit = async () => {
    //create an array of tags (deleted ones have rm before it)
    if (name && name.length > 100) {
      alert("Name is too long! Please limit to <100 characters");
      return;
    }
    if (major && major.length > 50) {
      alert("Major is too long! Please limit to <50 characters");
      return;
    }
    if (bio && bio.length > 5000) {
      alert("Bio is too long! Please limit to <5000 characters");
      return;
    }
    if (linkedin && linkedin.length > 100) {
      alert("LinkedIn is too long! Please limit to <100 characters");
      return;
    }
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
    onClose();
  };

  const onClose = () => {
    //reset everything
    setYear(user.year);
    setMajor(user.major);
    setIndustries(user.tags);
    setLinkedin(user.linkedIn);
    setProfileURL(user.profilePicURL);
    setCoverURL(user.coverPicURL);
    setOpenInd(false);
    setOpenYear(false);
    handleClose();
  };

  return (
    <EditProfileContainer scroll={"body"} open={open} onClose={onClose}>
      <TitleContainer id="scroll-dialog-title">
        <EditProfileTitle align="center" sz={"18px"}>
          Edit Profile
        </EditProfileTitle>
        <IconButton
          className={classes.button}
          style={{ padding: "0" }}
          onClick={handleClose}
        >
          <img src={close_window_x} alt="close window"></img>
        </IconButton>
      </TitleContainer>
      <EditProfileContent id="scroll-dialog-description">
        <EditProfileAvatar
          src={
            profileURL && profileURL.url ? profileURL.url : user.profilePicURL
          }
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
        {/* year */}
        <TextFieldWrapper>
          <BoldTypography sz={"18px"}>Year:</BoldTypography>
          <SingleDropDown
            ttwd="128px"
            onOpenClose={() => toggleOpenYear()}
            title={year ? year : "Year"}
            bwd="97px"
            bhg="149px"
            cwd="97px"
            chg="149px"
            content={years}
            open={openYear}
            onSelect={handleYear}
          ></SingleDropDown>
        </TextFieldWrapper>

        {/* major */}
        <TextFieldWrapper>
          <BoldTypography sz={"18px"}>Major:</BoldTypography>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder={user.major ? user.major : "Major"}
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
            onChange={handleMajor}
          />
        </TextFieldWrapper>

        {/* interested industries */}
        <TextFieldWrapper>
          <BoldTypography sz={"18px"}>Interested Industries:</BoldTypography>

          {/* industries filters */}
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
        </TextFieldWrapper>

        {/* linkedIn */}
        <TextFieldWrapper style={{ marginTop: "50px" }}>
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
              startAdornment: <LinkedinAdornment />,
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
                padding: "8px 16px",
              },
            }}
            onChange={handlelinkedIn}
          />
        </TextFieldWrapper>

        {/* Done button */}
        <EditProfileDone>
          <DoneBtn
            onClick={handleSubmit}
            bgcolor={saveStudent() ? colors.gray : "#5473bb"}
          >
            Save
          </DoneBtn>
        </EditProfileDone>
      </EditProfileContent>
    </EditProfileContainer>
  );
};

export default EditProfile;
