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
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #dcdcdc;
  min-height: 27px;
  margin-bottom: 8px;

  span {
    :first-child {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }
`;

const DetailName = styled.span`
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
`;

const DetailTime = styled.span`
  color: #5c5c5c;
  font-size: 0.6rem;
  margin-bottom: 5px;
`;

const DetailTimeInHistory = styled.span`
  color: #5c5c5c;
  font-size: 0.7rem !important;
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
  padding-right: 3%;

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

const HistoryBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 65px;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 1490px) {
    flex-direction: column;
    justify-content: space-between;
    height: 70px;
  }

  span {
    :first-child {
      display: flex;
      flex-wrap: wrap;
      font-size: 0.8rem;
      justify-content: space-between;
      align-items: center;
      height: 14px;
      padding-left: 2px;
    }
    :last-child {
      font-size: 0.8rem;
    }
  }
`;

const LocationData = styled.span`
  color: #bdbbbb;
  padding-left: 4px;
  margin-top: 10px;

  @media (max-width: 1490px) {
    padding-left: 3px;
  }
`;

const SimilarMsg = styled.span`
  /* width: 200px;*/
  display: block !important;
  overflow: hidden;
  white-space: nowrap;
  max-width: 260px;
  text-overflow: ellipsis;

  @media (max-width: 1490px) {
    margin-bottom: 5px;
  }
  @media (max-width: 995px) {
    margin-bottom: unset;
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
            <span>
              <LevelIcon
                level={data.GetMessage.message.level}
                inDetail={true}
              />
              <DetailName> {data.GetMessage.message.contents}</DetailName>
            </span>

            <DetailTime>
              {moment(Number(data.GetMessage.message.createdAt)).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </DetailTime>
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
            title={`Recent Similar Messages (${data.GetMessage.msgCount})`}
            maxHeight="320px"
            icon="timer"
          >
            {data.GetMessage.similarMsg &&
              data.GetMessage.similarMsg.map((object, index) => (
                <HistoryBox key={index}>
                  <span>
                    <SimilarMsg>{object.contents}</SimilarMsg>
                    <DetailTimeInHistory>
                      {moment(Number(object.createdAt)).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </DetailTimeInHistory>
                  </span>
                  {object.location && (
                    <LocationData>{object.location}</LocationData>
                  )}
                </HistoryBox>
              ))}
          </InfoBox>
        </LogFrame>
      </MainFrame>
    </Container>
  );
};

export default Detail;
