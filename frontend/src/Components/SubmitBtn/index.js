import React from "react";
import styled from "styled-components";

const Container = styled.button`
  display: block;
  height: 38px;
  padding: 10px 15px 10px 15px;
  border: 1px solid ${props => props.bgColor};
  color: ${props => props.fontColor};
  background: ${props => props.bgColor};
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s;
  &:hover {
    background: ${props => props.hoverBgColor};
  }
`;
const SubmitBtn = ({
  text,
  fontColor,
  bgColor,
  hoverBgColor,
  onClickEvent
}) => {
  return (
    <Container
      fontColor={fontColor}
      bgColor={bgColor}
      hoverBgColor={hoverBgColor}
      onClick={onClickEvent}
    >
      {text}
    </Container>
  );
};

export default SubmitBtn;
