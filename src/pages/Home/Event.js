import React from "react";
import {
  EventAvatar,
  EventDescription,
  EventItem,
  EventTypography,
  TimeTypography,
  GoingBtn,
  InfoSeperator,
} from "./StyleLanding";
import { BoldTypography } from "../../shared/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  goingToEvent,
  cancelAttendingEvent,
} from "../../redux/actions/userActions";

// Dayjs
import dayjs from "dayjs";
import BadgeEventAvatar from "./Event/BadgeEventAvatar";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const test = (moment) => {
  let date = moment.replace("T", " ");
  date = date.replace("Z", " ");
  date = date.concat(" GMT");
  return dayjs(date).format("MMM DD HH:mm a");
};

const Event = (props) => {
  const makeDay = (moment) => {
    if (props.test) {
      return test(moment);
    }
    let date = JSON.stringify(moment);
    date = date.replace("T", " ");
    date = date.replace("Z", " ");
    date = date.concat(" GMT");
    return dayjs(date).format("MMM DD HH:mm a");
  };
  const dispatch = useDispatch();
  const attending = useSelector((state) => state.user.events);
  const hasID = (id) => {
    if (!attending) return false;
    for (let i = 0; i < attending.length; i++) {
      if (attending[i] && attending[i]._id === id) {
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
    <>
      <InfoSeperator key={props.e._id + "sep"}></InfoSeperator>
      <EventItem key={props.e._id}>
        <BadgeEventAvatar
          onClick={() => {
            props.loadExpanded(props.e);
          }}
        ></BadgeEventAvatar>
        <EventDescription
          onClick={() => {
            props.loadExpanded(props.e);
          }}
        >
          <BoldTypography sz={"16px"}>{props.e.name}</BoldTypography>
          <EventTypography>{props.e.organizerName}</EventTypography>
          <TimeTypography>{makeDay(props.e.startDate)}</TimeTypography>
        </EventDescription>
        <GoingBtn
          onClick={goingClick(props.e._id)}
          bgcolor={hasID(props.e._id)}
        >
          Going
        </GoingBtn>
      </EventItem>
    </>
  );
};

export default Event;
