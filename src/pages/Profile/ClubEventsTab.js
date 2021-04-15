import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { styleCalendar } from "../Home/Calendar/HomeCalendar";
import { StyleEventCalendar } from "../Home/Calendar/EventCalender";
import "../Home/Calendar/EventCalendar.css";
import Datetime from "react-datetime";
import { CalanderWrapper } from "../Home/StyleLanding";
import { ActionButton } from "../../shared/Buttons";
import styled from "styled-components";
import ClubEvent from "./ClubEvent";
import NewEvent from "../../components/NewEvent";
import ExpandedEvent from "../Home/ExpandedEvent";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
import { getOwnEvents } from "../../redux/actions/userActions";
import "moment-timezone";
// Dayjs
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const CreateButton = styled(ActionButton)`
  width: fit-content;
  height: 1.6vw;
  border-radius: 50%;
  display: flex;
  align-items: center;
  padding: 5px;
  margin-top: 5px;
  margin-right: 5px;
  margin-left: 5px;
  font-size: 30px;
  text-transform: none;
  text-align: center;
  justify-content: center;
  align-self: flex-end;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40vw;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  min-width: 20vw;
`;

const testEvent = [
  {
    _id: "123450",
    title: "Embark Release",
    authorEmail: "Embark",
    startDate: "2021-04-03T08:00:00.000Z",
    endDate: "2021-04-03T09:00:00.000Z",
    description:
      "whats up guys aint this some awesome filler text come check out what we can do badslvjb sdvaksdjbv sadovnasdv asdovbalsdv",
    venue: "here what do you think",
    attendees: [123,147,1492,10238],
  },
];

const ClubEventsTab = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOwnEvents());
  }, []);

  const hostedEvents = useSelector((state) => state.user.ownEvents);
  const [viewDate, setViewDate] = useState(new Date());

  const [newEvent, setNewEvent] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [event, setEvent] = useState({});
  const loadExpanded = (e) => {
    setEvent(e);
    setExpanded(true);
  };
  useEffect(() => {
    StyleEventCalendar();
  }, []);

  const handleTime = (time) => {
    console.log(time);
    setViewDate(time);
  };

  useEffect(() => {
    var eventFound = false;
    if(!viewDate){
      setEvent({});
      return;
    }
    for (var i = 0; i < hostedEvents.length; i++) {
      const myDate = hostedEvents[i].startDate;
      if (
        myDate.getDate() === viewDate._d.getDate() &&
        myDate.getMonth() === viewDate._d.getMonth() &&
        myDate.getFullYear() === viewDate._d.getFullYear()
      ) {
        setEvent(hostedEvents[i]);
        eventFound = true;
      }
    }
    if (!eventFound) {
      setEvent({});
    }
  }, [viewDate]);

  const [showTest, setShowTest] = useState(false);
  useEffect(() => {
    const myDate = new Date(testEvent[0].startDate);
    if ( viewDate && myDate && viewDate._d &&
      myDate.getDate() === viewDate._d.getDate() &&
      myDate.getMonth() === viewDate._d.getMonth() &&
      myDate.getFullYear() === viewDate._d.getFullYear()
    ) {
      setShowTest(true);
    } else setShowTest(false);
  }, [viewDate]);

  return (
    <OuterWrapper>
      <ExpandedEvent
        open={expanded}
        handleClose={() => setExpanded(false)}
        e={event}
      />
      <NewEvent open={newEvent} handleClose={() => setNewEvent(false)} />
      <InnerWrapper>
        <BoldTypography sz={"24px"}>My Events</BoldTypography>
        {showTest ? (
          <ClubEvent loadExpanded={loadExpanded} e={testEvent[0]} test={true} />
        ) : (
          <></>
        )}
        {event == null ? (
          <ClubEvent loadExpanded={loadExpanded} e={event} test={false} />
        ) : (
          <></>
        )}
        <CreateButton onClick={() => setNewEvent(true)}>+</CreateButton>
      </InnerWrapper>
      <div>
        <Datetime
          input={false}
          onChange={handleTime}
          onClose={handleTime}
          value={viewDate}
          open={true}
          dateFormat="dddd, MMMM DD"
          timeFormat={false}
        />
      </div>
    </OuterWrapper>
  );
};

export default ClubEventsTab;
