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
  ExploreFilterTitle,
  DescriptionTypography,
  FollowButton,
} from "./StyleProfile";
import lawn from "../../images/lawn.png";
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import { ActionButton } from "../../shared/Buttons";
import EditClubProfile from "./editClubProfile";
import ClubProfileTabs from "./ClubProfileTabs";
import { colors } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";
import { getExpandedClub } from "../../redux/actions/dataActions";
import { editStudentDetails } from "../../redux/actions/userActions";

const ClubProfile = (props) => {
  const user = useSelector((state) => state.user);
  const [editProfile, seteditProfile] = useState(false);
  const { userid } = useParams();
  const [description, SetDescription] = useState("Tech Club");
  const [About, SetAbout] = useState(
    "Have you ever felt that all you were learning at UCLA was theory, with little opportunities to build out practical applications? DevX is a brand new program dedicated to solving that very problem! Build out real-world projects to help tackle pressing problems frustrating the UCLA community, grow your technical skills by pairing up with experienced students, and build a network that lasts beyond graduation.",
  );
  const [website, SetWebsite] = useState("https://ucladevx.com/");

  const dispatch = useDispatch();
  const id = "fakeid";
  let studentViewClub;
  if (user.userType === "student") {
    studentViewClub = getExpandedClub(id); //need to check this
  } else {
    studentViewClub = false;
  }

  const [followString, setFollowString] = useState("Follow");
  const handleFollow = async () => {
    const updatedProfile = {
      clubs: [user.clubs, id],
    };
    dispatch(editStudentDetails(updatedProfile));
  };
  useEffect(() => {
    if (user.clubs.includes(id)) {
      setFollowString("Unfollow");
    } else {
      setFollowString("Follow");
    }
  }, [user]);

  function handleAbout(newAbout) {
    SetAbout(newAbout);
  }

  function handleWebsite(newWebsite) {
    SetWebsite(newWebsite);
  }

  function handleDescription(newDescription) {
    SetDescription(newDescription);
  }

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
      {user.userType === "club" ? (
        <EditClubProfile
          open={editProfile}
          handleClose={() => seteditProfile(false)}
          EditAbout={handleAbout}
          EditWebsite={handleWebsite}
          EditDescription={handleDescription}
          currentAbout={About}
          currentWebsite={website}
          currentDescription={description}
        ></EditClubProfile>
      ) : (
        <></>
      )}
      <NavBar></NavBar>
      <MiddleContainer>
        <ProfileWrapper>
          <HeaderImage src={lawn}></HeaderImage>
          <ProfileInfo>
            <NameDescriptionWrapper>
              <ProfileAvatar></ProfileAvatar>
              <NameDescription>
                <TitleTypography
                  style={{ fontSize: "24px", paddingBottom: "0" }}
                >
                  UCLA DevX
                </TitleTypography>
                <Typography style={{ fontSize: "18px" }}>
                  {description}
                </Typography>
              </NameDescription>
              <NameDescription>
                {user.userType === "student" ? (
                  <FollowButton
                    onClick={() => {
                      console.log("follow");
                    }}
                  >
                    {followString}
                  </FollowButton>
                ) : (
                  <></>
                )}
                <ClubWebsiteButton href={website}>
                  Club Website
                </ClubWebsiteButton>
              </NameDescription>
            </NameDescriptionWrapper>

            <IndustryWrapper>
              <BoldTypography sz={"14px"}>Relevant Industries:</BoldTypography>
              <ExploreFilter>
                <ExploreObj bgcolor={colors.red1}>
                  Product Management
                </ExploreObj>
                <ExploreObj bgcolor={colors.darkyellow}>
                  Product Design
                </ExploreObj>
              </ExploreFilter>
            </IndustryWrapper>

            {user.userType === "club" ? (
              <EditProfileButton
                onClick={() => {
                  seteditProfile(true);
                }}
              >
                Edit Profile
              </EditProfileButton>
            ) : (
              <></>
            )}
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
