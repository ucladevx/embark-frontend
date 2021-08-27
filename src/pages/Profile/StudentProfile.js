import React, { useState } from "react";
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
  Footer,
} from "./StyleProfile";
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import EditProfile from "./editStudentProfile";
import UserProfileTabs from "./StudentProfileTabs";
import { handleTagColor } from "../../utils/handleTagColors.js";
//image
import linkedin from "../../images/linkedin.png";
import pencil from "../../images/pencil.png";

//redux
import { useSelector } from "react-redux";
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
              style={{ float: "right" }}
              onClick={() => window.open(user.linkedIn)}
              alt="linkedin"
            ></img>
            <NameDescriptionWrapper>
              <ProfileAvatar src={user.profilePicURL}></ProfileAvatar>
              <NameDescription>
                <TitleTypography
                  style={{ fontSize: "24px", paddingBottom: "0" }}
                >
                  {user.firstName} {user.lastName}
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
