import React from "react";
import Header from "../../Components/Header";
import TitleBox from "../../Components/TitleBox";

const Projects = ({ location, history }) => {
  return (
    <>
      <Header location={location} history={history} />
      <TitleBox title={"Your Projects"} />
      <div>projects</div>
    </>
  );
};

export default Projects;
