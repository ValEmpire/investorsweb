import React from "react";

const DataComponent = (ComposedComponent) => {
  const WithData = () => {
    return <ComposedComponent />;
  };

  return WithData;
};

export default DataComponent;
