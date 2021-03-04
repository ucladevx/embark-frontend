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

const Explore = () => {
  return (
    <ExploreWrapper>
      <ExploreTitle>Explore Clubs</ExploreTitle>

      <ExploreFilter>
        <ExploreFilterTitle>Filters:</ExploreFilterTitle>
        <ExploreObj bgcolor={colors.red1}>
          &times; Product Management
        </ExploreObj>
        <ExploreObj bgcolor={colors.darkyellow}>
          &times; Product Design
        </ExploreObj>
        <ExploreAddFilter>+ Add Filter</ExploreAddFilter>
      </ExploreFilter>

      {/* CLUB CARDS CONTAINER: */}
      <ClubCardsContainer>
        <OwlCarousel
          loop={true}
          autoplay={true}
          autoplaySpeed={1000}
          autoplayTimeout={2500}
          items={2}
          dots={false}
          className="owl-theme"
        >
          <div>
            <ClubCard>
              <ClubCardImage src={devxImg} />
              <ClubCardCaption>UCLA DevX</ClubCardCaption>
            </ClubCard>
          </div>
          <div>
            <ClubCard>
              <ClubCardImage src={consultingImg} />
              <ClubCardCaption>Bruin Consulting</ClubCardCaption>
            </ClubCard>
          </div>
          <div>
            <ClubCard>
              <ClubCardImage src={devxImg} />
              <ClubCardCaption>UCLA DevX</ClubCardCaption>
            </ClubCard>
          </div>
          <div>
            <ClubCard>
              <ClubCardImage src={dbImg} />
              <ClubCardCaption>Daily Bruin</ClubCardCaption>
            </ClubCard>
          </div>
          <div>
            <ClubCard>
              <ClubCardImage src={devxImg} />
              <ClubCardCaption>UCLA DevX</ClubCardCaption>
            </ClubCard>
          </div>
          <div>
            <ClubCard>
              <ClubCardImage src={dbImg} />
              <ClubCardCaption>Daily Bruin</ClubCardCaption>
            </ClubCard>
          </div>
        </OwlCarousel>
      </ClubCardsContainer>

      <ExploreInfoSeperator></ExploreInfoSeperator>

      <ExploreTitle style={{ "margin-top": 20 }}>Discover Events</ExploreTitle>
      <ExploreSubtitle>Events happening soon</ExploreSubtitle>

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
      <ViewMoreLink>View more</ViewMoreLink>

      <ExploreSubtitle>Filtered events</ExploreSubtitle>
      <ExploreFilter>
        <ExploreFilterTitle>Filters:</ExploreFilterTitle>
        <ExploreObj bgcolor={colors.red1}>
          &times; Product Management
        </ExploreObj>
        <ExploreObj bgcolor={colors.darkyellow}>
          &times; Product Design
        </ExploreObj>
        <ExploreAddFilter>+ Add Filter</ExploreAddFilter>
      </ExploreFilter>
      <UpcomingItemBox>
        <UpcomingItem>
          <UpcomingItemImage src={avatarImg} alt="date"></UpcomingItemImage>
          <UpcomingItemInfoCol>
            <UpcomingItemTitle>How to Ace the LSAT</UpcomingItemTitle>
            <UpcomingItemSubtitle>Pre-Law Society at UCLA</UpcomingItemSubtitle>
            <UpcomingItemObj bgcolor={colors.red1}>Law</UpcomingItemObj>
          </UpcomingItemInfoCol>
          <UpcomingItemWhenBox>
            <UpcomingItemDate>Feb 16 &middot; 3:00pm</UpcomingItemDate>
            <UpcomingItemGoingBtn
              bgcolor={colors.green1}
              textColor={colors.darkgreen}
            >
              Going
            </UpcomingItemGoingBtn>
          </UpcomingItemWhenBox>
        </UpcomingItem>
      </UpcomingItemBox>
    </ExploreWrapper>
  );
};

export default Explore;
