import React from "react";

const DataComponent = (ComposedComponent) => {
  const WithData = (props) => <ComposedComponent {...props} />;

  return WithData;
};

export default DataComponent;
