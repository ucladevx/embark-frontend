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
  CalanderWrapper,
  InfoBoxes,
  InfoEntryWrapper,
  InfoImage,
  InfoSeperator,
  InfoEntryText,
  MiddleContainer,
} from "./StyleLanding";
// Images
import avatarImg from "../../images/avatar.svg";
import bookImg from "../../images/book.svg";
import compassImg from "../../images/compass.svg";
// Utils
import { colors } from "../../shared/config";
import { styleCalendar } from "./calendar";

import { useSelector, useDispatch } from "react-redux";
import { getPosts, getEvents } from "../../redux/actions/dataActions";
import NewPost from "../../components/NewPost";
import NewEvent from "../../components/NewEvent"
import Explore from "./Explore";
import Posts from "./Posts";
import Events from "./Events";

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
  const [newEvent, setNewEvent] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEvents());
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
      <NewEvent open={newEvent} handleClose={() => setNewEvent(false)} />
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

            <Events setNewEvent = {setNewEvent}/>
          </RightContainer>
        </LandingPageWrapper>
      </LandingPage>
    </>
  );
};

export default Home;
