import React from "react";
import NavBar from "../../components/NavBar";
import {
  HeaderImage,
  ProfileInfo,
  ProfileWrapper,
  ProfileAvatar,
  NameDescription,
  NameDescriptionWrapper,
  IndustryWrapper,
  MiddleContainer,
  QuestionBox,
  ExploreFilter,
  ExploreObj,
  Footer,
} from "./StyleProfile";
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import UserProfileTabs from "./StudentProfileTabs";
import { handleTagColor } from "../../utils/handleTagColors.js";
//image
import linkedin from "../../images/linkedin.png";

//redux
import { useSelector } from "react-redux";
const ViewStudentProfile = (props) => {
  const user = useSelector((state) => state.user);
  const tags = user.tags;

  return (
    <div>
      {console.log(user)}
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

export default ViewStudentProfile;
