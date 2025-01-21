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
} from "@/hooks/firebase/anonymous.hook";
import BasicTextArea from "@/components/inputs/BasicTextArea";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { FaUserSecret } from "react-icons/fa";
import colors from "@/constants/colors";
import fontSizes from "@/constants/fontsizes";
import Link from "next/link";
import { convertToCustomFormatForDateTime } from "@/utils/dateFunctions";
import { toast } from "react-toastify";
import DefaultTable from "@/components/table/DefaultTable";
import { calculateLeagueTable, scorelines } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dataRef = useRef();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const number = useSelector((state) => state?.counter?.value);
  const submithandler = (e) => {
    e.preventDefault();
    handleSubmit({ name: "ahmed" });
    dataRef.current.value = "";
  };

  const result = calculateLeagueTable(scorelines);
  console.log({ result });
  // const { mutate, isLoading } = useCreateAnonymous();
  // const data = useGetAllAnonymous();

  const columns = [
    {
      name: "Player",
      selector: (row) => row.team,
      sortable: true,
    },
    {
      name: "Points",
      selector: (row) => <h3>{row.points}</h3>,
      sortable: true,
    },
    {
      name: "MP",
      selector: (row) => row.played,
      sortable: true,
    },
    {
      name: "W",
      selector: (row) => row.played - (row.losses + row.draws),
      sortable: true,
    },
    {
      name: "D",
      selector: (row) => row.draws,
      sortable: true,
    },
    {
      name: "L",
      selector: (row) => row.losses,
      sortable: true,
    },

    {
      name: "GF",
      selector: (row) => row.GF,
      sortable: true,
    },
    {
      name: "GA",
      selector: (row) => row.GA,
      sortable: true,
    },
    {
      name: "GD",
      selector: (row) => row.GD,
      sortable: true,
    },
    {
      name: "Last 5",
      selector: (row) => row.draws,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        gap: "1rem",
        padding: "2rem 1rem",
        minHeight: "100vh",
        backgroundColor: colors.black,
        // backgroundImage: `url(/bga.png)`,
        backgroundSize: "cover",
      }}
    >
      {scorelines?.map((scoreline, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "1rem",
            backgroundColor: colors.white,
            // backgroundImage: `url(/bga.png)`,
            backgroundSize: "cover",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "8px",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <p>{scoreline.home}</p>
            <h2>
              {scoreline.homeGoals} - {scoreline.awayGoals}
            </h2>{" "}
            <p>{scoreline.away}</p>
          </span>
        </div>
      ))}

      <p style={{ fontSize: fontSizes.s }}>Built by DC CORP.</p>
    </div>
  );
}
