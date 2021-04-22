import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { Avatar } from "@material-ui/core";
import {  BoldTypography } from "../../shared/Typography";
import {
    EventTypography,
    InfoSeperator,
    PostContent
  } from "./StyleLanding";
import Linkify from "react-linkify";
import { colors } from "../../shared/config";

// Dayjs
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const TimeTypography = styled(EventTypography)`
  color: ${colors.gray2};
  font-size: 16px;
`;

const NameTypography = styled(EventTypography)`
  font-size: 16px;
`;

const EventContent = styled(PostContent)`
  font-size: 16px;
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
`;

const IconWrapper = styled.div`
  margin-right: 5px;
`;

const makeDay = (moment) => {
    if (typeof moment === "string") {
      let date = moment.replace("T", " ");
      date = date.replace("Z", " ");
      date = date.concat(" GMT");
      return dayjs(date).format("MMM DD HH:mm a");
    }
    let date = JSON.stringify(moment);
    if (date) {
      date = date.replace("T", " ");
      date = date.replace("Z", " ");
      date = date.concat(" GMT");
      return dayjs(date).format("MMM DD HH:mm a");
    } else {
      return "";
    }
  };

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
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
    width: 500,
  },
}));

const ExpandedEventTabs = ({e}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          // centered
        >
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Discussion" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BoldTypography sz={"16px"}>Details</BoldTypography>
        <RowWrapper>
            <IconWrapper>
                <Avatar></Avatar>
            </IconWrapper>
            <EventContent>Event hosted by {e.authorEmail}</EventContent>
        </RowWrapper>
        <RowWrapper>
            <IconWrapper>
                <Avatar></Avatar>
            </IconWrapper>
            <EventContent>{e.attendees} people going</EventContent>
        </RowWrapper>
        <RowWrapper>
            <IconWrapper>
                <AccessTimeIcon />
            </IconWrapper>
            <TimeWrapper>
            
            <TimeTypography sz={"24px"}>
                {makeDay(e.startDate)} - {makeDay(e.endDate)}
            </TimeTypography>
            </TimeWrapper>
        </RowWrapper>
        <RowWrapper>
            <IconWrapper>
                <Avatar></Avatar>
            </IconWrapper>
            <Linkify>
                <EventContent>Location: {e.venue}</EventContent>
            </Linkify>
        </RowWrapper>
        <Linkify>
          <EventContent>{e.description}</EventContent>
        </Linkify>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Feature Coming Soon!
      </TabPanel>
    </div>
  );
};

export default ExpandedEventTabs;