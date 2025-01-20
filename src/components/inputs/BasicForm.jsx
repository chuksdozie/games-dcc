import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import React from "react";
import styled from "styled-components";

const BasicForm = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default BasicForm;

const Wrapper = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input {
    width: 100%;
    font-size: ${fontSizes.l};
    padding: 0.5rem;
    outline: none;
    border-radius: 5px;
    border: 1px solid ${colors.gray2};
  }
`;
