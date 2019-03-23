export const MyLeagueColumns = [
  {
    Header: "League",
    accessor: "name",
    style: { textAlign: "center", textDecoration: "underline" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  },
  {
    Header: "Sport",
    accessor: "season.sport.name",
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
