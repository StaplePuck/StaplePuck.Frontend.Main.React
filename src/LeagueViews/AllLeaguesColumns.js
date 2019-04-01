import React from "react";
import { Link } from "react-router-dom";

export const AllLeagueColumns = [
  {
    Header: "League",
    accessor: "name",
    id: "id",
    Cell: props => (
      <Link to={`/league/${props.original.id}`}>{props.value}</Link>
    ),
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
    style: { "white-space": "unset", textAlign: "left" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  },
  {
    Header: "Payment Info",
    accessor: "paymentInfo",
    sortable: false,
    style: { "white-space": "unset", textAlign: "left" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  },
  {
    Header: "Announcement",
    accessor: "announcement",
    sortable: false,
    style: { "white-space": "unset", textAlign: "left", color: "red" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  }
];
