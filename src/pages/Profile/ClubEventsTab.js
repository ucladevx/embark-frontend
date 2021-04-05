import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { styleCalendar } from "../Home/Calendar/HomeCalendar";
import { StyleEventCalendar } from "../Home/Calendar/EventCalender";
import "../Home/Calendar/EventCalendar.css";
import Calendar from "react-calendar";
import { CalanderWrapper } from "../Home/StyleLanding";
import { ActionButton } from "../../shared/Buttons";
import styled from "styled-components";
import ClubEvent from "./ClubEvent";
import NewEvent from "../../components/NewEvent";
import ExpandedEvent from "../Home/ExpandedEvent";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
import { getOwnEvents } from "../../redux/actions/userActions";
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
  justify-content: flex-end;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const testEvent = [
  {
    _id: "123450",
    title: "Embark Release",
    authorEmail: "Embark",
    date: "2021-04-03T08:00:00.000Z",
    description:
      "whats up guys aint this some awesome filler text come check out what we can do badslvjb sdvaksdjbv sadovnasdv asdovbalsdv",
    location: "here what do you think",
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
    console.log(e);
    setEvent(e);
    console.log(event);
    setExpanded(true);
  };
  useEffect(() => {
    styleCalendar();
  }, []);

  useEffect(() => {
    console.log(viewDate.getUTCFullYear()+"-"+viewDate.getUTCMonth()+"-"+viewDate.getUTCDate());
    var eventFound = false;
    for(var i = 0; i<hostedEvents.length;i++){
      if(parseInt(hostedEvents[i].date.substring(0,4))===viewDate.getUTCFullYear()&&
      parseInt(hostedEvents[i].date.substring(5,7))===viewDate.getUTCMonth()&&
      parseInt(hostedEvents[i].date.substring(8,10))===viewDate.getUTCDate()){
          setEvent(hostedEvents[i]);
          eventFound = true;
        }
    }
    if(!eventFound){
      setEvent({});
    }
  },[viewDate]);
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
        {testEvent.map((p) => {
          return (
            <>
              <ClubEvent loadExpanded={loadExpanded} e={p} test={true} />
            </>
          );
        })}
        {
          event == null ? (<ClubEvent loadExpanded={loadExpanded} e={event} test={false} />) :
          (<></>)
        }
        <CreateButton onClick={() => setNewEvent(true)}>+</CreateButton>
      </InnerWrapper>
      <div>
        <Calendar
          onChange={setViewDate}
          value={viewDate}
        />
      </div>
    </OuterWrapper>
  );
};

export default ClubEventsTab;
