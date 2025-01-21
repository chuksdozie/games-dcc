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
import { Last5 } from "@/components/minor/Last5";

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

  const stickyColumnStyles = {
    style: {
      position: "sticky",
      left: 0, // Adjust the position of the sticky column
      backgroundColor: "#fff", // Optional: Add a background to the sticky column
      zIndex: 2, // Ensure it stays above other content
    },
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
      ...stickyColumnStyles,
    },

    {
      name: "MP",
      selector: (row) => row.played,
      sortable: true,
    },
    {
      name: "L",
      selector: (row) => row.losses,
      sortable: true,
    },
    {
      name: "D",
      selector: (row) => row.draws,
      sortable: true,
    },
    {
      name: "W",
      selector: (row) => row.played - (row.losses + row.draws),
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
      name: "Points",
      selector: (row) => <h3>{row.points}</h3>,
      sortable: true,
    },
    {
      name: "Last 5",
      selector: (row) => <Last5 data={row.last5} />,
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

  const conditionalRowStyles = [
    {
      when: (row) => row.index === 3,
      style: {
        backgroundColor: "green !important",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
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
        padding: "1rem",
        height: "100vh",
        backgroundColor: colors.gray100,
        // backgroundImage: `url(/bga.png)`,
        backgroundSize: "cover",
      }}
    >
      <DefaultTable
        columns={columns}
        data={result}
        conditionalRowStyles={conditionalRowStyles}
      />
      <p style={{ fontSize: fontSizes.s }}>Built by DC CORP.</p>
    </div>
  );
}
