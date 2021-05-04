import React, { useState } from "react";
import {
  EventItems,
  AddFilter,
} from "./StyleLanding";
import {
  UpcomingItemBox,
  UpcomingItem,
  UpcomingItemImage,
  UpcomingItemInfoCol,
  UpcomingItemTitle,
  UpcomingItemSubtitle,
  UpcomingItemObj,
  UpcomingItemWhenBox,
  UpcomingItemDate,
  UpcomingItemGoingBtn,
} from "./StyleExplore";
// Images
import avatarImg from "../../images/avatar.svg";
import { colors } from "../../shared/config";
import styled from "styled-components";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
import { useSelector } from "react-redux";
import { goingToEvent } from "../../redux/actions/userActions";
import ExpandedEvent from "./ExpandedEvent.js";
import PrettyEvent from "./PrettyEvent.js";
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
        <UpcomingItemBox>
        <UpcomingItem>
          <UpcomingItemImage src={avatarImg} alt="date"></UpcomingItemImage>
          <UpcomingItemInfoCol>
            <UpcomingItemTitle>How to Ace the LSAT</UpcomingItemTitle>
            <UpcomingItemSubtitle>Pre-Law Society at UCLA</UpcomingItemSubtitle>
            <UpcomingItemObj bgcolor={colors.purple}>Law</UpcomingItemObj>
          </UpcomingItemInfoCol>
          <UpcomingItemWhenBox>
            <UpcomingItemDate>Feb 11 &middot; 7:00pm</UpcomingItemDate>
            <UpcomingItemGoingBtn
              bgcolor={colors.green1}
              textColor={colors.darkgreen}
            >
              Going
            </UpcomingItemGoingBtn>
          </UpcomingItemWhenBox>
        </UpcomingItem>
      </UpcomingItemBox>

      <UpcomingItemBox>
        <UpcomingItem>
          <UpcomingItemImage src={avatarImg} alt="date"></UpcomingItemImage>
          <UpcomingItemInfoCol>
            <UpcomingItemTitle>Medical School Interview Tips</UpcomingItemTitle>
            <UpcomingItemSubtitle>
              American Medical School Association
            </UpcomingItemSubtitle>
            <UpcomingItemObj bgcolor={colors.red1}>Health</UpcomingItemObj>
          </UpcomingItemInfoCol>
          <UpcomingItemWhenBox>
            <UpcomingItemDate>Feb 11 &middot; 7:00pm</UpcomingItemDate>
            <UpcomingItemGoingBtn
              bgcolor={colors.green1}
              textColor={colors.darkgreen}
            >
              Going
            </UpcomingItemGoingBtn>
          </UpcomingItemWhenBox>
        </UpcomingItem>
        </UpcomingItemBox>

          {testEvent.map((p) => {
            return (
              <>
                <PrettyEvent loadExpanded={loadExpanded} e={p} test={true} />
              </>
            );
          })}
          {events.map((e) => {
            return (
              <>
                <PrettyEvent loadExpanded={loadExpanded} e={e} test={false} />
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
