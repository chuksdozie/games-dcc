import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import Link from "next/link";
import React from "react";
import { FaFootballBall, FaUserSecret } from "react-icons/fa";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { useSelector } from "react-redux";
import styled from "styled-components";

const AppHeader = () => {
  const { user } = useSelector((state) => state?.user);
  return (
    <Wrapper>
      <p>
        <MdOutlineSportsVolleyball color={colors.primary700} size={20} />
        Games
      </p>

      {/* <p>{user?.email}iok</p> */}
      <div>
        <Link href={"/"} style={{ textDecoration: "none" }}>
          Table
        </Link>
        <Link href={"/standings"} style={{ textDecoration: "none" }}>
          Standings
        </Link>

        {user && (
          <Link href={"/messages"} style={{ textDecoration: "none" }}>
            Admin
          </Link>
        )}
      </div>
    </Wrapper>
  );
};

export default AppHeader;

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: ${colors.white};
  /* background-color: ${colors.primary700}; */
  border-bottom: 1px solid ${colors.gray300};
  align-items: center;
  padding: 1.5rem 1rem;
  p {
    color: ${colors.primary700};
    font-size: ${fontSizes.l};
    font-weight: 700;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 0.5rem;
  }
  div {
    display: flex;
    gap: 1rem;
    p {
      color: ${colors.indigo600};
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
`;
