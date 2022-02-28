/**
 * * a function that will validate body to given constraints
 * @param {*} schema 
 * @returns If error. This will end the router if error is found.
 * @return If success will go to the next route
 * 
 */

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      console.log(result.error);
      return res.status(400).send({
        error: result.error.message,
        success: false,
      });
    }
    req.validatedBody = result.value;
    next();
  };
};

module.exports = { validate };
