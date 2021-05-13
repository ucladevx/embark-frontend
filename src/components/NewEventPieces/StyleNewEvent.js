import styled from "styled-components";
import { TextField, MenuItem } from "@material-ui/core";
import { colors } from "../../shared/config";
import { ActionButton } from "../../shared/Buttons";
import LinkEffect from "../../shared/Effect/LinkEffect";

export const DialogTextField = styled(TextField)`
  background: ${colors.gray1};
  padding: 5px 5px;
  border-radius: 5px;
`;

export const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 500px;
  margin-top: 20px;
  min-height: 430px;
`;

export const TimeWrapper = styled.div`
  display: flex;
  gap: 5px;
  color: ${colors.gray7};
`;

export const PostBtn = styled(ActionButton)`
  width: 15em;
  height: 3em;
  margin: 10px auto;
`;

export const NameDiv = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 125%;
`;

export const SelectDate = styled.div`
  ${LinkEffect}
`;

export const DropdownOption = styled(MenuItem)`
  background: #ebeef1;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Open Sans;
  font-style: normal;
  font-size: 16px;
  color: #838383;
`;
