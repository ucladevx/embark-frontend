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
  IndustryWrapper,
  EditProfileButton,
  MiddleContainer,
  QuestionBox,
  ExploreFilter,
  ExploreObj,
  ButtonBox,
  ClubWebsiteButton,
  FollowButton,
  AboutTitle,
  AboutWrapper,
  Footer,
  ExploreFilterTitle,
  DescriptionTypography,
  ProfileTabsWrapper,
} from "./StyleProfile";
import lawn from "../../images/lawn.png";
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import { ActionButton } from "../../shared/Buttons";
import ViewClubProfileTabs from "./viewClubProfileTabs";
import { handleTagColor } from "../../utils/handleTagColors.js";
import website_arrow from "../../images/website_arrow.png";
import { colors } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";
import { getExpandedClub } from "../../redux/actions/dataActions";
import {
  editStudentDetails,
  getStudentData,
} from "../../redux/actions/userActions";

const testEvent = [
  {
    _id: "123450",
    name: "Embark Release",
    organizerName: "Embark",
    startDate: "2021-04-03T08:00:00.000Z",
    endDate: "2021-04-03T09:00:00.000Z",
    description:
      "whats up guys aint this some awesome filler text come check out what we can do badslvjb sdvaksdjbv sadovnasdv asdovbalsdv",
    venue: "here what do you think",
    attendees: [123, 147, 1492, 10238],
    test: true,
  },
];

const ViewClubProfile = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentData());
  }, []);
  const user = useSelector((state) => state.user);

  const [editProfile, seteditProfile] = useState(false);
  const [About, SetAbout] = useState("Club Not Found");

  //testing purposes
  const test = false;
  const testClub = {
    name: "Test Club",
    industries: ["testing", "fakeness"],
    description: "we're about testing",
    about:
      "Hi, we're all about being a fake test club made by our overlords to fill space",
    website: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ownEvents: testEvent,
    tags: ["Design", "Testing"],
  };

  //getting club information
  const { clubId } = useParams();
  const club = useSelector((state) => state.data.club);
  useEffect(() => {
    dispatch(getExpandedClub(clubId));
  }, []);

  //follow handling
  const [followString, setFollowString] = useState("Follow");
  const handleFollow = async () => {
    let myclubs = user.clubs;
    if (!user.clubs) {
      return;
    }
    if (user.clubs.includes(clubId)) {
      const index = myclubs.indexOf(clubId);
      myclubs.splice(index, 1);
    } else {
      myclubs.push(clubId);
    }
    console.log(`Follow ${clubId}`);
    const updatedProfile = {
      name: user.name,
      major: user.major,
      year: user.year,
      tags: user.tags,
      bio: user.bio,
      linkedIn: user.linkedin,
      clubs: myclubs,
    };
    dispatch(editStudentDetails(updatedProfile));
  };
  useEffect(() => {
    if (!user.clubs) {
      return;
    }
    if (user.clubs.includes(clubId)) {
      setFollowString("Unfollow");
    } else {
      setFollowString("Follow");
    }
  }, [user]);

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
                {club.about}
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
      <NavBar></NavBar>
      <MiddleContainer>
        <ProfileWrapper>
          <HeaderImage src={club.coverPicURL}></HeaderImage>
          <ProfileInfo>
            <NameDescriptionWrapper>
              <ProfileAvatar src={club.profilePicURL}></ProfileAvatar>
              <NameDescription>
                <TitleTypography
                  style={{ fontSize: "24px", paddingBottom: "0" }}
                >
                  {club.name}
                </TitleTypography>
                <Typography style={{ fontSize: "18px" }}>
                  {club.description ? club.description : "Club Not Found"}
                </Typography>
              </NameDescription>

              <ButtonBox>
                <FollowButton onClick={handleFollow} bgcolor={"#FFFFFF"}>
                  {followString}
                </FollowButton>
                <ClubWebsiteButton href={club.website}>
                  <img src={website_arrow} style={{ marginRight: "4px" }}></img>
                  Club Website
                </ClubWebsiteButton>
              </ButtonBox>

              {/* <NameDescription> */}
            </NameDescriptionWrapper>

            <IndustryWrapper>
              <BoldTypography sz={"14px"}>Relevant Industries:</BoldTypography>
              <ExploreFilter>
                {club.tags &&
                  club.tags.map((name) => {
                    return (
                      <ExploreObj key={name} bgcolor={handleTagColor(name)}>
                        {name}
                      </ExploreObj>
                    );
                  })}
              </ExploreFilter>
            </IndustryWrapper>
          </ProfileInfo>
          <QuestionBox></QuestionBox>
        </ProfileWrapper>
        <AboutContent />
        <ProfileWrapper>
          <ProfileInfo>
            <ProfileTabsWrapper>
              <ViewClubProfileTabs club={club} />
            </ProfileTabsWrapper>
          </ProfileInfo>
          <QuestionBox></QuestionBox>
        </ProfileWrapper>
        <Footer></Footer>
      </MiddleContainer>
    </>
  );
};

export default ViewClubProfile;
