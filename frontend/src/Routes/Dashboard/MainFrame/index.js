import React, { useState } from "react";

import styled, { css } from "styled-components";
import LatestLog from "../LatestLog";
import RightFrame from "../RightFrame";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const LeftFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 100%;
`;

const TopBar = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background: #f5f5f5;
  padding-top: 10px;
`;

const IndexBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.333%;
  height: 40px;
  background: white;
  border-bottom: 3px solid white;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Roboto";
  color: #5c5c5c;

  &:hover {
    border-bottom: 3px solid #d8f4ff;
  }

  ${props =>
    props.index === true &&
    css`
      border-bottom: 3px solid #64ccf8;
      &:hover {
        border-bottom: 3px solid #64ccf8;
      }
    `}

  :first-child {
    border-top-left-radius: 15px;
  }
  :last-child {
    border-top-right-radius: 15px;
  }
`;

const Controller = styled.div`
  width: 100%;
  height: 50px;
  border-top: 1px solid #ececec;
`;

const MainFrame = () => {
  const [index, setIndex] = useState(1);
  const [selectedMsgId, setMsgId] = useState(0);
  return (
    <Container>
      <LeftFrame>
        <TopBar>
          <IndexBtn index={index === 1 && true} onClick={() => setIndex(1)}>
            Recent
          </IndexBtn>
          <IndexBtn index={index === 2 && true} onClick={() => setIndex(2)}>
            Coming
          </IndexBtn>
          <IndexBtn index={index === 3 && true} onClick={() => setIndex(3)}>
            Soon
          </IndexBtn>
        </TopBar>
        <LatestLog setMsgId={setMsgId} />
        <Controller />
      </LeftFrame>
      <RightFrame selectedMsgId={selectedMsgId} />
    </Container>
  );
};

export default MainFrame;
