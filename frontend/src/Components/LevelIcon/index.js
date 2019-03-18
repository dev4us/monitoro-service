import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
  width:50px;
  height: 20px;
  font-size: 0.7rem;
  letter-spacing:0.5px;
  user-select:none;
  font-family: 'Roboto';

  ${props =>
    props.level === "Notice" &&
    css`
      background: #10c71a;
    `}
    ${props =>
      props.level === "Debug" &&
      css`
        background: #c762ce;
      `}    
  ${props =>
    props.level === "Warning" &&
    css`
      background: #ff9400;
    `}
  ${props =>
    props.level === "Danger" &&
    css`
      background: #ff4d00;
    `};

    ${props =>
      props.inDetail &&
      css`
        margin-right: 8px;
        margin-bottom: 5px;
      `}
`;

const LevelIcon = ({ level, inDetail }) => {
  let levelText = "";

  if (level.toUpperCase() === "NOTICE") {
    levelText = "Notice";
  } else if (level.toUpperCase() === "DEBUG") {
    levelText = "Debug";
  } else if (level.toUpperCase() === "WARNING") {
    levelText = "Warning";
  } else if (level.toUpperCase() === "DANGER") {
    levelText = "Danger";
  }
  return (
    <Container level={levelText} inDetail={inDetail}>
      {levelText}
    </Container>
  );
};

export default LevelIcon;
