import React, { useState, useRef } from "react";
import FileViewer from "@studyworld/react-file-viewer";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";

import ResourceUpload from "./ResourceUpload";

const FileView = ({ open, handleClose, file }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <FileViewer
        style={{ margin: "auto", width: 600, height: "100%" }}
        fileType={file.type}
        filePath={file.url}
      />
    </Dialog>
  );
};

const ClubUploadResource = ({ setNewResource }) => {
  const [fileViewOpen, setFileViewOpen] = useState(false);
  const [displayFile, setDisplayFile] = useState({});

  const handleViewSelect = (file) => {
    setDisplayFile(file);
    setFileViewOpen(true);
  };

  const sampleFiles = [
    {
      id: 1,
      type: "png",
      name: "sample png",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
    },
    {
      id: 2,
      type: "pdf",
      name: "sample pdf",
      url: "http://www.africau.edu/images/default/sample.pdf",
    },
    {
      id: 3,
      type: "docx",
      name: "sample docx",
      url:
        "https://docs.google.com/document/d/1eOhrx6VCW88E-Krh3qKujkObSbpVbu2j4bCbUBAJrdY/edit?usp=sharing",
    },
  ];

  return (
    <div>
      <FileView
        open={fileViewOpen}
        handleClose={() => setFileViewOpen(false)}
        file={displayFile}
      />
      <div
        style={{
          marginTop: 20,
          marginBottom: 50,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {sampleFiles.map((file) => {
          return (
            <a key={file.id} onClick={() => handleViewSelect(file)}>
              {file.name}
            </a>
          );
        })}
      </div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => setNewResource(true)}
      >
        Upload Resource
      </Button>
    </div>
  );
};

export default ClubUploadResource;
