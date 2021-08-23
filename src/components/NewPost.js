import React, { useState } from "react";
import FileUpload from "./FileUpload.js";
import ImageUpload from "./ImageUpload.js";
import FileViewer from "@studyworld/react-file-viewer";
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
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import { BoldTypography } from "../shared/Typography";
import { colors } from "../shared/config";
import { useDispatch, useSelector } from "react-redux";
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

export const FilesWrapper = styled.div`
  overflow: scroll;
  max-height: 500px;
  min-height: 50px;
`;

export const CloseButton = styled(Button)`
  width: 89px;
  height: 30px;
  border-radius: 8px;
  text-transform: none;
  background: ${colors.pink};
  display: flex;
  flex-direction: column;
`;

const NewPost = ({ open, handleClose }) => {
  const [industry, setIndustry] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [form, setForm] = useState({});
  const [imgForm, setImgForm] = useState({});
  const [resources, setResources] = useState(false);
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

  const handleResources = () => {
    setResources(!resources);
  };

  const handleSubmit = async () => {
    var post = null;
    //making sure not to send null objects in the post request
    console.log(imgForm);
    console.log(form);
    if (title && title.length > 100) {
      alert("Title is too long! Please limit to <100 characters");
      return;
    }
    if (description && description.length > 5000) {
      alert("Description is too long! Please limit to <5000 characters");
      return;
    }
    if (form.name === null) {
      if (imgForm.name === null) {
        post = {
          title: title,
          body: description,
          tags: [industry],
        };
        if (resources) {
          post.tags = [...post.tags, "resource"];
        }
      } else {
        post = {
          title: title,
          body: description,
          tags: [industry],
          files: [imgForm],
        };
        if (resources) {
          post.tags = [...post.tags, "resource"];
        }
      }
    } else {
      if (imgForm.name === null) {
        post = {
          title: title,
          body: description,
          tags: [industry, "resource"],
          files: [form],
        };
      } else {
        post = {
          title: title,
          body: description,
          tags: [industry, "resource"],
          files: [form, imgForm],
        };
      }
    }

    post.accountType = user.userType;
    console.log(post);
    dispatch(newPost(post));
    //Clean up component contents
    setForm({});
    setImgForm({});
    setFile({ url: PDF1_URL });
    setFileType("pdf");
    setImage({ url: PDF1_URL });
    handleClose();
  };

  //File handling
  const PDF1_URL =
    "https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf";
  const [file, setFile] = useState({ url: PDF1_URL });
  const [fileType, setFileType] = useState("pdf");

  const onFileChange = (event) => {
    const fileReader = new window.FileReader();
    const file = event.target.files[0];
    if (file.size > 3145728) {
      alert("File is too big! Please limit to 3MB");
      return;
    }
    console.log(file);

    setFile({ url: PDF1_URL });
    setFileType("pdf");

    setFileType(file.name.substring(file.name.lastIndexOf(".") + 1));
    console.log(fileType);
    let myForm = document.getElementById("myForm");
    setForm(new FormData(myForm));
    fileReader.onload = (fileLoad) => {
      const { result } = fileLoad.target;
      setFile({ url: result });
    };

    fileReader.readAsDataURL(file);
  };

  const clearFile = () => {
    setFile({ url: PDF1_URL });
    setFileType("pdf");
    setForm({});
  };

  //Image handling
  const [image, setImage] = useState({ url: PDF1_URL });
  const onImageChange = (event) => {
    const imgReader = new window.FileReader();
    const img = event.target.files[0];
    if (img.size > 3145728) {
      alert("Image is too big! Please limit to 3MB");
      return;
    }
    let myForm = document.getElementById("myImgForm");
    setImgForm(new FormData(myForm));
    imgReader.onload = (fileLoad) => {
      const { result } = fileLoad.target;
      setImage({ url: result });
    };

    imgReader.readAsDataURL(img);
  };

  const clearImage = () => {
    setImage({ url: PDF1_URL });
    setImgForm({});
  };

  const clearAll = () => {
    clearFile();
    clearImage();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={clearAll}>
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
        {file.url !== PDF1_URL ? (
          <>
            <CloseButton onClick={clearFile}>X | Clear File</CloseButton>
            <FilesWrapper>
              <FileViewer filePath={file} fileType={fileType} />
            </FilesWrapper>
          </>
        ) : (
          <></>
        )}
        {image.url !== PDF1_URL ? (
          <>
            <CloseButton onClick={clearImage}>X | Clear Image</CloseButton>
            <FilesWrapper>
              <img src={image.url} height="500px" alt="" />
            </FilesWrapper>
          </>
        ) : (
          <></>
        )}
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          control={
            <Checkbox
              checked={resources}
              onChange={handleResources}
              name="resources"
              color="primary"
            />
          }
          label="Post Contains Resources"
        />
        <FileUpload handleFileInput={onFileChange} />
        <ImageUpload handleImageInput={onImageChange} />
        <PostBtn onClick={handleSubmit} color="primary">
          Post
        </PostBtn>
      </DialogActions>
    </Dialog>
  );
};

export default NewPost;
