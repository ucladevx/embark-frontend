import React, { useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { ClubCard, ClubCardImage, ClubCardCaption } from "./StyleExplore";
import { useHistory } from "react-router-dom";

const ClubThumbnail = ({ club }) => {
  const history = useHistory();
  const openClub = () => {
    history.push(`/view-club/${club._id}`);
  };
  return (
    <div onClick={openClub}>
      <ClubCard>
        <ClubCardImage src={club.profilePicURL} />
        <ClubCardCaption>{club.name}</ClubCardCaption>
      </ClubCard>
    </div>
  );
};

export default ClubThumbnail;
