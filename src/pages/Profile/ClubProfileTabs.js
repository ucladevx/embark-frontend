import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import { BoldTypography } from "../../shared/Typography";
import FileViewer from "@studyworld/react-file-viewer";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";

import ResourceUpload from "./ClubUploadResource/ResourceUpload";
import ClubUploadResource from "./ClubUploadResource";
import ClubEventsTab from "./ClubEventsTab.js";

function TabPanel(props) {
  const { children, value, index, setNewResource, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && index === 0 ? (
        <Box p={3} style={{ background: "white" }}>
          <ClubUploadResource setNewResource={setNewResource} />
        </Box>
      ) : (
        value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    elevation: 0,
    backgroundColor: theme.palette.background.paper,
    width: "46vw",
  },
}));

const ClubProfileTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.user);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [newResource, setNewResource] = React.useState(false);

  return (
    <div className={classes.root}>
      <ResourceUpload
        open={newResource}
        handleClose={() => setNewResource(false)}
      />
      <AppBar position="relative" color="transparent" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          // centered
        >
          <Tab label="Resources" {...a11yProps(0)} />
          <Tab label="Events" {...a11yProps(1)} />
          <Tab label="Board Members" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel
        setNewResource={setNewResource}
        value={value}
        index={0}
      ></TabPanel>
      <TabPanel value={value} index={1}>
        <ClubEventsTab />
      </TabPanel>
      <TabPanel setNewResource={setNewResource} value={value} index={2}>
        Saved Posts
      </TabPanel>
    </div>
  );
};

export default ClubProfileTabs;
