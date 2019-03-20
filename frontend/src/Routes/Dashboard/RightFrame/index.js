import React, { useContext } from "react";
import styled, { css } from "styled-components";

import { toast } from "react-toastify";

import { Store } from "../../../GlobalState/store";
import { useQuery } from "react-apollo-hooks";
import { GET_PROJECT_QUERY } from "../../../queries";

import Overview from "./Overview";
import Detail from "./Detail";
import LevelGraph from "./LevelGraph";
import SimilarMsgGraph from "./SimilarMsgGraph";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  background: #f5f5f5;
  overflow-y: auto;
  /* min-width: 640px;*/

  @media (max-width: 550px) {
    order: 1;
    padding: unset;
  }

  /* total width */
  &::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }

  /* background of the scrollbar except button or resizer */
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  /* scrollbar itself */
  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 4px solid #fff;
  }

  /* set button(top and bottom of the scrollbar) */
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const MenuFrame = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  background: #f5f5f5;
  padding-top: 11px;
  min-width: 650px;

  @media (max-width: 550px) {
    min-width: unset;
  }
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
  display: -webkit-box;
  flex-direction: row;
  width: 100%;
  min-width: 650px;
  border-bottom: 1px solid #ececec;
  border-left: 1px solid #ececec;
  border-right: 1px solid #ececec;
  padding: 30px 30px 30px 30px;
  background: white;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  @media (max-width: 550px) {
    min-width: unset;
    flex-direction: column;
    align-items: center;
    display: flex;
  }
`;

const BottomFrame = styled.div`
  @media (max-width: 550px) {
    display: none;
  }
`;

const RightFrame = ({ selectedMsgId, menu, setMenu }) => {
  const { state } = useContext(Store);

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
        {(selectedMsgId === 0 || menu === 1) && <Overview data={data} />}
        {selectedMsgId !== 0 && menu === 2 && (
          <Detail
            selectedMsgId={selectedMsgId}
            selectedProjectId={state.selectedProjectId}
          />
        )}
      </TopFrame>
      <BottomFrame>
        {(selectedMsgId === 0 || menu === 1) && <LevelGraph />}
        {selectedMsgId !== 0 && menu === 2 && (
          <SimilarMsgGraph selectedMsgId={selectedMsgId} />
        )}
      </BottomFrame>
    </Container>
  );
};

export default RightFrame;
