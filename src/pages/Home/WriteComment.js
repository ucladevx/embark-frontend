import React from 'react';
import {
  CommentWrapper,
  CommentTextField,
  CommentAvatar,
} from './StyleLanding';

const WriteComment = () => {
  return (
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
  );
};

export default WriteComment;
