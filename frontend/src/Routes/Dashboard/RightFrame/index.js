import React, { useContext } from "react";
import styled from "styled-components";
import { Store } from "../../../GlobalState/store";
import { useQuery } from "react-apollo-hooks";
import { GET_PROJECT_QUERY } from "../../../queries";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const TopFrame = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 300px;
  border-bottom: 1px solid #ececec;
  padding: 15px 15px 15px 15px;
`;

const Thumbnail = styled.img`
  height: 80%;
  border: 1px dashed #dcdcdc;
  margin-right: 15px;
`;

const TopRightFrame = styled.div`
  width: 100%;
  max-width: 780px;
`;

const ProjectName = styled.div`
  max-width: 750px;
  font-family: "Roboto";
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 300px;
`;

const ProjectDescription = styled.div`
  width: 100%;
  max-width: 750px;
  max-height: 200px;
  font-size: 0.8rem;
  padding-top: 20px;
  border-top: 1px solid #dcdcdc;
  word-wrap: break-word;
  overflow-y: auto;
  padding-right: 5px;
`;

const RightFrame = ({ selectedMsgId }) => {
  const { state } = useContext(Store);
  const { loading, data } = useQuery(GET_PROJECT_QUERY, {
    variables: { projectId: Number(state.selectedProjectId) }
  });

  if (loading) {
    return <div>1</div>;
  }

  if (selectedMsgId === 0) {
    return (
      <Container>
        <TopFrame>
          <Thumbnail
            alt="projectThumbnail"
            src={data.GetProject.project.thumbnail}
          />
          <TopRightFrame>
            <ProjectName>{data.GetProject.project.name}</ProjectName>
            <ProjectDescription>
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
