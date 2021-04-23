import styled from "styled-components";
import { colors } from "../../shared/config";
import { Avatar, Button, Typography } from "@material-ui/core";

export const HeaderImage = styled.img`
  width: 33vw;
  height: 21vh;
  display: flex;
`;

export const ProfileInfo = styled.div`
  background-color: ${colors.white};
  position: relative;
  height: fit-content;
  width: 33vw;
  padding: 15px;
  box-sizing: border-box;
`;

export const ProfileWrapper = styled.div`
  background: ${colors.blue2};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileAvatar = styled(Avatar)`
  width: 4vw;
  height: 4vw;
  top: -3.7vw;
  background-color: #838383;
  border: 5px solid ${colors.white};
`;

export const NameDescription = styled.div`
  display: flex 2 1 auto;
  flex-direction: column;
  padding-left: 0.5em;
  margin-top: -0.5em;
`;

export const NameDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1vh;
  max-height: 12vh;
`;

export const ProfileTabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1vh;
  max-height: 100vh;
`;

export const MiddleContainer = styled.div`
  flex: 2 1 auto;
  height: 100vh;
  background: ${colors.blue2};
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

export const Footer = styled.div`
  background: ${colors.blue2};
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;
