import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Calendar from "react-calendar";
// Styles
import "./Calendar/HomeCalendar.css";

import {
  LandingPage,
  LandingPageWrapper,
  LeftContainer,
  RightContainer,
  FilterTitle,
  FilterObj,
  FilterWrapper,
  InteriorFilterWrapper,
  AddFilter,
  CalanderWrapper,
  InfoBoxes,
  InfoEntryWrapper,
  InfoImage,
  InfoSeperator,
  InfoEntryText,
  MiddleContainer,
  EventTypography,
  GoingBtn,
  DialogTextField,
} from "./StyleLanding";
// Images
import avatarImg from "../../images/avatar.svg";
import bookImg from "../../images/book.svg";
import compassImg from "../../images/compass.svg";
// Utils
import { colors } from "../../shared/config";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  filterPosts,
  getEvents,
  addFilter,
  removeFilter,
} from "../../redux/actions/dataActions";
import NewPost from "../../components/NewPost";
import NewEvent from "../../components/NewEvent";
import Explore from "./Explore";
import { styleCalendar } from "./Calendar/HomeCalendar";
import Posts from "./Posts";

import Events from "./Events";

// Dayjs
import { useHistory } from "react-router-dom";
// Dayjs
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Home = () => {
  // Redux
  const filters = useSelector((state) => state.data.filter);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  // States
  const [page, setPage] = useState("main");
  const [newPost, setNewPost] = useState(false);
  const [newEvent, setNewEvent] = useState(false);

  const tags = [{ key: "Product Management" }, { key: "Computer Science" }];

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    styleCalendar();
  }, []);

  const removeUpdateFilters = (t) => {
    dispatch(removeFilter(t));
    dispatch(filterPosts());
  };
  const addUpdateFilter = (t) => {
    dispatch(addFilter(t));
    dispatch(filterPosts());
  };

  const [tagToAdd, setTagToAdd] = useState("");
  const handleChange = (e) => {
    setTagToAdd(e.target.value);
  };

  return (
    <>
      <NewPost open={newPost} handleClose={() => setNewPost(false)} />
      <NewEvent open={newEvent} handleClose={() => setNewEvent(false)} />
      <LandingPage>
        <NavBar></NavBar>
        <LandingPageWrapper>
          <LeftContainer>
            <InfoBoxes>
              <InfoEntryWrapper
                onClick={() => history.push(`/user/${user._id}`)}
              >
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
                <InteriorFilterWrapper>
                  {filters.map((t) => (
                    <FilterObj
                      tag={t}
                      key={t}
                      onClick={() => removeUpdateFilters(t)}
                    >
                      {t}
                    </FilterObj>
                  ))}
                </InteriorFilterWrapper>
                <InfoSeperator style={{ marginTop: "7px" }}></InfoSeperator>
                <DialogTextField
                  id="tag"
                  placeholder="Enter tag..."
                  type="text"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={handleChange}
                />
                <AddFilter onClick={() => addUpdateFilter(tagToAdd)}>
                  + Add Filter
                </AddFilter>
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
              <Calendar></Calendar>
            </CalanderWrapper>

            <Events setNewEvent={setNewEvent} />
          </RightContainer>
        </LandingPageWrapper>
      </LandingPage>
    </>
  );
};

export default Home;
