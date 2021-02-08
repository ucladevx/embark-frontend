import React from "react";
import ImageIcon from "@material-ui/icons/Image";
import LinkIcon from "@material-ui/icons/Link";
import {
  QuestionBox,
  AskAvatar,
  AskaQuestion,
  ViewPost,
  PostAvatar,
  PostTitle,
  PostContent,
  ViewCommentLink,
  ViewPreviousCommentWrapper,
  PostWrapper,
  PostHeader,
  PostTagWrapper,
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
  PostNameTime,
  PostTime,
  PostUserName,
  PostTag,
} from "./StyleLanding";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../../shared/config";
// Infinite Scroll
import InfiniteScroll from "react-infinite-scroll-component";

// Dayjs
import dayjs from "dayjs";
import { getNextPosts } from "../../redux/actions/dataActions";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Posts = ({ setNewPost }) => {
  const posts = useSelector((state) => state.data.posts);
  const tags = [{ key: "Product Management" }, { key: "Computer Science" }];
  const dispatch = useDispatch();
  const renderedTags = tags.map((each) => {
    return (
      <div key={each.key}>
        <PostTag tag={each.key}>{each.key}</PostTag>
      </div>
    );
  });
  const getMorePosts = () => {
    dispatch(getNextPosts());
  };
  return (
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
            <PostTagWrapper>{renderedTags}</PostTagWrapper>
          </PostHeader>

          <PostTitle>How do I improve my product knowledge?</PostTitle>
          <PostContent>
            After taking the CS30 series, I realized I could not see myself
            coding for the rest of my life lol so I’m thinking of going into
            Product! Do any of you have any resources/tips on where to get
            started? Thanks :)
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
                  Hey Christie! We have a slidedeck all about product thinking
                  on our profile. You should totally apply to be on one of our
                  teams this quarter to gain some more experience with the
                  product development process!!
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
                <PreviousCommentTitle>Justin Chen</PreviousCommentTitle>
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
        <InfiniteScroll
          dataLength={posts.length}
          next={getMorePosts}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
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
                      <PostTag tag={t} key={t}>
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
        </InfiniteScroll>
      </ViewPost>
    </>
  );
};

export default Posts;
