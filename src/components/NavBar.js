import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../shared/config';

const NavBarWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.black};
  height: max(45px, 4%);
  padding: 4px 0;
  align-items: center;
  gap: 30px;
  color: ${colors.gray2};
  width: 100%;
  background: ${colors.white};
`;
const NavBarLogo = styled.div`
  border-radius: 50%;
  background-color: ${colors.gray};
  height: 38px;
  width: 38px;
  display: grid;
  place-items: center;
  margin: auto 20px;
`;
const SearchBar = styled.input`
  background-color: ${colors.gray};
  width: 530px;
  height: 30px;
  border-radius: 15px;
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
  width: 38px;
  height: 38px;
  margin: auto 10px;
  background-color: ${colors.gray};
`;

const NavBar = () => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <NavBarWrapper>
        <NavBarLogo></NavBarLogo>
        <div style={{ display: 'flex', flexGrow: 2, justifyContent: 'center' }}>
          <SearchBar placeholder="Search Embark" onChange={handleChange} />
        </div>
        <UserLogo></UserLogo>
      </NavBarWrapper>
    </>
  );
};

export default NavBar;
