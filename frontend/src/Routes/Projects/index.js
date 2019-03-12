import React, { useContext } from "react";
import styled from "styled-components";
import { Store } from "../../GlobalState/store";

import Loading from "../../Components/Loading";

import Header from "../../Components/Header";
import TitleBox from "../../Components/TitleBox";
import SubtitleWithBtn from "../../Components/SubtitleWithBtn";

import { GiLighthouse } from "react-icons/gi";
import { GET_USER_PROJECTS_QUERY } from "../../queries";
import { useQuery } from "react-apollo-hooks";

const Container = styled.div`
  display: flex;
  width: 100%;
  /*min-height: calc(100% - 150px);*/
  height: 100%;
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

const Underline = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ececec;
`;

const Project = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  border: 1px solid #ececec;
  /* box-shadow: 0 7px 25px 0 rgba(0, 0, 0, 0.1);*/
  margin-bottom: 13px;
  padding: 10px 10px 0px 10px;
  cursor: pointer;

  transition: all 0.1s ease;

  :hover {
    border: 2px solid #35a2d1;
    padding: 9px 9px 7px 9px;
  }
`;

const Thumbnail = styled.img`
  width: 65px;
  height: 60px;
  margin-right: 20px;
`;

const About = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 85px);
`;

const ProjectName = styled.span`
  overflow: hidden;
  height: 22px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  padding-right: 5%;
`;
const ProjectDescription = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-top: 5px;
  padding-right: 5%;
  font-size: 0.7rem;
  color: #5c5c5c;
`;

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;

  span {
    margin-top: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #858e90;
  }
`;

const LightHouse = styled(GiLighthouse)`
  font-size: 10rem;
  color: #858e90;
`;

const Projects = ({ location, history }) => {
  const { dispatch } = useContext(Store);
  const { data, loading } = useQuery(GET_USER_PROJECTS_QUERY, {
    fetchPolicy: "network-only"
  });
  return (
    <>
      <Header location={location} history={history} />
      <TitleBox title={"Your Projects"} />
      <Container>
        <SubtitleWithBtn
          title="PROJECTS"
          buttonText="Create a Project"
          buttonType={"Link"}
          buttonAction="/projects/create"
        />
        <Underline />
        {loading && <Loading />}
        {!loading &&
          data.GetProjects &&
          data.GetProjects.projects.length === 0 && (
            <NotFound>
              <LightHouse />
              <span>No have Project, Create Project First</span>
            </NotFound>
          )}
        {!loading &&
          data.GetProjects &&
          data.GetProjects.projects.map((object, index) => (
            <Project
              key={index}
              onClick={async () => {
                localStorage.setItem("selectedProjectId", object.id);
                dispatch({
                  type: "SWITCH_PROJECT",
                  payload: object.id
                });
                history.push("/dashboard");
              }}
            >
              <Thumbnail
                alt="projectThumbnail"
                src={
                  object.thumbnail ||
                  "https://res.cloudinary.com/monitoro/image/upload/v1552214538/no-thumbnail.png"
                }
              />
              <About>
                <ProjectName>{object.name}</ProjectName>
                <ProjectDescription>{object.description}</ProjectDescription>
              </About>
            </Project>
          ))}
      </Container>
    </>
  );
};

export default Projects;
