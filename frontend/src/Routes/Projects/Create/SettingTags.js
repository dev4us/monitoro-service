import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";

import Header from "../../../Components/Header";
import TitleBox from "../../../Components/TitleBox";

import styled, { css } from "styled-components";
import { TwitterPicker } from "react-color";
import { toast } from "react-toastify";

import { CREATE_TAG_MUTATION, GET_TAGS_QUERY } from "../../../queries";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 100px);
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
  padding: 15px 15px 15px 15px;

  h2 {
    color: #72c5f3;
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 10px;
    @media (max-width: 850px) {
      font-size: 1rem;
    }
  }

  h3 {
    color: #dcdcdc;
    margin-bottom: 10px;
  }

  @media (max-width: 850px) {
    width: 80%;
  }
`;

const TagBox = styled.div`
  width: 80%;
  height: 250px;
  border-bottom: none;
  border: 1px solid #dcdcdc;
  overflow-y: scroll;
  padding: 5px 5px 5px 5px;

  @media (max-width: 850px) {
    width: 100%;
  }
`;

const TagItem = styled.div`
  :not(:last-child) {
    margin-right: 5px;
  }
  display: inline-flex;
  padding: 5px 5px 5px 5px;
  height: 25px;
  border: 2px solid ${props => props.color};
  color: ${props => props.color};
  margin-bottom: 3px;
  border-radius: 5px;
  line-height: 0.8;
`;

const InputBox = styled.div`
  display: flex;
  width: 80%;
  height: 35px;
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
    flex: 1;
    height: 35px;
    padding-left: 15px;
    padding-right: 15px;
    border: 1px solid #dcdcdc;
    border-top: none;
    border-right: none;

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
const ColorZone = styled.div`
  :last-child {
    border-right: 1px solid #dcdcdc;
  }
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 60px;
  height: 35px;
  border-left: none;
  border-bottom: 1px solid #dcdcdc;
`;

const ColorPreview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 80%;
  height: 80%;
  color: white;
  font-size: 0.6rem;
  cursor: pointer;
  border-radius: 5px;

  background: ${props => props.color};
`;

const AddTagBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 80%;
  height: 80%;
  color: white;
  font-size: 0.6rem;
  cursor: pointer;
  border-radius: 5px;
  background: ${props => props.color};
`;

const ColorPicker = styled(TwitterPicker)`
  ${props =>
    props.able === false &&
    css`
      display: none;
    `}

  width: 276px;
  position: absolute;
  top: -125px;
  touch-action: none;
`;

const SettingTags = ({ history, location }) => {
  let projectName = "";
  let projectId = "";
  let tags = [];

  if (location && location.state && location.state.newProjectId) {
    projectName = location.state.projectName;
    projectId = location.state.newProjectId;
  } else {
    history.push("/createProject");
  }
  const [addTagName, setAddTagName] = useState("");
  const [tagColor, setTagColor] = useState("#ff7e83");

  const [isSelectColor, switchSelectColor] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const { data, error, refetch } = useQuery(GET_TAGS_QUERY, {
    variables: { projectId }
  });

  useEffect(() => {
    refetch();
  }, [refetchTrigger]);

  if (error) {
    toast.error("Something happen Refresh Please 😅");
    return (
      <div>
        Something Wrong, try again{" "}
        <span role="img" aria-label="sorry Page error">
          😅
        </span>
      </div>
    );
  }

  if (!data || !data.GetTags || !data.GetTags.tags) {
    tags = [];
  } else {
    tags = data.GetTags.tags;
  }

  const createTagMutation = useMutation(CREATE_TAG_MUTATION);

  return (
    <>
      <Header history={history} location={location} />
      <TitleBox title="Setting Tags" />
      <Container>
        <StepBox>
          <Step active={false}>
            <div>1</div>
            <span>Create Project</span>
          </Step>
          <Step active={true}>
            <div>2</div>
            <span>Setting Tags</span>
          </Step>
        </StepBox>
        <MainFrame>
          <h2>Let's Add Tags to Use </h2>
          <h3>ex) Notice, Warning, danger..</h3>
          <TagBox>
            {tags.map((object, index) => (
              <TagItem color={object.color} key={index}>
                # {object.name}
              </TagItem>
            ))}
          </TagBox>
          <InputBox>
            <input
              type="text"
              placeholder={`Insert Tag Name here.`}
              value={addTagName}
              onChange={event => setAddTagName(event.target.value)}
            />
            <ColorZone>
              <ColorPreview
                color={tagColor}
                onClick={() => switchSelectColor(!isSelectColor)}
              >
                color
              </ColorPreview>
              <ColorPicker
                able={isSelectColor}
                color={tagColor}
                onChangeComplete={color => {
                  setTagColor(color.hex);
                  switchSelectColor(false);
                }}
                triangle="hide"
              />
            </ColorZone>
            <ColorZone>
              <AddTagBtn
                color={tagColor}
                onClick={() => {
                  if (addTagName === "") {
                    toast.error("Tag name is Required Field");
                    return false;
                  }
                  createTagMutation({
                    variables: {
                      projectId,
                      name: addTagName,
                      color: tagColor
                    }
                  }).then(
                    result => {
                      const {
                        data: {
                          CreateTag: {
                            ok: mutationSuccess,
                            error: mutationError
                          }
                        }
                      } = result;

                      if (mutationSuccess === true) {
                        setRefetchTrigger(!refetchTrigger);
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
                Add
              </AddTagBtn>
            </ColorZone>
          </InputBox>
          <SubmitBtn
            onClick={() => {
              if (addTagName === "") {
                toast.error("Please Insert tag name");
                return false;
              }
              createTagMutation({
                variables: { projectId, name: addTagName, color: tagColor },
                refetchQueries: [
                  {
                    query: GET_TAGS_QUERY
                  }
                ]
              }).then(
                result => {
                  const {
                    data: {
                      CreateTag: { ok: mutationSuccess, error: mutationError }
                    }
                  } = result;

                  if (mutationSuccess === true) {
                    console.log("success");
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
            {`Done. Let's Start with ${projectName}`}
          </SubmitBtn>
        </MainFrame>
      </Container>
    </>
  );
};

export default SettingTags;
