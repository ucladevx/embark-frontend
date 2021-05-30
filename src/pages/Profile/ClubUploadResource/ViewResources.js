import React, { useState, useRef, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import DisplayResources from "./DisplayResources";
import { getResources } from "../../../redux/actions/dataActions";

const ClubUploadResource = ({ club }) => {
  const [fileViewOpen, setFileViewOpen] = useState(false);
  const [displayFile, setDisplayFile] = useState({});
  let resources = club?.resources;
  let links = club?.links;
  useEffect(() => {
    if (!resources) {
      resources = [];
    }
    if (!links) {
      links = [];
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResources());
  }, []);

  return (
    <div style={{ margin: "auto" }}>
      {!(resources && links) ? (
        <p style={{ marginTop: 50, textAlign: "center" }}>
          Club currently has not defined resources.
        </p>
      ) : resources.length === 0 && links.length === 0 ? (
        <p style={{ marginTop: 50, textAlign: "center" }}>
          Club currently has no resources.
        </p>
      ) : (
        <div style={{ maxHeight: "75vh", overflow: "auto" }}>
          <DisplayResources
            resources={resources}
            links={links}
          ></DisplayResources>
        </div>
      )}
    </div>
  );
};

export default ClubUploadResource;
