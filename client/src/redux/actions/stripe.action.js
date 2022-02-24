import {
  ALL_CARDS,
  ADD_CARD,
  CREATE_PAYMENT_INTENT,
  GET_ACCOUNT,
} from "../../const";
import axios from "axios";
import { handleError, handleSuccess } from "../../helpers/alert.handler";

export const getAllCards = (customerId, cb) => async dispatch => {
  // if customerId is not present means the user has no card
  if (!customerId) return cb(null, true);

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/stripe/all-cards`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: ALL_CARDS,
      payload: res.data.cards,
    });

    cb(null, true);

    return;
  } catch (err) {
    console.log(err);

    // handle error
  }
};

export const addCard = card => async dispatch => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/stripe/add-card`,
      card,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: ADD_CARD,
      payload: res.data.card,
    });

    handleSuccess("New card created.", dispatch);
  } catch (err) {
    handleError(err, dispatch);
  }
};

export const deleteCard = cardId => async dispatch => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER}/api/stripe/delete-card`,
      {
        withCredentials: true,
        data: {
          cardId,
        },
      }
    );

    return dispatch({
      type: ALL_CARDS,
      payload: res.data.cards,
    });
  } catch (err) {
    console.log(err);

    // handle error here
  }
};

export const updateCard = cardId => async dispatch => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/stripe/update-card`,
      { cardId },
      {
        withCredentials: true,
      }
    );

    return dispatch({
      type: ALL_CARDS,
      payload: res.data.cards,
    });
  } catch (err) {
    console.log(err);

    // handle error here
  }
};

export const createPaymentIntent = (amount, ownerId) => async dispatch => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/stripe/create-payment-intent`,
      {
        amount,
        projectOwner: ownerId,
      },
      {
        withCredentials: true,
      }
    );

    return dispatch({
      type: CREATE_PAYMENT_INTENT,
      payload: res.data.clientSecret,
    });
  } catch (err) {
    console.log(err);

    //hendle error
  }
};

export const generateLink = (bankAccount, cb) => async dispatch => {
  try {
    if (bankAccount) return cb(null, true);

    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/stripe/generate-link`,
      { withCredentials: true }
    );

    cb(null, res.data.link);

    return;
  } catch (err) {
    handleError(err, dispatch);
  }
};

export const getAccount = cb => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/stripe/get-account`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: GET_ACCOUNT,
      payload: res.data.account,
    });

    cb(null, true);

    return;
  } catch (err) {
    handleError(err, dispatch);
  }
};
