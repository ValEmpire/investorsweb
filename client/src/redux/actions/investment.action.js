import {
  CREATE_INVESTMENT,
  SUBMIT_INVESTMENT,
  ALL_USER_INVESTMENTS,
  SET_INVESTMENT_AMOUNT,
  SET_PAYMENT_METHOD,
  FIND_PROJECT_INVESTMENT,
  SUCCESSFUL_INVESTMENT,
} from "../../const";
import axios from "axios";

export const createInvestment = field => dispatch => {
  return dispatch({
    type: CREATE_INVESTMENT,
    payload: field,
  });
};

export const getAllUserInvestments = () => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/investment`,
      {
        withCredentials: true,
      }
    );

    const { investments } = res.data;

    return dispatch({
      type: ALL_USER_INVESTMENTS,
      payload: investments,
    });
  } catch (err) {
    // handle error
  }
};

export const submitInvestment = body => async dispatch => {
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

export const findProjectInvestment = projectId => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/investment/project/${projectId}`,
      {
        withCredentials: true,
      }
    );

    const { isFound, investment } = res.data;

    dispatch({
      type: FIND_PROJECT_INVESTMENT,
      payload: {
        isFound,
        investment,
      },
    });
  } catch (err) {
    console.log(err);
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

export const onSuccessfulInvestment = amount => dispatch => {
  return dispatch({
    type: SUCCESSFUL_INVESTMENT,
    payload: amount,
  });
};
