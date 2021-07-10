import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import { BoldTypography } from "../../shared/Typography";

const ForgetPassword = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const submitEmail = () => {};

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <BoldTypography
          style={{ margin: "auto", textAlign: "center" }}
          sz={"18px"}
        >
          Forgot Your Password?
        </BoldTypography>
      </DialogTitle>

      <DialogContent>
        <Grid>
          <Grid container style={{ marginTop: 20 }}>
            <Grid item xs={12}>
              <Box fontWeight="fontWeightBold">Enter Your Email:</Box>
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: 20 }}>
            <TextField
              fullWidth
              id="filled-basic"
              variant="filled"
              onChange={changeEmail}
            />
          </Grid>

          <Grid
            container
            style={{ marginTop: 20, justifyContent: "space-around" }}
          >
            <Button variant="outlined" color="primary" size="large">
              <Box fontWeight="fontWeightBold">Cancel</Box>
            </Button>

            <Button variant="contained" color="primary" size="large">
              <Box fontWeight="fontWeightBold" onClick={submitEmail}>
                Reset Password
              </Box>
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPassword;
