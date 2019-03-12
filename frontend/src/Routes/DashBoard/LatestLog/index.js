import React, { useContext, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import isCheck from "../../../Assets/images/isCheck.svg";
import LevelIcon from "../../../Components/LevelIcon";
import { Store } from "../../../GlobalState/store";

import { MdSearch } from "react-icons/md";

import { useQuery, useSubscription } from "react-apollo-hooks";
import {
  GET_MESSAGES_LASTEST_QUERY,
  SEND_MESSAGES_SUBSCRIPTION
} from "../../../queries";

const Container = styled.div`
  flex: 1;
  cursor: pointer;
  border-right: 1px solid #ececec;
  overflow-y: scroll;

  /* Customize website's scrollbar like Mac OS
  Not supports in Firefox and IE */

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

const LogMessage = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 1px dashed #dcdcdc;
  padding: 10px 10px 10px 10px;

  .contents {
    margin-top: 7px;
    font-size: 0.8rem;
    color: #023d80;
    font-weight: bold;
    padding-left: 25px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 30px;
  }
  &:hover {
    background: #f8f8f8;
  }
`;

const TopLine = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
`;

const CheckBox = styled.input`
  display: none;

  &:checked + label {
    background-color: white;
    background-image: url(${props => props.isCheckBg});
    background-size: cover;
  }
`;

const LabelBox = styled.label`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: white;
  border: 1px solid #ececec;
  user-select: none;
  margin-right: 5px;
  cursor: pointer;
`;

const CreatedAt = styled.div`
  position: absolute;
  top: 3px;
  right: 0px;
  font-size: 0.7rem;
  color: #898989;
`;

const SettingFrame = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #dcdcdc;
  background: #ececec;
  padding-right: 15px;
  padding-left: 10px;
`;

const SearchBar = styled.div`
  display: flex;
  height: 25px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    padding-left: 2px;
    padding-top: 2px;

    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    background: white;
    border-right: 1px solid #ececec;
  }
  input {
    width: 160px;
    height: 100%;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    padding-left: 15px;
    padding-right: 15px;
    border: none;
  }
`;

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #8fc9f5;
  span {
    :first-child {
      font-size: 4rem;
      margin-bottom: 15px;
    }
    :last-child {
      font-size: 1.2rem;
    }
  }
`;

const LatestLog = () => {
  const { state } = useContext(Store);
  const [search, setSearch] = useState("");

  const { data } = useQuery(GET_MESSAGES_LASTEST_QUERY, {
    variables: { projectId: Number(state.selectedProjectId) }
  });
  console.log(data);
  useSubscription(SEND_MESSAGES_SUBSCRIPTION, {
    onSubscriptionData: ({
      client,
      subscriptionData: {
        data: { SendMessageSubscription }
      }
    }) => {
      try {
        let messages = client.readQuery({
          query: GET_MESSAGES_LASTEST_QUERY,
          variables: {
            projectId: Number(state.selectedProjectId)
          }
        }).GetMessages.messages;

        if (
          SendMessageSubscription.projectId === Number(state.selectedProjectId)
        ) {
          let newMessages = Object.assign(SendMessageSubscription, {
            __typename: "Message"
          });

          delete newMessages.projectId;
          messages.unshift(newMessages);

          client.writeQuery({
            query: GET_MESSAGES_LASTEST_QUERY,
            variables: { projectId: Number(state.selectedProjectId) },
            data: {
              messages
            }
          });
          console.log(messages);
        }
      } catch {
        console.log("Subscription Error... please refresh this page");
      }
    }
  });

  return (
    <>
      <SettingFrame>
        <CheckBox type="checkbox" id="message_all" isCheckBg={isCheck} />
        <LabelBox
          htmlFor="message_all"
          style={{ border: "1px solid #b4b1b1" }}
        />
        <SearchBar>
          <div>
            <MdSearch />
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Using Tag or Message"
          />
        </SearchBar>
      </SettingFrame>
      <Container>
        {data &&
          data.GetMessages &&
          data.GetMessages.messages
            .filter(
              object =>
                object.contents.toLowerCase().includes(search.toLowerCase()) ||
                (object.tags &&
                  object.tags.filter(tagObject =>
                    tagObject.name.toLowerCase().includes(search.toLowerCase())
                  ).length > 0) ||
                moment(Number(object.createdAt))
                  .format("YYYY-MM-DD HH:mm:ss")
                  .includes(search)
            )
            .map((object, index) => (
              <LogMessage key={index}>
                <TopLine>
                  <CheckBox
                    type="checkbox"
                    id={`message_${index}`}
                    isCheckBg={isCheck}
                  />
                  <LabelBox htmlFor={`message_${index}`} />
                  <LevelIcon level={object.level} />
                  <CreatedAt>
                    {moment(Number(object.createdAt)).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </CreatedAt>
                </TopLine>
                <div className="contents">- {object.contents}</div>
              </LogMessage>
            ))}

        {data &&
          data.GetMessages &&
          data.GetMessages.messages.filter(
            object =>
              object.contents.toLowerCase().includes(search.toLowerCase()) ||
              (object.tags &&
                object.tags.filter(tagObject =>
                  tagObject.name.toLowerCase().includes(search.toLowerCase())
                ).length > 0) ||
              moment(Number(object.createdAt))
                .format("YYYY-MM-DD HH:mm:ss")
                .includes(search)
          ).length === 0 && (
            <NotFound>
              <span>404</span>
              <span>Not found Result : (</span>
            </NotFound>
          )}
      </Container>
    </>
  );
};

export default LatestLog;
