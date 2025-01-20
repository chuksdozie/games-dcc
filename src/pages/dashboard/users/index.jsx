import React, { useEffect, useState } from "react";
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
import { useGetAllUsers } from "@/hooks/firebase/user.hook";

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [showExco, setShowExco] = useState(false);
  const data = useGetAllUsers();
  const [dataToDisplay, setDataToDisplay] = useState(data);
  // const { mutate, isLoading } = useDeleteVerseForToday();
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
    // {
    //   name: "Date",
    //   selector: (row) => {
    //     const timestamp = new Timestamp(
    //       row.date.seconds,
    //       row.date.nanoseconds
    //     ).toDate();
    //     // console.log({ timestamp: moment(timestamp).format("LLL") });
    //     return moment(timestamp).format("LLL");
    //   },
    //   sortable: true,
    // },
    {
      name: "Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Email Address",
      selector: (row) => `${row.email}`,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => `${row.gender}`,
      sortable: false,
    },
    {
      name: "Position",
      selector: (row) => `${row.ayf_position ?? "None"}`,
      sortable: true,
    },

    // {
    //   name: "",
    //   selector: (row) => (
    //     <CustomToolTip className={"delete"} info={"Delete Event"}>
    //       <AiFillDelete
    //         size={20}
    //         color={colors.error700}
    //         style={{ cursor: "pointer" }}
    //         // onClick={() => deleteEvent(row)}
    //         onClick={() => {
    //           setOpenModal(true);
    //           setSelectedVerse(row);
    //         }}
    //       />
    //     </CustomToolTip>
    //   ),
    //   sortable: true,
    // },
  ];

  useEffect(() => {
    if (data) {
      if (showExco) {
        const excos = data.filter((user) => user?.ayf_position);
        setDataToDisplay(excos);
      } else {
        setDataToDisplay(data);
      }
    }
  }, [showExco]);

  return (
    <Wrapper>
      <CentralPopUp
        isOpen={openModal}
        toggleModal={() => setOpenModal(!openModal)}
      >
        <EventDeleteConfirmation
          // loading={isLoading}
          onCancel={() => {
            setOpenModal(false);
            setSelectedUser({});
          }}
          // onConfirm={() => deleteVerse(selectedVerse)}
        />
      </CentralPopUp>
      <PageHeader>
        <h2 className="header">Users</h2>
        <button onClick={() => push(`users/create`)}>+ Create New</button>
      </PageHeader>
      <label htmlFor="exco_members">
        Show Exco Members Only
        <input
          type="checkbox"
          checked={showExco}
          onChange={() => setShowExco((prev) => !prev)}
          style={{
            width: 18,
            height: 18,
            // borderRadius: 20,
            margin: "0rem .5rem 1rem",
            accentColor: colors.primary600,
          }}
        />
      </label>

      <DefaultTable
        data={dataToDisplay ?? data}
        columns={dailyVersesColumns}
        rowClick={(e) => push(`users/edit?id=${e?.email}`)}
      />
    </Wrapper>
  );
};
export default Index;
