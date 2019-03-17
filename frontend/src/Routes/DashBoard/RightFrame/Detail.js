import React from "react";
import styled, { css } from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { GET_MESSAGE_QUERY } from "../../../queries";
import moment from "moment";

import LevelIcon from "../../../Components/LevelIcon";
import InfoBox from "../../../Components/InfoBox";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const MainFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const AboutFrame = styled.div`
  min-width: 250px;
  width: 50%;
  padding-right: 3%;
  border-right: 1px solid #dcdcdc;

  @media (max-width: 995px) {
    width: 100%;

    border-right: none;
  }
`;

const AboutLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #dcdcdc;
  min-height: 27px;
  margin-bottom: 8px;

  span {
    :nth-child(2) {
      width: 275px;
      height: 18px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #023d80;
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 5px;
      padding-right: 15px;
    }
    :nth-child(3) {
      color: #5c5c5c;
      font-size: 0.6rem;
      margin-bottom: 5px;
    }
  }
`;

const TagFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 0.8rem;
  padding: 5px 10px 5px 10px;

  ${props =>
    props.color
      ? css`
          border: 1px solid ${props => props.color};
          color: ${props => props.color};
        `
      : css`
          border: 1px solid #adadad;
          color: #adadad;
        `}
`;

const LogFrame = styled.div`
  min-width: 250px;
  width: 50%;
  padding-left: 3%;

  @media (max-width: 995px) {
    width: 100%;
    padding-left: 0%;
    margin-top: 15px;
  }
`;

const LogLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #dcdcdc;
  min-height: 27px;
  margin-bottom: 8px;

  span {
    width: 275px;
    height: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #023d80;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  @media (max-width: 995px) {
    width: 100%;
  }
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
            <LevelIcon level={data.GetMessage.message.level} inDetail={true} />
            <span> {data.GetMessage.message.contents}</span>
            <span>
              {moment(Number(data.GetMessage.message.createdAt)).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </span>
          </AboutLine>
          <InfoBox title="Full Message" maxHeight="200px" icon="info">
            {data.GetMessage.message.contents}
          </InfoBox>
          {data.GetMessage.message.location && (
            <InfoBox title="Location" icon="compass">
              {data.GetMessage.message.location}
            </InfoBox>
          )}
          {data.GetMessage.message.tags &&
            data.GetMessage.message.tags.length !== 0 && (
              <InfoBox title="Related Tags" icon="tags">
                <TagFrame>
                  {data.GetMessage.message.tags.map((object, index) => (
                    <Tag key={index} color={object.color}>
                      # {object.name}
                    </Tag>
                  ))}
                </TagFrame>
              </InfoBox>
            )}
        </AboutFrame>
        <LogFrame>
          <LogLine>
            <span>History</span>
          </LogLine>
          <InfoBox
            title="Recent Similar Messages"
            maxHeight="320px"
            icon="timer"
          />
        </LogFrame>
      </MainFrame>
    </Container>
  );
};

export default Detail;
