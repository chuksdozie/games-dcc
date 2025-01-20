import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";

const BasicArrayInput = (props) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    setOptions(props?.existingValues);
  }, [props?.existingValues]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newArray = Array.isArray(options) ? [...options] : [];
      newArray.push(e.target.value);
      setValue("");
      ref.current.value = "";
      setOptions(newArray);
      props.shoot(newArray);
    }
  };

  const removeOption = (indx) => {
    const newArray = options.filter((_, index) => index !== indx);
    setOptions(newArray);
    props.shoot(newArray);
  };

  useEffect(() => {
    console.log({ value });
  }, [value]);
  return (
    <Wrapper>
      {props.label && <p>{props.label}</p>}
      <div className="input-rest">
        <input
          ref={ref}
          type={props.type ?? "text"}
          placeholder={props.placeholder}
          // onChange={() => props.shoot(options)}
          onKeyUp={handleKeyDown}
          {...props}
        />
        <div className="values-div">
          {options &&
            options?.map((option, indx) => (
              <div key={indx} className="options">
                <h6>{option}</h6>
                <FaWindowClose
                  onClick={() => removeOption(indx)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
        </div>
      </div>
      {props.error && <h5>{props.error}</h5>}
    </Wrapper>
  );
};

export default BasicArrayInput;

const Wrapper = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

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
    border: 0px solid ${colors.gray2};
    ::placeholder {
      color: ${colors.gray100} !important;
      font-weight: 100;
    }
  }
  .input-rest {
    /* background-color: pink; */
    /* padding: 0.5rem; */
    border: 1px solid ${colors.gray2};
    border-radius: 8px;
  }
  .values-div {
    /* background-color: pink; */
    padding: 0.5rem;
    display: flex;
    border-top: 1px solid ${colors.gray2};
    min-height: 45px;
    flex-wrap: wrap;
  }
  .options {
    margin: 0.3rem 0.5rem;
    font-size: ${fontSizes.m};
    font-weight: 200;
    background-color: ${colors.gray200};
    padding: 0.4rem 1rem;
    border-radius: 15px;
    display: flex;
    align-items: center;
    h6 {
      font-size: ${fontSizes.m};
      font-weight: 200;
      margin-right: 0.5rem;
    }
  }
`;
