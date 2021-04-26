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
import { colors } from "../../shared/config";
import styled from "styled-components";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
import { useSelector } from "react-redux";
import { goingToEvent } from "../../redux/actions/userActions";
import ExpandedEvent from "./ExpandedEvent.js";
import Event from "./Event.js";
import { ActionButton } from "../../shared/Buttons";

// Dayjs
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const DiscoverEventsWrapper = styled.div`
  background-color: ${colors.white};
  padding: 15px;
  border-radius: 5px;
`;

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
    desc:
      "whats up guys aint this some awesome filler text come check out what we can do badslvjb sdvaksdjbv sadovnasdv asdovbalsdv",
    venue: "here what do you think",
  },
];

const DiscoverEvents = ({ closeEvents }) => {
  const events = useSelector((state) => state.data.events);

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
      <DiscoverEventsWrapper>
        <TitleTypography>Discover Events</TitleTypography>
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
        </EventItems>
        <AddFilter onClick={closeEvents}>Close View</AddFilter>
      </DiscoverEventsWrapper>
    </>
  );
};

export default DiscoverEvents;
