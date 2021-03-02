import React from "react";
import styled from "styled-components";
import { colors } from "../../../shared/config";
import { TextField } from "@material-ui/core";
import { PreviousCommentAvatar } from "../StyleLanding";
import { OPEN_COMMENT } from "../../../redux/types";
import { useDispatch } from "react-redux";

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
  padding: 25px 0;
  background: ${colors.white};
`;

const CommentAvatar = styled(PreviousCommentAvatar)``;

const CommentTextField = styled(TextField)`
  background: ${colors.gray1};
  border-radius: 10px;
  padding-left: 8px;
  justify-content: center;
`;

const WriteComment = ({ post_id }) => {
  const dispatch = useDispatch();
  return (
    <CommentWrapper>
      <CommentAvatar></CommentAvatar>
      <CommentTextField
        placeholder="Write a comment..."
        fullWidth
        onClick={() => dispatch({ type: OPEN_COMMENT, payload: post_id })}
        InputProps={{
          disableUnderline: true,
          style: {
            fontSize: 12,
          },
        }}
      ></CommentTextField>
    </CommentWrapper>
  );
};

export default WriteComment;
