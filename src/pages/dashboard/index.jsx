import DefaultTable from "@/components/table/DefaultTable";
import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import React from "react";
import styled from "styled-components";

const index = () => {
  return (
    <Wrapper>
      {" "}
      <DefaultTable />
    </Wrapper>
  );
};

export default index;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header {
    color: ${colors.gray600};
    font-size: ${fontSizes.xl};
    margin: 1rem 0;
  }
`;
