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
  useDeleteVerseForToday,
  useGetAllDailyVerses,
} from "@/hooks/firebase/verse-for-today.hook";

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState({});
  const data = useGetAllDailyVerses();
  const { mutate, isLoading } = useDeleteVerseForToday();
  const { push } = useRouter();
  console.log({ data });

  const deleteVerse = (event) => {
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

  const dailyVersesColumns = [
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
      name: "Book",
      selector: (row) => `${row.book} ${row.chapter} : ${row.verse}`,
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
              setSelectedVerse(row);
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
            setSelectedVerse({});
          }}
          onConfirm={() => deleteVerse(selectedVerse)}
        />
      </CentralPopUp>
      <PageHeader>
        <h2 className="header">Daily Verses</h2>
        <button onClick={() => push(`verse-for-today/create`)}>
          + Create New
        </button>
      </PageHeader>

      <DefaultTable
        data={data}
        columns={dailyVersesColumns}
        rowClick={(e) => push(`verse-for-today/edit?id=${e?.id}`)}
      />
    </Wrapper>
  );
};
export default Index;
