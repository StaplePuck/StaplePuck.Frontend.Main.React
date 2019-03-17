import React from "react";

export const LeagueTeamsColumns = [
  {
    Header: "Team",
    accessor: "name",
    id: "id",
    Cell: props => (
      <a href={`hockey/team/${props.original.id}`}> {props.value} </a>
    ),
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  },
  {
    Header: "Points",
    accessor: "season.sport.name",
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  }
];
