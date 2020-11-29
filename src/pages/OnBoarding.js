import React from "react";
import {Grid, TextField, Button} from "@material-ui/core";

const OnBoarding = () => {
  return (
    <div>
      <Grid container style={{minHeight: "100vh"}}>
        <Grid item xs={6}>
          Welcome to Embark!
        </Grid>
        <Grid item></Grid>
        <Grid container item xs={12} sm={6} alignItems="center" justify="space-between" direction="column">
          <div/>
          <div>
            <div style={{display:"flex", flexDirection:"column", maxWidth:400, minWidth: 300}}>
              <div>
                <TextField label="First Name" margin="normal" />
                <TextField label="Last Name" margin="normal" />
              </div>
              <TextField label="Email" margin="normal" />
              <TextField label="Password" margin="normal" />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
            >
              Sign Up
            </Button>
          </div>
          <div/>
        </Grid>
      </Grid>
    </div>
  );
};

export default OnBoarding;

