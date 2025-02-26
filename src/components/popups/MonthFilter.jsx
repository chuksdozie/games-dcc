import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import React from "react";
import styled from "styled-components";

export const months = [
  "Overall",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthFilter = ({ data, setMonth, month }) => {
  return (
    <Wrapper>
      {months.map((item, index) => (
        <FilterComponent
          key={index}
          onClick={() => setMonth(index)}
          $selected={index === month}
        >
          <p>{item}</p>
        </FilterComponent>
      ))}
    </Wrapper>
  );
};

export default MonthFilter;

const Wrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  overflow-x: scroll;
  width: 100%;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const FilterComponent = styled.div`
  cursor: pointer;

  p {
    background-color: ${({ $selected }) =>
      $selected ? colors.primary50 : colors.white};
    color: ${({ $selected }) =>
      $selected ? colors.primary700 : colors.gray400};
    border: ${({ $selected }) =>
      $selected ? `1px solid ${colors.primary700}` : colors.gray400};
    padding: 0.2rem 0.7rem;
    font-size: ${fontSizes.xs};
    border-radius: 25px;
    min-width: 60px;
    text-align: center;
  }
`;
