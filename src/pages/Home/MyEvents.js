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
} from "./StyleLanding";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
import { useSelector } from "react-redux";
import ExpandedEvent from "./ExpandedEvent.js";
import Event from "./Event.js";

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
    title: "Embark Release",
    authorEmail: "Embark",
    startDate: /*"2021-03-03T08:00:00.000Z"*/ "2021-04-25T04:13:32.000Z",
    endDate: "2021-04-25T06:13:32.000Z",
    description:
      "whats up guys aint this some awesome filler text come check out what we can do badslvjb sdvaksdjbv sadovnasdv asdovbalsdv",
    venue: "here what do you think",
  },
];

const MyEvents = () => {
  const events = useSelector((state) => state.user.events);

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
        <TitleTypography>My Events</TitleTypography>
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
            <GoingBtn bgcolor={true ? 1 : 0}>Going</GoingBtn>
          </EventItem>
          {events &&
            events.map((e) => {
              return (
                <>
                  <Event loadExpanded={loadExpanded} e={e} test={false} />
                </>
              );
            })}
        </EventItems>
      </EventsWrapper>
    </>
  );
};

export default MyEvents;
