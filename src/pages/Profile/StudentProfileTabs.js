import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
        <Box p={3}>
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

const UserProfileTabs = () => {
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
          <Tab label="My Posts" {...a11yProps(0)} />
          <Tab label="Followed Clubs" {...a11yProps(1)} />
          <Tab label="Saved Posts" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* {user.posts.map((post) => (
        <BoldTypography>{post}</BoldTypography>
      ))} */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Followed Clubs
      </TabPanel>
      <TabPanel value={value} index={2}>
        Saved Posts
      </TabPanel>
    </div>
  );
};

export default UserProfileTabs;
