import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import TypeBox from "../../../shared/TypeBox";
import styled from "styled-components";
import { header4 } from "../../../shared/config";
import SendIcon from "@material-ui/icons/Send";
import { TipButton } from "../../../shared/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { submitComment } from "../../../redux/actions/dataActions";

const CommentTitle = styled.div`
  ${header4}
  padding: 30px 0 0 0;
`;

const CommentContainer = styled.div`
  width: 500px;
  height: 150px;
  padding-left: 15px;
`;

const CommentWrapper = styled.div`
  margin-top: 50px;
  display: flex;
`;
const CommentTypeBox = styled(TypeBox)`
  width: 85%;
`;

const Comment = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.ui.newComment);
  const [comment, setComment] = useState("");
  return (
    <Dialog open={open} onClose={handleClose}>
      <CommentContainer>
        <CommentTitle>Write a comment...</CommentTitle>
        <CommentWrapper>
          <CommentTypeBox
            placeholder="Write your comment here..."
            onChange={(e) => setComment(e.target.value)}
          ></CommentTypeBox>
          <TipButton
            tip="send"
            onClick={() => dispatch(submitComment(id, comment))}
          >
            <SendIcon></SendIcon>
          </TipButton>
        </CommentWrapper>
      </CommentContainer>
    </Dialog>
  );
};

export default Comment;
