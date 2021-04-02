import React from "react";
import styled from "styled-components";
import { IconButton, Tooltip, Button } from "@material-ui/core";
import LinkEffect from "./LinkEffect";

export const TipButton = ({ tip, children, onClick }) => {
  return (
    <Tooltip title={tip} placement="top" arrow>
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
};

export const ActionButton = styled.button`
  ${LinkEffect}
  background: #5473bb;
  border-radius: 8px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  outline: none;
  border: 0;
`;
