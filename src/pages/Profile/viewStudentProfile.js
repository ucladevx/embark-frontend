import React, { useState, useEffect } from "react";
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
import UserProfileTabs from "./StudentProfileTabs";
import { colors } from "../../shared/config";
import { handleTagColor } from "../../utils/handleTagColors.js";
//image
import linkedin from "../../images/linkedin.png";
import pencil from "../../images/pencil.png";

//redux
import { useDispatch, useSelector } from "react-redux";

//
import axios from "axios";
const ViewStudentProfile = (props) => {
  const [student, setStudent] = useState({})

  useEffect(async ()=>{
    let params = (new URL(document.location)).searchParams;
    let studentId = params.get('studentId'); 
    console.log(studentId)
    const data = await axios.get("http://localhost:9000/student/profileById?studentId="+"602e067f9be8700c3ccddfd4");
    console.log(data.data.student);
  })

  return (
    <div>
      <NavBar></NavBar>
      <MiddleContainer>
        <ProfileWrapper>
          <HeaderImage src={student.coverPicURL}></HeaderImage>
          <ProfileInfo>
            <img
              src={linkedin}
              style={{ float: "right" }}
              onClick={() => window.open(student.linkedIn)}
            ></img>
            <NameDescriptionWrapper>
              <ProfileAvatar src={student.profilePicURL}></ProfileAvatar>
              <NameDescription>
                <TitleTypography
                  style={{ fontSize: "24px", paddingBottom: "0" }}
                >
                  {student.name}
                </TitleTypography>
                <Typography style={{ fontSize: "18px" }}>
                  {student.year} • {student.major}
                </Typography>
              </NameDescription>
            </NameDescriptionWrapper>
            <IndustryWrapper>
              <BoldTypography sz={"14px"}>
                Interested Industries:
              </BoldTypography>
              <ExploreFilter>
                {student.tags &&
                  student.tags.map((name) => {
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
