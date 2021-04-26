import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Button } from "@material-ui/core";

import { StyleEventCalendar } from "../../components/Calendar/EventCalender";
import "../../components/Calendar/EventCalendar.css";
import Datetime from "react-datetime";
import { ActionButton } from "../../shared/Buttons";
import styled from "styled-components";
import ClubEvent from "./ClubEvent";
import NewEvent from "../../components/NewEvent";
import ExpandedEvent from "../Home/ExpandedEvent";
import { BoldTypography } from "../../shared/Typography";
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

export const ChangeViewButton = styled(Button)`
  width: 89px;
  height: 30px;
  border-radius: 8px;
  font-size: 14px;
  text-transform: none;
  color: #ffffff;
  background: #5473bb;
  border-radius: 5px;
  display: flex;
  align-self: flex-start;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`;

const testEvent = [
  {
    _id: "123450",
    title: "Embark Release",
    organizerName: "Embark",
    startDate: "2021-04-03T08:00:00.000Z",
    endDate: "2021-04-03T09:00:00.000Z",
    description:
      "whats up guys aint this some awesome filler text come check out what we can do badslvjb sdvaksdjbv sadovnasdv asdovbalsdv",
    venue: "here what do you think",
    attendees: [123, 147, 1492, 10238],
  },
];

const ClubEventsTab = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOwnEvents());
  }, []);

  const hostedEvents = useSelector((state) => state.user.ownEvents);
  const [viewDate, setViewDate] = useState(new Date());
  const [viewAll, setViewAll] = useState(false);

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
    if (!viewDate) {
      setEvent({});
      return;
    }
    for (let i = 0; i < hostedEvents.length; i++) {
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
  }, [viewDate, hostedEvents]);

  const [showTest, setShowTest] = useState(false);
  useEffect(() => {
    const myDate = new Date(testEvent[0].startDate);
    if (
      viewDate &&
      myDate &&
      viewDate._d &&
      myDate.getDate() === viewDate._d.getDate() &&
      myDate.getMonth() === viewDate._d.getMonth() &&
      myDate.getFullYear() === viewDate._d.getFullYear()
    ) {
      setShowTest(true);
    } else setShowTest(false);
  }, [viewDate]);

  const [viewButton, setViewButton] = useState("View All");
  const changeView = () => {
    setViewAll(!viewAll);
    if (viewButton === "View All") {
      setViewButton("View Date");
    } else {
      setViewButton("View All");
    }
  };

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
        {showTest & !viewAll ? (
          <ClubEvent loadExpanded={loadExpanded} e={testEvent[0]} test={true} />
        ) : (
          <></>
        )}
        {viewAll ? (
          hostedEvents.map((e) => {
            return (
              <>
                <ClubEvent loadExpanded={loadExpanded} e={e} test={false} />
              </>
            );
          })
        ) : event === null ? (
          <ClubEvent loadExpanded={loadExpanded} e={event} test={false} />
        ) : (
          <></>
        )}
        <ButtonWrapper>
          <ChangeViewButton onClick={changeView}>{viewButton}</ChangeViewButton>
          <CreateButton onClick={() => setNewEvent(true)}>+</CreateButton>
        </ButtonWrapper>
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
