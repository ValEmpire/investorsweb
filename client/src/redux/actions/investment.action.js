import {
  CREATE_INVESTMENT,
  SUBMIT_INVESTMENT,
  ALL_INVESTMENTS,
  SET_INVESTMENT_AMOUNT,
  SET_PAYMENT_METHOD,
} from "../../const";
import axios from "axios";

export const createInvestment = field => dispatch => {
  return dispatch({
    type: CREATE_INVESTMENT,
    payload: field,
  });
};

export const submitInvestment = body => async dispatch => {
  console.log("submitting investment");

  try {
    await axios.post(`${process.env.REACT_APP_SERVER}/api/investment`, body, {
      withCredentials: true,
    });

    return dispatch({
      type: SUBMIT_INVESTMENT,
      payload: "from api",
    });
  } catch (err) {
    console.log(err.message);

    //hendle error
  }
};

export const getAllInvestments = () => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/investment`
    );

    return dispatch({
      type: ALL_INVESTMENTS,
      payload: res.data.investments,
    });
  } catch (err) {
    console.log(err);

    //hendle error
  }
};

export const setInvestmentAmount = amount => dispatch => {
  return dispatch({
    type: SET_INVESTMENT_AMOUNT,
    payload: amount,
  });
};

export const setPaymentMethod = method => dispatch => {
  return dispatch({
    type: SET_PAYMENT_METHOD,
    payload: method,
  });
};
