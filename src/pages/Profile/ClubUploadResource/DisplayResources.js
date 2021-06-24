import React, { useEffect } from "react";
import pdfIcon from "../../../images/pdf-icon.png";
import wordIcon from "../../../images/word-icon.jpg";
import driveIcon from "../../../images/drive-icon.png";
import defaultFileIcon from "../../../images/default-file-icon.png";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 157,
    height: 159,
    borderRadius: 10,
    marginBottom: 20,
  },
  media: {
    height: 105,
    width: "75%",
    margin: "auto",
    marginBottom: 12,
    marginTop: 13,
  },
  content: {
    background: "#EBEEF1",
    textAlign: "center",
    paddingTop: "2%",
  },
});

const LinkCardFormatter = ({ fileUrl }) => {
  const classes = useStyles();

  if (fileUrl == null) {
    return <div></div>;
  }

  console.log(fileUrl);
  var link = String(fileUrl.link);
  console.log(link);
  if (link.indexOf("drive.google.com") !== -1) {
    return (
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => {
            console.log(fileUrl);
            window.open(link, "_blank");
          }}
        >
          <CardMedia className={classes.media} image={driveIcon} />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="subtitle1" component="h3">
              {fileUrl.userNamed === null ||
              fileUrl.userNamed === undefined ||
              fileUrl.userNamed === ""
                ? link
                : fileUrl.userNamed}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  } else {
    return (
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => {
            window.open(`https://${link}`, "_blank");
          }}
        >
          <CardMedia className={classes.media} image={defaultFileIcon} />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="subtitle1" component="h3">
              {fileUrl.userNamed === null ||
              fileUrl.userNamed === undefined ||
              fileUrl.userNamed === ""
                ? link
                : fileUrl.userNamed}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
};

const ResourceCardFormatter = ({ resource }) => {
  const classes = useStyles();

  if (resource == null) {
    return <div></div>;
  }

  var type = resource.Location.substr(resource.Location.length - 4);
  var link = resource.Location;

  if (type.indexOf("doc") !== -1 || type.indexOf("docx") !== -1) {
    return (
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => {
            window.open(resource.Location, "_blank");
          }}
        >
          <CardMedia className={classes.media} image={wordIcon} />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="subtitle1" component="h3">
              {resource.userNamed === null || resource.userNamed === undefined
                ? resource.Name
                : resource.userNamed}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  } else if (type.indexOf("pdf") !== -1) {
    return (
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => {
            window.open(resource.Location, "_blank");
          }}
        >
          <CardMedia className={classes.media} image={pdfIcon} />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="subtitle1" component="h3">
              {resource.userNamed === null || resource.userNamed === undefined
                ? resource.Name
                : resource.userNamed}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  } else {
    return (
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => {
            window.open(resource.Location, "_blank");
          }}
        >
          <CardMedia className={classes.media} image={defaultFileIcon} />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="subtitle1" component="h3">
              {resource.userNamed === null || resource.userNamed === undefined
                ? resource.Name
                : resource.userNamed}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
};

const DisplayResources = ({ resources, links }) => {
  const resourceTabs = resources.map((resource, index) => {
    return <ResourceCardFormatter key={index} resource={resource} />;
  });

  const linkTabs = links.map((link, index) => {
    return <LinkCardFormatter key={index} fileUrl={link} />;
  });
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {resourceTabs}
      {linkTabs}
    </div>
  );
};

export default DisplayResources;
