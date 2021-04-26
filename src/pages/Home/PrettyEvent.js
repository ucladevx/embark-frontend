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

const PrettyEvent = ({ e, makeDay, goingClick, hasID, loadExpanded }) => {
  return (
    <UpcomingItemBox>
      <UpcomingItem>
        <UpcomingItemImage src={avatarImg} alt="date"
            onClick={() => {
                loadExpanded(e);
              }}
        ></UpcomingItemImage>
        <UpcomingItemInfoCol
            onClick={() => {
                loadExpanded(e);
              }}
        >
          <UpcomingItemTitle>{e.name}</UpcomingItemTitle>
          <UpcomingItemSubtitle>{e.organizerName}</UpcomingItemSubtitle>
        </UpcomingItemInfoCol>
        <UpcomingItemWhenBox>
          <UpcomingItemDate>{makeDay(e.startDate)}</UpcomingItemDate>
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
