import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import { BoldTypography } from "../../shared/Typography";
import {
  ExploreClubsButton,
  NoFollowedClubsWrapper,
  FollowedClubsWrapper,
} from "./StyleProfile";
import FollowedClubs from "./FollowedClubs";
import { useHistory } from "react-router-dom";

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
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const exploreClubs = () => {
    dispatch({ type: "OPEN_EXPLORE" });
    history.push("/home");
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
        {user.clubs.length > 0 ? (
          <FollowedClubsWrapper>
            <FollowedClubs></FollowedClubs>
            <ExploreClubsButton onClick={exploreClubs}>
              Explore More Clubs
            </ExploreClubsButton>
          </FollowedClubsWrapper>
        ) : (
          <NoFollowedClubsWrapper>
            <BoldTypography sz={"18px"}>
              You are not following any clubs yet.
            </BoldTypography>
            <ExploreClubsButton onClick={exploreClubs}>
              Explore Clubs
            </ExploreClubsButton>
          </NoFollowedClubsWrapper>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Saved Posts
      </TabPanel>
    </div>
  );
};

export default UserProfileTabs;
