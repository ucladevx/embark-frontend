import React from "react";
import { ReactTinyLink } from "react-tiny-link"; //uses https://cors-anywhere.herokuapp.com by default.

const backendHost = "https://cors-anywhere-embark.herokuapp.com";

const TinyLinkWrapper = ({ link }) => {
  try {
    let url = new URL(link);
    return (
      <ReactTinyLink
        proxyUrl={backendHost}
        cardSize="small"
        showGraphic={true}
        maxLine={2}
        minLine={1}
        url={link}
      />
    );
  } catch (e) {
    return <></>;
  }
};

export default TinyLinkWrapper;
