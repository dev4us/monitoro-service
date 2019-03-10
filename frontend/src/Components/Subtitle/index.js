import React from "react";
import styled from "styled-components";

const Container = styled.span`
  font-size: 1rem;
  color: #555555;
  margin-bottom: 15px;
`;

const Subtitle = ({ title }) => {
  return <Container>{title}</Container>;
};

export default Subtitle;
