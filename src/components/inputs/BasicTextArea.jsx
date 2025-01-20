import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import React from "react";
import styled from "styled-components";

const BasicTextArea = (props) => {
  return (
    <Wrapper>
      {props.label && <p>{props.label}</p>}
      <textarea
        type={props.type ?? "text"}
        // placeholder={placeholder}
        onChange={props.onChange}
        value={props.value}
        {...props}
      />
      {props.error && <p className="error">{props.error}</p>}
    </Wrapper>
  );
};

export default BasicTextArea;

const Wrapper = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  p {
    color: ${colors.gray600};
    font-size: ${fontSizes.m};
  }
  textarea {
    width: 100%;
    height: 200px;
    font-size: ${fontSizes.xxl};
    padding: 0.5rem;
    outline: none;
    border-radius: 15px;
    border: 5px solid ${colors.indigo600};
    color: ${colors.indigo600};
  }
  .error {
    font-size: ${fontSizes.m};
    font-weight: 400;
    color: ${colors.error600};
    margin: 0;
  }
`;
