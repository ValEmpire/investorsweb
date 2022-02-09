import { ALL_CARDS } from "../../const";
import axios from "axios";

// We can put this as a middleware in server when user registered
// But I think its not a good idea to put it in same route
// Cause stripe may fail, this will make our route return an error
export const createAccount = async stripeId => {
  if (stripeId) return;

  try {
    await axios.post(
      `${process.env.REACT_APP_SERVER}/api/stripe/createaccount`,
      {},
      { withCredentials: true }
    );
  } catch (err) {
    // handle error

    return err;
  }
};

export const getAllCards = stripeId => async dispatch => {
  if (!stripeId) return;

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
    });
  } catch (err) {
    console.log(err);

    // handle error
  }
};
