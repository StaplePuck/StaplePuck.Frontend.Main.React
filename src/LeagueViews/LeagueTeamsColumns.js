import React from "react";
import { Link } from "react-router-dom";

export const LeagueTeamsColumns = [
  {
    Header: "Team",
    accessor: "name",
    id: "id",
    Cell: props => (
      <Link to={`../hockey/setlineup/${props.original.id}`}>
        {" "}
        {props.value}{" "}
      </Link>
    ),
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  }
];
