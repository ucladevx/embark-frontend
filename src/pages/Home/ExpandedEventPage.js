import React,{useEffect, useState} from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import styled from "styled-components";
import NewEvent from "../../components/NewEvent"
import {
  EventAvatar,
  EventDescription,
  EventItem,
  EventItems,
  EventTypography,
  EventsWrapper,
  GoingBtnExpand,
  InfoSeperator,
  PostContent,
  CreateButton,
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
  color: ${colors.blue4};
  font-size: 14px;
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

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const makeDay = (moment) => {
  if (typeof moment === "string") {
    let date = moment.replace("T", " ");
    date = date.replace("Z", " ");
    date = date.concat(" GMT");
    return dayjs(date).format("dddd MMM DD • HH:mm a");
  }
  let date = JSON.stringify(moment);
  if (date) {
    date = date.replace("T", " ");
    date = date.replace("Z", " ");
    date = date.concat(" GMT");
    return dayjs(date).format("dddd MMM DD • HH:mm a");
  } else {
    return "";
  }
};

const ExpandedEventPage = ({ e, close }) => {
  const dispatch = useDispatch();
  const attending = useSelector((state) => state.user.goingEvents);
  const usertype = useSelector((state) => state.user.userType);
  const [newEvent, setNewEvent] = useState(false);
  const hasID = (id) => {
    for (var i = 0; i < attending.length; i++) {
      if (attending[i]._id === id) {
        return true;
      }
    }
    return false;
  };
  const closePage = () => {
    close();
  }
  const goingClick = (id) => {
    if (hasID(id)) {
      dispatch(goingToEvent(id));
    } else {
      dispatch(cancelAttendingEvent(id));
    }
  };

  useEffect(() => {
    dispatch({ type: "CLUB_EVENT_EXPANSION", payload: {} })
   } ,[]);

  return (
    <TextFieldWrapper>
      <NewEvent open={newEvent} handleClose={() => setNewEvent(false)} editId={e._id}/>
      <ProfileWrapper>
        <HeaderImage src={lawn}></HeaderImage>
        <ProfileInfo>
          <ProfileAvatar></ProfileAvatar>
          <UnderAvatar>
            <HeaderWrapper>
              <ColumnWrapper>
                <TimeTypography sz={"16px"}>
                  {makeDay(e.startDate)}
                </TimeTypography>
                <HeaderWrapper>
                  <BoldTypography sz={"24px"}>{e.title}</BoldTypography>
                  { usertype!=="student" ? (                  
                      <GoingBtnExpand
                        onClick={goingClick(e._id)}
                        bgcolor={hasID(e._id)}
                      >
                        Going
                      </GoingBtnExpand>
                    ) : (
                      <CreateButton onClick={() => setNewEvent(true)}>
                        Edit Event
                      </CreateButton>
                    )
                  }

                </HeaderWrapper>
              </ColumnWrapper>
            </HeaderWrapper>
          </UnderAvatar>
        </ProfileInfo>
        <InfoSeperator></InfoSeperator>
        <ProfileInfo>
          <ProfileTabsWrapper>
            <ExpandedEventTabs e={e} />
          </ProfileTabsWrapper>
          <RightWrapper>
            <CreateButton onClick = {closePage}>Return Home</CreateButton>
          </RightWrapper>
        </ProfileInfo>
      </ProfileWrapper>
    </TextFieldWrapper>
  );
};

export default ExpandedEventPage;
