import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../shared/config";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// icons for navbar icons
import { ReactComponent as EmbarkIcon } from "../images/navbar_embark_logo.svg";
import { ReactComponent as UserIcon } from "../images/navbar_user_logo.svg";
import { ReactComponent as DevXIcon } from "../images/navbar_club_logo.svg";
import { ReactComponent as CollapseIcon } from "../images/navbar_collapse_icon.svg";

// imports for search bar
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import LinkEffect from "../shared/Effect/LinkEffect";

const NavBarWrapper = styled.div`
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
const SearchBar = styled.input`
  background-color: ${colors.gray};
  width: 610px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  margin: auto 0px auto 0px;
  align-items: center;
  padding-left: 20px;
  &::placeholder {
    font-style: italic;
  }
  border: none;
  outline: none;
`;
const UserLogo = styled.div`
  border-radius: 50%;
  width: 38px;
  height: 38px;
  margin: auto 0px auto 0px;
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

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const handleSearchChange = (e) => {
    // just show suggestions
    // and console log for now
    setSearch(e.target.value);
    console.log(search);
    setShowList(true);
  };

  const handleEmbarkIconClick = (e) => {
    // just console log for now
    console.log("Embark Icon Clicked");
    history.push("/home");
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
    console.log("User Icon Clicked");
    history.push("/user/" + user._id);
  };

  const handleCollapseIconClick = (e) => {
    // just console log for now
    console.log("Collapse Icon Clicked");
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
                />
              )}
            />
          </div>
        </section>
        <UserLogo onClick={handleUserIconClick}>
          <UserIcon />
        </UserLogo>
        <CollapseLogo onClick={handleCollapseIconClick}>
          <CollapseIcon />
        </CollapseLogo>
      </NavBarWrapper>
    </>
  );
};

export default NavBar;
