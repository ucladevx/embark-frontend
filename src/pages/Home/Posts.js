import React from "react";
import ImageIcon from "@material-ui/icons/Image";
import LinkIcon from "@material-ui/icons/Link";
import { ReactTinyLink } from "react-tiny-link"; //uses https://cors-anywhere.herokuapp.com by default.
import Linkify from "react-linkify";
import {
  QuestionBox,
  AskAvatar,
  AskaQuestion,
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
  FilesWrapper,
} from "./StyleLanding";
import { CircularProgress, Button } from "@material-ui/core";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../../shared/config";

// Infinite Scroll
import InfiniteScroll from "react-infinite-scroll-component";

// Dayjs
import dayjs from "dayjs";
import { getNextPosts } from "../../redux/actions/dataActions";
import Interactive from "./Interactive";
import WriteComment from "./Comment/WriteComment";
import FileViewer from "@studyworld/react-file-viewer";
import CommentBox from "./Comment/CommentBox";
import thumbup from "../../images/thumbup.svg";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Circle = styled(CircularProgress)`
  margin: 10px;
  color: ${colors.blue3};
`;

const LikeCommentCount = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  color: ${colors.gray6};
  font-size: 12px;
  p:last-child {
    margin-left: auto;
  }
`;

export const FileButton = styled(Button)`
  width: 89px;
  height: 30px;
  border-radius: 8px;
  text-transform: none;
  background: ${colors.pink};
  display: flex;
  flex-direction: column;
