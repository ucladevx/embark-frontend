import React from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import styled from "styled-components";
import {
    EventAvatar,
    EventDescription,
    EventItem,
    EventItems,
    EventTypography,
    EventsWrapper,
    GoingBtnExpand,
    InfoSeperator,
    PostContent
  } from "./StyleLanding";
import { useSelector, useDispatch } from "react-redux";
import {
  goingToEvent,
  cancelAttendingEvent,
} from "../../redux/actions/userActions";
import {
  HeaderImage,
  ProfileInfo,
  ProfileWrapper,
  ProfileAvatar,
  NameDescription,
  NameDescriptionWrapper,
  ProfileTabsWrapper,
  MiddleContainer,
  QuestionBox,
  Footer,
} from "./StyleEventPage";
import lawn from "../../images/lawn.png";
import { Typography } from "@material-ui/core";
import { TitleTypography, BoldTypography } from "../../shared/Typography";
import ExpandedEventTabs from "./ExpandedEventTabs";
import { colors } from "../../shared/config";

// Dayjs
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const TimeTypography = styled(EventTypography)`
  color: ${colors.gray2};
  font-size: 16px;
`;

const UnderAvatar = styled.div`
  top: 1.6vw;
  position: absolute;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 31vw;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameTypography = styled(EventTypography)`
  font-size: 16px;
`;

const EventContent = styled(PostContent)`
  font-size: 16px;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 450px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const makeDay = (moment) => {
  if (typeof moment === "string") {
    let date = moment.replace("T", " ");
    date = date.replace("Z", " ");
    date = date.concat(" GMT");
    return dayjs(date).format("MMM DD HH:mm a");
  }
  let date = JSON.stringify(moment);
  if (date) {
    date = date.replace("T", " ");
    date = date.replace("Z", " ");
    date = date.concat(" GMT");
    return dayjs(date).format("MMM DD HH:mm a");
  } else {
    return "";
  }
};

const ExpandedEventPage = ({e}) => {
  const dispatch = useDispatch();
  const attending = useSelector((state) => state.user.goingEvents);
  const hasID = (id) => {
    for (var i = 0; i < attending.length; i++) {
      if (attending[i]._id === id) {
        return true;
      }
    }
    return false;
  };
  const goingClick = (id) => {
    if (hasID(id)) {
      dispatch(goingToEvent(id));
    } else {
      dispatch(cancelAttendingEvent(id));
    }
  };

  return (
    <TextFieldWrapper>
        <ProfileWrapper>
          <HeaderImage src={lawn}></HeaderImage>
          <ProfileInfo>
              <ProfileAvatar></ProfileAvatar>
              <UnderAvatar>
                <HeaderWrapper>
                  <ColumnWrapper>
                  <TimeTypography sz={"24px"}>
                      {makeDay(e.startDate)}
                    </TimeTypography>
                    <HeaderWrapper>
                      <BoldTypography sz={"24px"}>{e.title}</BoldTypography>
                      <GoingBtnExpand
                      onClick={goingClick(e._id)}
                      bgcolor={hasID(e._id)}
                      >
                        Going
                      </GoingBtnExpand>
                    </HeaderWrapper>
                  </ColumnWrapper>
                </HeaderWrapper>
              </UnderAvatar>
          </ProfileInfo>
        </ProfileWrapper>
        <ProfileWrapper>
          <ProfileInfo>
            <ProfileTabsWrapper> 
              <ExpandedEventTabs e={e}/>
            </ProfileTabsWrapper>
          </ProfileInfo>
        </ProfileWrapper>

    </TextFieldWrapper>
  );
};

export default ExpandedEventPage;
