import React from "react";
import styled from "styled-components";
import moment from "moment";

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
  width: 60%;
  min-width: 310px;
  @media (max-width: 550px) {
    width: 100%;
  }
`;

const ProjectName = styled.div`
  max-width: 580px;
  font-family: "Roboto";
  font-size: 25px;
  padding-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 15px 100px 10px 5px;
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
    font-weight: 500;
    font-size: 0.8rem;
    margin-top: 15px;
    margin-bottom: 3px;
    color: #5c5c5c;
  }
`;

const Overview = ({ data }) => {
  return (
    <>
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
    </>
  );
};

export default Overview;
