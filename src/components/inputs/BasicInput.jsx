import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import React from "react";
import styled from "styled-components";

const BasicInput = (props) => {
  return (
    <Wrapper>
      {props.label && <p>{props.label}</p>}
      <input
        type={props.type ?? "text"}
        // placeholder={placeholder}
        onChange={props.onChange}
        value={props.value}
        {...props}
      />
      {props.error && <h5 className="error">{props.error}</h5>}
    </Wrapper>
  );
};

export default BasicInput;

const Wrapper = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  p {
    color: ${colors.gray600};
    font-size: ${fontSizes.m};
  }
  input {
    width: 100%;
    font-size: ${fontSizes.l};
    padding: 0.8rem;
    outline: none;
    border-radius: 8px;
    border: 1px solid ${colors.gray2};
  }
  .error {
    font-size: ${fontSizes.m};
    font-weight: 400;
    color: ${colors.error600};
    margin: 0;
  }
`;
