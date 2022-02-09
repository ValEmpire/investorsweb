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
