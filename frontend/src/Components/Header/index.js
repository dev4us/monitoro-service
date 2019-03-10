import React, { useState, useContext } from "react";
import { Store } from "../../GlobalState/store";

import { GoogleLogout } from "react-google-login";

import styled, { css } from "styled-components";

import { FaAngleDown } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 60px;
  background: black;
  padding-left: 50px;
`;

const MainLogo = styled.span`
  color: #64ccf8;
  font-size: 1.2rem;
  height: 20px;
  margin-right: 45px;
  font-weight: bold;
`;
const LeftMenus = styled.span``;

const LeftMenu = styled.span`
  color: white;
  font-size: 0.8rem;
  padding-top: 1.2px;
  margin-right: 30px;
  cursor: pointer;
`;

const RightMenus = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
  right: 35px;
  align-items: center;

  img {
    height: 50%;
    margin-right: 10px;
  }
  span {
    color: white;
    font-size: 0.7rem;
    margin-right: 5px;
  }
`;

const AngleDown = styled(FaAngleDown)`
  color: white;
  cursor: pointer;
`;

const PopSideMenu = styled.div`
  ${props =>
    props.isPop === true
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
  position: absolute;
  width: 200px;
  top: 60px;
  right: 0px;
  border: 1px solid #dcdcdc;
  border-bottom-left-radius: 5px;

  background: white;
  z-index: 1;
  padding-top: 5px;
  padding-bottom: 5px;

  span {
    display: flex;
    padding-top: 5px;
    padding-bottom: 10px;
    padding-left: 15px;
    font-size: 0.8rem;
    color: #5c5c5c;
    cursor: pointer;
    user-select: none;
  }
`;

const Header = ({ history }) => {
  const { dispatch } = useContext(Store);
  const [isPop, setPop] = useState(false);
  return (
    <Container>
      <MainLogo>MONITORO</MainLogo>
      <LeftMenus>
        <LeftMenu>DashBoard</LeftMenu>
        <LeftMenu>Projects</LeftMenu>
      </LeftMenus>
      <RightMenus>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="profile_img"
        />
        <span>Aiden Pearce</span>
        <AngleDown onClick={() => setPop(!isPop)} />
      </RightMenus>
      <PopSideMenu isPop={isPop}>
        <span>Your Profile</span>
        <span>Help</span>

        <GoogleLogout
          buttonText="Logout"
          clientId="640441314268-7dthvqpin5rrb6kithpurt4kf9mrd9fq.apps.googleusercontent.com"
          render={renderProps => (
            <span onClick={renderProps.onClick}>Sign Out</span>
          )}
          onLogoutSuccess={() => {
            localStorage.removeItem("jwt");
            dispatch({ type: "LOGOUT" });
            history.push("/");
          }}
        />
      </PopSideMenu>
    </Container>
  );
};

export default Header;
