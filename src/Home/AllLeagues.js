import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { graphql } from "react-apollo";

import { AllLeaguesListQuery } from "./Queries/AllLeaguesListQuery";
import { AllLeagueColumns } from "./AllLeaguesColumns";

//Assests
import "../Assets/css/AllLeagues.css";
import Logo from "../Assets/Images/logo-white-with-name.jpg";

function ListofLeagues({ loading, error, leagues }) {
  if (loading) return <div className="allLeagues">Fetching Leagues...</div>;
  if (error) return <div className="allLeagues">Error Fetching Leagues</div>;
  return (
    <div className="allLeagues">
      <img className="mainLogo" src={Logo} alt="Logo" />
      <ReactTable
        data={leagues}
        columns={AllLeagueColumns}
        defaultPageSize={10}
        resizable={false}
        noDataText="Bloody hell... No leagues!"
        className="-striped -highlight allLeaguesTable"
      />
    </div>
  );
}

const LeagueData = graphql(AllLeaguesListQuery, {
  props: ({ data: { loading, leagues } }) => ({
    loading,
    leagues
  })
})(ListofLeagues);

class MainLeagues extends Component {
  render() {
    return (
      <div>
        <LeagueData />
      </div>
    );
  }
}

export default MainLeagues;
