import React, { useState, useEffect } from "react";
import axios from "axios";
import InvestmenstsDashboardView from "./InvectmentsDashboardView";
import Loading from "../../../components/Loading";

const InvestmentsDashboardPage = props => {
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
    console.log(res.data.investments);

    setLoading(false);

    return;
  };

  useEffect(() => {
    getAllInvectments();
  }, []);

  return <>{<InvestmenstsDashboardView investments={investments} />}</>;
};

export default InvestmentsDashboardPage;
