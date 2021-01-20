import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Avatar,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  Divider,
} from "@material-ui/core";
import { BoldTypography } from "../shared/Typography";
import styled from "styled-components";
import { colors } from "../shared/config";

const NewPostInfo = styled.div`
  display: flex;
`;
const NewPostUser = styled.div`
  display: flex;
  margin-left: 12px;
  flex-direction: column;
`;
const FormControlC = styled(FormControl)`
  min-width: 120px;
`;
const Suggested = styled(Typography)`
  margin-left: 2px;
  color: ${colors.mediumgray};
`;
const DialogTextField = styled(TextField)`
  background: ${colors.lightgray};
  padding: 5px 5px;
  border-radius: 5px;
`;
const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 450px;
  margin-top: 20px;
`;
const PostBtn = styled(Button)`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  width: 122px;
  height: 43px;
  background-color: ${colors.mediumgray};
`;

const NewPost = ({ open, handleClose }) => {
  const [industry, setIndustry] = useState("");
  const handleIndustry = (e) => {
    setIndustry(e.target.value);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <BoldTypography sz={"18px"}>Create a Post</BoldTypography>
      </DialogTitle>

      <DialogContent>
        <NewPostInfo>
          <Avatar></Avatar>
          <NewPostUser>
            <BoldTypography sz={"16px"}>Claire Guo</BoldTypography>
            <FormControlC>
              <InputLabel>Industry</InputLabel>
              <Select value={industry} onChange={handleIndustry}>
                <Suggested>Suggested</Suggested>
                <MenuItem value={1}>Product Design</MenuItem>
                <MenuItem value={2}>Product Management</MenuItem>
                <Divider></Divider>
                <MenuItem value={3}>Business</MenuItem>
                <MenuItem value={4}>Computer Science</MenuItem>
              </Select>
            </FormControlC>
          </NewPostUser>
        </NewPostInfo>
        <TextFieldWrapper>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Question / Subject"
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
          />
          <DialogTextField
            placeholder="Description"
            rows={4}
            fullWidth
            multiline
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
              },
            }}
          />
        </TextFieldWrapper>
      </DialogContent>
      <DialogActions>
        <PostBtn onClick={handleClose} color="primary">
          Post
        </PostBtn>
      </DialogActions>
    </Dialog>
  );
};

export default NewPost;
