import React, { useState, useEffect } from "react";
import { Line } from "../../shared/Separators";
import Like from "../../images/heart-gray.svg";
import Comment from "../../images/comment.svg";
import thumbup from "../../images/thumbup.svg";
import Share from "../../images/share.svg";
import Save from "../../images/save.svg";
import Saved from "../../images/saved.svg";
import styled from "styled-components";
import { colors } from "../../shared/config";
import LinkEffect from "../../shared/Effect/LinkEffect";
import { useDispatch, useSelector } from "react-redux";
import { likePost, savePost } from "../../redux/actions/dataActions";
import { OPEN_COMMENT } from "../../redux/types";

const InteractiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 100%;
  margin-top: 3px;
`;

const InteractiveIcon = styled.img`
  width: 15px;
  height: 15px;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: auto 0;
  padding-top: 10px;
  padding-left: 10px;
`;

const IconText = styled.span`
  color: ${colors.gray6};
  font-weight: 600;
  font-size: 12px;
`;

const IconEntry = styled.div`
  display: flex;
  gap: 5px;
  &:hover {
    ${LinkEffect};
  }
`;

const InteractiveLine = styled(Line)`
  width: 100%;
`;

const Interactive = ({ post_id, isSaved }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleLike = () => {
    if (!liked) dispatch(likePost(post_id));
    // else dispatch(unlikePost(post_id));
    setLiked(!liked);
  };

  const handleSaved = () => {
    console.log("post id is", post_id);
    dispatch(savePost(post_id));
    setSaved(!saved);
  };

  return (
    <InteractiveContainer>
      <InteractiveLine></InteractiveLine>
      <IconWrapper>
        <IconEntry onClick={handleLike}>
          <InteractiveIcon src={liked ? thumbup : Like}></InteractiveIcon>
          <IconText>Like</IconText>
        </IconEntry>
        <IconEntry
          onClick={() => dispatch({ type: OPEN_COMMENT, payload: post_id })}
        >
          <InteractiveIcon src={Comment}></InteractiveIcon>
          <IconText>Comment</IconText>
        </IconEntry>
        <IconEntry>
          <InteractiveIcon src={Share}></InteractiveIcon>
          <IconText>Share</IconText>
        </IconEntry>
        <IconEntry onClick={handleSaved}>
          <InteractiveIcon src={saved ? Saved : Save}></InteractiveIcon>
          <IconText>Save</IconText>
        </IconEntry>
      </IconWrapper>
      <InteractiveLine></InteractiveLine>
    </InteractiveContainer>
  );
};

export default Interactive;
