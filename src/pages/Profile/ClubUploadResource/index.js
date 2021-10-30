import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import DisplayResources from "./DisplayResources";
import { getResources } from "../../../redux/actions/dataActions";

const ClubUploadResource = ({ setNewResource }) => {
  const resources = useSelector((state) => state.data.resources);
  const links = useSelector((state) => state.data.links);

  const dispatch = useDispatch();

  // const sampleFiles = [
  //   {
  //     id: 1,
  //     type: "png",
  //     name: "sample png",
  //     url: "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
  //   },
  //   {
  //     id: 2,
  //     type: "pdf",
  //     name: "sample pdf",
  //     url: "http://www.africau.edu/images/default/sample.pdf",
  //   },
  //   {
  //     id: 3,
  //     type: "docx",
  //     name: "sample docx",
  //     url: "https://docs.google.com/document/d/1eOhrx6VCW88E-Krh3qKujkObSbpVbu2j4bCbUBAJrdY/edit?usp=sharing",
  //   },
  // ];

  useEffect(() => {
    dispatch(getResources());
  }, [dispatch]);

  return (
    <div style={{ margin: "auto" }}>
      {resources.length === 0 && links.length === 0 ? (
        <p style={{ marginTop: 50, textAlign: "center" }}>
          You currently have no resources.
        </p>
      ) : (
        <div style={{ maxHeight: "75vh", overflow: "auto" }}>
          <DisplayResources
            resources={resources}
            links={links}
          ></DisplayResources>
        </div>
      )}
      <div
        style={{
          width: 148,
          height: 47,
          padding: 0,
          margin: "auto",
          marginTop: 50,
        }}
      >
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
