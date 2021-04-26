import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { BoldTypography } from "../shared/Typography";
import { colors } from "../shared/config";
import { useDispatch, useSelector } from "react-redux";
import { newEvent } from "../redux/actions/dataActions";
import styled from "styled-components";
import "../components/Calendar/EventCalendar.css";
import Datetime from "react-datetime";
import moment from "moment";
import { ActionButton } from "../shared/Buttons";
import { StyleEventCalendar } from "../components/Calendar/EventCalender";
import LinkEffect from "../shared/Effect/LinkEffect";

const DialogTextField = styled(TextField)`
  background: ${colors.gray1};
  padding: 5px 5px;
  border-radius: 5px;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 500px;
  margin-top: 20px;
  min-height: 430px;
`;

const TimeWrapper = styled.div`
  display: flex;
  gap: 5px;
  color: ${colors.gray7};
`;

const PostBtn = styled(ActionButton)`
  width: 15em;
  height: 3em;
  margin: 10px auto;
`;

const NameDiv = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 125%;
`;

const SelectDate = styled.div`
  ${LinkEffect}
`;

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

export const DropdownOption = styled(MenuItem)`
  background: #ebeef1;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Open Sans;
  font-style: normal;
  font-size: 16px;
  color: #838383;
`;

const NewEvent = ({ open, handleClose }) => {
  const user = useSelector((state) => state.user);

  // ref: https://stackoverflow.com/questions/36125038/generate-array-of-times-as-strings-for-every-x-minutes-in-javascript
  const timeIntervals = useMemo(() => {
    let x = 5; //minutes interval
    let times = []; // time array
    let tt = 0; // start time
    let ap = ["am", "pm"]; // AM-PM
    //loop to increment the time and push results in array
    for (let i = 0; tt < 24 * 60; i++) {
      let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      let mm = tt % 60; // getting minutes of the hour in 0-55 format
      times[i] =
        ("" + (hh % 12)).slice(-2) +
        ":" +
        ("0" + mm).slice(-2) +
        " " +
        ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + x;
    }
    return times;
  }, []);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(new moment()); // start time in backend
  const [time2, setTime2] = useState(new moment()); // end time in backend

  const [startTime, setStartTime] = useState(120);
  const [endTime, setEndTime] = useState(126);

  useEffect(() => {
    if (startTime >= endTime) {
      setEndTime(startTime + 6);
    }
  }, [startTime, endTime]);
  // Redux
  const dispatch = useDispatch();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleEventTime = (updateTimeString) => {
    const updateTimeMoment = moment(updateTimeString, "YYYY-MM-DD h:mm a");
    setTime(updateTimeMoment);
  };
  const handleTime = (mom) => {
    const timeString = mom.format("YYYY-MM-DD");
    const updateTimeString = `${timeString} ${startTime}`;
    handleEventTime(updateTimeString);
  };

  const handleStartTime = (startTime) => {
    const updateTimeString = `${time.format("YYYY-MM-DD")} ${startTime}`;
    handleEventTime(updateTimeString);
    const idx = timeIntervals.indexOf(startTime);
    setStartTime(idx);
  };

  const handleEndTime = (endTime) => {
    const updateTimeString = `${time.format("YYYY-MM-DD")} ${endTime}`;
    setTime2(updateTimeString);
    const idx = timeIntervals.indexOf(endTime);
    setEndTime(idx);
  };

  const handleSubmit = async () => {
    if (title && title.length > 100) {
      alert("Title is too long! Please limit to <100 characters");
      return;
    }
    if (description && description.length > 5000) {
      alert("Description is too long! Please limit to <5000 characters");
      return;
    }
    if (location && location.length > 100) {
      alert("Location is too long! Please limit to <100 characters");
      return;
    }
    const event = {
      userType: "club",
      name: title,
      tags: [],
      organizerName: user.name,
      organizerEmail: user.email,
      startDate: time._d,
      endDate: time._d,
      venue: location,
      desc: description,
    };
    dispatch(newEvent(event));
    handleClose();
  };

  const renderInput = (props, openCalendar, closeCalendar) => {
    return (
      <TimeWrapper>
        <BoldTypography
          sz={"16px"}
          onClick={() => {
            openCalendar();
            StyleEventCalendar();
          }}
        >
          <SelectDate>
            {!!props.value.length
              ? props.value
              : moment().format("dddd, MMMM DD")}
          </SelectDate>
        </BoldTypography>
        <SingleSelect
          value={timeIntervals[startTime]}
          onChange={(e) => {
            handleStartTime(e.target.value);
          }}
        >
          {timeIntervals.map((t) => (
            <DropdownOption key={t} value={t}>
              {t}
            </DropdownOption>
          ))}
        </SingleSelect>
        <SingleSelect
          value={timeIntervals[endTime]}
          onChange={(e) => {
            handleEndTime(e.target.value);
          }}
        >
          {timeIntervals.slice(startTime + 1).map((t) => (
            <DropdownOption key={t} value={t}>
              {t}
            </DropdownOption>
          ))}
        </SingleSelect>
      </TimeWrapper>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <TextFieldWrapper>
          <BoldTypography sz={"24px"}>Create an Event</BoldTypography>
          <NameDiv>Add Title:</NameDiv>
          <DialogTextField
            autoFocus
            margin="dense"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleTitle}
          />
          <TimeWrapper>
            <AccessTimeIcon />
            <Datetime
              onChange={handleTime}
              displayTimeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
              renderInput={renderInput}
              onClose={handleTime}
              value={time}
              dateFormat="dddd, MMMM DD"
              timeFormat={false}
            />
          </TimeWrapper>
          <NameDiv>Location:</NameDiv>

          <DialogTextField
            autoFocus
            margin="dense"
            id="location"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleLocation}
          />
          <NameDiv>Description:</NameDiv>
          <DialogTextField
            rows={4}
            fullWidth
            multiline
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
              },
            }}
            onChange={handleDescription}
          />
        </TextFieldWrapper>
      </DialogContent>
      <DialogActions>
        <PostBtn onClick={handleSubmit} color="primary">
          Create
        </PostBtn>
      </DialogActions>
    </Dialog>
  );
};

export default NewEvent;
