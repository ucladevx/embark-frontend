import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import {
  HeaderImage,
  ProfileInfo,
  ProfileWrapper,
  ProfileAvatar,
  NameDescription,
  NameDescriptionWrapper,
} from './StyleProfile';
import lawn from '../../images/lawn.png';
import { Typography } from '@material-ui/core';
import { TitleTypography } from '../../shared/Typography';

const Profile = (props) => {
  const { userid } = useParams();

  return (
    <>
      <NavBar></NavBar>
      <ProfileWrapper>
        <HeaderImage src={lawn}></HeaderImage>
        <ProfileInfo>
          <NameDescriptionWrapper>
            <ProfileAvatar></ProfileAvatar>
            <NameDescription>
              <TitleTypography>Test user</TitleTypography>
              <Typography>Economics Major</Typography>
            </NameDescription>
          </NameDescriptionWrapper>
        </ProfileInfo>
      </ProfileWrapper>
    </>
  );
};

export default Profile;
