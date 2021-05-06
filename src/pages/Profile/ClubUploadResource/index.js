import React, { useState, useRef, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import DisplayResources from './DisplayResources';
import { getResources } from "../../../redux/actions/dataActions";

const ClubUploadResource = ({ setNewResource }) => {
  const [fileViewOpen, setFileViewOpen] = useState(false);
  const [displayFile, setDisplayFile] = useState({});
  const resources = useSelector((state) => state.data.resources);
  const links = useSelector((state) => state.data.links);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResources());
  }, [])

  return (
    <div style={{ margin: 'auto' }}>
      { resources.length === 0 && links.length === 0 ?
        <p style={{ marginTop: 50, textAlign: 'center' }}>You currently have no resources.</p>
      :
        <div style={{ maxHeight: '75vh', overflow: 'auto'}}>
          <DisplayResources resources={resources} links={links}></DisplayResources>
        </div>
      }
      <div style={{ width: 148, height: 47, padding: 0, margin: 'auto', marginTop: 50 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setNewResource(true)}
        >
          Upload Resource
        </Button>
      </div>
    </div>
  );
};

export default ClubUploadResource;
