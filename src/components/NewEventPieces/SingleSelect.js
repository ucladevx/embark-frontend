import React from "react";
import { Select, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    maxHeight: 300,
    background: "#EBEEF1",
    boxShadow: "3px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
  },
  select: {
    color: "#838383",
    height: "1.6em",
    fontSize: "16px",
    fontWeight: "600",
    marginLeft: "5px",
  },
}));

export const SingleSelect = ({ children, value, onChange }) => {
  const classes = useStyles();
  return (
    <Select
      disableUnderline={true}
      value={value}
      MenuProps={{ classes: { paper: classes.menuPaper } }}
      className={classes.select}
      onChange={onChange}
    >
      {children}
    </Select>
  );
};
