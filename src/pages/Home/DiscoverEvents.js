import React, { useState } from "react";
import {
  EventAvatar,
  EventDescription,
  EventItems,
  EventTypography,
  TimeTypography,
  GoingBtn,
  InfoSeperator,
  AddFilter,
  FakeEventItem,
} from "./StyleLanding";
import { colors } from "../../shared/config";
import styled from "styled-components";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
import { useSelector } from "react-redux";
import ExpandedEvent from "./ExpandedEvent.js";
import Event from "./Event.js";

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
    description:
      "whats up guys aint this some awesome filler text come check out what we can do badslvjb sdvaksdjbv sadovnasdv asdovbalsdv",
    venue: "here what do you think",
  },
];

const DiscoverEvents = ({ closeEvents, setExpandedEventPage }) => {
  const events = useSelector((state) => state.data.events);

  const [expanded, setExpanded] = useState(false);
  const [event, setEvent] = useState({});
  const loadExpanded = (e) => {
    //console.log(e);
    setEvent(e);
    //console.log(event);
    //setExpanded(true);
    setExpandedEventPage(e);
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
          <FakeEventItem>
            <EventAvatar></EventAvatar>
            <EventDescription>
              <BoldTypography sz={"16px"}>Demo Day</BoldTypography>
              <EventTypography>UCLA DevX</EventTypography>
              <TimeTypography>
                {test("2021-03-03T08:00:00.000Z")}
              </TimeTypography>
            </EventDescription>
            <GoingBtn bgcolor={true ? 1 : 0}>Going</GoingBtn>
          </FakeEventItem>
          <InfoSeperator></InfoSeperator>
          <FakeEventItem>
            <EventAvatar></EventAvatar>
            <EventDescription>
              <BoldTypography sz={"16px"}>Winter Info...</BoldTypography>
              <EventTypography>Club1234</EventTypography>
              <TimeTypography>
                {dayjs().format("MMM DD HH:mm a")}
              </TimeTypography>
            </EventDescription>
            <GoingBtn bgcolor={true ? 1 : 0}>Going</GoingBtn>
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
        </EventItems>
        <AddFilter onClick={closeEvents}>Close View</AddFilter>
      </DiscoverEventsWrapper>
    </>
  );
};

export default DiscoverEvents;
