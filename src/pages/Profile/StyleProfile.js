import styled from "styled-components";
import { colors } from "../../shared/config";
import { Avatar, Button, Typography } from "@material-ui/core";
import LinkEffect from "../../shared/Effect/LinkEffect";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export const LandingPageWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 220px 540px 220px;
  width: 100%;
  justify-content: center;
  min-height: 100vh;
  padding: 10px 8vw 0 8vw;
  gap: 35px;
`;

export const QuestionBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 20px;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: ${colors.white};
  &::placeholder {
    color: black;
  }
`;

export const MiddleContainer = styled.div`
  flex: 2 1 auto;
  height: 100vh;
  background: ${colors.blue2};
`;

export const NameDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1vh;
  max-height: 12vh;
`;

export const ProfileAvatar = styled(Avatar)`
  width: 7vw;
  height: 7vw;
  top: -3vw;
  background-color: #838383;
  border: 5px solid ${colors.white};
`;

export const ProfileWrapper = styled.div`
  background: ${colors.blue2};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderImage = styled.img`
  width: 46vw;
  height: 21vh;
  display: flex;
`;

export const ProfileInfo = styled.div`
  background-color: ${colors.white};
  height: fit-content;
  width: 46vw;
  position: relative;
  padding: 15px;
  box-sizing: border-box;
`;

export const NameDescription = styled.div`
  display: flex 2 1 auto;
  flex-direction: column;
  padding-left: 0.5em;
  margin-top: -0.5em;
`;

export const EditProfileButton = styled(Button)`
  width: fit-content;
  height: 30px;
  border-radius: 8px;
  position: absolute;
  right: 1vw;
  bottom: 1vw;
  font-size: 14px;
  text-transform: none;
  color: #5a5a5a;
  background: ${colors.gray2};
  border-radius: 5px;
`;

export const DescriptionTypography = styled(Typography)`
  margin-top: -10px;
`;

export const CoverImage = styled.img`
  width: 364px;
  height: 81px;
  left: 542px;
  top: 374px;
  margin: auto;
`;

export const ExploreObj = styled(Typography)`
  height: 26px;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => (props.textColor ? props.textColor : colors.black)};
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 8px;
  font-size: 14px;
  margin: 5px;
`;

export const ExploreFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  width: 448px;
`;
export const ExploreFilterTitle = styled(Typography)`
  text-transform: none;
  align-self: flex-end;
  color: ${colors.gray3};
  text-decoration: none;
  margin-bottom: 7px;
  margin-right: 2px;
`;

export const IndustryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0vh;
  margin-bottom: 2vh;
  margin-left: 15px;
`;

//User

//Club
export const ClubWebsiteButton = styled(Button)`
  width: 130px;
  height: 32px;
  border-radius: 10px;
  position: absolute;
  right: 0.5vw;
  text-transform: none;
  color: #5473bb;
  background: #e5efff;
`;

export const AboutTitle = styled.div`
  display: flex 2 1 auto;
  margin-left: 15px;
  padding-top: 1vh;
  padding-bottom: 1vh;
`;
export const AboutWrapper = styled.div`
  display: flex 2 1 auto;
  width: 41vw;
  margin-left: 15px;
  padding-bottom: 1vh;
`;

export const Footer = styled.div`
  background: ${colors.blue2};
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;
