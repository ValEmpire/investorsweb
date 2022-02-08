import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectView from "./project";

const ProjectViewPage = (props) => {
  const [project, setProject] = useState([]);

  const getProject = async (props) => {
    const userProject = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/project/:projectId`,
      {
        withCredentials: true,
      }
    );

    setProject(userProject);

    return userProject;
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <h1>Single Progect Page</h1>
      <ProjectView />

      {/* {JSON.stringify(project)} */}
    </>
  );
};

export default ProjectViewPage;