`;

const backendHost = "https://embark-backend-dev.herokuapp.com";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Circle></Circle>
    </div>
  );
};

const Posts = ({ setNewPost }) => {
  // Redux
  const posts = useSelector((state) => state.data.posts);
  const user = useSelector((state) => state.user);
  const hasNext = useSelector((state) => state.data.hasNext);
  const dispatch = useDispatch();

  const tags = [{ key: "Product Management" }, { key: "Computer Science" }];
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
  //for test files, go to https://cors-anywhere.herokuapp.com to enable CORS on non-cors file links, see below for format
  const testfiles = [
    "https://club-resources-embark.s3.amazonaws.com/1625887134027ws7.pdf",
  ];

  const getUrls = require("get-urls"); //url finder
  const getURL = (body) => {
    const urlSet = getUrls(body);
    if (urlSet.size <= 0) return "";
    const iterator = urlSet[Symbol.iterator]();
    return iterator.next().value;
  };

  const isSaved = (post_id) => {
    return user.savedPosts && user.savedPosts.includes(post_id);
  };

  const isLiked = (post_id) => {
    return user.likedPosts && user.likedPosts.includes(post_id);
  };

  return (
    <>
      <QuestionBox>
        <AskAvatar src={user.profilePicURL}></AskAvatar>
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

      <PostWrapper>
        <PostHeader>
          <PostAvatar />
          <PostNameTime>
            <PostUserName>Christie Smith</PostUserName>
            <PostTime>{dayjs("2020-12-01").fromNow()}</PostTime>
          </PostNameTime>
          <PostTagWrapper>{renderedTags}</PostTagWrapper>
        </PostHeader>
        <PostTitle>How do I improve my product knowledge?</PostTitle>
        <Linkify>
          <PostContent>
            After taking the CS30 series, I realized I could not see myself
            coding for the rest of my life lol so I’m thinking of going into
            Product! Do any of you have any resources/tips on where to get
            started? Thanks :)
          </PostContent>
        </Linkify>
        {testfiles &&
          testfiles.map((f, i) => {
            return (
              <FilesWrapper key={i}>
                <FileButton onClick={() => window.open(f, "_blank")}>
                  Expand File
                </FileButton>
                <FileViewer
                  tag={f}
                  fileType={f.substring(f.lastIndexOf(".") + 1)}
                  filePath={backendHost + "/" + f}
                />
              </FilesWrapper>
            );
          })}

        <LikeCommentCount>
          <div style={{ display: "flex", gap: "3px" }}>
            <img
              src={thumbup}
              alt="thumbup"
              style={{ marginTop: "-3px" }}
            ></img>
            {/* count the # of likes */}
            <p>11</p>
          </div>
          <p>5 Comments</p>
        </LikeCommentCount>
        <Interactive
          post_id={"6012dce8eb36de011c96c7e4"}
          isSaved={isSaved("6012dce8eb36de011c96c7e4")}
          isLiked={isLiked("6012dce8eb36de011c96c7e4")}
        />
        <ViewPreviousCommentWrapper>
          <ViewCommentLink>View previous comments</ViewCommentLink>
          <PreviousCommentItem>
            <PreviousCommentAvatar></PreviousCommentAvatar>
            <div>
              <PreviousCommentContent bgcolor={colors.lightpurple}>
                <PreviousCommentTitle>UCLA DevX</PreviousCommentTitle>
                <Linkify>
                  <PreviousCommentText>
                    Hey Christie! We have a slidedeck all about product thinking
                    on our profile. You should totally apply to be on one of our
                    teams this quarter to gain some more experience with the
                    product development process!! https://ucladevx.com/
                  </PreviousCommentText>
                </Linkify>
                <ReactTinyLink
                  cardSize="small"
                  showGraphic={true}
                  maxLine={2}
                  minLine={1}
                  proxyUrl={backendHost}
                  url={getURL(
                    "Hey Christie! We have a slidedeck all about product thinking on our profile. You should totally apply to be on one of our teams this quarter to gain some more experience with the product development process!! https://ucladevx.com/",
                  )}
                />
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
                <Linkify>
                  <PreviousCommentText>
                    Same!! The CS30 series killed my GPA.
                  </PreviousCommentText>
                </Linkify>
              </PreviousCommentContent>
              <LikeReply>
                <LikeReplyText>Like</LikeReplyText>
                <LikeReplyText disabled>·</LikeReplyText>
                <LikeReplyText>Reply</LikeReplyText>
              </LikeReply>
            </div>
          </PreviousCommentItem>
          <ViewCommentLink>View More comments</ViewCommentLink>
          <WriteComment></WriteComment>
        </ViewPreviousCommentWrapper>
      </PostWrapper>

      <InfiniteScroll
        dataLength={posts && posts.length}
        next={getMorePosts}
        hasMore={hasNext}
        loader={<Loader></Loader>}
      >
        {posts &&
          posts.map((p, i) => {
            return (
              <PostWrapper key={p._id + i}>
                <PostHeader>
                  <PostAvatar />
                  <PostNameTime>
                    <PostUserName>{p.authorEmail}</PostUserName>
                    <PostTime>{dayjs(p.timestamp).fromNow()}</PostTime>
                  </PostNameTime>
                  <PostTagWrapper>
                    {p.tags &&
                      p.tags.map((t) => (
                        <PostTag tag={t} key={t}>
                          {t}
                        </PostTag>
                      ))}
                  </PostTagWrapper>
                </PostHeader>
                <PostTitle>{p.title}</PostTitle>
                <Linkify>
                  <PostContent>{p.body}</PostContent>
                </Linkify>
                {getURL(p.body) !== "" ? (
                  <ReactTinyLink
                    proxyUrl={backendHost}
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    url={getURL(p.body)}
                  />
                ) : (
                  <></>
                )}
                <LikeCommentCount>
                  <div style={{ display: "flex", gap: "3px" }}>
                    <img
                      src={thumbup}
                      alt="thumbup"
                      style={{ marginTop: "-3px" }}
                    ></img>
                    <p>{p.likes}</p>
                  </div>
                  <p>{p.comments ? p.comments.length : "0"} Comments</p>
                </LikeCommentCount>
                <Interactive
                  post_id={p._id}
                  isSaved={isSaved(p._id)}
                  isLiked={isLiked(p._id)}
                ></Interactive>
                {p.files &&
                  p.files.map((f) => (
                    <FilesWrapper>
                      <FileButton onClick={() => window.open(f, "_blank")}>
                        Expand File
                      </FileButton>
                      <FileViewer
                        tag={f}
                        fileType={f.substring(f.lastIndexOf(".") + 1)}
                        filePath={backendHost + "/" + f}
                      />
                    </FilesWrapper>
                  ))}
                <CommentBox comments={p.comments}></CommentBox>
                <WriteComment post_id={p._id}></WriteComment>
              </PostWrapper>
            );
          })}
      </InfiniteScroll>
    </>
  );
};

export default Posts;
