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

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const data = useGetAllUpcomingEvents();
  const { mutate, isLoading } = useDeleteUpcomingEvent();
  const { push } = useRouter();

  const deleteEvent = (event) => {
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

  const upcomingEventColumns = [
    {
      name: "Event Name",
      selector: (row) => row.event_name,
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
    // {
    //   name: "Theme",
    //   selector: (row) => row.theme,
    //   sortable: true,
    // },
    {
      name: "Venue",
      selector: (row) => row.venue,
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
              setSelectedEvent(row);
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
            setSelectedEvent({});
          }}
          onConfirm={() => deleteEvent(selectedEvent)}
        />
      </CentralPopUp>
      <PageHeader>
        <h2 className="header">Upcoming Events</h2>
        <button onClick={() => push(`upcoming-events/create`)}>
          + Create New
        </button>
      </PageHeader>

      <DefaultTable
        data={data}
        columns={upcomingEventColumns}
        rowClick={(e) => push(`upcoming-events/edit?id=${e?.id}`)}
      />
    </Wrapper>
  );
};
export default Index;
