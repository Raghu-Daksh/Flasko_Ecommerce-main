// Validate req.body
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message);
    return res.status(422).json({ success: false, errors: messages });
  }
  req.body = value; // use Joi-sanitized & defaulted values
  next();
};

// Validate req.query
const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message);
    return res.status(422).json({ success: false, errors: messages });
  }
  req.query = value;
  next();
};

module.exports = { validate, validateQuery };