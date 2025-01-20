import React, { useMemo, useState } from "react";
import styled from "styled-components";

const CentralPopUp = ({ children, isOpen, toggleModal }) => {
  return (
    <Wrapper
      $width={"50%"}
      $isOpen={isOpen}
      onClick={(e) => {
        e.stopPropagation();
        toggleModal();
      }}
    >
      <div className="main-content">{children}</div>
    </Wrapper>
  );
};

export default CentralPopUp;

const Wrapper = styled.div`
  background-color: rgba(6, 10, 92, 0.259);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  backdrop-filter: blur(5px);
  display: flex;
  visibility: ${(props) => (props?.$isOpen ? "visible" : "hidden")};
  justify-content: center;
  align-items: center;
  .main-content {
    background-color: white;
    width: ${(props) => (props.$width ? props.$width : "400px")};
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 1px 1px 20px 0 rgba(6, 10, 92, 0.4);
  }
`;
