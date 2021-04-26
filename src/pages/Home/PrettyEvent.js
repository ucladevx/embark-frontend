import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {
  ClubCardsContainer,
  ClubCard,
  ClubCardImage,
  ClubCardCaption,
  ExploreWrapper,
  ExploreTitle,
  ExploreInfoSeperator,
  ExploreObj,
  ExploreFilter,
  ExploreAddFilter,
  ExploreFilterTitle,
  ExploreSubtitle,
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
import devxImg from "../../images/devx.jpeg";
import dbImg from "../../images/dailyBruin.png";
import consultingImg from "../../images/bruinConsulting.png";
import { colors } from "../../shared/config";

const PrettyEvent = ({e}) => {

    return(
        <UpcomingItemBox>
        <UpcomingItem>
        <UpcomingItemImage src={avatarImg} alt="date"></UpcomingItemImage>
        <UpcomingItemInfoCol>
            <UpcomingItemTitle>{e.name}</UpcomingItemTitle>
            <UpcomingItemSubtitle>{e.organizerName}</UpcomingItemSubtitle>
        </UpcomingItemInfoCol>
        <UpcomingItemWhenBox>
            <UpcomingItemDate>{e.startDate}</UpcomingItemDate>
            <UpcomingItemGoingBtn
            bgcolor={colors.green1}
            textColor={colors.darkgreen}
            >
            Going
            </UpcomingItemGoingBtn>
        </UpcomingItemWhenBox>
        </UpcomingItem>
        </UpcomingItemBox>
    );
}

export default PrettyEvent;