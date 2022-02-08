import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectView from "./ProjectView";
import { useParams } from "react-router-dom";

const ProjectViewPage = props => {
  const [project, setProject] = useState([]);
  const { projectId } = useParams();

  const getProject = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/project/${projectId}`,
      {
        withCredentials: true,
      }
    );

    setProject(res.data.project);
    return;
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <ProjectView project={project} />
    </>
  );
};

export default ProjectViewPage;
