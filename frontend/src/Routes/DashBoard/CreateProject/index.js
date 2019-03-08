import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";

import styled from "styled-components";
import { toast } from "react-toastify";

import BabyBirdsPng from "../../../Assets/images/babybird.png";
import { CREATE_NEW_PROJECT } from "../../../queries";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StepBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 45px;
  margin-bottom: 30px;
  @media (max-width: 850px) {
    width: 100%;
  }
`;

const Step = styled.div`
  :not(:last-child) {
    margin-right: 10px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 45px;
  cursor: default;

  @media (max-width: 850px) {
    width: 150px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid
      ${props => (props.active === true ? "#73c6f3" : "#c6e8fa")};
    border-radius: 100%;
    color: ${props => (props.active === true ? "#73c6f3" : "#c6e8fa")};
    font-size: 1.2rem;
    font-weight: bold;
    @media (max-width: 850px) {
      width: 25px;
      height: 25px;
    }
  }

  span {
    color: ${props => (props.active === true ? "#73c6f3" : "#c6e8fa")};
    font-size: 1rem;
    font-weight: bold;
    margin-left: 10px;
  }
`;

const MainFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 400px;
  border: 2px solid #ececec;
  padding: 45px 15px 15px 15px;

  h2 {
    color: #72c5f3;
    font-size: 1.6rem;
    font-weight: bold;
    @media (max-width: 850px) {
      font-size: 1rem;
    }
  }

  @media (max-width: 850px) {
    width: 80%;
  }
`;

const BabyBirds = styled.img`
  width: 150px;
`;

const InputBox = styled.div`
  width: 80%;
  height: 70px;
  margin-bottom: 15px;

  @media (max-width: 850px) {
    width: 100%;
  }

  h3 {
    color: #9b9b9b;
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 1rem;

    @media (max-width: 850px) {
      font-size: 0.8rem;
    }
  }
  input {
    width: 100%;
    height: 35px;
    padding-left: 15px;
    padding-right: 15px;
    border: 1px solid #dcdcdc;
    border-radius: 2px;
    color: #6d6b6b;

    &::placeholder {
      color: #ff5f8f;
    }

    &:focus {
      outline-color: rgb(77, 144, 254);
      outline-offset: -2px;
      outline-style: auto;
      outline-width: 2px;
    }
  }
`;

const SubmitBtn = styled.button`
  width: 80%;
  height: 50px;
  border: none;
  border-radius: 3px;
  background: #73c6f3;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  font-weight: bold;

  :hover {
    background: #8cd0f4;
  }

  @media (max-width: 850px) {
    width: 100%;
  }
`;

const CreateProject = ({ history }) => {
  const [projectName, setProjectName] = useState("");

  const createNewProjectMutation = useMutation(CREATE_NEW_PROJECT);

  return (
    <Container>
      <StepBox>
        <Step active={true}>
          <div>1</div>
          <span>Create Project</span>
        </Step>
        <Step active={false}>
          <div>2</div>
          <span>Setting Tags</span>
        </Step>
      </StepBox>
      <MainFrame>
        <h2>Create New Project</h2>
        <BabyBirds src={BabyBirdsPng} />
        <InputBox>
          <h3>Name your Project</h3>
          <input
            type="text"
            placeholder="Required * "
            value={projectName}
            onChange={event => setProjectName(event.target.value)}
          />
        </InputBox>
        <SubmitBtn
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
                    CreateProject: { ok: mutationSuccess, error: mutationError }
                  }
                } = result;

                if (mutationSuccess === true) {
                  toast.success("Create Project Success");
                  history.push({
                    pathname: "/settingTags",
                    state: { projectName }
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
      </MainFrame>
    </Container>
  );
};

export default CreateProject;
