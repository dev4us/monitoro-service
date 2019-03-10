import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background: #74828d;
`;

const Title = styled.span`
  font-size: 0.8rem;
  padding-left: 60px;
  color: white;

  @media (max-width: 850px) {
    padding-left: 25px;
  }
`;

const TitleBox = ({ title }) => {
  return (
    <Container>
      <Title># {title}</Title>
    </Container>
  );
};

export default TitleBox;
