import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import React from "react";
import styled from "styled-components";

const BasicDropdown = (props) => {
  return (
    <Wrapper>
      {props.label && <p>{props.label}</p>}
      <select
        name={props.name}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      >
        {props?.options.map((opt, index) => (
          <option key={index}>{opt}</option>
        ))}
      </select>
      {props.error && <h5 className="error">{props.error}</h5>}
    </Wrapper>
  );
};

export default BasicDropdown;

const Wrapper = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  p {
    color: ${colors.gray600};
    font-size: ${fontSizes.m};
  }
  select {
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
