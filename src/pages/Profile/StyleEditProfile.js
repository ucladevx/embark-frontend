import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  Divider,
  Avatar,
} from "@material-ui/core";
import { ActionButton } from "../../shared/Buttons";
import { BoldTypography } from "../../shared/Typography";
import { colors } from "../../shared/config";
import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LinkEffect from "../../shared/Effect/LinkEffect";

export const EditProfileContainer = styled(Dialog)`
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 100vw;
  height: 100vh;

`;

export const TitleContainer = styled(DialogTitle)`
  border-bottom: 3px solid ${colors.gray4};
  height: 10vh;
  max-height: 2vh;
  padding-bottom: 5.5vh;
`;
export const EditProfileTitle = styled(BoldTypography)`
  font-size: 24px;
  font-weight: 700;
  margin: 1vh auto;
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
  padding: 5px 5px;
  border-radius: 5px;
  padding: 1em 1em;
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
  margin: auto;
  color: ${colors.black};
  background-color: #c3dafe;
`;


export const DropDownTitle = styled.div`
  align-items: center;
  padding: 7px 15px;
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  border-radius: 10px;
  background-color:#E1DFDF;
  color: ${colors.gray3};
`;

export const DropDownBox = styled.div`
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  top: 122px;
  background: #FFFFFF;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  z-index: 10;
  position:absolute;
`;

export const DropDownContent = styled.div`
  background-color: ${colors.white};
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  max-height:202px;
  overflow-y: ${(props) => props.overflow};
  
  ::-webkit-scrollbar {
  width: 7px;
  height: 76px;
  margin-right:100px;
  };
  ::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background: ${colors.silver};
  }
`;

export const DropDownCheckBox = styled.img`
  display: inline;
  border: 1px solid #ADAFB0;
  border-radius: 2px;
  margin-right: 11px;
`;
export const Finished = styled.div`
  display:flex;
  justify-content: "center";
  align-items: center;
  padding-top: 10px;
  padding-left: 122px;
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  background-color:#E1DFDF;
  color: ${colors.gray3};  
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.25);
`;