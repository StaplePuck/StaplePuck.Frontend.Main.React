import React from "react";

export const AllLeagueColumns = [
  {
    Header: "League",
    accessor: "name",
    id: "id",
    Cell: props => <a href={`/league/${props.original.id}`}> {props.value} </a>,
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  },
  {
    Header: "Sport",
    accessor: "season.sport.name",
    //Cell: e => <a href={`/sport/${e.id}`}> {e.value} </a>,
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  },
  {
    Header: "Season",
    accessor: "season.fullName",
    sortable: false,
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  },
  {
    Header: "Description",
    accessor: "description",
    sortable: false,
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  }
];
