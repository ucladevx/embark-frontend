import React from "react";
import { useSelector, useDispatch } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {
  ClubCardsContainer,
  ClubCard,
  ClubCardImage,
  ClubCardCaption,
} from "../Home/StyleExplore";
// Images
import avatarImg from "../../images/avatar.svg";
import devxImg from "../../images/devx.jpeg";
import dbImg from "../../images/dailyBruin.png";
import consultingImg from "../../images/bruinConsulting.png";
import { colors } from "../../shared/config";
import axios from "axios";

const getExpandedClub = (clubId) => async (dispatch) => {
  try {
    const res = await axios.get(`/club/profilebyId?clubId=${clubId}`);
    return res;
  } catch (err) {
    console.error(err);
  }
};

const FollowedClubs = () => {
  const testmode = false;
  const clubs = useSelector((state) => state.user.clubs); //this isn't right, idk how to get clubs from club ids
  let expandedClubs = [];
  for (let i = 0; i < clubs.length; i++) {
    expandedClubs.push(getExpandedClub(clubs[i]));
  }
  return (
    <>
      {/* CLUB CARDS CONTAINER: */}
      <ClubCardsContainer>
        <OwlCarousel
          loop={true}
          autoplay={true}
          autoplaySpeed={1000}
          autoplayTimeout={2500}
          items={3}
          dots={false}
          className="owl-theme"
        >
          {testmode ? (
            <>
              <div>
                <ClubCard>
                  <ClubCardImage src={devxImg} />
                  <ClubCardCaption>UCLA DevX</ClubCardCaption>
                </ClubCard>
              </div>
              <div>
                <ClubCard>
                  <ClubCardImage src={consultingImg} />
                  <ClubCardCaption>Bruin Consulting</ClubCardCaption>
                </ClubCard>
              </div>
              <div>
                <ClubCard>
                  <ClubCardImage src={devxImg} />
                  <ClubCardCaption>UCLA DevX</ClubCardCaption>
                </ClubCard>
              </div>
              <div>
                <ClubCard>
                  <ClubCardImage src={dbImg} />
                  <ClubCardCaption>Daily Bruin</ClubCardCaption>
                </ClubCard>
              </div>
              <div>
                <ClubCard>
                  <ClubCardImage src={devxImg} />
                  <ClubCardCaption>UCLA DevX</ClubCardCaption>
                </ClubCard>
              </div>
              <div>
                <ClubCard>
                  <ClubCardImage src={dbImg} />
                  <ClubCardCaption>Daily Bruin</ClubCardCaption>
                </ClubCard>
              </div>
            </>
          ) : (
            expandedClubs.map((c) => {
              return (
                <div>
                  <ClubCard>
                    <ClubCardImage src={c.profilePicURL} />
                    <ClubCardCaption>{c.name}</ClubCardCaption>
                  </ClubCard>
                </div>
              );
            })
          )}
        </OwlCarousel>
      </ClubCardsContainer>
    </>
  );
};

export default FollowedClubs;
