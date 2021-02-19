import React, { useState } from "react";
import FileUpload from "./FileUpload.js"
import FilePreviewer from 'react-file-previewer';
import FileViewer from 'react-file-viewer';
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
import { useDispatch } from "react-redux";
import { newPost } from "../redux/actions/dataActions";
import styled from "styled-components";

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
  color: ${colors.gray2};
`;

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

const PostBtn = styled(Button)`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  width: 122px;
  height: 43px;
  background-color: ${colors.gray2};
`;

const NewPost = ({ open, handleClose }) => {
  const [industry, setIndustry] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  var form = null;
  // Redux
  const dispatch = useDispatch();

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
      title: title,
      body: description,
      tags: [industry],
      files: [form],
    };
    dispatch(newPost(post));
    handleClose();
  };

  //
  const PDF1_URL =
  'https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf';
  const [file, setFile] = useState({ url: PDF1_URL });
    
  const onFileChange = event => {
      const fileReader = new window.FileReader();
      const file = event.target.files[0];
      form = event.target.files[0];
      console.log(form);
      
      fileReader.onload = fileLoad => {
          const { result } = fileLoad.target;
          setFile({ url: result });
      };
      
      fileReader.readAsDataURL(file);
      console.log(file);
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
        {
          file.url !== PDF1_URL ? 
          (
            <>
            <FilePreviewer 
              file={file}
              />
            </>
          )
          : 
          (
            <></>
          )
        }
        
      </DialogContent>
      <DialogActions>
        <FileUpload
          handleFileInput = {onFileChange}
        />
        <PostBtn onClick={handleSubmit} color="primary">
          Post
        </PostBtn>
      </DialogActions>
    </Dialog>
  );
};

export default NewPost;
