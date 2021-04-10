import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
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
  Footer,
} from "./StyleProfile";
import lawn from "../../images/lawn.png";
import linkedin from "../../images/linkedin.png";
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import { Button } from "@material-ui/core";
import EditProfile from "./editStudentProfile";
import UserProfileTabs from "./StudentProfileTabs";
import { colors } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";
const StudentProfile = (props) => {
  const user = useSelector((state) => state.user);
  const [editProfile, seteditProfile] = useState(false);
  const tags = user.tags;

  return (
    <div>
      <EditProfile
        open={editProfile}
        handleClose={() => seteditProfile(false)}
        allTags={user.tags}
      ></EditProfile>
      <NavBar></NavBar>
      <MiddleContainer>
        <ProfileWrapper>
          <HeaderImage src={user.coverPicURL}></HeaderImage>
          <ProfileInfo>
            <img
              src={linkedin}
              style={{ backgroundColor: "blue", float: "right" }}
              onClick={() => window.open(user.linkedIn)}
            ></img>
            <NameDescriptionWrapper>
              <ProfileAvatar src={user.profilePicURL}></ProfileAvatar>
              <NameDescription>
                <TitleTypography
                  style={{ fontSize: "24px", paddingBottom: "0" }}
                >
                  {user.name}
                </TitleTypography>
                <Typography style={{ fontSize: "18px" }}>
                  {user.year} • {user.major}
                </Typography>
              </NameDescription>
            </NameDescriptionWrapper>
            <IndustryWrapper>
              <BoldTypography sz={"14px"}>
                Interested Industries:
              </BoldTypography>
              <ExploreFilter>
                {tags &&
                  tags.map((name) => {
                    return (
                      <ExploreObj key={name} bgcolor={colors.red1}>
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
              Edit Profile
            </EditProfileButton>
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

        <Footer></Footer>
      </MiddleContainer>
    </div>
  );
};

export default StudentProfile;
