import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
// Styles
import { Typography, TextField } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import LinkIcon from "@material-ui/icons/Link";
import {
  LandingPageWrapper,
  LeftWrapper,
  RightWrapper,
  FilterObj,
  FilterWrapper,
  QuestionBox,
  PostAvatar,
  PostContent,
  PostTag,
  AddFilter,
  EventAvatar,
  EventDescription,
  EventItem,
  EventItems,
  EventsWrapper,
  CalanderWrapper,
  ViewPost,
  ViewPreviousCommentLink,
  ViewPreviousCommentWrapper,
  PostHeader,
  PostTagWrapper,
  PostTitle,
  PreviousCommentItem,
  CommentWrapper,
  CommentIcon,
  PreviousCommentAvatar,
  PreviousCommentContent,
  InfoBoxes,
  InfoEntryWrapper,
  InfoImage,
  InfoSeperator,
  InfoEntryText,
  MiddleWrapper,
  AskaQuestion,
  AskAvatar,
  PostNameTime,
  PostTime,
  PostUserName,
} from "./StyleLanding";
import { BoldTypograhpy, TitleTypography } from "../../shared/Typography";
// Images
import avatarImg from "../../images/avatar.png";
import bookImg from "../../images/book.png";
import compassImg from "../../images/compass.png";
import { colors } from "../../shared/config";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/dataActions";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Landing = () => {
  // Redux
  const posts = useSelector((state) => state.data.posts);
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <NavBar></NavBar>
      <LandingPageWrapper>
        <LeftWrapper>
          <InfoBoxes>
            <InfoEntryWrapper>
              <InfoImage src={avatarImg} alt="user"></InfoImage>
              <InfoEntryText>Test User</InfoEntryText>
            </InfoEntryWrapper>
            <InfoSeperator></InfoSeperator>
            <InfoEntryWrapper>
              <InfoImage src={bookImg} alt="book"></InfoImage>
              <InfoEntryText>Saved Resources</InfoEntryText>
            </InfoEntryWrapper>
            <InfoSeperator></InfoSeperator>
            <InfoEntryWrapper>
              <InfoImage src={compassImg} alt="compass"></InfoImage>
              <InfoEntryText>Explore Clubs</InfoEntryText>
            </InfoEntryWrapper>
          </InfoBoxes>

          <FilterWrapper>
            <TitleTypography>Filters:</TitleTypography>
            <FilterObj color={colors.lightred}>Product Management</FilterObj>
            <FilterObj color={colors.darkyellow}>Product Deisign</FilterObj>
            <InfoSeperator style={{ marginTop: "15px" }}></InfoSeperator>
            <AddFilter>+ Add Filter</AddFilter>
          </FilterWrapper>
        </LeftWrapper>

        <MiddleWrapper>
          <QuestionBox>
            <AskAvatar></AskAvatar>
            <AskaQuestion
              InputProps={{ disableUnderline: true }}
              placeholder="Ask a question or start a conversation..."
              onChange={handleQuestionChange}
            ></AskaQuestion>
            {/* TODO: add two Icon buttons here */}

            <ImageIcon />
            <LinkIcon />
          </QuestionBox>

          <ViewPost>
            <PostHeader>
              {/* TODO: add two Icon buttons here */}
              <PostAvatar />
              <PostNameTime>
                <PostUserName>Christie Smith</PostUserName>
                <PostTime>{dayjs("2020-12-01").fromNow()}</PostTime>
              </PostNameTime>
              <PostTagWrapper>
                <PostTag color={colors.lightred}>Product Management</PostTag>
                <PostTag color={colors.mediumblue}>Computer Science</PostTag>
              </PostTagWrapper>
            </PostHeader>

            <PostTitle>How do I improve my product knowledge?</PostTitle>
            <PostContent>
              After taking the CS30 series, I realized I could not see myself
              coding for the rest of my life lol so I’m thinking of going into
              Product! Do any of you have any resources/tips on where to get
              started? Thanks :)
            </PostContent>

            <CommentWrapper>
              <TextField
                placeholder="Add your comment here..."
                fullWidth
              ></TextField>
            </CommentWrapper>
          </ViewPost>

          <ViewPreviousCommentWrapper>
            <ViewPreviousCommentLink>
              View previous comments
            </ViewPreviousCommentLink>
            <PreviousCommentItem>
              <PreviousCommentAvatar></PreviousCommentAvatar>
              <PreviousCommentContent>
                <Typography>Club1234</Typography>
                <Typography>
                  Hi user1234! Here is our answer to your question. :)
                </Typography>
              </PreviousCommentContent>
            </PreviousCommentItem>
          </ViewPreviousCommentWrapper>
        </MiddleWrapper>

        <RightWrapper>
          <CalanderWrapper>
            <TitleTypography>My Events</TitleTypography>
            <Calendar></Calendar>
          </CalanderWrapper>

          <EventsWrapper>
            <TitleTypography>Upcoming Events</TitleTypography>
            <EventItems>
              <EventItem>
                <EventAvatar></EventAvatar>
                <EventDescription>
                  <BoldTypograhpy>Demo Day</BoldTypograhpy>
                  <Typography>UCLA DevX</Typography>
                  <Typography>{dayjs().format("MM-DD HH:mm:ss")}</Typography>
                </EventDescription>
              </EventItem>
              <InfoSeperator></InfoSeperator>
              <EventItem>
                <EventAvatar></EventAvatar>
                <EventDescription>
                  <BoldTypograhpy>Industry Speaker</BoldTypograhpy>
                  <Typography>Club1234</Typography>
                  <Typography>{dayjs().format("MM-DD HH:mm:ss")}</Typography>
                </EventDescription>
              </EventItem>
            </EventItems>
          </EventsWrapper>
        </RightWrapper>
      </LandingPageWrapper>
    </div>
  );
};

export default Landing;
