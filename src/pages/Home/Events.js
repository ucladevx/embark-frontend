import React, { useState } from "react";
import {
  EventAvatar,
  EventDescription,
  EventItem,
  EventItems,
  EventTypography,
  EventsWrapper,
  TimeTypography,
  GoingBtn,
  InfoSeperator,
  EventBadge,
} from "./StyleLanding";
import styled from "styled-components";
import { colors } from "../../shared/config";
import { Typography } from "@material-ui/core";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
import { useSelector, useDispatch } from "react-redux";
import { goingToEvent } from "../../redux/actions/userActions";
import ExpandedEvent from "./ExpandedEvent.js";

// Dayjs
import dayjs from "dayjs";

import { ActionButton } from "../../shared/Buttons";

import calendar from "../../images/calendar.png";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

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

const makeDay = (moment) => {
  let date = JSON.stringify(moment);
  date = date.replace("T", " ");
  date = date.replace("Z", " ");
  return dayjs(date).format("MMM DD HH:mm a");
};

const test = (moment) => {
  let date = moment.replace("T", " ");
  date = date.replace("Z", " ");
  return dayjs(date).format("MMM DD HH:mm a");
};

const testEvent = [
  {
    _id: "123450",
    title: "Embark Release",
    authorEmail: "Embark",
    datetime: "2021-03-03T08:00:00.000Z",
    description:
      "whats up guys aint this some awesome filler text come check out what we can do badslvjb sdvaksdjbv sadovnasdv asdovbalsdv",
    location: "here what do you think",
  },
];

const Events = ({ setNewEvent }) => {
  const dispatch = useDispatch();
  const club = true; //use backend call to test if it is a club

  const goingClick = (id) => {
    dispatch(goingToEvent(id));
  };

  const events = useSelector((state) => state.data.events);
  const attending = useSelector((state) => state.user.goingEvents);
  const [expanded, setExpanded] = useState(false);
  const [event, setEvent] = useState({});
  const loadExpanded = (e) => {
    console.log(e);
    setEvent(e);
    console.log(event);
    setExpanded(true);
  };
  return (
    <>
      <ExpandedEvent
        open={expanded}
        handleClose={() => setExpanded(false)}
        e={event}
      />
      <EventsWrapper>
        <TitleTypography>Upcoming Events</TitleTypography>
        <EventItems>
          <EventItem>
            <EventBadge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              overlap="circle"
              badgeContent={<p>{dayjs().format("DD")}</p>}
            >
              <EventBadge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                overlap="circle"
                badgeContent={<img src={calendar} alt=""></img>}
              >
                <EventAvatar />
              </EventBadge>
            </EventBadge>
            <EventDescription>
              <BoldTypography sz={"16px"}>Demo Day</BoldTypography>
              <EventTypography>UCLA DevX</EventTypography>
              <TimeTypography>
                {test("2021-03-03T08:00:00.000Z")}
              </TimeTypography>
            </EventDescription>
            <GoingBtn bgcolor={true}>Going</GoingBtn>
          </EventItem>
          <InfoSeperator></InfoSeperator>
          <EventItem>
            <EventBadge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              overlap="circle"
              badgeContent={<p>{dayjs().format("DD")}</p>}
            >
              <EventBadge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                overlap="circle"
                badgeContent={<img src={calendar} alt=""></img>}
              >
                <EventAvatar />
              </EventBadge>
            </EventBadge>
            <EventDescription>
              <BoldTypography sz={"16px"}>Winter Info...</BoldTypography>
              <EventTypography>Club1234</EventTypography>
              <TimeTypography>
                {dayjs().format("MMM DD HH:mm a")}
              </TimeTypography>
            </EventDescription>
            <GoingBtn bgcolor={false}>Going</GoingBtn>
          </EventItem>
          {testEvent.map((p) => {
            return (
              <>
                <InfoSeperator key={p._id + "sep"}></InfoSeperator>
                <EventItem key={p._id}>
                  <EventBadge
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    overlap="circle"
                    badgeContent={<p>{dayjs().format("DD")}</p>}
                  >
                    <EventBadge
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      overlap="circle"
                      badgeContent={<img src={calendar} alt=""></img>}
                    >
                      <EventAvatar
                        onClick={() => loadExpanded(p)}
                      ></EventAvatar>
                    </EventBadge>
                  </EventBadge>
                  <EventDescription onClick={() => loadExpanded(p)}>
                    <BoldTypography sz={"16px"}>{p.title}</BoldTypography>
                    <EventTypography>{p.authorEmail}</EventTypography>
                    <TimeTypography>{test(p.datetime)}</TimeTypography>
                  </EventDescription>
                  <GoingBtn bgcolor={false}>Going</GoingBtn>
                </EventItem>
              </>
            );
          })}
          {events.map((e) => {
            return (
              <>
                <InfoSeperator key={e._id + "sep"}></InfoSeperator>
                <EventItem key={e._id}>
                  <EventAvatar onClick={() => loadExpanded(e)}></EventAvatar>
                  <EventDescription onClick={() => loadExpanded(e)}>
                    <BoldTypography sz={"16px"}>{e.title}</BoldTypography>
                    <EventTypography>{e.authorEmail}</EventTypography>
                    <TimeTypography>{makeDay(e.datetime)}</TimeTypography>
                  </EventDescription>
                  <GoingBtn
                    onClick={goingClick(e._id)}
                    bgcolor={attending.contains(e._id)}
                  >
                    Going
                  </GoingBtn>
                </EventItem>
              </>
            );
          })}
          {club === true ? (
            <CreateButton onClick={() => setNewEvent(true)}>
              + Create
            </CreateButton>
          ) : (
            <></>
          )}
        </EventItems>
      </EventsWrapper>
    </>
  );
};

export default Events;
