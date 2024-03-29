import React, { useState } from "react";
import Linkify from "react-linkify";
import linksFinder from "links-finder";
import TinyLinkWrapper from "../../../components/TinyLinkWrapper";

import {
  PreviousCommentItem,
  PreviousCommentTitle,
  //PreviousCommentAvatar,
  PreviousCommentContent,
  PreviousCommentText,
  ViewPreviousCommentWrapper,
  ViewCommentLink,
  LikeReply,
  LikeReplyText,
  InfoProfilePic,
} from "../StyleLanding";
import { colors } from "../../../shared/config";
import avatarImg from "../../../images/avatar.svg";

const CommentBox = ({ comments }) => {
  const [start, setStart] = useState(0);

  const getURL = (body) => {
    const urlSet = linksFinder.findLinks(body);
    if (urlSet.length <= 0) return "";
    return body.substring(urlSet[0].start, urlSet[0].end + 1);
  };

  return (
    <ViewPreviousCommentWrapper>
      {start > 0 ? (
        <ViewCommentLink onClick={() => setStart(start - 4)}>
          View previous comments
        </ViewCommentLink>
      ) : (
        <ViewCommentLink></ViewCommentLink>
      )}
      {comments &&
        comments.map((c, i) => {
          if (i >= start && i < start + 4) {
            if (c === null) {
              return <div></div>;
            }
            return (
              <PreviousCommentItem key={c._id || i}>
                <InfoProfilePic
                  src={c.authorProfilePic || avatarImg}
                  alt="commentAuthorPic"
                ></InfoProfilePic>
                <div>
                  <PreviousCommentContent bgcolor={colors.gray1}>
                    <PreviousCommentTitle>
                      {c.authorName || "authorNameDefault"}
                    </PreviousCommentTitle>
                    <Linkify>
                      <PreviousCommentText>{c.body}</PreviousCommentText>
                    </Linkify>
                    {c.body !== undefined && getURL(c.body) !== "" ? (
                      <TinyLinkWrapper link={getURL(c.body)} />
                    ) : (
                      <></>
                    )}
                  </PreviousCommentContent>
                  <LikeReply>
                    <LikeReplyText>Like</LikeReplyText>
                    <LikeReplyText disabled>·</LikeReplyText>
                    <LikeReplyText>Reply</LikeReplyText>
                  </LikeReply>
                </div>
              </PreviousCommentItem>
            );
          } else return <React.Fragment key={i}></React.Fragment>;
        })}
      {comments && comments.length > start + 4 && (
        <ViewCommentLink onClick={() => setStart(start + 4)}>
          View More comments
        </ViewCommentLink>
      )}
    </ViewPreviousCommentWrapper>
  );
};

export default CommentBox;
