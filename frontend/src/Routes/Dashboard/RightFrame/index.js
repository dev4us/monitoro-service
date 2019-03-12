import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const About = styled.div`
  display: flex;
  width: 100%;
  height: 250px;
  border-bottom: 1px solid #ececec;
`;

const RightFrame = ({ selectedMsgId }) => {
  if (selectedMsgId === 0) {
    return (
      <Container>
        <About>1</About>
      </Container>
    );
  }
};

export default RightFrame;
