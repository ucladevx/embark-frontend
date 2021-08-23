import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DisplayResources from "./DisplayResources";
import { getResources } from "../../../redux/actions/dataActions";

const ClubUploadResource = ({ club }) => {
  const [resources, setResources] = useState([]);
  const [links, setLinks] = useState([]);
  useEffect(() => {
    if (club) {
      if (club.resources) {
        setResources(club.resources);
      }
      if (club.links) {
        setLinks(club.links);
      }
    }
  }, [club]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResources());
  }, [dispatch]);

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
