import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const BoldTypography = styled(Typography)`
  font-weight: 600;
  font-size: ${(props) => props.sz};
`;

export const TitleTypography = styled(Typography)`
  font-weight: bold;
  font-size: 18px;
  padding: 0 0 15px 0;
`;
