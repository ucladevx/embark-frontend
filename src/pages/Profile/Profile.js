import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import {
  HeaderImage,
  ProfileInfo,
  ProfileWrapper,
  ProfileAvatar,
  NameDescription,
  NameDescriptionWrapper,
  EditProfileButton,
  LandingPageWrapper,
  LeftContainer,
  MiddleContainer,
  RightContainer,
  ExploreWrapper,
  QuestionBox,
  ExploreFilter,
  ExploreObj,
} from "./StyleProfile";
import lawn from "../../images/lawn.png";
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import {Button} from "@material-ui/core";
import EditProfile from "./editProfile"
import ProfileTabs from "./ProfileTabs"
import { colors } from "../../shared/config";

const Profile = (props) => {
  const [editProfile, seteditProfile] = useState(false);
  const { userid } = useParams();


  return (
    <>
    <EditProfile open={editProfile} handleClose={() => seteditProfile(false)}></EditProfile>
      <NavBar></NavBar>

      <MiddleContainer>

      <ProfileWrapper>
        <HeaderImage src={lawn}></HeaderImage>
        <ProfileInfo>
          <NameDescriptionWrapper>
            <ProfileAvatar></ProfileAvatar>
            <NameDescription>
              <TitleTypography>Test user</TitleTypography>
              <Typography>2022 Cognitive Science</Typography>
            </NameDescription>
            
          </NameDescriptionWrapper>
          <BoldTypography  sz={"18px"}>Interested Industries:</BoldTypography>

          <ExploreFilter>
          <ExploreObj bgcolor={colors.red1}>
            &times; Product Management
          </ExploreObj>
          <ExploreObj bgcolor={colors.darkyellow}>
            &times; Product Design
          </ExploreObj>
          </ExploreFilter>

          <EditProfileButton onClick={() => {seteditProfile(true);}}>Edit Profile</EditProfileButton>
          
        </ProfileInfo>
        <QuestionBox>

        </QuestionBox>
        
      </ProfileWrapper>

      <ProfileWrapper>
        <ProfileInfo>
          <NameDescriptionWrapper>

              <ProfileTabs/>

          </NameDescriptionWrapper>
         
          
        </ProfileInfo>
        <QuestionBox>

        </QuestionBox>
        
      </ProfileWrapper>
      
      </MiddleContainer>

    </>
  );
};

export default Profile;
