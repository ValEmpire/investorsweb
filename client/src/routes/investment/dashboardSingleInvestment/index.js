import React, { useState, useEffect, useCallback } from "react";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";
import SingleInvestmentView from "./SingleInvestmentView";

// Redux
import { getInvestment } from "../../../redux/actions/investment.action";
import { useDispatch, useSelector } from "react-redux";

const SingleInvestmentPage = props => {
  const dispatch = useDispatch();

  const { investmentId } = useParams();

  const { investment } = useSelector(state => state.investment);

  const [loading, setLoading] = useState(true);
  //USER INFO

  const handleInvestment = useCallback(() => {
    dispatch(
      getInvestment(investmentId, (err, success) => {
        if (success) {
          setLoading(false);
        }

        return;
      })
    );

    return;
  }, [dispatch, investmentId]);

  useEffect(() => {
    handleInvestment();
  }, [handleInvestment]);

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
