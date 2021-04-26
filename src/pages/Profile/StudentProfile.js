import React, { useState } from "react";
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
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import EditProfile from "./editStudentProfile";
import { ActionButton } from "../../shared/Buttons";
import UserProfileTabs from "./StudentProfileTabs";
import { colors } from "../../shared/config";
import { handleTagColor } from "../../utils/handleTagColors.js";
//image
import linkedin from "../../images/linkedin.png";
import pencil from "../../images/pencil.png";

//redux
import { useDispatch, useSelector } from "react-redux";
const StudentProfile = (props) => {
  const user = useSelector((state) => state.user);
  const [editProfile, seteditProfile] = useState(false);
  const tags = user.tags;

  return (
    <div>
      {console.log("this is the user", user)}
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
              style={{ float: "right" }}
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
              <img style={{ marginRight: "2px" }} src={pencil}></img>
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
