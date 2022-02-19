import React, { useState, useEffect, useCallback } from "react";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";
import SingleInvestmentView from "./SingleInvestmentView";
import NotFound from "../../../components/NotFound";

// Redux
import { getInvestment } from "../../../redux/actions/investment.action";
import { useDispatch, useSelector } from "react-redux";

const SingleInvestmentPage = props => {
  const dispatch = useDispatch();

  const { investmentId } = useParams();

  const { investment } = useSelector(state => state.investment);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const handleInvestment = useCallback(() => {
    dispatch(
      getInvestment(investmentId, (err, success) => {
        if (err) {
          setLoading(false);

          setError(true);

          return;
        }

        if (success) {
          setLoading(false);

          return;
        }
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
      {!loading && error && <NotFound code={403} message={"Access denied."} />}
      {!loading && !error && investment.id && (
        <SingleInvestmentView investment={investment} />
      )}
    </>
  );
};

export default SingleInvestmentPage;
