import React, { useEffect } from "react";
import { useQuery } from "react-apollo-hooks";

import { PARTICIPATE_PROJECTS_QUERY } from "../../queries";

import { SyncLoader } from "react-spinners";

const DashBoard = ({ history }) => {
  const { data, error } = useQuery(PARTICIPATE_PROJECTS_QUERY);

  useEffect(() => {
    // Occured of Query
    if (error) {
      alert("Something's wrong, Please try again : (");
    }

    // End of Query
    if (data.GetProjects) {
      const {
        GetProjects: { ok, error: errorText, projects }
      } = data;

      // Success of fetch Query
      if (ok === true) {
        // No have Project : (
        if (projects.length === 0) {
          history.push("/createProject");
        } else {
          alert("You have Projects ! : )");
        }
      } else {
        alert(errorText);
      }
    }
  }, [data]);

  return (
    <div className="loaderFullWidth">
      <SyncLoader sizeUnit={"px"} size={15} color={"#73c6f3"} />
    </div>
  );
};

export default DashBoard;