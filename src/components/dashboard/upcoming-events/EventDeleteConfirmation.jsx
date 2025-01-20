import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import React from "react";
import styled from "styled-components";

const EventDeleteConfirmation = ({ onConfirm, onCancel, loading }) => {
  return (
    <Wrapper>
      <p className="header">Are you sure?</p>
      <p>This event will be lost permanently, you cannot get it back</p>
      <div className="button-div">
        <button onClick={onCancel} disabled={loading}>
          {loading ? "Please wait..." : "Cancel"}
        </button>
        <button onClick={onConfirm} disabled={loading}>
          {loading ? "Please wait..." : "Yes, Delete"}
        </button>
      </div>
    </Wrapper>
  );
};

export default EventDeleteConfirmation;

const Wrapper = styled.div`
  /* background-color: red; */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: ${colors.gray800};
    margin: 0rem 0 0.5rem;
  }
  .header {
    font-size: ${fontSizes.xl};
    font-weight: 600;
  }
  .button-div {
    display: flex;
    gap: 0.5rem;
    margin: 1rem;
  }
`;
