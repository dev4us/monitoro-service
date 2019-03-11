import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header";
import TitleBox from "../../Components/TitleBox";

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100% - 100px);
  flex-direction: column;

  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 25%;
  padding-right: 25%;

  @media (max-width: 850px) {
    padding-left: 5%;
    padding-right: 5%;
  }
`;

const Dashboard = ({ location, history }) => {
  return (
    <>
      <Header location={location} history={history} />
      <TitleBox title={"Your Projects"} />
      <Container />
    </>
  );
};

export default Dashboard;
