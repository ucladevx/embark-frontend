import React, { useState } from "react";
import {
  EventDescription,
  EventItems,
  EventTypography,
  EventsWrapper,
  TimeTypography,
  GoingBtn,
  InfoSeperator,
  AddFilter,
  CreateButton,
  FakeEventItem,
} from "./StyleLanding";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
import { useSelector } from "react-redux";
import ExpandedEvent from "./ExpandedEvent.js";
import Event from "./Event.js";
import BadgeEventAvatar from "./Event/BadgeEventAvatar";
import ErrorPopup from "../..//components/ErrorPopup";

// Dayjs
import dayjs from "dayjs";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const test = (moment) => {
  let date = moment.replace("T", " ");
  date = date.replace("Z", " ");
  return dayjs(date).format("MMM DD HH:mm a");
};

const testEvent = [
  {
    _id: "123450",
    name: "Embark Release",
    organizerName: "Embark",
    startDate: /*"2021-03-03T08:00:00.000Z"*/ "2021-04-25T04:13:32.000Z",
    endDate: "2021-04-25T06:13:32.000Z",
    description:
      "whats up guys aint this some awesome filler text come check out what we can do badslvjb sdvaksdjbv sadovnasdv asdovbalsdv",
    venue: "here what do you think, https://ucla.zoom.us/",
    attendees: 4,
  },
];

const Events = ({ setNewEvent, openEvents, setExpandedEventPage }) => {
  const events = useSelector((state) => state.data.events);
  const usertype = useSelector((state) => state.user.userType);

  const [expanded, setExpanded] = useState(false);
  const [event, setEvent] = useState({});
  const loadExpanded = (e) => {
    //console.log(e);
    setEvent(e);
    //console.log(event);
    //setExpanded(true);
    setExpandedEventPage(e);
  };

  const [errorPopup, setErrorPopup] = useState(false);

  return (
    <>
      <ErrorPopup open={errorPopup} onClose={() => setErrorPopup(false)} />
      <ExpandedEvent
        open={expanded}
        handleClose={() => setExpanded(false)}
        e={event}
      />
      <EventsWrapper>
        <TitleTypography>Upcoming Events</TitleTypography>
        <EventItems>
          <FakeEventItem>
            <BadgeEventAvatar></BadgeEventAvatar>
            <EventDescription>
              <BoldTypography sz={"16px"}>Demo Day</BoldTypography>
              <EventTypography>UCLA DevX</EventTypography>
              <TimeTypography>
                {test("2021-03-03T08:00:00.000Z")}
              </TimeTypography>
            </EventDescription>
            <GoingBtn bgcolor={true}>Going</GoingBtn>
          </FakeEventItem>
          <InfoSeperator></InfoSeperator>

          <FakeEventItem>
            <BadgeEventAvatar></BadgeEventAvatar>
            <EventDescription>
              <BoldTypography sz={"16px"}>Winter Info...</BoldTypography>
              <EventTypography>Club1234</EventTypography>
              <TimeTypography>
                {dayjs().format("MMM DD HH:mm a")}
              </TimeTypography>
            </EventDescription>
            <GoingBtn bgcolor={false}>Going</GoingBtn>
          </FakeEventItem>

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
          <AddFilter onClick={() => setErrorPopup(true)}>View More</AddFilter>
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
