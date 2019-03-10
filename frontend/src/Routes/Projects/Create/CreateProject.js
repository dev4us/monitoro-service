import React, { useState } from "react";

import { useMutation } from "react-apollo-hooks";
import { CREATE_NEW_PROJECT } from "../../../queries";
import { toast } from "react-toastify";

import styled, { css } from "styled-components";
import Header from "../../../Components/Header";
import TitleBox from "../../../Components/TitleBox";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 100px);
  flex-direction: column;

  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 25%;
  padding-right: 25%;

  @media (max-width: 850px) {
    padding-left: 5%;
    padding-right: 5%;
  }
`;

const Subtitle = styled.span`
  font-size: 1rem;
  color: #555555;
  margin-bottom: 15px;
`;

const InputBox = styled.input`
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 10px;
  height: 30px;
  color: #555555;
  border: 1px solid #eaeaea;
`;

const RemoteFrame = styled.div`
  display: flex;
  border-top: 1px solid #eaeaea;
  padding-top: 10px;
  justify-content: flex-end;
  align-items: center;

  span {
    font-size: 0.8rem;
    font-weight: bold;
    color: #848181;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }
`;

const SubmitBtn = styled.button`
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  height: 35px;
  border: none;
  margin-left: 15px;

  font-size: 0.7rem;
  color: white;
  cursor: pointer;

  &:hover {
    ${props =>
      props.isAble
        ? css`
            background: #2fbbf7;
          `
        : css`
            background: #dcdcdc;
          `}
  }

  ${props =>
    props.isAble
      ? css`
          background: #64ccf8;
        `
      : css`
          background: #dcdcdc;
        `}
`;

const CreateProject = ({ history, location }) => {
  const [projectName, setProjectName] = useState("");
  const createNewProjectMutation = useMutation(CREATE_NEW_PROJECT);
  return (
    <>
      <Header location={location} history={history} />
      <TitleBox title={"Create a Project"} />
      <Container>
        <Subtitle> Project Name </Subtitle>
        <InputBox
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
        />
        <RemoteFrame>
          <span>Cancel</span>
          <SubmitBtn
            isAble={projectName !== ""}
            onClick={() => {
              if (projectName === "") {
                toast.error("Please Insert your Project name");
                return false;
              }
              createNewProjectMutation({
                variables: { projectName }
              }).then(
                result => {
                  const {
                    data: {
                      CreateProject: {
                        ok: mutationSuccess,
                        error: mutationError,
                        project: { id: newProjectId }
                      }
                    }
                  } = result;

                  if (mutationSuccess === true) {
                    toast.success("Create Project Success");
                    history.push({
                      pathname: "/projects/settingTag",
                      state: { projectName, newProjectId }
                    });
                  } else {
                    toast.error(mutationError);
                  }
                },
                error => {
                  toast.error("Something Wrong, Please Try Again");
                }
              );
            }}
          >
            Create Project
          </SubmitBtn>
        </RemoteFrame>
      </Container>
    </>
  );
};

export default CreateProject;
