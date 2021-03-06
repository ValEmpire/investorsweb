import {
  CREATE_INVESTMENT,
  SUBMIT_INVESTMENT,
  ALL_USER_INVESTMENTS,
  SET_INVESTMENT_AMOUNT,
  SET_PAYMENT_METHOD,
  FIND_PROJECT_INVESTMENT,
  SUCCESSFUL_INVESTMENT,
  GET_INVESTMENT,
} from "../../const";
import axios from "axios";
import { handleError, handleSuccess } from "../../helpers/alert.handler";

export const createInvestment = field => dispatch => {
  return dispatch({
    type: CREATE_INVESTMENT,
    payload: field,
  });
};

export const getAllUserInvestments = cb => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/investment`,
      {
        withCredentials: true,
      }
    );

    const { investments } = res.data;

    dispatch({
      type: ALL_USER_INVESTMENTS,
      payload: investments,
    });

    cb(null, true);

    return;
  } catch (err) {
    handleError(err, dispatch);
  }
};

export const submitInvestment = body => async dispatch => {
  try {
    await axios.post(`${process.env.REACT_APP_SERVER}/api/investment`, body, {
      withCredentials: true,
    });

    dispatch({
      type: SUBMIT_INVESTMENT,
      payload: "from api",
    });

    handleSuccess("Your investment was successfuly created.", dispatch);

    return;
  } catch (err) {
    handleError(err, dispatch);
  }
};

export const findProjectInvestment = (projectId, cb) => async dispatch => {
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

    cb(null, true);

    return;
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

export const getInvestment = (investmentId, cb) => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/investment/${investmentId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: GET_INVESTMENT,
      payload: res.data.investment,
    });

    cb(null, true);

    return;
  } catch (err) {
    cb(true, null);

    handleError(err, dispatch);
  }
};
