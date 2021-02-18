import React from 'react';
import ImageIcon from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';
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
  PreviousCommentTitle,
  PreviousCommentAvatar,
  PreviousCommentContent,
  PreviousCommentText,
  LikeReply,
  LikeReplyText,
  PostNameTime,
  PostTime,
  PostUserName,
  PostTag,
} from './StyleLanding';
import {CircularProgress} from '@material-ui/core';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {colors} from '../../shared/config';

// Infinite Scroll
import InfiniteScroll from 'react-infinite-scroll-component';

// Dayjs
import dayjs from 'dayjs';
import {getNextPosts} from '../../redux/actions/dataActions';
import Interactive from './Interactive';
import WriteComment from './WriteComment';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const Circle = styled(CircularProgress)`
  margin: 10px;
  color: ${colors.blue1};
`;

const Loader = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Circle></Circle>
    </div>
  );
};

const Posts = ({setNewPost}) => {
  const posts = useSelector((state) => state.data.posts);
  const tags = [{key: 'Product Management'}, {key: 'Computer Science'}];
  const dispatch = useDispatch();
  const hasNext = useSelector((state) => state.data.hasNext);
  const renderedTags = tags.map((each) => {
    return (
      <div key={each.key}>
        <PostTag tag={each.key}>{each.key}</PostTag>
      </div>
    );
  });
  const getMorePosts = () => {
    if (hasNext) dispatch(getNextPosts());
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
        <ImageIcon />
        <LinkIcon />
      </QuestionBox>

      <ViewPost>
        <PostWrapper>
          <PostHeader>
            <PostAvatar />
            <PostNameTime>
              <PostUserName>Christie Smith</PostUserName>
              <PostTime>{dayjs('2020-12-01').fromNow()}</PostTime>
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
          <Interactive></Interactive>
          <ViewCommentLink>View More comments</ViewCommentLink>
          <WriteComment></WriteComment>
        </ViewPreviousCommentWrapper>
        <InfiniteScroll
          dataLength={posts.length}
          next={getMorePosts}
          hasMore={hasNext}
          loader={<Loader></Loader>}
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
                <Interactive></Interactive>
                <WriteComment></WriteComment>
              </PostWrapper>
            );
          })}
        </InfiniteScroll>
      </ViewPost>
    </>
  );
};

export default Posts;
