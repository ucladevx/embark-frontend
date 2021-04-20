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
  AddFilter,
} from "./StyleLanding";
import styled from "styled-components";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
import { useSelector } from "react-redux";
import ExpandedEvent from "./ExpandedEvent.js";
import Event from "./Event.js";
import { ActionButton } from "../../shared/Buttons";

// Dayjs
import dayjs from "dayjs";
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
    startDate: /*"2021-03-03T08:00:00.000Z"*/ "2021-04-25T04:13:32.000Z",
    endDate: "2021-04-25T06:13:32.000Z",
    description:
      "whats up guys aint this some awesome filler text come check out what we can do badslvjb sdvaksdjbv sadovnasdv asdovbalsdv",
    venue: "here what do you think",
  },
];

const Events = ({ setNewEvent, openEvents }) => {
  const events = useSelector((state) => state.data.events);
  const usertype = useSelector((state) => state.user.userType);

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
            <EventAvatar></EventAvatar>
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
            <EventAvatar></EventAvatar>
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
                <Event loadExpanded={loadExpanded} e={p} test={true} />
              </>
            );
          })}
          {events.map((e) => {
            return (
              <>
                <Event loadExpanded={loadExpanded} e={e} test={false} />
              </>
            );
          })}
          <AddFilter onClick={openEvents}>View More</AddFilter>
          {usertype === "club" ? (
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
