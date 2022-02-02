import React from "react";
import Layout from "../../layout";

const WithLayout = (ComposedComponent) => (props) =>
  (
    <Layout>
      <ComposedComponent />
    </Layout>
  );

export default WithLayout;
