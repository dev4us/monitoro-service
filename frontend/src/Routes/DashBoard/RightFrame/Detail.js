import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { GET_MESSAGE_QUERY } from "../../../queries";
import moment from "moment";

import LevelIcon from "../../../Components/LevelIcon";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MainFrame = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const AboutFrame = styled.div`
  width: 50%;
  height: 100%;
  padding-right: 3%;
  border-right: 1px solid #dcdcdc;
`;

const AboutLine = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #dcdcdc;
  height: 27px;
  margin-bottom: 5px;

  span {
    :nth-child(2) {
      max-width: 260px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #023d80;
      font-size: 1rem;
      font-weight: bold;
      margin-left: 8px;
    }
    :last-child {
      position: absolute;
      right: 0px;
      color: #5c5c5c;
      font-size: 0.6rem;
    }
  }
`;

const LogFrame = styled.div`
  width: 50%;
  height: 100%;
`;

const Detail = ({ selectedMsgId, selectedProjectId }) => {
  const { loading, data } = useQuery(GET_MESSAGE_QUERY, {
    variables: {
      projectId: Number(selectedProjectId),
      messageId: selectedMsgId
    }
  });

  if (loading) {
    return <div />;
  }
  console.log(loading, data);
  // GetMessage.message
  return (
    <Container>
      <MainFrame>
        <AboutFrame>
          <AboutLine>
            <LevelIcon level={data.GetMessage.message.level} />
            <span> {data.GetMessage.message.contents}</span>
            <span>
              {moment(Number(data.GetMessage.message.createdAt)).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </span>
          </AboutLine>
          <div />
        </AboutFrame>
        <LogFrame>2</LogFrame>
      </MainFrame>
    </Container>
  );
};

export default Detail;
