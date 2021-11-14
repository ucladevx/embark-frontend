import React, { useState } from "react";
import { ReactTinyLink } from "react-tiny-link"; //uses https://cors-anywhere.herokuapp.com by default.
import Linkify from "react-linkify";
import linksFinder from "links-finder";

import {
  PreviousCommentItem,
  PreviousCommentTitle,
  PreviousCommentAvatar,
  PreviousCommentContent,
  PreviousCommentText,
  ViewPreviousCommentWrapper,
  ViewCommentLink,
  LikeReply,
  LikeReplyText,
} from "../StyleLanding";
import { colors } from "../../../shared/config";

const CommentBox = ({ comments }) => {
  const [start, setStart] = useState(0);

  const getURL = (body) => {
    const urlSet = linksFinder.findLinks(body);
    if (urlSet.length <= 0) return "";
    console.log(urlSet);
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
          if (i >= start && i < start + 4)
            return (
              <PreviousCommentItem key={c._id || i}>
                <PreviousCommentAvatar></PreviousCommentAvatar>
                <div>
                  <PreviousCommentContent bgcolor={colors.gray1}>
                    <PreviousCommentTitle>{c.authorEmail}</PreviousCommentTitle>
                    <Linkify>
                      <PreviousCommentText>{c.body}</PreviousCommentText>
                    </Linkify>
                    {c.body !== undefined && getURL(c.body) !== "" ? (
                      <ReactTinyLink
                        cardSize="small"
                        showGraphic={true}
                        maxLine={2}
                        minLine={1}
                        url={getURL(c.body)}
                      />
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
          else return <React.Fragment key={i}></React.Fragment>;
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
