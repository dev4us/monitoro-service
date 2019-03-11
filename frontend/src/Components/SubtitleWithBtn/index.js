import React from "react";
import styled from "styled-components";
import SubmitBtn from "../SubmitBtn";
import { Link } from "react-router-dom";

const Container = styled.span`
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 10px;
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #555555;
  font-family: "Roboto" !important;
`;

const Subtitle = ({ title, buttonText, buttonType, buttonAction }) => {
  if (buttonType === "Link") {
    return (
      <Container>
        <Title>{title}</Title>
        <Link to={buttonAction}>
          <SubmitBtn
            fontColor="white"
            bgColor="#2fbbf7"
            hoverBgColor="#35a2d1"
            text={buttonText}
          />
        </Link>
      </Container>
    );
  } else if (buttonType === "Action") {
    return (
      <Container>
        <Title>{title}</Title>
        <SubmitBtn
          fontColor="white"
          bgColor="#2fbbf7"
          hoverBgColor="#35a2d1"
          onClick={buttonAction}
          text={buttonText}
        />
      </Container>
    );
  }
};

export default Subtitle;
