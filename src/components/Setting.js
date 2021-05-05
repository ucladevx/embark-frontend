import React, { useRef } from "react";
import styled from "styled-components";
import { Line, LineSeparator } from "../shared/Separators";
import Help from "../images/help.svg";
import Feedback from "../images/feedback.svg";

const SettingBox = styled.div`
  position: absolute;
  z-index: 10;
  right: 66px;
  width: 185px;
  height: 113px;
  top: 60px;
  background: #ffffff;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 25px 15px;
`;

const SettingEntry = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  gap: 15px;
  color: #282828;
`;

const Setting = () => {
  return (
    <SettingBox>
      <SettingEntry>
        <img src={Feedback} alt="feedback" style={{ width: "24px" }}></img>
        <p>Give Feedback</p>
      </SettingEntry>
      <Line width="155px"></Line>
      <SettingEntry>
        <img src={Help} alt="help"></img>
        <p>Report an issue</p>
      </SettingEntry>
    </SettingBox>
  );
};

export default Setting;
