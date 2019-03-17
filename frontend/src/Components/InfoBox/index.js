import React from "react";
import styled, { css } from "styled-components";
import { FaRegCompass, FaTags, FaInfoCircle, FaRegClock } from "react-icons/fa";

const Container = styled.div`
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px 10px 15px;
  background: #f6f8fa;
  color: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 0.8rem;
  border-bottom: 1px solid #dcdcdc;
`;

const BodyFrame = styled.div`
  padding: 15px 15px 15px 15px;
  font-size: 0.8rem;

  /* Customize website's scrollbar like Mac OS
  Not supports in Firefox and IE */

  /* total width */
  &::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }

  /* background of the scrollbar except button or resizer */
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  /* scrollbar itself */
  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 4px solid #fff;
  }

  /* set button(top and bottom of the scrollbar) */
  &::-webkit-scrollbar-button {
    display: none;
  }

  ${props =>
    props.maxHeight !== null &&
    css`
      max-height: ${props => props.maxHeight};
      overflow-y: auto;
    `}
`;

const IconCss = css`
  font-size: 0.8rem;
  margin-right: 5px;
  margin-bottom: 2px;
`;

const CompassIcon = styled(FaRegCompass)`
  ${IconCss}
`;

const TagIcon = styled(FaTags)`
  ${IconCss}
`;

const InfoIcon = styled(FaInfoCircle)`
  ${IconCss}
`;

const TimerIcon = styled(FaRegClock)`
  ${IconCss}
`;

const InfoBox = ({ children, title, maxHeight = null, icon = null }) => {
  return (
    <Container>
      <Header>
        {(icon !== null && (icon === "compass" && <CompassIcon />)) ||
          (icon === "tags" && <TagIcon />) ||
          (icon === "info" && <InfoIcon />) ||
          (icon === "timer" && <TimerIcon />)}

        {title}
      </Header>
      <BodyFrame maxHeight={maxHeight}>{children}</BodyFrame>
    </Container>
  );
};

export default InfoBox;
