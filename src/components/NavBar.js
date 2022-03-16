import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../shared/config";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useClickOutState } from "../shared/Hook";
// icons for navbar icons
import { ReactComponent as EmbarkIcon } from "../images/navbar_embark_logo.svg";
import { ReactComponent as CollapseIcon } from "../images/navbar_collapse_icon.svg";

// imports for search bar
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import LinkEffect from "../shared/Effect/LinkEffect";
import StickyEffect from "../shared/Effect/StickyEffect";
import Setting from "./Setting";

// imports for data actions
import { searchPosts } from "../redux/actions/dataActions";

import { AskAvatar } from "../pages/Home/StyleLanding";
const NavBarWrapper = styled.div`
  ${StickyEffect}
  z-index: 4;
  display: flex;
  border-bottom: 1px solid ${colors.black};
  height: max(45px, 4%);
  padding: 8px 0;
  align-items: center;
  gap: 30px;
  color: ${colors.gray2};
  width: 100%;
  background: ${colors.white};
`;
const NavBarLogo = styled.div`
  border-radius: 50%;
  height: 38px;
  width: 38px;
  display: grid;
  place-items: center;
  margin: auto 0px auto 85px;
  ${LinkEffect};
`;
const UserLogo = styled.div`
  border-radius: 50%;
  width: 38px;
  height: 38px;
  margin: auto 15px auto 0px;
  ${LinkEffect};
`;
const CollapseLogo = styled.div`
  border-radius: 50%;
  height: 38px;
  width: 38px;
  display: grid;
  place-items: center;
  margin: auto 80px auto 0px;
  ${LinkEffect};
`;

const sampleSuggestions = [
  {
    title: "DevX",
    value: "DevX",
  },
  {
    title: "Computer Science",
    value: "Computer Science",
  },
  {
    title: "Embark",
    value: "Embark",
  },
];

const NavBar = ({ setPage }) => {
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [showSetting, setShowSetting, settingRef] = useClickOutState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearchChange = (e) => {
    // just show suggestions
    // and console log for now
    setSearch(e.target.value);
    //console.log(search);
    setShowList(true);
  };

  const handleEmbarkIconClick = (e) => {
    history.push("/home");
    if (setPage) setPage("main");
  };

  const handleUserIconClick = (e) => {
    // just console log for now
    if (user.userType === "club") {
      history.push("/club-profile");
    } else {
      if (user._id) {
        history.push(`/user/${user._id}`);
      } else {
        history.push("/user/:userid");
      }
    }
    history.push("/user/" + user._id);
  };

  const handleCollapseIconClick = () => {
    setShowSetting(!showSetting);
  };

  const handleSearchSubmit = () => {
    //console.log("got:" +search);
    dispatch(searchPosts(search));
  };

  const handleSearchKeydown = (e) => {
    //console.log("key pressed")
    if (e.keyCode === 13 && e.target.value) {
      handleSearchSubmit();
    }
  };

  return (
    <>
      <NavBarWrapper>
        <NavBarLogo onClick={handleEmbarkIconClick}>
          <EmbarkIcon />
        </NavBarLogo>
        <section
          style={{ display: "flex", flexGrow: 2, justifyContent: "left" }}
        >
          <div>
            <Autocomplete
              id="Search"
              options={showList ? sampleSuggestions : []}
              placeholder="Search"
              freeSolo
              getOptionLabel={(option) => option.title}
              style={{ width: 610, backgroundColor: "#EDEDED" }}
              onInputChange={handleSearchChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search"
                  size="small"
                  onBlur={() => setShowList(false)}
                  variant="outlined"
                  onKeyDown={handleSearchKeydown}
                />
              )}
            />
          </div>
        </section>
        <UserLogo onClick={handleUserIconClick}>
          <AskAvatar src={user.profilePicURL} />
          {/* <UserIcon /> */}
        </UserLogo>
        <span ref={settingRef}>
          <CollapseLogo onClick={handleCollapseIconClick}>
            <CollapseIcon />
          </CollapseLogo>
          {showSetting && <Setting></Setting>}
        </span>
      </NavBarWrapper>
    </>
  );
};

export default NavBar;
