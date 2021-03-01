import React from "react";
import { Line } from "../../shared/Separators";
import Like from "../../images/heart-gray.svg";
import Comment from "../../images/comment.svg";
import Share from "../../images/share.svg";
import styled from "styled-components";
import { colors } from "../../shared/config";
import LinkEffect from "../../shared/LinkEffect";

const InteractiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 100%;
  margin-top: 3px;
`;

const InteractiveIcon = styled.img`
  width: 15px;
  height: 15px;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: auto 0;
  padding-top: 10px;
  padding-left: 10px;
`;

const IconText = styled.span`
  color: ${colors.gray6};
  font-weight: 600;
  font-size: 12px;
`;

const IconEntry = styled.div`
  display: flex;
  gap: 5px;
  &:hover {
    ${LinkEffect};
  }
`;

const InteractiveLine = styled(Line)`
  width: 100%;
`;

const Interactive = () => {
  return (
    <InteractiveContainer>
      <InteractiveLine></InteractiveLine>
      <IconWrapper>
        <IconEntry>
          <InteractiveIcon src={Like}></InteractiveIcon>
          <IconText>Like</IconText>
        </IconEntry>
        <IconEntry>
          <InteractiveIcon src={Comment}></InteractiveIcon>
          <IconText>Comment</IconText>
        </IconEntry>
        <IconEntry>
          <InteractiveIcon src={Share}></InteractiveIcon>
          <IconText>Share</IconText>
        </IconEntry>
      </IconWrapper>
      <InteractiveLine></InteractiveLine>
    </InteractiveContainer>
  );
};

export default Interactive;
