import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const SideBarItem = ({ label, route }) => {
  const router = useRouter();
  const isActive = router.asPath.split("/")[2] === route.split("/")[2];
  return (
    <Item $active={isActive}>
      <h3 onClick={() => router.push(route)}>{label}</h3>
    </Item>
  );
};

export default SideBarItem;

const Item = styled.div`
  /* background-color: pink; */
  /* border: 1px solid black; */
  /* padding: 0.5rem; */
  cursor: pointer;
  margin: 0.3rem 0.5rem;
  /* border-radius: 10px; */
  background-color: ${(prop) =>
    prop.$active ? colors.primary50 : "transparent"};
  border-left: ${(prop) =>
    prop.$active ? `2px solid ${colors.primary700}` : "transparent"};
  :hover {
    background-color: ${colors.primary50};
    /* border-radius: 10px; */
  }
  h3 {
    padding: 0.8rem 0.7rem;
    font-size: ${fontSizes.l};
    font-weight: 400;
    color: ${(prop) =>
      prop.$active ? `${colors.primary700}` : `${colors.black}`};
  }
`;
