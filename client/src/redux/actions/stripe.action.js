import {
  ALL_CARDS,
  ADD_CARD,
  CREATE_PAYMENT_INTENT,
  CREATE_ACCOUNT,
  CREATE_CUSTOMER,
  ADD_LINK,
  GET_ACCOUNT,
} from "../../const";
import axios from "axios";

// We can put this as a middleware in server when user registered
// But I think its not a good idea to put it in same route
// Cause stripe may fail, this will make our route return an error
export const createAccount = accountId => async dispatch => {
  try {
    if (accountId) return;

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/stripe/create-account`,
      {},
      { withCredentials: true }
    );

    return dispatch({
      type: CREATE_ACCOUNT,
      payload: res.data.accountId,
    });
  } catch (err) {
    // handle error here
  }
};

export const getAllCards = accountId => async dispatch => {
  if (!accountId) return;

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/stripe/all-cards`,
      {
        withCredentials: true,
      }
    );

    return dispatch({
      type: ALL_CARDS,
      payload: res.data.cards,
      pc: res.data.primaryCard,
    });
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

    return dispatch({
      type: ADD_CARD,
      payload: res.data.card,
    });
  } catch (err) {
    console.log(err);

    // handle error here
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
      pc: res.data.primaryCard,
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
      pc: res.data.primaryCard,
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
      { amount, projectOwner: ownerId },
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

export const createCustomer = customerId => async dispatch => {
  try {
    if (customerId) return;

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/stripe/create-customer`,
      {},
      { withCredentials: true }
    );

    return dispatch({
      type: CREATE_CUSTOMER,
      payload: res.data.customerId,
    });
  } catch (err) {
    console.log(err);

    // handle err
  }
};

export const generateLink = bankAccount => async dispatch => {
  try {
    if (bankAccount) return;

    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/stripe/generate-link`,
      { withCredentials: true }
    );

    return dispatch({
      type: ADD_LINK,
      payload: res.data.link,
    });
  } catch (err) {
    console.log(err);

    // handle err
  }
};

export const getAccount = () => async dispatch => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/stripe/get-account`,
      {
        withCredentials: true,
      }
    );

    return dispatch({
      type: GET_ACCOUNT,
      payload: res.data.account,
    });
  } catch (err) {
    console.log(err);

    // handle error
  }
};
