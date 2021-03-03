import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  AppBar,
  Grid,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { BoldTypography } from "../shared/Typography";
import { colors } from "../shared/config";

// imports from Profile Page
import { ExploreFilter, ExploreObj } from "../pages/Profile/StyleProfile";

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const RenderFileUpload = () => {
  const inputFile = useRef(null);
  const [uploaded, setUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const handleUpload = (event) => {
    setUploaded(true);
    setSelectedFile(event.target.files[0]);
  };

  const handleChoose = () => {
    inputFile.current.click();
  };

  return (
    <Grid container>
      <ExploreFilter style={{ marginTop: 20 }}>
        <Grid container justify="center">
          <Grid item xs={4} style={{ margin: "auto" }}>
            <ExploreObj
              style={{ margin: 4, width: "auto", justifyContent: "center" }}
              bgcolor={colors.darkBlue}
            >
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={handleUpload}
              />
              <Box
                fontWeight="fontWeightMedium"
                textAlign="center"
                onClick={handleChoose}
              >
                Choose a File
              </Box>
            </ExploreObj>
          </Grid>
          <Grid item xs={4} style={{ margin: "auto" }}>
            <ExploreObj
              style={{ margin: 4, width: "auto", justifyContent: "center" }}
              bgcolor={colors.red1}
            >
              <Box fontWeight="fontWeightMedium" textAlign="center">
                Upload from Drive
              </Box>
            </ExploreObj>
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={2}>
            <Box fontWeight="fontWeightBold">File:</Box>
          </Grid>
          <Grid item xs={10}>
            {!uploaded ? (
              <Box fontWeight="fontWeightLight" fontStyle="italic">
                None Selected
              </Box>
            ) : (
              <Box fontWeight="fontWeightLight" fontStyle="italic">
                {selectedFile.name}
              </Box>
            )}
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <Box fontWeight="fontWeightBold">Name:</Box>
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: 20 }}>
          <TextField
            fullWidth
            id="filled-basic"
            label="Name Your Resource"
            variant="filled"
          />
        </Grid>

        <Grid container style={{ marginTop: 20, justifyContent: "center" }}>
          <Button variant="contained" color="primary" size="large">
            <Box fontWeight="fontWeightBold">Upload</Box>
          </Button>
        </Grid>
      </ExploreFilter>
    </Grid>
  );
};

const RenderEmbedLink = () => {
  return (
    <Grid>
      <Grid container style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <TextField fullWidth id="filled-basic" variant="filled" />
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Box fontWeight="fontWeightBold">Name:</Box>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 20 }}>
        <TextField
          fullWidth
          id="filled-basic"
          label="Name Your Resource"
          variant="filled"
        />
      </Grid>

      <Grid container style={{ marginTop: 20, justifyContent: "center" }}>
        <Button variant="contained" color="primary" size="large">
          <Box fontWeight="fontWeightBold">Embed</Box>
        </Button>
      </Grid>
    </Grid>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && index === 0 && <RenderFileUpload />}
      {value === index && index === 1 && <RenderEmbedLink />}
    </div>
  );
};

const useStyles = makeStyles({
  activeTab: {
    fontSize: "14px",
    fontWeight: "600",
  },
});

const ResourceUpload = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleSwitchUpload = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <BoldTypography
          style={{ margin: "auto", textAlign: "center" }}
          sz={"18px"}
        >
          Upload Resource
        </BoldTypography>
      </DialogTitle>
      <hr />

      <DialogContent>
        <AppBar position="relative" color="white" elevation="0">
          <Tabs value={value} onChange={handleSwitchUpload}>
            <Tab
              label={<span className={classes.activeTab}>Upload a File</span>}
              {...a11yProps(0)}
            />
            <Tab
              label={<span className={classes.activeTab}>Embed a Link</span>}
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Upload a File
        </TabPanel>
        <TabPanel value={value} index={1}>
          Embed a Link
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceUpload;
