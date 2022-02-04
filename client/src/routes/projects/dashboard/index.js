import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardView from "./DashboardView";

const ProjectDashboardPage = () => {
  const [projects, setProjects] = useState([]);

  const getAllProject = async () => {
    const userProjects = await axios.get(
      "http://localhost:3001/api/projects/user",
      {
        withCredentials: true,
      }
    );

    setProjects(userProjects);

    return userProjects;
  };

  useEffect(() => {
    getAllProject();
  }, []);

  return (
    <>
      <DashboardView />
      {JSON.stringify(projects)}
    </>
  );
};

export default ProjectDashboardPage;
