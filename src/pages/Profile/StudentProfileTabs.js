import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PostBox from "../../shared/PostBox";
import { useSelector } from "react-redux";
import axios from "axios";
import { BoldTypography } from "../../shared/Typography";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const PostTitle = styled.div`
  margin-bottom: 10px;
  margin-left: 5px;
  padding-top: 5px;
`;
const PostBody = styled.div`
  margin-left: 5px;
  padding-bottom: 5px;
`;
const PrevButton = styled(Button)`
  float: left;
`;
const NextButton = styled(Button)`
  float: right;
`;
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
        <Box p={3} component="div">
          {children}
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
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const UserProfileTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [postPage, setPostPage] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user && user.posts) {
        const [postId1, postId2] = user.posts.slice(
          postPage * 2,
          postPage * 2 + 2
        );
        const res1 = axios.get(`/posts/postById/?postID=${postId1}`);
        const res2 = axios.get(`/posts/postById/?postID=${postId2}`);
        const newPosts = await (
          await Promise.all([res1, res2])
        ).map((p) => p.data.post);
        setPosts(newPosts);
      }
    };
    fetchPosts();
  }, [postPage, user.posts, user]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="My Posts" {...a11yProps(0)} />
          {/**<Tab label="Followed Clubs" {...a11yProps(1)} />
          <Tab label="Saved Posts" {...a11yProps(2)} />**/}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} id="posts">
        {posts
          .filter((p) => p !== null)
          .map((p) => (
            <PostBox key={p._id}>
              <PostTitle>
                <BoldTypography>{p.title}</BoldTypography>
              </PostTitle>
              <PostBody>
                <Typography>
                  {p.body.slice(0, 70)}
                  {p.body.length > 50 && "..."}
                </Typography>
              </PostBody>
            </PostBox>
          ))}
        <PrevButton onClick={() => postPage > 0 && setPostPage(postPage - 1)}>
          {"Prev<"}
        </PrevButton>
        <NextButton onClick={() => setPostPage(postPage + 1)}>
          {"Next>"}
        </NextButton>
      </TabPanel>
      {/**<TabPanel value={value} index={1}>
        Followed Clubs
      </TabPanel>
      <TabPanel value={value} index={2}>
        Saved Posts
        </TabPanel>**/}
    </div>
  );
};

export default UserProfileTabs;
