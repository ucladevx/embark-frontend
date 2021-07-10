import React, { useState } from "react";
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
  ExploreAddFilterOpened,
  ExploreFilterCross,
  ExploreFilterTitle,
  ExploreFilterPopup,
  ExploreFilterPopupOpened,
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
import ClubThumbnail from "./ClubThumbnail";
import { useSelector, useDispatch } from "react-redux";
import {
  addClubFilter,
  removeClubFilter,
} from "../../redux/actions/dataActions";
import { FilterSharp } from "@material-ui/icons";

import { clubFilterOptions } from "../../shared/clubFilterOptions";

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

const FilterOption = ({ checkContains, handleFilter, filter }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={checkContains(filter)}
        name={filter}
        onClick={handleFilter}
      />{" "}
      <label style={{ margin: 0, padding: 0, color: "#838383" }}>
        {filter}
      </label>{" "}
      <br />
    </div>
  );
};

const colorCodes = [
  "FFADAD",
  "FFD6A5",
  "FDFFB6",
  "CAFFBF",
  "9BF6FF",
  "A0C4FF",
  "BDB2FF",
  "FFC6FF",
  "DFA98C",
];

const Explore = () => {
  const filter = useSelector((state) => state.data.clubFilters);
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useDispatch();

  const crossClicked = (title) => {
    dispatch(removeClubFilter(title));
  };

  const handleFilter = (e) => {
    let colorIndex = Math.floor(Math.random() * 9);
    let title = e.target.name;

    let newFilter = {
      title,
      visibility: true,
      color: "#" + colorCodes[colorIndex],
      id: filter.index,
    };

    if (checkContains(title)) {
      dispatch(removeClubFilter(title));
    } else {
      dispatch(addClubFilter(newFilter));
    }
  };

  const checkContains = (name) => {
    let index = filter.findIndex((oneFilter) => {
      return oneFilter.title === name;
    });

    return index !== -1;
  };

  const filterList = filter.map((item, index) => {
    if (!item.visibility) {
      return <span></span>;
    }
    return (
      <ExploreObj bgcolor={item.color}>
        <ExploreFilterCross onClick={() => crossClicked(item.title)}>
          &times;{" "}
        </ExploreFilterCross>{" "}
        {item.title}
      </ExploreObj>
    );
  });

  return (
    <ExploreWrapper>
      <ExploreTitle>Explore Clubs</ExploreTitle>

      <ExploreFilter>
        <ExploreFilterTitle>Filters:</ExploreFilterTitle>
        <div style={{ display: "flex", flexWrap: "wrap", width: "70%" }}>
          {filterList}
        </div>

        {openFilter ? (
          <ExploreAddFilterOpened onClick={() => setOpenFilter(!openFilter)}>
            + Add Filter
          </ExploreAddFilterOpened>
        ) : (
          <ExploreAddFilter onClick={() => setOpenFilter(!openFilter)}>
            + Add Filter
          </ExploreAddFilter>
        )}

        {openFilter && (
          <div>
            <ExploreFilterPopup>
              {clubFilterOptions.map((filter) => {
                return (
                  <FilterOption
                    style={{ maxHeight: 50, overflow: "auto" }}
                    key={filter}
                    checkContains={checkContains}
                    handleFilter={handleFilter}
                    filter={filter}
                  />
                );
              })}
            </ExploreFilterPopup>
          </div>
        )}
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
