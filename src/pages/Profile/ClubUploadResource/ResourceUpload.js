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
import "./resource-css.css";
import { BoldTypography } from "../../../shared/Typography";
import { colors, mediaQueries } from "../../../shared/config";
import { ExploreFilter, ExploreObj } from "../StyleProfile";
import ListDocuments from "./ListDocuments";
import axios from "axios";
import GooglePicker from "react-google-picker";

import { useSelector, useDispatch } from "react-redux";
import { uploadResource, uploadLink } from "../../../redux/actions/dataActions";

import { uploadFile } from "react-s3";

// Import Google API
import { gapi } from "gapi-script";

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = process.env.DISCOVERY_DOCS;

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = process.env.SCOPES;

var appId = process.env.appId;
const google = window.google;

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

// Google Drive Upload Part
const DriveUpload = ({ handleDrive, handleName, handleUploaded }) => {
  const [listDocumentsVisible, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] =
    useState(false);
  const [oauthToken, setAuthToken] = useState("");
  const [signedInUser, setSignedInUser] = useState();
  const [pickerApiLoaded, setPickerLoaded] = useState(false);

  const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      // Set the signed in user
      setSignedInUser(gapi.auth2.getAuthInstance().currentUser);
      setIsLoadingGoogleDriveApi(false);
      setAuthToken(gapi.auth.getToken().access_token);
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
        pageSize: 20,
        fields: "nextPageToken, files(id, name, mimeType, modifiedTime)",
        q: searchTerm,
      })
      .then(function (response) {
        setIsFetchingGoogleDriveFiles(false);
        setListDocumentsVisibility(true);
        const res = JSON.parse(response.body);
        setDocuments(res.files);
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
        },
      );
  };

  const handleSignOutClick = (event) => {
    setListDocumentsVisibility(false);
    gapi.auth2.getAuthInstance().signOut();
  };

  const handleDriveUpload = () => {
    gapi.load("client:auth2", initClient);
  };

  return (
    <div>
      <GooglePicker
        clientId={CLIENT_ID}
        developerKey={API_KEY}
        scope={SCOPES}
        onChange={(data) => console.log("on change:", data)}
        onAuthFailed={(data) => alert("Google Drive Authentication Failed")}
        multiselect={false}
        navHidden={false}
        authImmediate={false}
        viewId={"FOLDERS"}
        createPicker={(google, oauthToken) => {
          const googleViewId = google.picker.ViewId.FOLDERS;
          const docsView = new google.picker.DocsView(googleViewId)
            .setIncludeFolders(true)
            .setMimeTypes("file")
            .setSelectFolderEnabled(false);

          const picker = new window.google.picker.PickerBuilder()
            .addView(docsView)
            .setOAuthToken(oauthToken)
            .setDeveloperKey(API_KEY)
            .setCallback((res) => {
              if (res.action === "picked") {
                handleUploaded(true);
                handleName(res.docs[0].name);
                handleDrive(res.docs[0].embedUrl);
              }
            });

          picker.build().setVisible(true);
        }}
      >
        <Box
          fontWeight="fontWeightMedium"
          textAlign="center"
          style={{ cursor: "pointer" }}
          onClick={handleDriveUpload}
        >
          Upload from Drive
        </Box>
      </GooglePicker>
    </div>
  );
};

const RenderFileUpload = ({ handleTabClose }) => {
  const inputFile = useRef(null);
  const [uploaded, setUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDriveLink, setSelectedDriveLink] = useState("");
  const [selectedFileName, setFileName] = useState("");
  const dispatch = useDispatch();

  const handleUpload = async (event) => {
    setUploaded(true);
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleDrive = async (embedUrl) => {
    setSelectedDriveLink(embedUrl);
    setSelectedFile(null);
  };

  const handleChoose = () => {
    inputFile.current.click();
  };

  const handleFileChangeName = (e) => {
    setFileName(e.target.value);
  };

  const handleFinalUpload = async () => {
    if (selectedFile !== null) {
      dispatch(uploadResource(selectedFile, selectedFileName));
    } else {
      dispatch(uploadLink(selectedDriveLink, selectedFileName));
    }
    handleTabClose();
  };

  return (
    <Grid container>
      <ExploreFilter style={{ marginTop: 20, width: "100%" }}>
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
                style={{ cursor: "pointer" }}
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
              <DriveUpload
                handleDrive={handleDrive}
                handleName={setFileName}
                handleUploaded={setUploaded}
              />
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
                {selectedFileName}
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
            onChange={handleFileChangeName}
          />
        </Grid>

        <Grid container style={{ marginTop: 20, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleFinalUpload()}
          >
            <Box fontWeight="fontWeightBold">Upload</Box>
          </Button>
        </Grid>
      </ExploreFilter>
    </Grid>
  );
};

const RenderEmbedLink = ({ handleTabClose }) => {
  const [url, setUrl] = useState("");
  const [urlName, setUrlName] = useState("");
  const dispatch = useDispatch();

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleEmbed = () => {
    dispatch(uploadLink(url, urlName));
    handleTabClose();
  };

  const handleUrlChangeName = (e) => {
    setUrlName(e.target.value);
  };

  return (
    <Grid>
      <Grid container style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="filled-basic"
            variant="filled"
            label="Link"
            onChange={handleUrl}
          />
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
          onChange={handleUrlChangeName}
        />
      </Grid>

      <Grid container style={{ marginTop: 20, justifyContent: "center" }}>
        <Button variant="contained" color="primary" size="large">
          <Box fontWeight="fontWeightBold" onClick={handleEmbed}>
            Embed
          </Box>
        </Button>
      </Grid>
    </Grid>
  );
};

const TabPanel = (props) => {
  const { children, value, index, handleClose, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && index === 0 && (
        <RenderFileUpload handleTabClose={handleClose} />
      )}
      {value === index && index === 1 && (
        <RenderEmbedLink handleTabClose={handleClose} />
      )}
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
        <TabPanel value={value} index={0} handleClose={handleClose}>
          Upload a File
        </TabPanel>
        <TabPanel value={value} index={1} handleClose={handleClose}>
          Embed a Link
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceUpload;
