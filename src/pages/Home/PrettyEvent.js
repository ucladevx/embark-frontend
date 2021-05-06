import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
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
  ViewMoreLink,
} from "./StyleExplore";
// Images
import avatarImg from "../../images/avatar.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  goingToEvent,
  cancelAttendingEvent,
} from "../../redux/actions/userActions";

// Dayjs
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const test = (moment) => {
  let date = moment.replace("T", " ");
  date = date.replace("Z", " ");
  date = date.concat(" GMT");
  return dayjs(date).format("MMM DD HH:mm a");
};

const PrettyEvent = (props) => {
  const makeDay = (moment) => {
    if (props.test) {
      return test(moment);
    }
    let date = JSON.stringify(moment);
    date = date.replace("T", " ");
    date = date.replace("Z", " ");
    date = date.concat(" GMT");
    return dayjs(date).format("MMM DD HH:mm a");
  };
  const dispatch = useDispatch();
  const attending = useSelector((state) => state.user.goingEvents);
  const hasID = (id) => {
    for (var i = 0; i < attending.length; i++) {
      if (attending[i]._id === id) {
        return true;
      }
    }
    return false;
  };
  const goingClick = (id) => {
    if (hasID(id)) {
      dispatch(goingToEvent(id));
    } else {
      dispatch(cancelAttendingEvent(id));
    }
  };
  return (
    <UpcomingItemBox key={props.e._id}>
      <UpcomingItem>
        <UpcomingItemImage
          src={avatarImg}
          alt="date"
          onClick={() => {
            props.loadExpanded(props.e);
          }}
        ></UpcomingItemImage>
        <UpcomingItemInfoCol
          onClick={() => {
            props.loadExpanded(props.e);
          }}
        >
          <UpcomingItemTitle>{props.e.name}</UpcomingItemTitle>
          <UpcomingItemSubtitle>{props.e.organizerName}</UpcomingItemSubtitle>
        </UpcomingItemInfoCol>
        <UpcomingItemWhenBox>
          <UpcomingItemDate
            onClick={() => {
              props.loadExpanded(props.e);
            }}
          >
            {makeDay(props.e.startDate)}
          </UpcomingItemDate>
          <UpcomingItemGoingBtn
            onClick={goingClick(props.e._id)}
            bgcolor={hasID(props.e._id)}
          >
            Going
          </UpcomingItemGoingBtn>
        </UpcomingItemWhenBox>
      </UpcomingItem>
    </UpcomingItemBox>
  );
};

export default PrettyEvent;
