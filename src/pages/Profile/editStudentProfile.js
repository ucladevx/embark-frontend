import React, { useState, useEffect } from "react";
import {
  MenuItem,
  InputAdornment,
  Typography,
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
  DialogTextField,
  TextFieldWrapper,
  DoneBtn,
  DropDownBox,
  DropDownTitle,
  DropDownContent,
  DropDownCheckBox,
  Finished,
} from "./StyleEditProfile";
import Linkedin from "../../images/linkedin.png";
import checked from "../../images/checked_24px.png";
import unchecked from "../../images/unchecked_24px.png";
import { makeStyles } from "@material-ui/core/styles";
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

const EditProfile = ({ open, handleClose, allTags }) => {
  const classes = useStyles();
  const years = ["2024","2023", "2022","2021"];
  const industry = IndustryFilters;
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [major, setMajor] = useState(" ");
  const [year, setYear] = useState(user.year);
  const [industries, setIndustries] = useState(user.tags);
  const [bio, setBio] = useState(user.bio);
  const [linkedin, setLinkedin] = useState(" ");
  const [profileURL, setProfileURL] = useState({ url: user.profilePicURL });
  const [coverURL, setCoverURL] = useState({ url: user.coverPicURL });
  const hiddenProfileInput = React.useRef(null);
  const hiddenCoverInput = React.useRef(null);
  const tags = user.tags;

  //dropdown year
  const [openYear, setOpenYear] = useState(false);
  const [openInd, setOpenInd] = useState(false);
  const toggleOpenYear = () => {
    setOpenYear(!openYear);
  };
  const toggleOpenInd = () => {
    setOpenInd(!openInd);
  };

  useEffect(() => {
    // console.log("useEffect");
    // console.log("after render print user.tags",user.tags)
    setYear(user.year);
    setMajor(user.major);
    setLinkedin(user.linkedIn);
    setIndustries(user.tags);

    return function cleanUp() {
      console.log("clean it up");
    };
  }, []);
  // Redux
  const dispatch = useDispatch();

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
  // const addIndustries = (e) => {
  //   // console.log("change industries to ", e.target.value);
  //   setIndustries(e.target.value);
  // };

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
    // if(profileData!=={}){
    //   axios.post(
    //     "http://localhost:9000/student/profile/image?pictureType=profile",
    //     profileData,
    //   );
    // }
    // if(coverData!=={}){
    //   axios.post(
    //     "http://localhost:9000/student/profile/image?pictureType=cover",
    //     coverData,
    //   );
    // }
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
      {console.log("dialog user", user)}
      <TitleContainer id="scroll-dialog-title">
        <EditProfileTitle align="center" sz={"18px"}>
          Edit Profile
        </EditProfileTitle>
      </TitleContainer>
      <EditProfileContent id="scroll-dialog-description">

        {/* Avatar */}
        {console.log("profileURL.url=", profileURL.url)}
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
        {/* year */}
        <TextFieldWrapper>
          <BoldTypography sz={"18px"}>Year:</BoldTypography>
          <div>
            <DropDownTitle wd={"128px"} onClick={toggleOpenYear}>
              {year} 
            </DropDownTitle>
            {openYear && (
              <DropDownBox wd={"97px"} hg={"149px"} style={{width:"97px", height:"149px"}}>
                <DropDownContent wd={"97px"} hg={"149px"} overflow={"hidden"} style={{width:"97px", height:"149px"}}>
                  {years.map((year, index) => (
                    <MenuItem
                      onClick={() => {
                        handleYear(year);
                      }}
                      key={index}
                    >
                      {year}
                    </MenuItem>
                  ))}
                </DropDownContent>

              </DropDownBox>

            )}
          </div>
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

            <DropDownTitle wd={"312px"} hg={"35px"} onClick={toggleOpenInd}>
            <Typography style={{display:"inline"}}>Select all that apply</Typography>
            <Typography style={{display:"inline", position:"absolute", right:"150px"}}>^</Typography>
            </DropDownTitle>
            {openInd && ( 
              <DropDownBox
                wd= {"314px"}
                hg= {"202px"}>
                <DropDownContent wd={"312px"} hg={"248px"} overflow={"scroll"}>
                  {industry.map((name, index) => (
                    <div key={name} style={{paddingLeft:"19px", height:"25px", marginTop:"14px", marginBottom:"14px"}}>
                      <DropDownCheckBox
                        onClick={() => {
                          handleIndustries(name);
                        }}
                        src={
                          industries && industries.includes(name)
                            ? checked
                            : unchecked
                        }
                      ></DropDownCheckBox>
                      <Typography style={{ fontSize: "18px", marginLeft: "3px", padding:"0px", display:"inline" }}>
                        {name}
                      </Typography>
                    </div>
                  ))}
                </DropDownContent>

                <Finished
                  wd={"314px"}
                  hg={"46px"}
                  onClick={toggleOpenInd}
                >
                  Finished
                </Finished>
              </DropDownBox>
            )}
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
              startAdornment: (
                <InputAdornment position="start">
                  <img src={Linkedin}></img>
                </InputAdornment>
              ),
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
