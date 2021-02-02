import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
// Styles
import ImageIcon from "@material-ui/icons/Image";
import LinkIcon from "@material-ui/icons/Link";
import {
  LandingPage,
  LandingPageWrapper,
  LeftContainer,
  RightContainer,
  FilterTitle,
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
  TimeTypography,
  CalanderWrapper,
  ViewPost,
  ViewCommentLink,
  ViewPreviousCommentWrapper,
  PostWrapper,
  PostHeader,
  PostTagWrapper,
  PostTitle,
  PreviousCommentItem,
  CommentWrapper,
  CommentTextField,
  PreviousCommentTitle,
  PreviousCommentAvatar,
  PreviousCommentContent,
  PreviousCommentText,
  CommentAvatar,
  LikeReply,
  LikeReplyText,
  InfoBoxes,
  InfoEntryWrapper,
  InfoImage,
  InfoSeperator,
  InfoEntryText,
  MiddleContainer,
  AskaQuestion,
  AskAvatar,
  PostNameTime,
  PostTime,
  PostUserName,
  EventTypography,
  GoingBtn,
} from "./StyleLanding";
import { BoldTypography, TitleTypography } from "../../shared/Typography";
// Images
import avatarImg from "../../images/avatar.png";
import bookImg from "../../images/book.png";
import compassImg from "../../images/compass.png";
// Utils
import { colors } from "../../shared/config";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/dataActions";
import NewPost from "../../components/NewPost";
import Explore from "./Explore";
// Dayjs
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Landing = () => {
  // Redux
  const posts = useSelector((state) => state.data.posts);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // States
  const [page, setPage] = useState("main");
  const [newPost, setNewPost] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

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
                <FilterObj bgcolor={colors.red1}>Product Management</FilterObj>
                <FilterObj bgcolor={colors.darkyellow}>
                  Product Deisign
                </FilterObj>
                <InfoSeperator style={{ marginTop: "7px" }}></InfoSeperator>
                <AddFilter>+ Add Filter</AddFilter>
              </FilterWrapper>
            )}
          </LeftContainer>

          <MiddleContainer>
            {page === "main" ? (
              <>
                <QuestionBox>
                  <AskAvatar></AskAvatar>
                  <AskaQuestion
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 12,
                      },
                    }}
                    placeholder="Ask a question or start a conversation..."
                    onClick={() => setNewPost(true)}
                  />
                  {/* TODO: add two Icon buttons here */}

                  <ImageIcon />
                  <LinkIcon />
                </QuestionBox>

                <ViewPost>
                  <PostWrapper>
                    <PostHeader>
                      {/* TODO: add two Icon buttons here */}
                      <PostAvatar />
                      <PostNameTime>
                        <PostUserName>Christie Smith</PostUserName>
                        <PostTime>{dayjs("2020-12-01").fromNow()}</PostTime>
                      </PostNameTime>
                      <PostTagWrapper>
                        <PostTag bgcolor={colors.red1}>
                          Product Management
                        </PostTag>
                        <PostTag bgcolor={colors.blue3}>
                          Computer Science
                        </PostTag>
                      </PostTagWrapper>
                    </PostHeader>

                    <PostTitle>
                      How do I improve my product knowledge?
                    </PostTitle>
                    <PostContent>
                      After taking the CS30 series, I realized I could not see
                      myself coding for the rest of my life lol so I’m thinking
                      of going into Product! Do any of you have any
                      resources/tips on where to get started? Thanks :)
                    </PostContent>
                  </PostWrapper>

                  <ViewPreviousCommentWrapper>
                    <ViewCommentLink>View previous comments</ViewCommentLink>
                    <PreviousCommentItem>
                      <PreviousCommentAvatar></PreviousCommentAvatar>
                      <div>
                        <PreviousCommentContent bgcolor={colors.lightpurple}>
                          <PreviousCommentTitle>UCLA DevX</PreviousCommentTitle>
                          <PreviousCommentText>
                            Hey Christie! We have a slidedeck all about product
                            thinking on our profile. You should totally apply to
                            be on one of our teams this quarter to gain some
                            more experience with the product development
                            process!!
                          </PreviousCommentText>
                        </PreviousCommentContent>
                        <LikeReply>
                          <LikeReplyText>Like</LikeReplyText>
                          <LikeReplyText disabled>·</LikeReplyText>
                          <LikeReplyText>Reply</LikeReplyText>
                        </LikeReply>
                      </div>
                    </PreviousCommentItem>
                    <PreviousCommentItem>
                      <PreviousCommentAvatar></PreviousCommentAvatar>
                      <div>
                        <PreviousCommentContent bgcolor={colors.gray1}>
                          <PreviousCommentTitle>
                            Justin Chen
                          </PreviousCommentTitle>
                          <PreviousCommentText>
                            Same!! The CS30 series killed my GPA.
                          </PreviousCommentText>
                        </PreviousCommentContent>
                        <LikeReply>
                          <LikeReplyText>Like</LikeReplyText>
                          <LikeReplyText disabled>·</LikeReplyText>
                          <LikeReplyText>Reply</LikeReplyText>
                        </LikeReply>
                      </div>
                    </PreviousCommentItem>
                    <ViewCommentLink>View More comments</ViewCommentLink>
                  </ViewPreviousCommentWrapper>
                  <CommentWrapper>
                    <CommentAvatar></CommentAvatar>
                    <CommentTextField
                      placeholder="Write a comment..."
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          fontSize: 12,
                        },
                      }}
                    ></CommentTextField>
                  </CommentWrapper>
                  {posts.map((p) => {
                    return (
                      <PostWrapper key={p._id}>
                        <PostHeader>
                          <PostAvatar />
                          <PostNameTime>
                            <PostUserName>{p.authorEmail}</PostUserName>
                            <PostTime>{dayjs(p.timestamp).fromNow()}</PostTime>
                          </PostNameTime>
                          <PostTagWrapper>
                            {p.tags.map((t) => (
                              <PostTag bgcolor={colors.red1} key={t}>
                                {t}
                              </PostTag>
                            ))}
                          </PostTagWrapper>
                        </PostHeader>
                        <PostTitle>{p.title}</PostTitle>
                        <PostContent>{p.body}</PostContent>
                      </PostWrapper>
                    );
                  })}
                </ViewPost>
              </>
            ) : page === "explore" ? (
              <Explore></Explore>
            ) : (
              <></>
            )}
          </MiddleContainer>

          <RightContainer>
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

export default Landing;
