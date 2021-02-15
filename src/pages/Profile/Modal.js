import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
import { colors } from "../shared/config";
import { useDispatch, useSelector } from "react-redux";
import { newPost } from "../redux/actions/dataActions";
import styled from "styled-components";



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>
      <BoldTypography sz={"18px"}>Create a Post</BoldTypography>
    </DialogTitle>
    </Dialog>
  )


  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Edit Profile
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}


const NewPost = ({ open, handleClose }) => {
  const [industry, setIndustry] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleIndustry = (e) => {
    setIndustry(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    const post = {
      title,
      body: description,
      tags: [industry],
    };
    dispatch(newPost(post));
    handleClose();
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
            <BoldTypography sz={"16px"}>{user.name}</BoldTypography>
            <FormControlC>
              <InputLabel>Industry</InputLabel>
              <Select value={industry} onChange={handleIndustry}>
                <Suggested>Suggested</Suggested>
                <MenuItem value={"Product Design"}>Product Design</MenuItem>
                <MenuItem value={"Product Management"}>
                  Product Management
                </MenuItem>
                <Divider />
                <MenuItem value={"Business"}>Business</MenuItem>
                <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
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
            onChange={handleTitle}
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
            onChange={handleDescription}
          />
        </TextFieldWrapper>
      </DialogContent>
      <DialogActions>
        <PostBtn onClick={handleSubmit} color="primary">
          Post
        </PostBtn>
      </DialogActions>
    </Dialog>
  );
};

