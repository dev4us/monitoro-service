import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { GET_MESSAGE_QUERY } from "../../../queries";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MainFrame = styled.div``;

const Detail = ({ selectedMsgId, selectedProjectId }) => {
  const { loading, data } = useQuery(GET_MESSAGE_QUERY, {
    variables: { projectId: selectedProjectId, messageId: selectedMsgId }
  });
  console.log(loading, data);
  return (
    <Container>
      <MainFrame>1</MainFrame>
      {selectedMsgId}
    </Container>
  );
};

export default Detail;
