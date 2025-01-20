import SideBarItem from "@/components/dashboard/SideBarItem";
import colors from "@/constants/colors";
import routes from "@/constants/routes";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const SideBar = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <div>Brack</div>
      <div className="item-container">
        {Object.keys(routes).map((route, index) => (
          <SideBarItem
            key={index}
            label={routes[route].name}
            route={routes[route].route}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default SideBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 250px;
  height: 100vh;
  display: flex;
  border-right: 1px solid ${colors.gray300};
  .item-container {
    /* background-color: red; */
    margin: 2rem 0;
    /* border: 1px ${colors.gray200} solid; */
  }
`;
