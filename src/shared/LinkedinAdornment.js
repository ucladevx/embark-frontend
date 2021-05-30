import { InputAdornment } from "@material-ui/core";
import linkedinStart from "../images/linkedinStart.png";
import styled from "styled-components";
export const LinkedinBox = styled.div`
  display: flex;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 46px;
  height: 40px;
  margin-left: -20px;
  margin-bottom: 5px;
  zindex: 10;
  background-color: #3177b2;
`;

export const LinkedinAdornment = () => {
  return (
    <InputAdornment position="start">
      <LinkedinBox>
        <img
          src={linkedinStart}
          style={{
            position: "absolute",
            marginLeft: "4px",
            marginTop: "8px",
            zIndex: 1,
          }}
          alt="linkedin"
        ></img>
      </LinkedinBox>
    </InputAdornment>
  );
};
