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

  if (level.toLowerCase() === "notice") {
    levelText = "Notice";
  } else if (level.toLowerCase() === "warning") {
    levelText = "Warning";
  } else if (level.toLowerCase() === "danger") {
    levelText = "Danger";
  }
  return (
    <Container level={levelText} inDetail={inDetail}>
      {levelText}
    </Container>
  );
};

export default LevelIcon;
