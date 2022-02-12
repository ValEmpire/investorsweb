import React, { useState, useEffect } from "react";
import axios from "axios";
import InvestmenstsDashboardView from "./InvectmentsDashboardView";
import Loading from "../../../components/Loading";

const InvestmentsDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState({});

  const getAllInvectments = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/investment/`,
      {
        withCredentials: true,
      }
    );

    setInvestments(res.data.investments);
    // console.log(res.data);
    setLoading(false);

    return;
  };

  useEffect(() => {
    getAllInvectments();
  }, []);

  return (
    <>
      {loading && <Loading height={400} />}
      {!loading && investments.length > 0 && (
        <InvestmenstsDashboardView investments={investments} />
      )}
    </>
  );
};

export default InvestmentsDashboardPage;
