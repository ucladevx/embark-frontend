import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
// import Calendar from "react-calendar";
import ExpandedEventPage from "./ExpandedEventPage";
// Styles
import "../../components/Calendar/HomeCalendar.css";
import ErrorPopup from "../..//components/ErrorPopup";

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
  // CalanderWrapper,
  InfoBoxes,
  InfoEntryWrapper,
  InfoImage,
  InfoProfilePic,
  InfoSeperator,
  InfoEntryText,
  MiddleContainer,
  DialogTextField,
} from "./StyleLanding";
// Images
import bookImg from "../../images/book.svg";
import compassImg from "../../images/compass.svg";
import avatarImg from "../../images/avatar.svg";

// Utils
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
// import { styleCalendar } from "../../components/Calendar/HomeCalendar";
import Posts from "./Posts";

// import Events from "./Events";
import DiscoverEvents from "./DiscoverEvents";
// import MyEvents from "./MyEvents";

// Dayjs
import { useHistory } from "react-router-dom";
// Dayjs
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Home = () => {
  // Redux
  const filters = useSelector((state) => state.data.filter);
  const user = useSelector((state) => state.user);
  const clubExpansionCase = useSelector((state) => state.ui.clubeventexpand);
  const dispatch = useDispatch();
  const history = useHistory();

  // States
  const [page, setPage] = useState("main");
  const [newPost, setNewPost] = useState(false);
  const [newEvent, setNewEvent] = useState(false);
  const [numEvents, setNumEvents] = useState(3);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [errorPopup, setErrorPopup] = useState(false);

  const openExpandedEventPage = (e) => {
    setPage("expandEvent");
    setSelectedEvent(e);
  };

  const closeExpandedEventPage = () => {
    dispatch({ type: "CLUB_EVENT_EXPANSION", payload: {} });
    setPage("main");
    setSelectedEvent({});
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEvents(numEvents));
  }, [dispatch, numEvents]);

  // useEffect(() => {
  //   styleCalendar();
  // }, []);

  useEffect(() => {
    if (clubExpansionCase._id) {
      openExpandedEventPage(clubExpansionCase);
    }
  }, [clubExpansionCase]);

  const removeUpdateFilters = (t) => {
    dispatch(removeFilter(t));
    dispatch(filterPosts());
  };

  const [tagToAdd, setTagToAdd] = useState("");
  const handleChange = (e) => {
    setTagToAdd(e.target.value);
  };

  const addUpdateFilter = (t) => {
    setTagToAdd("");
    dispatch(addFilter(t));
    dispatch(filterPosts());
  };

  // const openEvents = () => {
  //   setPage("events");
  //   setNumEvents(50);
  // };

  const closeEvents = () => {
    setPage("main");
    setNumEvents(3);
  };

  return (
    <>
      <NewPost open={newPost} handleClose={() => setNewPost(false)} />
      <NewEvent open={newEvent} handleClose={() => setNewEvent(false)} />
      <ErrorPopup open={errorPopup} onClose={() => setErrorPopup(false)} />
      <LandingPage>
        <NavBar setPage={setPage}></NavBar>
        <LandingPageWrapper>
          <LeftContainer>
            <div style={{ width: "100%", height: "4em" }}></div>
            <InfoBoxes>
              <InfoEntryWrapper
                onClick={() => history.push(`/user/${user._id}`)}
              >
                <InfoProfilePic
                  src={user.profilePicURL || avatarImg}
                  alt="user"
                ></InfoProfilePic>

                <InfoEntryText>
                  {user.firstName} {user.lastName}
                </InfoEntryText>
              </InfoEntryWrapper>
              <InfoSeperator></InfoSeperator>
              <InfoEntryWrapper
                onClick={() =>
                  window.open(
                    "https://drive.google.com/drive/folders/1rggLRrWshVaPzxT1sOvFqvBhW1OUdzuP?usp=sharing"
                  )
                }
              >
                <InfoImage src={bookImg} alt="book"></InfoImage>
                <InfoEntryText>Saved Resources</InfoEntryText>
              </InfoEntryWrapper>
              <InfoSeperator></InfoSeperator>
              <InfoEntryWrapper
                onClick={() => window.open("https://oncampus.us/")}
              >
                <InfoImage src={compassImg} alt="compass"></InfoImage>
                <InfoEntryText>Explore Clubs</InfoEntryText>
              </InfoEntryWrapper>
            </InfoBoxes>
          </LeftContainer>

          <MiddleContainer>
            {page === "main" ? (
              <Posts setNewPost={setNewPost}></Posts>
            ) : page === "explore" ? (
              <Explore></Explore>
            ) : page === "events" ? (
              <DiscoverEvents
                closeEvents={closeEvents}
                setExpandedEventPage={openExpandedEventPage}
              ></DiscoverEvents>
            ) : page === "expandEvent" ? (
              <>
                <ExpandedEventPage
                  e={selectedEvent}
                  close={closeExpandedEventPage}
                ></ExpandedEventPage>
              </>
            ) : (
              <Fragment></Fragment>
            )}
          </MiddleContainer>

          <RightContainer>
            {/* <CalanderWrapper onClick={() => setErrorPopup(true)}>
              <div style={{ width: "100%", height: "4em" }}></div>
              <Calendar></Calendar>
            </CalanderWrapper> */}

            <div></div>
            <div></div>
            {page === "main" && (
              <FilterWrapper>
                <FilterTitle>Filters:</FilterTitle>
                <InteriorFilterWrapper>
                  {filters.map((t) => (
                    <FilterObj
                      tag={t.toLowerCase()}
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
                  value={tagToAdd}
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
            {/* {page === "events" ? (
              <MyEvents></MyEvents>
            ) : (
              <Events
                setNewEvent={setNewEvent}
                openEvents={openEvents}
                setExpandedEventPage={openExpandedEventPage}
              />
            )} */}
          </RightContainer>
        </LandingPageWrapper>
      </LandingPage>
    </>
  );
};

export default Home;
