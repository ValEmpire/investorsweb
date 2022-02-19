import React, { useCallback, useEffect, useState } from "react";
import ProjectView from "./ProjectView";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../../redux/actions/project.action";

const ProjectViewRoute = props => {
  const { projectId } = useParams();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const { project } = useSelector(state => state.project);

  const user = useSelector(state => state.user);

  const isDashboard = window.location.pathname.includes("/projects/dashboard");

  const handleProject = useCallback(() => {
    dispatch(
      getProject(projectId, (err, success) => {
        if (err) {
          setError(true);

          setLoading(false);
        }

        if (success) {
          setLoading(false);

          return;
        }
      })
    );

    return;
  }, [dispatch, projectId]);

  useEffect(() => {
    handleProject();
  }, [handleProject]);

  return (
    <>
      {loading && <Loading height="80vh" />}
      {!loading && error && <NotFound message="Project not found" />}
      {!loading &&
        !error &&
        isDashboard &&
        project.id &&
        project.owner.id !== user.id && (
          <NotFound code={403} message="Access denied." />
        )}
      {!loading &&
        !error &&
        isDashboard &&
        project.id &&
        project.owner.id === user.id && <ProjectView project={project} />}
      {!loading && !error && !isDashboard && project.id && (
        <ProjectView project={project} />
      )}
    </>
  );
};

export default ProjectViewRoute;
