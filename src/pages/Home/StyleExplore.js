import styled from "styled-components";
import { colors } from "../../shared/config";
import { Typography } from "@material-ui/core";
import { BoldTypography } from "../../shared/Typography";

export const ClubCardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: relative;
  margin-bottom: 30px;
`;
export const ClubCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`;
export const ClubCardImage = styled.img`
  width: 160px;
  max-width: 160px;
  height: 150px;
  border: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.86);
`;
export const ClubCardCaption = styled(Typography)`
  width: 160px;
  height: 30px;
  background-color: ${colors.gray1};
  text-align: center;
  padding: 5px;
  border: none;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.86);
`;

export const ClubCardNextButton = styled.div`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 100%;
  background-color: ${colors.gray2};
  text-align: center;
  line-height: 70px;
  position: absolute;
  top: 30%;
  right: -2%;
  transition: ease 0.3s;
  &:hover {
    cursor: pointer;
    transition: ease 0.3s;
    background-color: ${colors.gray1};
  }
`;
export const ExploreWrapper = styled.div`
  box-sizing: border-box;
  padding: 20px;
  border-radius: 2px;
  background-color: ${colors.white};
`;
export const ExploreInfoSeperator = styled.div`
  width: 100%;
  height: 0;
  align-self: center;
  border: 1px solid ${colors.gray1};
`;
export const ExploreTitle = styled(BoldTypography)`
  font-size: 18px;
`;
export const ExploreSubtitle = styled(BoldTypography)`
  font-size: 13px;
  margin-top: 17px;
  margin-bottom: 14px;
`;
export const ExploreObj = styled(Typography)`
  height: 26px;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => (props.textColor ? props.textColor : colors.black)};
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 8px;
  font-size: 14px;
  margin: 5px;
`;
export const ExploreFilter = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  position: relative;
`;
export const ExploreFilterTitle = styled(Typography)`
  text-transform: none;
  align-self: flex-end;
  color: ${colors.gray3};
  text-decoration: none;
  margin-bottom: 7px;
  margin-right: 2px;
`;
export const ExploreAddFilter = styled(Typography)`
  text-transform: none;
  align-self: flex-end;
  color: ${colors.gray3};
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  margin-bottom: 7px;
`;
export const ExploreFilterCross = styled.div`
  margin-right: 3px;
  &:hover {
    cursor: pointer;
    text-decoration: bold;
    color: ${colors.gray3};
    transition: ease 0.3s;
  }
`;
export const ExploreFilterPopup = styled.div`
  position: absolute;
  top: 35px;
  right: 15px;
  border: none;
  border-radius: 5px;
  background-color: ${colors.gray2};
  padding: 10px;
  z-index: 9;
  display: none;
`;
export const UpcomingItemBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export const UpcomingItem = styled.div`
  display: flex;
  border: 1px solid ${colors.gray2};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
`;
export const UpcomingItemImage = styled.img`
  margin-top: 5px;
  width: 40px;
  height: 40px;
`;
export const UpcomingItemInfoCol = styled(BoldTypography)`
  display: flex;
  flex-direction: column;
  margin-left: 7px;
`;
export const UpcomingItemTitle = styled(BoldTypography)`
  font-size: 18px;
  margin-bottom: 0;
`;
export const UpcomingItemSubtitle = styled(Typography)`
  font-size: 12px;
  margin-top: -3px;
  color: ${colors.black};
`;
export const UpcomingItemObj = styled(Typography)`
  height: 20px;
  background-color: ${(props) => props.bgcolor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 8px;
  font-size: 14px;
  margin-top: 2px;
`;
export const UpcomingItemWhenBox = styled(Typography)`
  margin-left: auto;
  display: flex;
  flex-direction: column;
`;
export const UpcomingItemDate = styled(Typography)`
  font-size: 12px;
`;
export const UpcomingItemGoingBtn = styled(Typography)`
  height: 24px;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => (props.textColor ? props.textColor : colors.black)};
  border-radius: 5px;
  width: 70px;
  padding: 0 8px;
  font-size: 14px;
  margin: 7px 7px 7px 9px;
  text-align: center;
  transition: ease 0.3s;
  &:hover {
    background-color: ${colors.gray1};
    cursor: pointer;
    transition: ease 0.3s;
  }
`;

export const AddFilter = styled(Typography)`
  text-transform: none;
  align-self: flex-end;
  color: ${colors.gray3};
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ViewMoreLink = styled(Typography)`
  text-decoration: underline;
  background: none;
  font-size: 11px;
  color: ${colors.grey3};
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  text-align: right;
  margin-top: 0px;
`;
