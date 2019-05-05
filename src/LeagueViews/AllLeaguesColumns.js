import React from "react";
import { Link } from "react-router-dom";

export const AllLeagueColumns = [
  {
    Header: "League",
    accessor: "name",
    id: "id",
    Cell: props => (
      <span>
        <div className="rt-mobileHeader">
          League:
        </div>
        <Link alt={`Link to the ${props.value} league`} className="grid-link-style" to={`/league/${props.original.id}`}>{props.value}</Link>
      </span>
    ),
    style: { textAlign: "left" },
    headerStyle: {
      color: "#000",
      background: "rgb(255,214,94)",
      background:
        "-moz-linear-gradient(top, rgba(255,214,94,1) 0%, rgba(254,191,4,1) 100%)",
      background:
        "-webkit-linear-gradient(top, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)",
      background:
        "linear-gradient(to bottom, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)"
    }
  },
  {
    Header: "Sport",
    accessor: "season.sport.name",
    Cell: props => (
      <span>
        <div className="rt-mobileHeader">
          Sport:
        </div>
        {props.value}
      </span>
    ),
    style: { textAlign: "left" },
    headerStyle: {
      color: "#000",
      background: "rgb(255,214,94)",
      background:
        "-moz-linear-gradient(top, rgba(255,214,94,1) 0%, rgba(254,191,4,1) 100%)",
      background:
        "-webkit-linear-gradient(top, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)",
      background:
        "linear-gradient(to bottom, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)"
    }
  },
  {
    Header: "Season",
    accessor: "season.fullName",
    sortable: false,
    Cell: props => (
      <span>
        <div className="rt-mobileHeader">
          Season:
        </div>
        {props.value}
      </span>
    ),
    style: { textAlign: "left" },
    headerStyle: {
      color: "#000",
      background: "rgb(255,214,94)",
      background:
        "-moz-linear-gradient(top, rgba(255,214,94,1) 0%, rgba(254,191,4,1) 100%)",
      background:
        "-webkit-linear-gradient(top, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)",
      background:
        "linear-gradient(to bottom, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)"
    }
  },
  {
    Header: "Description",
    accessor: "description",
    sortable: false,
    Cell: props => (
      <span>
        <div className="rt-mobileHeader">
          Description:
        </div>
        {props.value}
      </span>
    ),
    style: { whiteSpace: "unset", textAlign: "left" },
    headerStyle: {
      color: "#000",
      background: "rgb(255,214,94)",
      background:
        "-moz-linear-gradient(top, rgba(255,214,94,1) 0%, rgba(254,191,4,1) 100%)",
      background:
        "-webkit-linear-gradient(top, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)",
      background:
        "linear-gradient(to bottom, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)"
    }
  },
  {
    Header: "Announcement",
    accessor: "announcement",
    sortable: false,
    Cell: props => (
      <span>
        <div className="rt-mobileHeader">
          Announcement:
        </div>
        <div className="rt-mobileField">
          {props.value}
        </div>
      </span>
    ),
    style: { whiteSpace: "unset", textAlign: "left", color: "red" },
    headerStyle: {
      color: "#000",
      background: "rgb(255,214,94)",
      background:
        "-moz-linear-gradient(top, rgba(255,214,94,1) 0%, rgba(254,191,4,1) 100%)",
      background:
        "-webkit-linear-gradient(top, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)",
      background:
        "linear-gradient(to bottom, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)"
    }
  }
];
