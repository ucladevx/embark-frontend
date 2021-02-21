import styled from "styled-components";
import { ActionButton } from "../../shared/Buttons";
import { colors } from "../../shared/config";

export const GoogleBtn = styled(ActionButton)`
  background: ${colors.blue4};
  display: flex;
  padding-left: 6em;
  align-items: center;
  gap: 13px;
  width: 380px;
  height: 35px;
`;

export const LinkedInBtn = styled(GoogleBtn)`
  background: ${colors.blue5};
`;
