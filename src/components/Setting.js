import React from "react";
import styled from "styled-components";
import { Line } from "../shared/Separators";
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
  & > a {
    color: #282828;
    text-decoration: none;
    border: 0 none;
  }
`;

const Setting = () => {
  return (
    <SettingBox>
      <SettingEntry>
        <img src={Feedback} alt="feedback" style={{ width: "24px" }}></img>
        <a href="https://forms.gle/YuavtRJeBhrLKWPM6">Give Feedback</a>
      </SettingEntry>
      <Line width="155px"></Line>
      <SettingEntry>
        <img
          src={Help}
          alt="help"
          style={{ width: "28px", marginLeft: "2px" }}
        ></img>
        <a href="https://forms.gle/CMwS1Jnd7aSVFqcw5">Report an issue</a>
      </SettingEntry>
    </SettingBox>
  );
};

export default Setting;
