import React from "react";
import styled from "styled-components";

const SummaryListElement = styled.ul``;

const SummaryList: React.FC = ({ children }) => {
  return <SummaryListElement>{children}</SummaryListElement>;
};

export default SummaryList;
