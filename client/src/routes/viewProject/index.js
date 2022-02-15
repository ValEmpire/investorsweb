import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectView from "./ProjectView";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../../redux/actions/project.action";

const ProjectViewPage = props => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const { project } = useSelector(state => state.project);

  const handleProject = async () => {
    await dispatch(getProject(projectId));
    setLoading(false);
  };

  useEffect(() => {
    handleProject();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && project.id && <ProjectView project={project} />}
    </>
  );
};

export default ProjectViewPage;
