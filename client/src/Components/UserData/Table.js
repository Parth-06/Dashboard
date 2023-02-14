import React from "react";
import DataTable from "react-data-table-component";

const Table = ({ userData }) => {
  const columns = [
    {
      name: "FirstName",
      selector: (row) => row.FirstName,
    },
    {
      name: "LastName",
      selector: (row) => row.LastName,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
    },
    {
      name: "Age",
      selector: (row) => row.Age,
    },
    {
      name: "Gender",
      selector: (row) => row.Gender,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#1F2A40",
        color: "white",
        fontSize: "17px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#1F2A40",
        color: "#57a697",
        fontSize: "19px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        backgroundColor: "#1F2A40",
        color: "white",
        fontSize: "17px",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#1F2A40",
        color: "#57a697",
        fontSize: "17px",
      },
      pageButtonsStyle: {
        color: "#57a697",
      },
    },
  };
  return (
    <div>
      {userData.length !== 0 ? (
        <DataTable
          columns={columns}
          data={userData}
          customStyles={customStyles}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="500px"
          highlightOnHover
        />
      ) : (
        <div className="table_text">
          <h2>No Data Uploded</h2>
        </div>
      )}
    </div>
  );
};

export default Table;
