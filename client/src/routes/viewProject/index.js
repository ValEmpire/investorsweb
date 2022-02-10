import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectView from "./ProjectView";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";

const ProjectViewPage = props => {
  const [project, setProject] = useState({});
  const { projectId } = useParams();

  const [loading, setLoading] = useState(true);
  const getProject = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/project/${projectId}`,
      {
        withCredentials: true,
      }
    );

    setProject(res.data.project);
    setLoading(false);
    return;
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && project.id && <ProjectView project={project} />}
    </>
  );
};

export default ProjectViewPage;
