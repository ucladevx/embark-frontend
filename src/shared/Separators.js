import styled from 'styled-components';
import React from 'react';
import { colors } from './config';

const OrContainer = styled.div`
  display: flex;
  color: ${colors.gray5};
`;

export const Line = styled.div`
  width: 150px;
  height: 1px;
  margin-top: 10px;
  border: 0.1px solid ${colors.gray4};
  margin-right: ${(props) => (props.mr ? `${props.mr}px` : 0)};
  margin-left: ${(props) => (props.ml ? `${props.ml}px` : 0)};
`;

const LongLine = styled(Line)`
  width: 506px;
`;

export const OrSeperator = () => {
  return (
    <OrContainer>
      <Line mr={30}></Line>
      Or
      <Line ml={30}></Line>
    </OrContainer>
  );
};

export const LineSeparator = () => {
  return <LongLine></LongLine>;
};
