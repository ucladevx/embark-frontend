import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
  FormControl,
  Avatar,
} from "@material-ui/core";
import { ActionButton } from "../../shared/Buttons";
import { BoldTypography } from "../../shared/Typography";
import { colors } from "../../shared/config";
import styled from "styled-components";
import LinkEffect from "../../shared/Effect/LinkEffect";

export const EditProfileContainer = styled(Dialog)`
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 100vw;
  height: 100vh;
  margin: 0px;
  overflow: hidden;
`;

export const TitleContainer = styled(DialogTitle)`
  border-bottom: 3px solid ${colors.gray4};
  height: 10vh;
  max-height: 2vh;
  padding-bottom: 5.5vh;
  overflow: hidden;
`;
export const EditProfileTitle = styled(BoldTypography)`
  font-size: 24px;
  font-weight: 700;
  margin: 0 173px 0 197px;
  display: inline;
`;

export const EditProfileAvatar = styled(Avatar)`
  width: 7vw;
  height: 7vw;
  border: 1px solid ${colors.grey3};
  margin: 0 auto;
  position: relative;
`;

export const ChangeAvatarLink = styled(Typography)`
  ${LinkEffect}
  background: none;
  margin: 10px 0 0 10px;
  font-size: 0.8em;
  color: ${colors.blue4};
`;

export const EditCoverImage = styled.img`
  max-height: 10vh;
  padding: 0 1em;
`;
export const EditProfileContent = styled(DialogContent)`
  margin: 5px 30px;
`;

export const EditProfileDone = styled(DialogActions)`
  margin: 30px 30px;
`;

export const NewPostInfo = styled.div`
  display: flex;
`;

export const NewPostUser = styled.div`
  display: flex;
  margin-left: 12px;
  flex-direction: column;
`;

export const FormControlC = styled(FormControl)`
  min-width: 200px;
  max-height: 5vh;
  background: ${colors.gray1};
  border-radius: 10px;
`;

export const Suggested = styled(Typography)`
  margin-left: 2px;
  color: ${colors.gray2};
`;

export const DialogTextField = styled(TextField)`
  background: ${colors.gray1};
  border-radius: 5px;
  height: 40px;
  padding: 0px;
  margintop: 0px;
  border-radius: 10px;
  background-color: "#EDEDED";
`;

export const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0.5em;
  gap: 10px;
  min-width: 4em;
  margin-top: 20px;
  position: relative;
`;

export const DoneBtn = styled(ActionButton)`
  width: 120px;
  height: 40px;
  margin: 10px auto 20px auto;
  color: #ffffff;
  background-color: ${(props) => props.bgcolor};
`;

export const LinkedinAdornment = styled.div`
  display: flex;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 46px;
  height: 40px;
  margin-left: -20px;
  margin-bottom: 5px;
  zindex: 10;
  background-color: #3177b2;
`;
