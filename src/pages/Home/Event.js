import React, { useState } from "react";
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
import { goingToEvent } from "../../redux/actions/userActions";

// Dayjs
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const test = (moment) => {
  let date = moment.replace("T", " ");
  date = date.replace("Z", " ");
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
    return dayjs(date).format("MMM DD HH:mm a");
  };
  const dispatch = useDispatch();
  const attending = useSelector((state) => state.user.goingEvents);
  const goingClick = (id) => {
    dispatch(goingToEvent(id));
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
          <BoldTypography sz={"16px"}>{props.e.title}</BoldTypography>
          <EventTypography>{props.e.authorEmail}</EventTypography>
          <TimeTypography>{makeDay(props.e.datetime)}</TimeTypography>
        </EventDescription>
        <GoingBtn
          onClick={goingClick(props.e._id)}
          bgcolor={attending.includes(props.e._id)}
        >
          Going
        </GoingBtn>
      </EventItem>
    </>
  );
};

export default Event;
