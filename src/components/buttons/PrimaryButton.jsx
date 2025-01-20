import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import React from "react";
import styled from "styled-components";

const PrimaryButton = ({ width, onClick, loading, value, ...props }) => {
  return (
    <Button
      $width={width}
      onClick={onClick}
      disabled={props?.disabled}
      {...props}
    >
      {loading ? "Please Wait..." : value}
    </Button>
  );
};

export default PrimaryButton;

const Button = styled.button`
  background-color: ${({ disabled }) =>
    disabled ? colors.gray300 : colors.indigo600};
  border: 0;
  font-size: ${fontSizes.l};
  padding: 1rem;
  border-radius: 50px;
  color: ${colors.white};
  width: ${(props) => props.$width ?? "100%"};
`;
