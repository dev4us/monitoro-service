import React from "react";
import styled from "styled-components";
//import { useQuery } from "react-apollo-hooks";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MainFrame = styled.div``;

const Detail = ({ selectedMsgId }) => {
  //const { loading, data } = useQuery();
  return (
    <Container>
      <MainFrame>1</MainFrame>
      {selectedMsgId}
    </Container>
  );
};

export default Detail;
