import styled from "styled-components";
import { colors } from "../../shared/config";
import { Avatar, Button, TextField, Typography } from "@material-ui/core";
import { BoldTypograhpy } from "../../shared/Typography";

export const LandingPageWrapper = styled.div`
  display: grid;
  width: 100vw;
  min-height: 100vh;
  background: ${colors.skyblue};
  grid-template-columns: repeat(10, 1fr);
`;

export const LeftWrapper = styled.div`
  padding-top: 20px;
  grid-column: 2 / 4;
`;

export const MiddleWrapper = styled.div`
  grid-column: 4 / 8;
  padding-top: 20px;
  margin-left: 40px;
`;

export const RightWrapper = styled.div`
  grid-column: 8 / 10;
  padding-top: 20px;
  margin-right: -40px;
`;

export const InfoBoxes = styled.div`
  width: 270px;
  height: 235px;
  background-color: ${colors.white};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

export const InfoEntryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 13px 0;
`;

export const InfoEntryText = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`;

export const InfoSeperator = styled.div`
  width: 90%;
  height: 0;
  align-self: center;
  border: 1px solid ${colors.lightgray};
`;

export const InfoImage = styled.img`
  width: 53px;
  height: 53px;
`;

export const FilterWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 20px;
  padding: 20px;
  width: 290px;
  height: 260px;
  background: ${colors.white};
  display: flex;
  gap: 20px;
  flex-direction: column;
  border-radius: 5px;
`;

export const FilterObj = styled(Typography)`
  height: 40.66px;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 8px;
`;

export const AddFilter = styled.p`
  text-transform: none;
  align-self: flex-end;
  color: ${colors.darkgray};
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const QuestionBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 86px;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: ${colors.white};
  &::placeholder {
    color: black;
  }
`;

export const AskaQuestion = styled(TextField)`
  width: 70%;
  height: 38px;
  background-color: ${colors.lightgray};
  justify-content: center;
  box-sizing: border-box;
  padding-left: 13px;
  border-radius: 5px;
`;

export const AskAvatar = styled(Avatar)`
  margin-left: 20px;
`;

export const PostButton = styled(Button)`
  width: 89px;
  height: 30px;
  border-radius: 8px;
  position: absolute;
  right: 1vw;
  bottom: 70px;
  text-transform: none;
  background: ${colors.lightgray};
`;

export const MakePostWrapper = styled.div`
  position: relative;
  margin-top: 10px;
`;

export const CalanderWrapper = styled.div`
  margin-left: 3vw;
`;

export const EventsWrapper = styled.div`
  margin-left: 3vw;
  background-color: ${colors.white};
  margin-top: 20px;
  padding: 15px;
`;

export const EventItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 250px;
`;

export const EventItem = styled.div`
  display: flex;
`;

export const EventDescription = styled.div`
  margin-left: 15px;
`;

export const EventAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 15px;
  background-color: ${colors.darkgray};
`;

export const ViewPost = styled.div`
  background: ${colors.white};
  margin-top: 20px;
  padding: 20px;
`;

export const PostHeader = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const PostAvatar = styled(Avatar)`
  width: 42px;
  height: 42px;
  margin-right: 10px;
`;

export const PostTagWrapper = styled.div`
  margin-left: auto;
  display: flex;
  gap: 20px;
  margin-right: 10px;
`;

export const PostTag = styled(Button)`
  background-color: ${(props) => props.color};
  text-transform: none;
  width: fit-content;
  height: 18px;
  font-size: 10px;
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: ${(props) => props.color};
    opacity: 0.8;
  }
`;

export const PostNameTime = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5px;
`;

export const PostTime = styled(Typography)`
  color: ${colors.mediumgray};
  font-size: 12px;
`;

export const PostUserName = styled(BoldTypograhpy)`
  font-size: 21px;
  margin-left: -4px;
`;

export const PostTitle = styled(BoldTypograhpy)`
  font-size: 19px;
  margin-top: 20px;
`;

export const PostContent = styled(Typography)`
  margin-top: 5px;
`;

export const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
  gap: 20px;
`;

export const CommentIcon = styled.img`
  width: 25px;
  height: 25px;
`;

export const ViewPreviousCommentLink = styled(Typography)`
  text-decoration: underline;
  background: none;
  margin: 10px 0 0 10px;
  color: ${colors.darkgray};
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const PreviousCommentItem = styled.div`
  display: flex;
`;

export const PreviousCommentAvatar = styled(Avatar)`
  width: 35px;
  height: 35px;
  margin-left: 30px;
`;

export const ViewPreviousCommentWrapper = styled.div`
  background: ${colors.lightpurple};
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 5px 20px;
`;

export const PreviousCommentContent = styled.div`
  display: flex;
  margin-left: 20px;
  flex-direction: column;
`;
