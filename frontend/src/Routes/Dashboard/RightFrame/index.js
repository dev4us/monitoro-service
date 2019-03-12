import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import { toast } from "react-toastify";

import { Store } from "../../../GlobalState/store";
import { useQuery } from "react-apollo-hooks";
import { GET_PROJECT_QUERY } from "../../../queries";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  background: #f5f5f5;
`;

const MenuFrame = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  background: #f5f5f5;
  padding-top: 11px;
`;

const InMenuFrame = styled.div`
  display: flex;

  :first-child {
  }
  :last-child {
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  border: 1px solid #ececec;
  background: #d8d8d8;
  font-size: 0.8rem;
  color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-family: "Roboto";
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #bfbfbf;
  }

  ${props =>
    props.actived &&
    css`
      color: #5c5c5c;
      background: white;
      &:hover {
        background: white;
      }
    `}

  ${props =>
    props.typed === "delete" &&
    css`
      background: #ff6060;
      &:hover {
        background: #fb2e2e;
      }
    `}
`;

const TopFrame = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 300px;
  border-bottom: 1px solid #ececec;
  border-left: 1px solid #ececec;
  border-right: 1px solid #ececec;
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

const RightFrame = ({ selectedMsgId }) => {
  const { state } = useContext(Store);
  const [menu, setMenu] = useState(2);

  const { loading, data } = useQuery(GET_PROJECT_QUERY, {
    variables: { projectId: Number(state.selectedProjectId) },
    fetchPolicy: "network-only"
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.GetProject.project.description.length >= 80) {
    data.GetProject.project.description =
      data.GetProject.project.description.substr(0, 80) + "...";
  }

  return (
    <Container>
      <MenuFrame>
        <InMenuFrame>
          <Menu
            actived={selectedMsgId === 0 || menu === 1}
            onClick={() => setMenu(1)}
          >
            Overview
          </Menu>
          <Menu
            actived={selectedMsgId !== 0 && menu === 2}
            onClick={() => {
              if (selectedMsgId !== 0) {
                setMenu(2);
              } else {
                toast.warn("Choose a Message First : )");
              }
            }}
          >
            Detail
          </Menu>
        </InMenuFrame>
        <InMenuFrame>
          <Menu typed="delete">Delete</Menu>
        </InMenuFrame>
      </MenuFrame>
      <TopFrame>
        {(selectedMsgId === 0 || menu === 1) && (
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
        )}
      </TopFrame>
    </Container>
  );
};

export default RightFrame;
