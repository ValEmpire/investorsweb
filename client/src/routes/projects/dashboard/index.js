import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectDashboardPage = () => {
  const [projects, setProjects] = useState([]);

  const getAllProject = async () => {
    const userProjects = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/project/user`,
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
      <h1>This is Projects dashboard page</h1>

      {JSON.stringify(projects)}
    </>
  );
};

export default ProjectDashboardPage;
