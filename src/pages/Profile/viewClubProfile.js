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
} from "./StyleProfile";
import lawn from "../../images/lawn.png";
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import { ActionButton } from "../../shared/Buttons";
import ClubProfileTabs from "./ClubProfileTabs";
import { handleTagColor } from "../../utils/handleTagColors.js";
import website_arrow from "../../images/website_arrow.png";
import { colors } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ViewClubProfile = (props) => {
  const [club, setClub] = useState({})

  useEffect(()=>{
    let params = (new URL(document.location)).searchParams;
    let clubId = params.get('clubId'); 
    axios.get("http://localhost:9000/club/profilebyId/clubId="+clubId)
    .then((res)=>{
      console.log(res);
      setClub(res);
    });
  })

  // const AboutContent = () => {
  //   if (club.About.length > 0) {
  //     return (
  //       <ProfileWrapper>
  //         <ProfileInfo>
  //           <AboutTitle>
  //             <BoldTypography sz={"16px"}>About</BoldTypography>
  //           </AboutTitle>
  //           <AboutWrapper>
  //             <Typography sz={"14px"} style={{ fontWeight: "400" }}>
  //               {club.About}
  //             </Typography>
  //           </AboutWrapper>
  //         </ProfileInfo>
  //         <QuestionBox></QuestionBox>
  //       </ProfileWrapper>
  //     );
  //   } else {
  //     return <ProfileWrapper></ProfileWrapper>;
  //   }
  // };

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
                  {club.description ? club.description : "Tech Club"}
                </Typography>
              </NameDescription>

              <ButtonBox>
                <FollowButton bgcolor={"#FFFFFF"}>Follow</FollowButton>
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
        {/* <AboutContent /> */}
        <ProfileWrapper>
          <ProfileInfo>
            <NameDescriptionWrapper>
              <ClubProfileTabs />
            </NameDescriptionWrapper>
          </ProfileInfo>
          <QuestionBox></QuestionBox>
        </ProfileWrapper>
        <Footer></Footer>
      </MiddleContainer>
    </>
  );
};

export default ViewClubProfile;
