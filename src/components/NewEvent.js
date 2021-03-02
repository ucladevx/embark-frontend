import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  FormControl,
} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { BoldTypography } from "../shared/Typography";
import { colors } from "../shared/config";
import { useDispatch, useSelector } from "react-redux";
import { newEvent } from "../redux/actions/dataActions";
import styled from "styled-components";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

const DialogTextField = styled(TextField)`
  background: ${colors.gray1};
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

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 43px;
  justify-content: center;
`;

const PostBtn = styled(Button)`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  width: 122px;
  height: 43px;
  background-color: ${colors.gray2};
`;

const NewEvent = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  // Redux
  const dispatch = useDispatch();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleTime = (moment) => {
    setTime(moment);
    console.log(time);
  };

  const handleSubmit = async () => {
    const event = {
      title,
      body: description,
      datetime: time,
    };
    dispatch(newEvent(event));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <TextFieldWrapper>
        <BoldTypography sz={"24px"}>Create an Event</BoldTypography>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Title"
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleTitle}
          />
          <TimeWrapper>
            <AccessTimeIcon/>
            <Datetime 
              onChange = {handleTime}
            />
          </TimeWrapper>
          
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
            onChange={handleDescription}
          />
        </TextFieldWrapper>
      </DialogContent>
      <DialogActions>
        <PostBtn onClick={handleSubmit} color="primary">
          Create
        </PostBtn>
      </DialogActions>
    </Dialog>
  );
};

export default NewEvent;