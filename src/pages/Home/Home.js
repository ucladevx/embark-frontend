import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import "./calendar.css";
import Calendar from "react-calendar";
// Styles
import {
  LandingPage,
  LandingPageWrapper,
  LeftContainer,
  RightContainer,
  FilterTitle,
  FilterObj,
  FilterWrapper,
  AddFilter,
  EventAvatar,
  EventDescription,
  EventItem,
  EventItems,
  EventsWrapper,
  TimeTypography,
  CalanderWrapper,
  InfoBoxes,
  InfoEntryWrapper,
  InfoImage,
  InfoSeperator,
  InfoEntryText,
  MiddleContainer,
  EventTypography,
  GoingBtn,
} from "./StyleLanding";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
// Images
import avatarImg from "../../images/avatar.svg";
import bookImg from "../../images/book.svg";
import compassImg from "../../images/compass.svg";
// Utils
import { colors } from "../../shared/config";
import { styleCalendar } from "./calendar";

import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/dataActions";
import NewPost from "../../components/NewPost";
import Explore from "./Explore";
import Posts from "./Posts";

// Dayjs
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Home = () => {
  // Redux
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // States
  const [page, setPage] = useState("main");
  const [newPost, setNewPost] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    styleCalendar();
  }, []);

  useEffect(() => {
    if (!window.localStorage.getItem("AuthToken")) history.push("/");
  }, [history]);

  return (
    <>
      <NewPost open={newPost} handleClose={() => setNewPost(false)} />
      <LandingPage>
        <NavBar></NavBar>
        <LandingPageWrapper>
          <LeftContainer>
            <InfoBoxes>
              <InfoEntryWrapper onClick={() => setPage("main")}>
                <InfoImage src={avatarImg} alt="user"></InfoImage>
                <InfoEntryText>{user.name}</InfoEntryText>
              </InfoEntryWrapper>
              <InfoSeperator></InfoSeperator>
              <InfoEntryWrapper>
                <InfoImage src={bookImg} alt="book"></InfoImage>
                <InfoEntryText>Saved Resources</InfoEntryText>
              </InfoEntryWrapper>
              <InfoSeperator></InfoSeperator>
              <InfoEntryWrapper onClick={() => setPage("explore")}>
                <InfoImage src={compassImg} alt="compass"></InfoImage>
                <InfoEntryText>Explore Clubs</InfoEntryText>
              </InfoEntryWrapper>
            </InfoBoxes>

            {page === "main" && (
              <FilterWrapper>
                <FilterTitle>Filters:</FilterTitle>
                <FilterObj tag="Product Management">
                  Product Management
                </FilterObj>
                <FilterObj tag="Product Design">Product Design</FilterObj>
                <InfoSeperator style={{ marginTop: "7px" }}></InfoSeperator>
                <AddFilter>+ Add Filter</AddFilter>
              </FilterWrapper>
            )}
          </LeftContainer>

          <MiddleContainer>
            {page === "main" ? (
              <Posts setNewPost={setNewPost}></Posts>
            ) : page === "explore" ? (
              <Explore></Explore>
            ) : (
              <></>
            )}
          </MiddleContainer>

          <RightContainer>
            <CalanderWrapper>
              <Calendar calendarType={"US"}></Calendar>
            </CalanderWrapper>

            <EventsWrapper>
              <TitleTypography>Upcoming Events</TitleTypography>
              <EventItems>
                <EventItem>
                  <EventAvatar></EventAvatar>
                  <EventDescription>
                    <BoldTypography sz={"16px"}>Demo Day</BoldTypography>
                    <EventTypography>UCLA DevX</EventTypography>
                    <TimeTypography>
                      {dayjs().format("MMM DD HH:mm a")}
                    </TimeTypography>
                  </EventDescription>
                  <GoingBtn bgcolor={colors.green1} fcolor={colors.darkgreen}>
                    Going
                  </GoingBtn>
                </EventItem>
                <InfoSeperator></InfoSeperator>
                <EventItem>
                  <EventAvatar></EventAvatar>
                  <EventDescription>
                    <BoldTypography sz={"16px"}>Winter Info...</BoldTypography>
                    <EventTypography>Club1234</EventTypography>
                    <TimeTypography>
                      {dayjs().format("MMM DD HH:mm a")}
                    </TimeTypography>
                  </EventDescription>
                  <GoingBtn bgcolor={colors.gray1} fcolor={colors.gray2}>
                    Going
                  </GoingBtn>
                </EventItem>
              </EventItems>
            </EventsWrapper>
          </RightContainer>
        </LandingPageWrapper>
      </LandingPage>
    </>
  );
};

export default Home;
