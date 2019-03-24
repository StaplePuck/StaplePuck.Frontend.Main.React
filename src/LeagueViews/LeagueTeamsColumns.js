import React from "react";

export const LeagueTeamsColumns = [
  {
    Header: "Team",
    accessor: "name",
    // Cell: props => (
    //   <a href={`hockey/team/${props.original.id}`}> {props.value} </a>
    // ),
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  }
];
