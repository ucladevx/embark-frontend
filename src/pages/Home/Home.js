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
  PostTag,
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
  DialogTextField,
} from "./StyleLanding";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
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
  addFilter,
  removeFilter,
} from "../../redux/actions/dataActions";
import NewPost from "../../components/NewPost";
import Explore from "./Explore";
import { styleCalendar } from "./Calendar/HomeCalendar";
import Posts from "./Posts";
// Dayjs
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Home = () => {
  // Redux
  const filters = useSelector((state) => state.data.filter);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // States
  const [page, setPage] = useState("main");
  const [newPost, setNewPost] = useState(false);

  const tags = [{ key: "Product Management" }, { key: "Computer Science" }];

  useEffect(() => {
    dispatch(getPosts());
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
