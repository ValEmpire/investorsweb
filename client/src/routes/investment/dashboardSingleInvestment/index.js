import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";
import SingleInvestmentView from "./SingleInvestmentView";
// import withStyles from "./Avatar";

const SingleInvestmentPage = props => {
  const [investment, setInvestment] = useState({});
  const { investmentId } = useParams();
  const [loading, setLoading] = useState(true);
  //USER INFO

  const getInvestment = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/investment/${investmentId}`,
      {
        withCredentials: true,
      }
    );
    setInvestment(res.data.investment);
    setLoading(false);
    return;
  }, [investmentId]);

  useEffect(() => {
    getInvestment();
  }, [getInvestment]);

  return (
    <>
      {loading && <Loading />}
      {!loading && investment.id && (
        <SingleInvestmentView investment={investment} />
      )}
    </>
  );
};

export default SingleInvestmentPage;
