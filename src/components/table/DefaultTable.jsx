import colors from "@/constants/colors";
import DataTable from "react-data-table-component";

// const columns = [
//   {
//     name: "Title",
//     selector: (row) => row.title,
//     sortable: true,
//   },
//   {
//     name: "Year",
//     selector: (row) => row.year,
//     sortable: true,
//   },
// ];

// const data = [
//   {
//     id: 1,
//     title: "Beetlejuice",
//     year: "1988",
//   },
//   {
//     id: 2,
//     title: "Ghostbusters",
//     year: "1984",
//   },
// ];

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "18px", // override the cell padding for head cells
      paddingRight: "8px",
      backgroundColor: colors.primary700,
      color: colors.white,
    },
  },
  cells: {
    style: {
      paddingLeft: "18px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

const DefaultTable = (props) => {
  return (
    <DataTable
      columns={props.columns}
      data={props.data}
      pagination={props?.pagination}
      customStyles={customStyles}
      onRowClicked={props.rowClick}
      props
    />
  );
};

export default DefaultTable;
