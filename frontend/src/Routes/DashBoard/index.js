import React, { useContext } from "react";
import { Store } from "../../GlobalState/store";
import { Link } from "react-router-dom";

import styled, { css } from "styled-components";
import Header from "../../Components/Header";
import TitleBox from "../../Components/TitleBox";
import MainFrame from "./MainFrame";

import { GiLighthouse } from "react-icons/gi";
import { useQuery } from "react-apollo-hooks";
import LoadingPage from "../../Components/Loading";
import { GET_PROJECT_QUERY } from "../../queries";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 100px);
  flex-direction: column;

  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 25%;
  padding-right: 25%;

  ${props =>
    props.dashboard === true &&
    css`
      flex-direction: column;
      padding: unset;
    `}

  @media (max-width: 550px) {
    height: unset;
  }
`;

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  margin-top: 15%;

  span {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #858e90;
  }
`;

const LightHouse = styled(GiLighthouse)`
  font-size: 10rem;
  color: #858e90;
`;

const LinkBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 150px;
  height: 40px;
  border-radius: 5px;
  background: #2fbbf7;
`;

const Dashboard = ({ location, history }) => {
  const { state } = useContext(Store);

  const { data, loading } = useQuery(GET_PROJECT_QUERY, {
    variables: { projectId: Number(state.selectedProjectId) }
  });

  return (
    <>
      <Header location={location} history={history} />
      {loading && (
        <>
          <TitleBox title="Select your Project or Create a Project First" />
          <Container>
            <LoadingPage />
          </Container>
        </>
      )}
      {state.selectedProjectId === null && (
        <>
          <TitleBox title="Select your Project or Create a Project First" />
          <Container>
            <NotFound>
              <LightHouse />
              <span>Select your Project First</span>
              <LinkBtn to="/projects">Go Projects</LinkBtn>
            </NotFound>
          </Container>
        </>
      )}
      {data.GetProject && data.GetProject.project && (
        <>
          <TitleBox title={data.GetProject.project.name} />
          <Container dashboard={true}>
            <MainFrame />
          </Container>
        </>
      )}
    </>
  );
};

export default Dashboard;
