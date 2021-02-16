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
} from "@material-ui/core";
import { BoldTypography } from "../../shared/Typography";
import { colors } from "../../shared/config";
import styled from "styled-components";


export const EditProfileContainer = styled(Dialog)`
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin: 30px;

`;

export const TitleContainer = styled(DialogTitle)`
  border-bottom: 1px solid ${colors.gray1}
`;
export const EditProfileTitle = styled(BoldTypography)`
  font-size: 24px
  font-weight: normal;
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
  gap: 10px;
  min-width: 450px;
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