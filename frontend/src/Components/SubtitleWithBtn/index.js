import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.span`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-size: 1rem;
  color: #555555;
`;

const Button = styled.button`
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;
  border: none;
  box-shadow: 0 7px 25px 0 rgba(0, 0, 0, 0.1);
  background: ${props => props.color};
  cursor: pointer;
  &:hover {
    background: ${props => props.Hcolor};
  }
`;

const Subtitle = ({
  title,
  buttonText,
  buttonColor,
  buttonHColor,
  buttonURI
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Link to={buttonURI}>
        <Button color={buttonColor} Hcolor={buttonHColor}>
          {buttonText}
        </Button>
      </Link>
    </Container>
  );
};

export default Subtitle;
