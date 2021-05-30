import React, { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { BoldTypography } from "../shared/Typography";
import { useDispatch, useSelector } from "react-redux";
import "../components/Calendar/EventCalendar.css";
import Datetime from "react-datetime";
import moment from "moment";
import { StyleEventCalendar } from "../components/Calendar/EventCalender";
import {
  DialogTextField,
  TextFieldWrapper,
  TimeWrapper,
  PostBtn,
  NameDiv,
  SelectDate,
  DropdownOption,
} from "./NewEventPieces/StyleNewEvent";
import { newEvent } from "../redux/actions/dataActions";
import { eventCheck } from "./NewEventPieces/LengthCheck";
import { SingleSelect } from "./NewEventPieces/SingleSelect";

const NewEvent = ({ open, handleClose, editId }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  const handleSubmit = () => {
    const props = {
      title: title,
      description: description,
      location: location,
    };
    if (eventCheck(props)) {
      const event = {
        userType: "club",
        name: title,
        tags: [],
        organizerName: user.name,
        organizerEmail: user.email,
        startDate: time._d,
        endDate: time2._d,
        venue: location,
        desc: description,
      };
      dispatch(newEvent(event));
      handleClose();
    }
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
          <BoldTypography sz={"24px"}>
            {editId ? <>Edit Event</> : <>Create an Event</>}
          </BoldTypography>
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
        <PostBtn color="primary" onClick={handleSubmit}>
          {editId ? <>Edit</> : <>Create</>}
        </PostBtn>
      </DialogActions>
    </Dialog>
  );
};

export default NewEvent;
