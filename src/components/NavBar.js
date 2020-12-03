import React, { useState } from "react";
import styled from "styled-components";
import { colors, font } from "../shared/config";

const NavBarWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.black};
  height: 90px;
  align-items: center;
  font-family: ${font.text}, sans-serif;
  justify-content: space-between;
  color: ${colors.mediumgray};
`;
const NavBarLogo = styled.div`
  border-radius: 30px;
  background-color: ${colors.gray};
  height: 42px;
  width: 160px;
  display: grid;
  place-items: center;
  margin-left: 50px;
`;
const SearchBar = styled.input`
  background-color: ${colors.gray};
  width: 530px;
  height: 38px;
  border-radius: 25px;
  display: flex;
  justify-content: flex-start;
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
  width: 48px;
  height: 48px;
  background-color: ${colors.gray};
  margin-right: 50px;
`;

const NavBar = () => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  console.log(search);
  return (
    <NavBarWrapper>
      <NavBarLogo>Logo</NavBarLogo>
      <SearchBar placeholder="Search Embark" onChange={handleChange} />
      <UserLogo></UserLogo>
    </NavBarWrapper>
  );
};

export default NavBar;
