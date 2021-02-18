import {IconButton, Tooltip} from '@material-ui/core';
import React from 'react';

export const TipButton = ({tip, children, onClick}) => {
  return (
    <Tooltip title={tip} placement="top" arrow>
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
};
