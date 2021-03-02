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
  ClubWebsiteButton,
  DescriptionTypography,
} from "./StyleProfile";
import lawn from "../../images/lawn.png";
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import {ActionButton} from "../../shared/Buttons";
import EditClubProfile from "./editClubProfile"
import ClubProfileTabs from "./ClubProfileTabs"
import { colors } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";

const ClubProfile = (props) => {
  const user = useSelector((state) => state.user);
  const [editProfile, seteditProfile] = useState(false);
  const { userid } = useParams();
  const [description, SetDescription] = useState("Tech Club");
  const [About, SetAbout] = useState("Have you ever felt that all you were learning at UCLA was theory, with little opportunities to build out practical applications? DevX is a brand new program dedicated to solving that very problem! Build out real-world projects to help tackle pressing problems frustrating the UCLA community, grow your technical skills by pairing up with experienced students, and build a network that lasts beyond graduation.")
  const [website, SetWebsite] = useState("https://ucladevx.com/")

  function handleAbout(newAbout){
      SetAbout(newAbout);
  }

  function handleWebsite(newWebsite){
      SetWebsite(newWebsite);
  }

  function handleDescription(newDescription){
    SetDescription(newDescription);
  }

  const AboutContent = () => {
      if(About.length > 0){
          return (
            <ProfileWrapper>
            <ProfileInfo>
                    <NameDescriptionWrapper>
                      <BoldTypography>About</BoldTypography>
                    </NameDescriptionWrapper>
                    <NameDescriptionWrapper>
                      <Typography>{About}</Typography>
                    </NameDescriptionWrapper>
            </ProfileInfo>
                  <QuestionBox></QuestionBox>
            </ProfileWrapper>
          )
      }else{
          return (<ProfileWrapper></ProfileWrapper>)
      }
  }

  return (
    <>
      <EditClubProfile
        open={editProfile}
        handleClose={() => seteditProfile(false)}
        EditAbout = {handleAbout}
        EditWebsite = {handleWebsite}
        EditDescription = {handleDescription}
        currentAbout = {About}
        currentWebsite = {website}
        currentDescription = {description}
      ></EditClubProfile>
      <NavBar></NavBar>
      <MiddleContainer>
      <ProfileWrapper>
        <HeaderImage src={lawn}></HeaderImage>
        <ProfileInfo>
          <NameDescriptionWrapper>
            <ProfileAvatar></ProfileAvatar>
            <NameDescription>
              <TitleTypography>UCLA DevX</TitleTypography>
              <DescriptionTypography>{description}</DescriptionTypography>
            </NameDescription>
            {/* <NameDescription> */}
              <ClubWebsiteButton href={website}>Club Website</ClubWebsiteButton>
            {/* </NameDescription> */}
            
          </NameDescriptionWrapper>

          <IndustryWrapper>
            <BoldTypography  sz={"14px"}>Relevant Industries:</BoldTypography>
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
    {/* <ProfileWrapper>

          <QuestionBox></QuestionBox>
    </ProfileWrapper> */}
        <AboutContent/>

      <ProfileWrapper>
          <ProfileInfo>
            <NameDescriptionWrapper>
              <ClubProfileTabs />
            </NameDescriptionWrapper>
          </ProfileInfo>
          <QuestionBox></QuestionBox>
        </ProfileWrapper>

      </MiddleContainer>
    </>
  );
};

export default ClubProfile;
