import React, { useState } from "react";
import axios from "axios";

import { useMutation } from "react-apollo-hooks";
import { CREATE_NEW_PROJECT } from "../../../queries";
import { toast } from "react-toastify";

import styled, { css } from "styled-components";
import Loading from "../../../Assets/images/loading.gif";
import Header from "../../../Components/Header";
import TitleBox from "../../../Components/TitleBox";
import Subtitle from "../../../Components/Subtitle";

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

const EditThumbnailTag = styled.span`
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 80px;
  height: 15px;
  right: 45px;
  bottom: 5px;
  padding-left: 1px;
  padding-right: 1px;
  padding-top: 2px;
  padding-bottom: 2px;
  background: #dcdcdc;

  color: white;
  font-size: 0.6rem;
`;

const ThumbnailFrame = styled.label`
  display: flex;
  position: relative;
  justify-content: center;
  margin-bottom: 30px;
  cursor: pointer;

  &:hover ${EditThumbnailTag} {
    display: flex;
  }
  img {
    width: 150px;
    height: 150px;
    text-align: center;
  }
`;

const ThumbnailUploader = styled.input`
  color: white;
  opacity: 0;
  height: 10px;
  &:focus {
    outline: none;
  }
`;

const CreateProject = ({ history, location }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState(
    "https://res.cloudinary.com/monitoro/image/upload/v1552214538/no-thumbnail.png"
  );

  const createNewProjectMutation = useMutation(CREATE_NEW_PROJECT);

  return (
    <>
      <Header location={location} history={history} />
      <TitleBox title={"Create a Project"} />
      <Container>
        <form>
          <ThumbnailUploader
            id={"thumbnail"}
            type="file"
            accept="image/*"
            onChange={async e => {
              const {
                target: { files }
              } = e;

              if (files) {
                setThumbnailURL(Loading);
                const formData = new FormData();
                formData.append("file", files[0]);
                formData.append("api_key", "221794274994255");
                formData.append("upload_preset", "monitoro");
                formData.append("timestamp", String(Date.now() / 1000));

                const {
                  data: { secure_url }
                } = await axios.post(
                  "https://api.cloudinary.com/v1_1/monitoro/image/upload",
                  formData
                );

                if (secure_url) {
                  console.log(secure_url);
                  setThumbnailURL(secure_url);
                }
              }
            }}
          />
          <ThumbnailFrame htmlFor="thumbnail">
            <img src={thumbnailURL} alt="projectThumbnail" />
            <EditThumbnailTag className="editTag">
              Click to Edit
            </EditThumbnailTag>
          </ThumbnailFrame>
        </form>

        <Subtitle title={"Project Name"} />
        <InputBox
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
        />

        <Subtitle title={"Description"} />
        <InputBox
          value={description}
          onChange={e => setDescription(e.target.value)}
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
                variables: { projectName, thumbnail: thumbnailURL, description }
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
                      pathname: "/projects",
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
