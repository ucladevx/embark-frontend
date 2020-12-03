import React, { useState } from "react";
import NavBar from "../components/NavBar";
import styled, { css } from "styled-components";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { colors } from "../shared/config";
import { Avatar, Button, TextField, Typography } from "@material-ui/core";

const LandingPageWrapper = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(10, 1fr);
`;
const FilterWrapper = styled.div`
  display: flex;
  gap: 40px;
  grid-row: 1;
  grid-column: 3;
  margin-top: 60px;
  margin-left: 20px;
  align-items: center;
`;
const FilterShared = css`
  width: 120.96px;
  height: 40.66px;
  background-color: ${colors.gray};
  display: grid;
  place-items: center;
  border-radius: 10px;
`;
const FilterObj = styled(Typography)`
  ${FilterShared}
`;
const AddFilter = styled(Button)`
  ${FilterShared}
  text-transform: none;
  &:hover {
    opacity: 0.8;
    background: ${colors.lightgray};
  }
`;

const QuestionBox = styled(TextField)`
  padding: 10px 0 0 20px;
  box-sizing: border-box;
  width: 100%;
  height: 80%;
  background-color: ${colors.gray};
  &::placeholder {
    color: black;
  }
`;

const PostButton = styled(Button)`
  width: 89px;
  height: 30px;
  border-radius: 8px;
  position: absolute;
  right: 1vw;
  bottom: 70px;
  text-transform: none;
  background: ${colors.lightgray};
`;

const MakePostWrapper = styled.div`
  grid-column: 3 / 5;
  grid-row: 2 / 4;
  position: relative;
  /* display: flex; */
  margin-top: 10px;
`;
const CalanderWrapper = styled.div`
  margin-left: 3vw;
  grid-row: 2 / 6;
  grid-column: 5 / 6;
  margin-top: -32px;
`;
const TitleTypography = styled(Typography)`
  font-weight: bold;
  font-size: 23px;
  margin-bottom: 10px;
`;

const EventsWrapper = styled.div`
  margin-left: 3vw;
  grid-column: 5 / 6;
  grid-row: 5 / 10;
  /* margin-left: -10px; */
  /* margin-top: 80px; */
`;

const EventItems = styled.div`
  background-color: ${colors.gray};
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 250px;
`;

const EventItem = styled.div`
  display: flex;
`;

const EventDescription = styled.div`
  margin-left: 15px;
`;
const BoldTypograhpy = styled(Typography)`
  font-weight: bold;
`;
const EventAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 15px;
  background-color: ${colors.darkgray};
`;
const ViewPost = styled.div`
  grid-row: 5 / 7;
  margin-top: -140px;
  background: ${colors.gray};
  grid-column: 3 / 5;
  padding: 20px 30px;
`;
const PostHeader = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const PostAvatar = styled(Avatar)`
  width: 28px;
  height: 28px;
  margin-right: 10px;
`;
const PostTagWrapper = styled.div`
  margin-left: auto;
  display: flex;
  gap: 20px;
`;
const PostTag = styled(Button)`
  background-color: ${colors.darkgray};
  color: ${colors.white};
  text-transform: none;
  width: 51px;
  height: 25px;
  border-radius: 10px;
`;

const PostTitle = styled(BoldTypograhpy)`
  margin-top: 20px;
  font-size: 25px;
`;

const PostContent = styled(Typography)`
  margin-top: 30px;
`;

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
  gap: 20px;
`;

const CommentIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const ViewPreviousCommentLink = styled(Typography)`
  text-decoration: underline;
  background: none;
  margin: 10px 0 0 10px;
  color: ${colors.darkgray};
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const PreviousCommentItem = styled.div`
  display: flex;
`;

const PreviousCommentAvatar = styled(Avatar)`
  width: 30px;
  height: 30px;
  margin-left: 30px;
`;
const ViewPreviousCommentWrapper = styled.div`
  background: ${colors.lightgray};
  grid-column: 3 / 5;
  grid-row: 7 / 8;
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 5px 20px;
`;
const PreviousCommentContent = styled.div`
  display: flex;
  margin-left: 20px;
  flex-direction: column;
`;

const Landing = () => {
  const [question, setQuestion] = useState("");
  const onQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  return (
    <div>
      <NavBar></NavBar>
      <LandingPageWrapper>
        <FilterWrapper>
          <Typography>Filter:</Typography>
          <FilterObj>Product</FilterObj>
          <FilterObj>Tech</FilterObj>
          <AddFilter>+ Add Tag</AddFilter>
        </FilterWrapper>

        <MakePostWrapper>
          <QuestionBox
            multiline
            rows={10}
            placeholder="Ask a question"
            fullWidth
            InputProps={{
              disableUnderline: true,
            }}
            onChange={onQuestionChange}
          ></QuestionBox>
          <PostButton>Post</PostButton>
        </MakePostWrapper>

        <CalanderWrapper>
          <TitleTypography>My Events</TitleTypography>
          <Calendar></Calendar>
        </CalanderWrapper>

        <EventsWrapper>
          <TitleTypography>Upcoming Events</TitleTypography>
          <EventItems>
            <EventItem>
              <EventAvatar>FEB 30</EventAvatar>
              <EventDescription>
                <Typography>Club1234</Typography>
                <BoldTypograhpy>Industry Speaker</BoldTypograhpy>
              </EventDescription>
            </EventItem>
            <EventItem>
              <EventAvatar>FEB 30</EventAvatar>
              <EventDescription>
                <Typography>Club1234</Typography>
                <BoldTypograhpy>Industry Speaker</BoldTypograhpy>
              </EventDescription>
            </EventItem>
          </EventItems>
        </EventsWrapper>

        <ViewPost>
          <PostHeader>
            <PostAvatar>U</PostAvatar>
            <Typography>user1234</Typography>
            <PostTagWrapper>
              <PostTag>Tag</PostTag>
              <PostTag>Tag</PostTag>
            </PostTagWrapper>
          </PostHeader>
          <PostTitle>Example Post Title!</PostTitle>
          <PostContent>
            Hi! This is some example text about a hypothetical question I have
            about this random topic, I was wondering if anyone has any tips?
            Thanks! Hi! This is some example text about a hypothetical question
            I have about this random topic, I was wondering if anyone has any
            tips? Thanks! Hi! This is some example text about a hypothetical
            question I have about this random topic, I was wondering if anyone
            has any tips? Thanks!
          </PostContent>

          <CommentWrapper>
            <CommentIcon src="commentIcon.png" alt="commentIcon"></CommentIcon>
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
      </LandingPageWrapper>
    </div>
  );
};

export default Landing;
