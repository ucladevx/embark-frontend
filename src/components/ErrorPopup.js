import React from "react";
import styled from "styled-components";
import { colors, header1 } from "../shared/config";
import { Dialog, DialogContent, Button } from "@material-ui/core";
import { BoldTypography } from "../shared/Typography";

const ErrorPageContainer = styled.div`
  background: ${colors.blue2};
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

const ErrorBox = styled.div`
  background: white;
  width: 739px;
  height: 287px;
  margin-top: -150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  padding: 55px 160px;
  & > p {
    ${header1}
  }
`;

const PostBtn = styled(Button)`
  color: ${colors.black};
  font-size: 28px;
  font-weight: 600;
  width: 160px;
  height: 70px;
  background-color: #5473bb;
  margin: 10px;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 450px;
  min-height: 300px;
  margin-top: 20px;
  padding: 10px;
`;

const TextBox = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const ErrorPopup = ({ open, onClose }) => {
  const close = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        <TextFieldWrapper>
          <TextBox>
            <BoldTypography sz={"24px"}>
              Oops! It looks like the feature you are trying to access does not
              exist.
            </BoldTypography>
          </TextBox>
          <PostBtn onClick={close}>Return</PostBtn>
        </TextFieldWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorPopup;
