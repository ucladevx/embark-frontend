import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../../shared/config';
import TypeBox from '../../../shared/TypeBox';
import { PreviousCommentAvatar } from '../StyleLanding';
import { submitComment } from '../../../redux/actions/dataActions';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_COMMENT, CLOSE_COMMENT } from '../../../redux/types';

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
  padding: 25px 0;
  background: ${colors.white};
`;

const CommentAvatar = styled(PreviousCommentAvatar)``;

const CommentTextField = styled(TypeBox)`
  background: ${colors.gray1};
  width: 100%;
  border-radius: 10px;
  &:focus {
    border: 1px solid rgba(84, 115, 187, 0.5);
  }
`;

const WriteComment = ({ post_id }) => {
  const [comment, setComment] = useState('');
  const onComment = useSelector((state) => state.ui.newComment);
  const commentRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (onComment === post_id) {
      commentRef.current.focus();
    }
  }, [commentRef, onComment, post_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitComment(post_id, comment));
    setComment('');
    dispatch({ type: CLOSE_COMMENT });
    commentRef.current.blur();
  };

  return (
    <CommentWrapper>
      <CommentAvatar></CommentAvatar>
      <form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <input type="submit" style={{ display: 'none' }} />
        <CommentTextField
          ref={commentRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onSelect={() => dispatch({ type: OPEN_COMMENT, payload: post_id })}
          onBlur={() => dispatch({ type: CLOSE_COMMENT })}
          placeholder="Write a comment..."
          autocomplete="off"
        ></CommentTextField>
      </form>
    </CommentWrapper>
  );
};

export default WriteComment;
