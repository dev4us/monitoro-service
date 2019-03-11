import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { Store } from "../../../GlobalState/store";
import { GET_MESSAGES_LASTEST_QUERY } from "../../../queries";

const Container = styled.div`
  width: 400px;
  height: 100%;
  border-right: 1px solid #ececec;
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
  border-bottom: 3px solid #f5f5f5;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;

  ${props =>
    props.index === true &&
    css`
      border-bottom: 3px solid #64ccf8;
    `}

  :first-child {
    border-top-left-radius: 15px;
  }
  :last-child {
    border-top-right-radius: 15px;
  }
`;

const MessageLog = () => {
  const [index, setIndex] = useState(1);
  const { state } = useContext(Store);

  const { data, error } = useQuery(GET_MESSAGES_LASTEST_QUERY, {
    variables: { projectId: Number(state.selectedProjectId) }
  });
  console.log(data, error);
  return (
    <Container>
      <TopBar>
        <IndexBtn index={index === 1 && true} onClick={() => setIndex(1)}>
          Latest
        </IndexBtn>
        <IndexBtn index={index === 2 && true} onClick={() => setIndex(2)}>
          2
        </IndexBtn>
        <IndexBtn index={index === 3 && true} onClick={() => setIndex(3)}>
          3
        </IndexBtn>
      </TopBar>
    </Container>
  );
};

export default MessageLog;
