import React from "react";
import { Link } from "react-router-dom";

const LinkComponent = props => {
  const { to } = props;

  return (
    <Link className="no-underline" to={to}>
      {props.children}
    </Link>
  );
};

export default LinkComponent;
