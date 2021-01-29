import styled from "styled-components";
import { colors } from "../../shared/config";
import { Avatar, Button, TextField, Typography } from "@material-ui/core";
import { BoldTypography } from "../../shared/Typography";

export const LandingPage = styled.div`
  background: ${colors.blue1};
`;

export const LandingPageWrapper = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  width: 80vw;
  min-height: 100vh;
  gap: 30px;
`;

export const LeftWrapper = styled.div`
  flex: 1 1 auto;
  white-space: nowrap;
`;

export const MiddleWrapper = styled.div`
  flex: 2 1 auto;
`;

export const RightWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InfoBoxes = styled.div`
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
  padding: 20px 10px;
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
  border: 1px solid ${colors.gray1};
`;

export const InfoImage = styled.img`
  width: 35px;
  height: 35px;
`;

export const FilterWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 20px;
  padding: 20px;
  height: 260px;
  background: ${colors.white};
  display: flex;
  gap: 20px;
  flex-direction: column;
  border-radius: 5px;
`;

export const FilterObj = styled(Typography)`
  height: 26px;
  background-color: ${(props) => props.bgcolor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 8px;
  font-size: 14px;
`;

export const FilterTitle = styled(BoldTypography)`
  font-size: 18px;
`;

export const AddFilter = styled(Typography)`
  text-transform: none;
  align-self: flex-end;
  color: ${colors.gray3};
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
  background-color: ${colors.gray1};
  justify-content: center;
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
  background: ${colors.gray1};
`;

export const MakePostWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  border-radius: 5px;
`;

export const CalanderWrapper = styled.div`
  width: 290px;
`;

export const EventsWrapper = styled.div`
  background-color: ${colors.white};
  padding: 15px;
  width: 290px;
  border-radius: 5px;
`;

export const EventItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 250px;
  position: relative;
`;

export const EventItem = styled.div`
  display: flex;
`;

export const EventDescription = styled.div`
  margin-left: 15px;
`;

export const EventAvatar = styled(Avatar)`
  width: 45px;
  height: 45px;
  text-align: center;
  font-size: 15px;
`;

export const ViewPost = styled.div`
  background: ${colors.white};
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;
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
  background-color: ${(props) => props.bgcolor};
  text-transform: none;
  width: fit-content;
  height: 18px;
  font-size: 10px;
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: ${(props) => props.bgcolor};
    opacity: 0.8;
  }
`;

export const PostNameTime = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5px;
`;

export const PostTime = styled(Typography)`
  color: ${colors.gray2};
  font-size: 12px;
`;

export const PostUserName = styled(BoldTypography)`
  font-size: 16px;
  margin-left: -4px;
`;

export const PostTitle = styled(BoldTypography)`
  font-size: 19px;
  margin-top: 20px;
  font-size: 14px;
`;

export const PostContent = styled(Typography)`
  margin-top: 5px;
  font-size: 12px;
`;

export const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 5px;
  background: ${colors.white};
`;

export const CommentIcon = styled.img`
  width: 25px;
  height: 25px;
`;

export const ViewCommentLink = styled(Typography)`
  text-decoration: underline;
  background: none;
  margin: 10px 0 0 10px;
  font-size: 11px;
  color: ${colors.gray3};
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const CommentTextField = styled(TextField)`
  background: ${colors.gray1};
  border-radius: 10px;
  padding-left: 5px;
  justify-content: center;
`;

export const PreviousCommentItem = styled.div`
  display: flex;
`;

export const PreviousCommentAvatar = styled(Avatar)`
  width: 35px;
  height: 35px;
`;

export const ViewPreviousCommentWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 5px;
  background: ${colors.white};
`;

export const PreviousCommentTitle = styled(BoldTypography)`
  font-size: 14px;
  margin-bottom: 2px;
`;

export const PreviousCommentText = styled(Typography)`
  font-size: 12px;
`;

export const PreviousCommentContent = styled.div`
  background: ${(props) => props.bgcolor};
  border-radius: 15px;
  padding: 10px 10px;
  display: flex;
  margin-left: 20px;
  flex-direction: column;
`;

export const LikeReply = styled.div`
  display: flex;
  gap: 5px;
  margin: 5px 0 0 20px;
`;

export const LikeReplyText = styled(BoldTypography)`
  font-size: 11px;
  color: ${colors.gray2};
`;

export const EventTypography = styled(Typography)`
  font-size: 11px;
`;

export const TimeTypography = styled(EventTypography)`
  color: ${colors.gray2};
`;

export const GoingBtn = styled(Button)`
  text-transform: none;
  background-color: ${(props) => props.bgcolor};
  height: 25px;
  align-self: center;
  color: ${(props) => props.fcolor};
  position: absolute;
  right: 1px;
`;

export const CommentAvatar = styled(PreviousCommentAvatar)``;
