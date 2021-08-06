import React, { useEffect, useState } from "react";
// import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import styled from "styled-components";

const StyledTableContainer = styled(TableContainer)`
  width: 80%;
`;

const Moderation = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getModPosts = async () => {
      const res = await axios.get("/moderation");
      setPosts(res.data.posts);
    };
    getModPosts();
  }, []);

  const deletePost = async (post_id) => {
    await axios.post("/moderation", { post_id });
    window.location.reload();
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <StyledTableContainer>
        <TableHead>
          <TableCell>Timestamp</TableCell>
          <TableCell>Post Title</TableCell>
          <TableCell>Post Body</TableCell>
          <TableCell>Delete</TableCell>
        </TableHead>
        <TableBody>
          {posts &&
            posts.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.timestamp}</TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.body}</TableCell>
                <TableCell>
                  <DeleteIcon onClick={() => deletePost(p._id)}></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTableContainer>
    </div>
  );
};

export default Moderation;
