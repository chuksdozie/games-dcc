import React, { useEffect } from "react";
import SideBar from "./sidebar/SideBar";
import styled from "styled-components";
import AppHeader from "./header/AppHeader";
import { useRouter } from "next/router";
import { FaLock } from "react-icons/fa";
import colors from "@/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/store/slices/user.slice";
import fontSizes from "@/constants/fontsizes";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  useEffect(() => {}, [router]);
  // if (!router.asPath.startsWith("/dashboard")) {
  //   return <div>{children}</div>;
  // }
  return (
    <Wrapper>
      {/* <SideBar /> */}
      <div className="rest">
        {user && (
          <div className="lock" onClick={() => dispatch(clearUser())}>
            <FaLock color="white" size={10} />
            <p>Lock</p>
          </div>
        )}
        <AppHeader />
        <div className="content">{children}</div>
      </div>
    </Wrapper>
  );
};

export default DashboardLayout;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;

  .rest {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    background-color: whitesmoke;
  }

  .content {
    /* display: flex; */
    /* margin: 2rem; */
    overflow-y: scroll;
    /* border-radius: 10px; */
    background-color: white;
  }

  .lock {
    position: absolute;
    top: 50%;
    /* left: 0; */
    right: 0;
    /* bottom: 0; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.indigo600};
    z-index: 9999;
    padding: 1rem;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    gap: 0.5rem;
    p {
      color: ${colors.white};
      font-size: ${fontSizes.xs};
    }
  }
`;
