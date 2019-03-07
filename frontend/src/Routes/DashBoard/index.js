import React from "react";
import { useQuery } from "react-apollo-hooks";
import useReactRouter from "use-react-router";

import { PARTICIPATE_PROJECTS_QUERY } from "../../queries";

//import styled from "styled-components";
import { SyncLoader } from "react-spinners";

const DashBoard = () => {
  const { history } = useReactRouter();
  const { data, loading, error } = useQuery(PARTICIPATE_PROJECTS_QUERY);

  if (loading) {
    return (
      <div className="loaderFullWidth">
        <SyncLoader sizeUnit={"px"} size={15} color={"#73c6f3"} />
      </div>
    );
  }

  if (error) {
    return "Something's wrong, Please try again : (";
  }

  const {
    GetProjects: { projects }
  } = data;

  if (projects.length === 0 || !projects || projects === undefined) {
    history.push("/createProject");
  }

  console.log(data);
  return <div>1</div>;
};

export default DashBoard;
