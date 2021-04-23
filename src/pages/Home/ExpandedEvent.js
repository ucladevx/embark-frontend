import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { BoldTypography } from "../../shared/Typography";
import styled from "styled-components";
import { PostContent, EventAvatar, EventTypography } from "./StyleLanding";
import { colors } from "../../shared/config";
import Linkify from "react-linkify";

// Dayjs
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const TimeTypography = styled(EventTypography)`
  color: ${colors.gray2};
  font-size: 16px;
`;

const NameTypography = styled(EventTypography)`
  font-size: 16px;
`;

const EventContent = styled(PostContent)`
  font-size: 16px;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 450px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const DescWrapper = styled.div`
  overflow: scroll;
  max-height: 200px;
`;

const makeDay = (moment) => {
  if (typeof moment === "string") {
    let date = moment.replace("T", " ");
    date = date.replace("Z", " ");
    date = date.concat(" GMT");
    return dayjs(date).format("MMM DD HH:mm a");
  }
  let date = JSON.stringify(moment);
  if (date) {
    date = date.replace("T", " ");
    date = date.replace("Z", " ");
    date = date.concat(" GMT");
    return dayjs(date).format("MMM DD HH:mm a");
  } else {
    return "";
  }
};

const ExpandedEvent = ({ open, handleClose, e }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <TextFieldWrapper>
          <BoldTypography sz={"24px"}>{e.name}</BoldTypography>
          <Linkify>
            <EventContent>Location: {e.venue}</EventContent>
          </Linkify>
          <TimeWrapper>
            <NameTypography>{e.authorEmail}@</NameTypography>
            <AccessTimeIcon />
            <TimeTypography sz={"24px"}>
              {makeDay(e.startDate)} - {makeDay(e.endDate)}
            </TimeTypography>
          </TimeWrapper>
          <DescWrapper>
            <BoldTypography sz={"16px"}>Description:</BoldTypography>
          </DescWrapper>
          <Linkify>
            <EventContent>{e.desc}</EventContent>
          </Linkify>
        </TextFieldWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default ExpandedEvent;
