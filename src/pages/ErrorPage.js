import React from "react";
import styled from "styled-components";
import { colors, header1 } from "../shared/config";
import { ActionButton } from "../shared/Buttons";
import NavBar from "../components/NavBar";
import { useHistory } from "react-router-dom";

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

const HomeBtn = styled(ActionButton)`
  width: 148px;
  height: 47px;
`;

const ErrorPage = () => {
  const history = useHistory();
  return (
    <div>
      <NavBar></NavBar>
      <ErrorPageContainer>
        <ErrorBox>
          <p>
            Oops! It looks like the page you are trying to access does not
            exist.
          </p>
          <HomeBtn onClick={() => history.push("/home")}>Return Home</HomeBtn>
        </ErrorBox>
      </ErrorPageContainer>
    </div>
  );
};

export default ErrorPage;
