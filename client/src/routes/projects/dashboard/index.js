import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardView from "./DashboardView";

const ProjectDashboardPage = () => {
  const [projects, setProjects] = useState([]);

  const getAllProject = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/project/user`,
      {
        withCredentials: true,
      }
    );
    const userProjects = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/project/user`,
      {
        withCredentials: true,
      }
    );

    setProjects(res.data.userProjects);

    return;
  };

  useEffect(() => {
    getAllProject();
  }, []);

  return (
    <>
      <DashboardView projects={projects} />
      {/* {JSON.stringify(projects)} */}
    </>
  );
};

export default ProjectDashboardPage;
