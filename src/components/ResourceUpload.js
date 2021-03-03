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
import { ExploreFilter, ExploreObj } from "../pages/Profile/StyleProfile";

// Import Google API
import { gapi } from "gapi-script";

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

// Google Drive Upload Part
const DriveUpload = () => {
  const [listDocumentsVisible, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] = useState(false);
  const [signedInUser, setSignedInUser] = useState();

  const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      // Set the signed in user
      setSignedInUser(gapi.auth2.getAuthInstance().currentUser);
      setIsLoadingGoogleDriveApi(false);
      listFiles();
    } else {
      // prompt user to sign in
      handleAuthClick();
    }
  };

  const listFiles = (searchTerm = null) => {
    setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
        q: searchTerm,
      })
      .then(function (response) {
        setIsFetchingGoogleDriveFiles(false);
        setListDocumentsVisibility(true);
        const res = JSON.parse(response.body);
        setDocuments(res.files);
        console.log(documents);
      });
  };

  const initClient = () => {
    setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error) {
            console.log(error);
        }
      );
  };

  const handleDriveUpload = () => {
      console.log('Drive Upload');
      gapi.load('client:auth2', initClient);
  }

  const handleSignOutClick = (event) => {
    setListDocumentsVisibility(false);
    gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <Box
      fontWeight="fontWeightMedium"
      textAlign="center"
      onClick={handleDriveUpload}
    >
      Upload from Drive
    </Box>
  );
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
              <DriveUpload />
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
