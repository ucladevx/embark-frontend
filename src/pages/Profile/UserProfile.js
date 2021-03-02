import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import {
  HeaderImage,
  ProfileInfo,
  ProfileWrapper,
  ProfileAvatar,
  NameDescription,
  NameTypography,
  NameDescriptionWrapper,
  IndustryWrapper,
  EditProfileButton,
  MiddleContainer,
  QuestionBox,
  ExploreFilter,
  ExploreObj,
} from "./StyleProfile";
import lawn from "../../images/lawn.png";
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import {Button} from "@material-ui/core";
import EditProfile from "./editUserProfile"
import UserProfileTabs from "./UserProfileTabs"
import { colors } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";
const UserProfile = (props) => {
  const user = useSelector((state) => state.user);
  const [editProfile, seteditProfile] = useState(false);
  const { userid } = useParams();

  return (
    <>
      <EditProfile
        open={editProfile}
        handleClose={() => seteditProfile(false)}
      ></EditProfile>
      <NavBar></NavBar>
      <MiddleContainer>
      <ProfileWrapper>
        <HeaderImage src={lawn}></HeaderImage>
        <ProfileInfo>
          <NameDescriptionWrapper>
            <ProfileAvatar></ProfileAvatar>
            <NameDescription>
              <TitleTypography>{user.name}</TitleTypography>
              <Typography style={{fontSize: '18px'}}>{user.year} {user.major}</Typography>
            </NameDescription>
          </NameDescriptionWrapper>
          <IndustryWrapper>
            <BoldTypography  sz={"14px"}>Interested Industries:</BoldTypography>
            <ExploreFilter>
            <ExploreObj bgcolor={colors.red1}>
              Product Management
            </ExploreObj>
            <ExploreObj bgcolor={colors.darkyellow}>
              Product Design
            </ExploreObj>
            </ExploreFilter>            
          </IndustryWrapper>

          <EditProfileButton onClick={() => {seteditProfile(true);}}>Edit Profile</EditProfileButton>         
        </ProfileInfo>
        <QuestionBox></QuestionBox>
        
      </ProfileWrapper>
      <ProfileWrapper>
          <ProfileInfo>
            <NameDescriptionWrapper>
              <UserProfileTabs />
            </NameDescriptionWrapper>
          </ProfileInfo>
          <QuestionBox></QuestionBox>
        </ProfileWrapper>
      </MiddleContainer>

    </>
  );
};

export default UserProfile;