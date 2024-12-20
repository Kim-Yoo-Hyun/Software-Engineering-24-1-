import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const BottomNav = () => {
  return (
    <NavBar>
      <NavItem to="/" end>
        {({ isActive }) => <NavText className={isActive ? 'active' : ''}>Home</NavText>}
      </NavItem>
      <NavItem to="/news">{({ isActive }) => <NavText className={isActive ? 'active' : ''}>News</NavText>}</NavItem>
    </NavBar>
  );
};

export default BottomNav;

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 37.5rem;
  height: 60px;
  background-color: #333;
  position: fixed;
  bottom: 0;
`;

const NavItem = styled(NavLink)`
  color: #fff;
  font-size: 1.2rem;
  text-decoration: none;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 1.5rem;

  &.active {
    background-color: grey;
    color: black;

    span {
      color: black;
    }
  }
`;

const NavText = styled.span`
  color: inherit;
  font-size: 2.5rem;

  &.active {
    //font-weight: bold;
    color: black;
  }
`;
