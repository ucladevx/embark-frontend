import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import {
  HeaderImage,
  ProfileInfo,
  ProfileWrapper,
  ProfileAvatar,
  NameDescription,
  NameDescriptionWrapper,
  ProfileTabsWrapper,
  IndustryWrapper,
  EditProfileButton,
  MiddleContainer,
  QuestionBox,
  ExploreFilter,
  ExploreObj,
  ClubWebsiteButton,
  AboutTitle,
  AboutWrapper,
  Footer,
} from "./StyleProfile";
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import website_arrow from "../../images/website_arrow.png";
import pencil from "../../images/pencil.png";
import EditClubProfile from "./editClubProfile";
import ClubProfileTabs from "./ClubProfileTabs";
import { handleTagColor } from "../../utils/handleTagColors.js";
import { useSelector } from "react-redux";

const ClubProfile = () => {
  const user = useSelector((state) => state.user);
  const [editProfile, seteditProfile] = useState(false);
  const [About] = useState(
    "Have you ever felt that all you were learning at UCLA was theory, with little opportunities to build out practical applications? DevX is a brand new program dedicated to solving that very problem! Build out real-world projects to help tackle pressing problems frustrating the UCLA community, grow your technical skills by pairing up with experienced students, and build a network that lasts beyond graduation.",
  );

  // function handleAbout(newAbout) {
  //   SetAbout(newAbout);
  // }

  // function handleWebsite(newWebsite) {
  //   SetWebsite(newWebsite);
  // }

  // function handleDescription(newDescription) {
  //   SetDescription(newDescription);
  // }

  const AboutContent = () => {
    if (About.length > 0) {
      return (
        <ProfileWrapper>
          <ProfileInfo>
            <AboutTitle>
              <BoldTypography sz={"16px"}>About</BoldTypography>
            </AboutTitle>
            <AboutWrapper>
              <Typography sz={"14px"} style={{ fontWeight: "400" }}>
                {About}
              </Typography>
            </AboutWrapper>
          </ProfileInfo>
          <QuestionBox></QuestionBox>
        </ProfileWrapper>
      );
    } else {
      return <ProfileWrapper></ProfileWrapper>;
    }
  };

  return (
    <>
      <EditClubProfile
        open={editProfile}
        handleClose={() => seteditProfile(false)}
        // EditAbout={handleAbout}
        // EditWebsite={handleWebsite}
        // EditDescription={handleDescription}
        // currentAbout={About}
        // currentWebsite={website}
        // currentDescription={description}
      ></EditClubProfile>
      <NavBar></NavBar>
      <MiddleContainer>
        <ProfileWrapper>
          <HeaderImage src={user.coverPicURL}></HeaderImage>
          <ProfileInfo>
            <NameDescriptionWrapper>
              <ProfileAvatar src={user.profilePicURL}></ProfileAvatar>
              <NameDescription>
                <TitleTypography
                  style={{ fontSize: "24px", paddingBottom: "0" }}
                >
                  {console.log(user)}
                  {user.name}
                </TitleTypography>
                <Typography style={{ fontSize: "18px" }}>
                  {user.description ? user.description : "Tech Club"}
                </Typography>
              </NameDescription>
              {/* <NameDescription> */}
              <ClubWebsiteButton href={user.website}>
                <img
                  src={website_arrow}
                  style={{ marginRight: "4px" }}
                  alt="website arrow"
                ></img>
                Club Website
              </ClubWebsiteButton>
              {/* </NameDescription> */}
            </NameDescriptionWrapper>

            <IndustryWrapper>
              <BoldTypography sz={"14px"}>Relevant Industries:</BoldTypography>
              <ExploreFilter>
                {user.tags &&
                  user.tags.map((name) => {
                    return (
                      <ExploreObj key={name} bgcolor={handleTagColor(name)}>
                        {name}
                      </ExploreObj>
                    );
                  })}
              </ExploreFilter>
            </IndustryWrapper>

            <EditProfileButton
              onClick={() => {
                seteditProfile(true);
              }}
            >
              <img
                style={{ marginRight: "2px" }}
                src={pencil}
                alt="pencil"
              ></img>
              Edit Profile
            </EditProfileButton>
          </ProfileInfo>
          <QuestionBox></QuestionBox>
        </ProfileWrapper>
        <AboutContent />
        <ProfileWrapper>
          <ProfileInfo>
            <ProfileTabsWrapper>
              <ClubProfileTabs />
            </ProfileTabsWrapper>
          </ProfileInfo>
          <QuestionBox></QuestionBox>
        </ProfileWrapper>
        <Footer></Footer>
      </MiddleContainer>
    </>
  );
};

export default ClubProfile;
