import styled from "styled-components";
import { colors } from "../../shared/config";
import { Avatar, Button, TextField, Typography} from "@material-ui/core";
import LinkEffect from "../../shared/LinkEffect";

export const LandingPageWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100vw;
  min-height: 100vh;
  padding: 10px 100px 0 100px;
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
`;


export const NameDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 15px;
`;

export const ProfileAvatar = styled(Avatar)`
  width: 8vw;
  height: 8vw;
  top: -3vw;
  border: 5px solid ${colors.white};
`;

export const ProfileWrapper = styled.div`
  background: ${colors.blue2};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 3vw;
`;

export const HeaderImage = styled.img`
  width: 49vw;
  height: 15vh;
`;

export const ProfileInfo = styled.div`
  background-color: ${colors.white};
  height: 200px;
  width: 49vw;
  position: relative;
  padding: 15px;
  box-sizing: border-box;
`;

export const NameDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EditProfileButton = styled(Button)`
  width: 89px;
  height: 30px;
  border-radius: 8px;
  position: absolute;
  right: 1vw;
  bottom: 70px;
  text-transform: none;
  color: #FFFFFF;
  background: #5473BB;
  border-radius: 5px;
`;

export const EditProfileAvatar = styled(Avatar)`
  width: 8vw;
  height: 8vw;
  border: 1px solid ${colors.gray1};
  margin: auto;
  position: relative;
`;

export const ChangeAvatarLink = styled(Typography)`
  ${LinkEffect}
  background: none;
  margin: 10px 0 0 10px;
  font-size: 16px;
  color: ${colors.blue4};
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
    color: ${(props) => props.textColor ? props.textColor : colors.black};
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
`;
export const ExploreFilterTitle = styled(Typography)`
    text-transform: none;
    align-self: flex-end;
    color: ${colors.gray3};
    text-decoration: none;
    margin-bottom: 7px;
    margin-right: 2px;
`;