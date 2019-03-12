import React, { useContext } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import { Store } from "../../../GlobalState/store";
import { useQuery } from "react-apollo-hooks";
import { GET_PROJECT_QUERY } from "../../../queries";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-right: 20px;
  background: #f5f5f5;
`;

const MenuFrame = styled.div`
  display: flex;
  height: 50px;
  background: #f5f5f5;
  padding-top: 10px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  border: 1px solid #ececec;
  background: #e0dede;
  font-size: 0.8rem;
  color: #5c5c5c;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  ${props =>
    props.actived === "true" &&
    css`
      background: white;
    `}
`;

const TopFrame = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 300px;
  border-bottom: 1px solid #ececec;
  padding: 30px 15px 15px 30px;
  background: white;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Thumbnail = styled.div`
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  border: 1px dashed #dcdcdc;
  margin-right: 15px;
  background: url(${props => props.bg});
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const TopRightFrame = styled.div`
  width: 100%;
  max-width: 600px;
`;

const ProjectName = styled.div`
  max-width: 580px;
  font-family: "Roboto";
  font-size: 25px;
  padding-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 100px;
  padding-bottom: 10px;
  padding-left: 5px;
  border-bottom: 1px solid #dcdcdc;
`;

const ProjectDescription = styled.div`
  width: 100%;
  max-width: 580px;
  max-height: 200px;
  font-size: 0.8rem;

  word-wrap: break-word;
  overflow: hidden;
  padding-right: 5px;
  padding-left: 10px;
  font-family: "Roboto";
  color: #9a9999;

  .index {
    font-weight: bold;
    font-size: 0.8rem;
    margin-top: 15px;
    margin-bottom: 3px;
    color: #5c5c5c;
  }
`;

const RightFrame = ({ selectedMsgId }) => {
  const { state } = useContext(Store);
  const { loading, data } = useQuery(GET_PROJECT_QUERY, {
    variables: { projectId: Number(state.selectedProjectId) },
    fetchPolicy: "network-only"
  });

  if (loading) {
    return <div>1</div>;
  }

  if (selectedMsgId === 0) {
    if (data.GetProject.project.description.length >= 80) {
      data.GetProject.project.description =
        data.GetProject.project.description.substr(0, 80) + "...";
    }

    return (
      <Container>
        <MenuFrame>
          <Menu actived="true">Overview</Menu>
          <Menu>Coming</Menu>
          <Menu>Soon</Menu>
        </MenuFrame>
        <TopFrame>
          <Thumbnail
            alt="projectThumbnail"
            bg={data.GetProject.project.thumbnail}
          />
          <TopRightFrame>
            <ProjectName>{data.GetProject.project.name}</ProjectName>
            <ProjectDescription>
              <div className="index">• Registration date</div>
              {moment(Number(data.GetProject.project.createdAt)).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
              <div className="index">• API Key</div>
              {data.GetProject.project.apiKey}
              <div className="index">• description</div>
              {data.GetProject.project.description}
            </ProjectDescription>
          </TopRightFrame>
        </TopFrame>
      </Container>
    );
  } else {
    return (
      <Container>
        <TopFrame>
          <img alt="projectThumbnail" src={"s"} />
        </TopFrame>
      </Container>
    );
  }
};

export default RightFrame;
