import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ActionButton } from "../shared/Buttons";
import { BoldTypography } from "../shared/Typography";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
const HomeBtn = styled(ActionButton)`
  width: 148px;
  height: 47px;
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

const Authenticated = () => {
  const [verified] = useState(false);
  const history = useHistory();
  const { token } = useParams();
  useEffect(() => {
    const verify = async () => {
      const res = await axios.get(`/auth/verifyAccount/${token}`);
      console.log(res);
    };
    verify();
  }, [token]);
  return verified ? (
    <div>
      <TextFieldWrapper>
        <TextBox>
          <BoldTypography sz={"24px"}>Welcome to Embark!</BoldTypography>
        </TextBox>
        <TextBox>
          <BoldTypography sz={"18px"}>
            Your email address has been verified.
          </BoldTypography>
        </TextBox>
        <HomeBtn onClick={() => history.push("/home")}>Home</HomeBtn>
      </TextFieldWrapper>
    </div>
  ) : (
    <div>
      <TextFieldWrapper>
        <TextBox>
          <BoldTypography sz={"24px"}>Verifying...</BoldTypography>
        </TextBox>
      </TextFieldWrapper>
    </div>
  );
};

export default Authenticated;
