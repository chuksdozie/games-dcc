import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { AiFillDelete } from "react-icons/ai";
import colors from "../colors";

export const upcomingEventColumns = [
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
  {
    name: "Theme",
    selector: (row) => row.theme,
    sortable: true,
  },
  {
    name: "Venue",
    selector: (row) => row.venue,
    sortable: true,
  },
  {
    name: "",
    selector: (row) => (
      <AiFillDelete size={20} color={colors.error700} />
      // <button onClick={() => console.log(1234)}>{row.venue}</button>
    ),
    sortable: true,
  },
];
