import styled from 'styled-components';
import { colors } from '../../shared/config';
import { Avatar } from '@material-ui/core';

export const NameDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 15px;
`;

export const ProfileAvatar = styled(Avatar)`
  width: 8vw;
  height: 8vw;
  top: -3vw;
  border: 5px solid ${colors.white};
`;

export const ProfileWrapper = styled.div`
  background: ${colors.blue2};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 3vw;
`;

export const HeaderImage = styled.img`
  width: 49vw;
  height: 15vh;
`;

export const ProfileInfo = styled.div`
  background-color: ${colors.white};
  height: 200px;
  width: 49vw;
  position: relative;
  padding: 15px;
  box-sizing: border-box;
`;

export const NameDescription = styled.div`
  display: flex;
  flex-direction: column;
`;
