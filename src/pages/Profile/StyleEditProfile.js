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
import { BoldTypography } from "../../shared/Typography";
import { colors } from "../../shared/config";
import styled from "styled-components";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LinkEffect from "../../shared/LinkEffect";


export const EditProfileContainer = styled(Dialog)`
  border-radius: 20px;
  margin: 1.5em auto;
  height: fit-content;
  width: fit-content;
  ${'' /* height: 1032px; */}
 
  ${'' /* box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  position: absolute;
  width: 575px; 
  left: 433px;
  top: 72px; */}
`;

export const TitleContainer = styled(DialogTitle)`
  border-bottom: 1px solid ${colors.gray4};
  height: 7vh;

`;
export const EditProfileTitle = styled(BoldTypography)`
  font-size: 1em;
  font-weight: 700;
  margin: auto;
`;

export const EditProfileAvatar = styled(Avatar)`
  width: 7vw;
  height: 7vw;
  border: 1px solid ${colors.grey3};
  margin: 0 auto;
  position: relative;
  ${'' /* variant:"rounded";
  border: 1px solid ${colors.grey3};
  position: relative;
  margin:auto;
  width: 8vw;
  height: 8vw;
  left: 662px;
  top: 168px; */}
`;

export const ChangeAvatarLink = styled(Typography)`
  ${LinkEffect}
  background: none;
  margin: 10px 0 0 10px;
  font-size: 0.7em;
  color: ${colors.blue4};
`;

export const EditCoverImage = styled.img`
  max-height: 10vh;
  ${'' /* width: 20em;
  height: 10vh;
  left: 542px;
  top: 374px;
  margin: 10px 0 0 10px; */}

`;
export const EditProfileContent = styled(DialogContent)`
  margin: 5px 30px ;
`;

export const EditProfileDone =styled(DialogActions)`
  margin: 50px 30px;
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
`;

export const Suggested = styled(Typography)`
  margin-left: 2px;
  color: ${colors.gray2};
`;

export const DialogTextField = styled(TextField)`
  background: ${colors.gray1};
  padding: 5px 5px;
  border-radius: 5px;
`;

export const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto auto;
  gap: 10px;
  min-width: 4em;
  margin-top: 20px;
  position: relative;
`;

export const PostBtn = styled(Button)`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  width: 122px;
  height: 43px;
  background-color: #5473BB;
  margin: auto;
  border-radius: 8px;
  display: flex;
  align-items: center;
`;