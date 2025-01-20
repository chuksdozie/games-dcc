import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";
import handleSubmit from "@/hooks/firebase/test.hook";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "@/store/slices/counter.slice";
import {
  useCreateAnonymous,
  useGetAllAnonymous,
  useUpdateAnonymous,
} from "@/hooks/firebase/anonymous.hook";
import useAuthWithTimeout from "@/hooks/authTime.hook";
import { clearUser } from "@/store/slices/user.slice";
import styled from "styled-components";
import fontSizes from "@/constants/fontsizes";
import colors from "@/constants/colors";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import MessageChat from "@/components/MessageChat";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [password, setPassword] = useState();
  const authenticateUser = useAuthWithTimeout();
  const { mutate: edit } = useUpdateAnonymous();

  const handleLogin = () => {
    authenticateUser(password);
    setPassword("");
  };
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state?.user);
  const dataRef = useRef();
  const dispatch = useDispatch();
  const number = useSelector((state) => state?.counter?.value);
  const submithandler = (e) => {
    e.preventDefault();
    handleSubmit({ name: "ahmed" });
    dataRef.current.value = "";
  };

  const { mutate } = useCreateAnonymous();
  const data = useGetAllAnonymous();
  const unflaggedMessages = data?.filter((item) => !item?.flagged);

  return (
    <Wrapper>
      {!user && (
        <div className="auth">
          <p>To view messages, enter your password</p>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton onClick={() => handleLogin()} value={"Proceed"} />
        </div>
      )}

      {user &&
        unflaggedMessages?.map((item) => (
          <MessageChat
            key={item?.id}
            data={item}
            onDelete={() => edit({ ...item, flagged: true })}
          />
          // <p key={item?.id} onClick={() => edit({ ...item, flagged: true })}>
          //   {item?.message}
          // </p>
        ))}
      {/* {user?.email} */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
  background-color: ${colors.warning100};
  background-image: url("/bga.png");
  background-size: cover;
  overflow: scroll;
  .auth {
    height: 100%;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    p {
      color: ${colors.indigo600};
      font-weight: 600;
    }
    /* padding: 1rem; */
    input {
      width: 100%;
      /* height: 30px; */
      border-radius: 2rem;
      padding: 1rem;
      /* font-size: ${fontSizes.xxl}; */
      font-size: 1.5rem;
      font-weight: 700;
      color: ${colors.indigo600};
      border: 5px solid ${colors.indigo600};
      text-align: center;
      outline: none;
      &::placeholder {
        font-weight: 400;
        color: ${colors.gray300};
      }
    }
  }
`;
