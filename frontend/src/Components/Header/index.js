import React, { useState, useContext } from "react";
import { useQuery } from "react-apollo-hooks";
import { Link } from "react-router-dom";
import { Store } from "../../GlobalState/store";

import { GoogleLogout } from "react-google-login";

import styled, { css } from "styled-components";

import { FaAngleDown } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { GET_USER_RPOFILE_QUERY } from "../../queries";

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 60px;
  background: black;
  padding-left: 50px;
  @media (max-width: 850px) {
    padding-left: 15px;
  }
`;

const MainLogo = styled.span`
  color: #64ccf8;
  font-size: 1.2rem;
  height: 20px;
  margin-right: 45px;
  font-weight: bold;
`;

const LeftMenus = styled.span`
  display: flex;
  height: 100%;
  align-items: center;

  @media (max-width: 850px) {
    display: none;
  }
`;

const LeftMenu = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100px;
  height: 100%;
  font-size: 0.8rem;
  padding-top: 1.2px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;

  ${props =>
    props.active === true &&
    css`
      border-bottom: 3px solid #64ccf8;
      padding-top: 4.2px;
    `}
`;

const MobileLeftMenus = styled(FaBars)`
  display: none;
  color: white;
  font-size: 1.3rem;

  @media (max-width: 850px) {
    display: block;
    margin-right: 20px;
  }
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
  top: 50px;
  right: 33px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  box-shadow: 0 7px 25px 0 rgba(0, 0, 0, 0.1);

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

const PopMainMenu = styled.div`
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
  top: 50px;
  left: 5px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  box-shadow: 0 7px 25px 0 rgba(0, 0, 0, 0.1);

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

const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Header = ({ history, location: { pathname } }) => {
  const { dispatch } = useContext(Store);
  const { data } = useQuery(GET_USER_RPOFILE_QUERY);
  const [isLeftPop, setLeftPop] = useState(false);
  const [isRightPop, setRightPop] = useState(false);

  if (!data.GetProfile) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <MobileLeftMenus
        onClick={() => {
          setLeftPop(!isLeftPop);
        }}
      />
      <LinkButton to="/projects">
        <MainLogo>MONITORO</MainLogo>
      </LinkButton>
      <PopMainMenu isPop={isLeftPop}>
        <LinkButton to="/dashboard">
          <span>DashBoard</span>
        </LinkButton>
        <LinkButton to="/projects">
          <span>Projects</span>
        </LinkButton>
      </PopMainMenu>
      <LeftMenus>
        <LinkButton to="/dashboard">
          <LeftMenu active={pathname.includes("/dashboard")}>
            DashBoard
          </LeftMenu>
        </LinkButton>
        <LinkButton to="/projects">
          <LeftMenu to="/projects" active={pathname.includes("/projects")}>
            Projects
          </LeftMenu>
        </LinkButton>
      </LeftMenus>
      <RightMenus>
        <img src={data.GetProfile.user.profileImage} alt="profile_img" />
        <span>{data.GetProfile.user.userName}</span>
        <AngleDown onClick={() => setRightPop(!isRightPop)} />
      </RightMenus>
      <PopSideMenu isPop={isRightPop}>
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
