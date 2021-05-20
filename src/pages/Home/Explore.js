import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { getClubs } from "../../redux/actions/dataActions";
// Images
import avatarImg from "../../images/avatar.svg";
import devxImg from "../../images/devx.jpeg";
import dbImg from "../../images/dailyBruin.png";
import consultingImg from "../../images/bruinConsulting.png";
import { colors } from "../../shared/config";
import ClubThumbnail from "./ClubThumbnail";

const testClubs = [
  {
    name: "UCLA DevX",
    _id: 1,
    profilePicURL: devxImg,
  },
  {
    name: "Bruin Consulting",
    _id: 2,
    profilePicURL: consultingImg,
  },
  {
    name: "UCLA DevX",
    _id: 3,
    profilePicURL: devxImg,
  },
  {
    name: "Daily Bruin",
    _id: 4,
    profilePicURL: dbImg,
  },
  {
    name: "UCLA DevX",
    _id: 5,
    profilePicURL: devxImg,
  },
  {
    name: "Daily Bruin",
    _id: 6,
    profilePicURL: dbImg,
  },
];

const Explore = () => {
  const clubs = useSelector((state) => state.data.clubs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClubs());
  }, []);

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
          {testClubs.map((c) => {
            return <ClubThumbnail key={c._id + "key"} club={c} />;
          })}
          {clubs ? (
            clubs.map((c) => {
              return <ClubThumbnail key={c._id + "key"} club={c} />;
            })
          ) : (
            <></>
          )}
        </OwlCarousel>
      </ClubCardsContainer>

      <ExploreInfoSeperator></ExploreInfoSeperator>
      {/*
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
      </UpcomingItemBox>*/}
    </ExploreWrapper>
  );
};

export default Explore;
