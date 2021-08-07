import styled from "styled-components";
import { colors } from "../../shared/config";

import {
  Avatar,
  Button,
  TextField,
  Typography,
  Badge,
} from "@material-ui/core";

import { ActionButton } from "../../shared/Buttons";

import { BoldTypography } from "../../shared/Typography";
import {
  handleTagColor,
  handleGoingBColor,
  handleGoingFColor,
} from "../../utils/handleTagColors";

import LinkEffect from "../../shared/Effect/LinkEffect";
import StickyEffect from "../../shared/Effect/StickyEffect";

export const LandingPage = styled.div`
  background: ${colors.blue2};
`;

export const LandingPageWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 290px 558px 290px;
  width: 100%;
  justify-content: center;
  min-height: 100vh;
  padding: 10px 8vw 0 8vw;
  gap: 35px;
`;

export const LeftContainer = styled.div`
  ${StickyEffect};
  white-space: nowrap;
`;

export const MiddleContainer = styled.div``;

export const RightContainer = styled.div`
  ${StickyEffect};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InfoBoxes = styled.div`
  ${StickyEffect}
  height: 235px;
  background-color: ${colors.white};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

export const InfoEntryWrapper = styled.div`
  ${LinkEffect}
  display: flex;
  align-items: center;
  gap: 10px;
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
  border-radius: 50%;
  width: 35px;
  height: 35px;
`;

export const InfoProfilePic = styled(InfoImage)`
  border-radius: 50%;
`;

export const FilterWrapper = styled.div`
  ${StickyEffect}
  box-sizing: border-box;
  margin-top: 20px;
  padding: 20px;
  max-height: 500px;
  overflow: auto;
  background: ${colors.white};
  display: flex;
  gap: 20px;
  flex-direction: column;
  border-radius: 5px;
`;

export const InteriorFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const FilterObj = styled(Typography)`
  height: 26px;
  background-color: ${(props) => handleTagColor(props.tag)};
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 8px;
  margin-top: 5px;
  margin-right: 5px;
  font-size: 14px;
`;

export const FilterTitle = styled(BoldTypography)`
  font-size: 18px;
`;

export const FilesWrapper = styled.div`
  overflow: scroll;
  max-height: 200px;
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

export const DialogTextField = styled(TextField)`
  background: ${colors.gray1};
  padding: 5px 5px;
  border-radius: 5px;
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
  min-height: 170px;
  position: relative;
`;

export const EventItem = styled.div`
  display: flex;
  width: 90%;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const FakeEventItem = styled.div`
  display: flex;
  width: 90%;
`;

export const EventDescription = styled.div`
  margin-left: 15px;
  width: 100%;
`;

export const EventAvatar = styled(Avatar)`
  width: 45px;
  height: 45px;
  text-align: center;
  font-size: 15px;
`;

export const EventBadge = styled(Badge)``;

export const PostWrapper = styled.div`
  margin-top: 20px;
  padding: 20px 20px 0 20px;
  border-radius: 5px;
  background: ${colors.white};
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
  background-color: ${(props) => handleTagColor(props.tag)};
  text-transform: none;
  width: fit-content;
  height: 18px;
  font-size: 10px;
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: ${(props) => handleTagColor(props.tag)};
    opacity: 0.8;
  }
`;

export const PostNameTime = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1px;
`;

export const PostTime = styled(Typography)`
  color: ${colors.gray2};
  font-size: 12px;
`;

export const PostUserName = styled(BoldTypography)`
  font-size: 16px;
`;

export const PostTitle = styled(BoldTypography)`
  font-size: 19px;
  margin-top: 20px;
  font-size: 14px;
`;

export const PostContent = styled(Typography)`
  margin-top: 5px;
  font-size: 12px;
  overflow: scroll;
  max-height: 500px;
`;

export const ViewCommentLink = styled(Typography)`
  ${LinkEffect}
  text-decoration: underline;
  background: none;
  margin: 10px 0 0 0;
  font-size: 11px;
  color: ${colors.gray3};
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
  padding: 5px 10px 5px 10px;
  background: ${colors.white};
`;

export const PreviousCommentTitle = styled(BoldTypography)`
  font-size: 14px;
  margin-bottom: 2px;
`;

export const PreviousCommentText = styled(Typography)`
  font-size: 12px;
  overflow: scroll;
  max-height: 150px;
`;

export const PreviousCommentContent = styled.div`
  background: ${(props) => props.bgcolor};
  border-radius: 15px;
  padding: 10px 10px;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
`;

export const LikeReply = styled.div`
  display: flex;
  gap: 5px;
  margin: 5px 0 0 20px;
`;

export const LikeReplyText = styled(BoldTypography)`
  ${(props) => (props.disabled ? null : LinkEffect)}
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
  background-color: ${(props) => handleGoingBColor(props.bgcolor)};
  height: 25px;
  align-self: center;
  color: ${(props) => handleGoingFColor(props.bgcolor)};
  position: absolute;
  right: 1px;
`;

export const GoingBtnExpand = styled(Button)`
  text-transform: none;
  background-color: ${(props) => handleGoingBColor(props.bgcolor)};
  height: 25px;
  align-self: center;
  color: ${(props) => handleGoingFColor(props.bgcolor)};
`;

export const ViewPost = styled.div`
  margin-top: 20px;
  border-radius: 5px;
`;

export const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 25px 0;
  background: ${colors.white};
`;

export const CreateButton = styled(ActionButton)`
  height: 26px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 15px;
  margin-top: 5px;
  margin-right: 5px;
  font-size: 14px;
  text-transform: none;
  align-self: flex-end;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
