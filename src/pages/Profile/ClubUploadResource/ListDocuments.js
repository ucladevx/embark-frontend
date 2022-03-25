import React from "react";
import {
  Dialog,
  List,
  ListItem,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
} from "@material-ui/core";
import { BoldTypography } from "../../../shared/Typography";

const ListDocuments = ({
  open,
  handleClose,
  documents,
  handleDrive,
  handleName,
  onSearch,
  signedInUser,
  onSignOut,
}) => {
  const handleSearchChange = (e) => {
    onSearch(`name contains '${e.target.value}'`);
  };

  const handleListItemClick = (event, id) => {
    //console.log(documents.filter((doc) => doc.id === id)[0].name);
    handleName(documents.filter((doc) => doc.id === id)[0].name);
    handleDrive(id);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <BoldTypography
          style={{ margin: "auto", textAlign: "left" }}
          sz={"18px"}
        >
          Google Drive Files
        </BoldTypography>
      </DialogTitle>
      <hr />

      <DialogContent>
        <Grid container>
          <Grid item xs={12} style={{ marginTop: 20 }}>
            <TextField
              fullWidth
              id="filled-basic"
              label="Search Your Document"
              variant="filled"
              onChange={handleSearchChange}
            />
            <List>
              {documents.map((doc) => (
                <ListItem
                  style={{ margin: 20 }}
                  button
                  key={doc.id}
                  onClick={(event) => handleListItemClick(event, doc.id)}
                >
                  {doc.name}
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ListDocuments;
