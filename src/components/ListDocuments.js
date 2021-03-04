import React from "react";
import { Dialog, List, ListItem } from '@material-ui/core';

const ListDocuments = ({ open, handleClose, documents, handleDrive }) => {

    const handleListItemClick = (event, id) => {
        console.log(documents.filter((doc) => doc.id===id)[0]);
        handleDrive(documents.filter((doc) => doc.id===id)[0]);
        handleClose();
    }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <List>
        {documents.map((doc) => (
            <ListItem style={{ margin: 20 }} button key={doc.id} onClick={(event) => handleListItemClick(event, doc.id)}>
                {doc.name}
            </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default ListDocuments;
