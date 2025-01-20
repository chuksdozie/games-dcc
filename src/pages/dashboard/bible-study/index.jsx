import React, { useState } from "react";
import DefaultTable from "@/components/table/DefaultTable";
import { PageHeader, Wrapper } from "..";
import {
  useDeleteUpcomingEvent,
  useGetAllUpcomingEvents,
} from "@/hooks/firebase/upcoming-event.hook";
import { useRouter } from "next/router";
import { AiFillDelete } from "react-icons/ai";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import colors from "@/constants/colors";
import { Tooltip } from "react-tooltip";
import CustomToolTip from "@/components/tooltips/CustomToolTip";
import CentralPopUp from "@/components/popups/CentralPopUp";
import EventDeleteConfirmation from "@/components/dashboard/upcoming-events/EventDeleteConfirmation";
import {
  useDeleteBibleStudy,
  useGetAllBibleStudy,
} from "@/hooks/firebase/bible-study.hook";

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState({});
  const data = useGetAllBibleStudy();
  const { mutate, isLoading } = useDeleteBibleStudy();
  const { push } = useRouter();

  console.log({ data });

  const deleteStudy = (event) => {
    mutate(
      { id: event?.id },
      {
        onSuccess: (res) => {
          setOpenModal(false);
          return res;
        },
        onError: (err) => {
          return err;
        },
      }
    );
    return;
  };

  //   {
  //     "id": "xuyI6yOIHpbsbI3Olm4m",
  //     "date": {
  //         "seconds": 1701100800,
  //         "nanoseconds": 353000000
  //     },
  //     "main_scriptures": [
  //         "james 6 : 7 - 9",
  //         "romans 17 : 4 - 9"
  //     ],
  //     "conclusion": "uif ejwhefdvjenw fd ewrgkmwe dwkerw reugiwer kdhvs hsfsv ahsfk",
  //     "title": "God's Mercy",
  //     "memory_verse": "John 3:17 - hbdikfcs vc ajgscx nsjgicams cgsjax ascxa Cjszdyc aczhkakZCx ashaksdakdks dcagsidvyasdh",
  //     "introduction": "hjfgb. gjdgn jfyfhfbgfv. yjfjhfv uyjfgjnhfhgk",
  //     "aim": "God's Love For Man. ishgfjvhsgdc dgjfvcdsf cdgjufvcd zbcgsdujzfvc dsgjzfucd dcgaduscjasfx",
  //     "questions": [
  //         {
  //             "question": "ghf fghv hfgjf hfghj",
  //             "scriptures": [
  //                 "matthew 3:1-9",
  //                 "colossians 7: 9-16"
  //             ]
  //         }
  //     ]
  // }

  const bibleStudyColumns = [
    {
      name: "Topic",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => {
        const timestamp = new Timestamp(
          row.date.seconds,
          row.date.nanoseconds
        ).toDate();
        // console.log({ timestamp: moment(timestamp).format("LLL") });
        return moment(timestamp).format("LLL");
      },
      sortable: true,
    },
    {
      name: "Scripture",
      selector: (row) => row.main_scriptures.join(", "),
      sortable: true,
    },
    {
      name: "No. of Questions",
      selector: (row) => row.questions.length,
      sortable: true,
    },
    {
      name: "",
      selector: (row) => (
        <CustomToolTip className={"delete"} info={"Delete Event"}>
          <AiFillDelete
            size={20}
            color={colors.error700}
            style={{ cursor: "pointer" }}
            // onClick={() => deleteEvent(row)}
            onClick={() => {
              setOpenModal(true);
              setSelectedStudy(row);
            }}
          />
        </CustomToolTip>
      ),
      sortable: true,
    },
  ];

  return (
    <Wrapper>
      <CentralPopUp
        isOpen={openModal}
        toggleModal={() => setOpenModal(!openModal)}
      >
        <EventDeleteConfirmation
          loading={isLoading}
          onCancel={() => {
            setOpenModal(false);
            setSelectedStudy({});
          }}
          onConfirm={() => deleteStudy(selectedStudy)}
        />
      </CentralPopUp>
      <PageHeader>
        <h2 className="header">Bible Studies</h2>
        <button onClick={() => push(`bible-study/create`)}>+ Create New</button>
      </PageHeader>

      <DefaultTable
        data={data}
        columns={bibleStudyColumns}
        rowClick={(e) => push(`bible-study/edit?id=${e?.id}`)}
      />
    </Wrapper>
  );
};
export default Index;
