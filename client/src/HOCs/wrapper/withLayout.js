import React from "react";
import Layout from "../../layout";

const WithLayout = (ComposedComponent) => () =>
  (
    <Layout>
      <ComposedComponent />
    </Layout>
  );

export default WithLayout;
