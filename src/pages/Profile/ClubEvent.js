import React, { useState } from "react";
import {
  EventAvatar,
  EventDescription,
  EventItem,
  EventTypography,
  TimeTypography,
  InfoSeperator,
} from "../Home/StyleLanding";
import { BoldTypography } from "../../shared/Typography";
import styled from "styled-components";


// Dayjs
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const test = (time) => {
  let date = time.replace("T", " ");
  date = date.replace("Z", " ");
  date = date.concat(" GMT");
  return dayjs(date).format("MMM DD HH:mm a");
};

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AttendeesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`;

const GoingTypography = styled(TimeTypography)`
  font-size: 16px;
`;

const ClubEvent = (props) => {
  const makeDay = (moment) => {
    if (props.test) {
      return test(moment);
    }
    let date = JSON.stringify(moment);
    date = date.replace("T", " ");
    date = date.replace("Z", " ");
    date = date.concat(" GMT");

    return dayjs(date)
      .format("MMM DD HH:mm a")
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  };
  return (
    <>
      <InfoSeperator key={props.e._id + "sep"}></InfoSeperator>
      <EventItem key={props.e._id}>
        <EventAvatar
          onClick={() => {
            props.loadExpanded(props.e);
          }}
        ></EventAvatar>
        <EventDescription
          onClick={() => {
            props.loadExpanded(props.e);
          }}
        >
          <TopBar>
            <BoldTypography sz={"16px"}>{props.e.title}</BoldTypography>
            <AttendeesWrapper>
              <GoingTypography>{props.e.attendees.length}{" going"}</GoingTypography>
            </AttendeesWrapper>
          </TopBar>
          <EventTypography>{props.e.authorEmail}</EventTypography>
          <TimeTypography>{makeDay(props.e.startDate)}</TimeTypography>
        </EventDescription>
      </EventItem>
      <InfoSeperator key={props.e._id + "sep2"}></InfoSeperator>
    </>
  );
};

export default ClubEvent;
