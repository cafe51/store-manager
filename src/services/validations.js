const errorMap = require('../utils/errorMap');

const validateInputProduct = (obj) => {
  const errorMessage = '"name" is required';
  const errorLenght = '"name" length must be at least 5 characters long';
  const { name } = obj;
  if (!name) return { type: errorMap.mapError('BAD_REQUEST'), message: errorMessage };
  if (name.length < 5) return { type: errorMap.mapError('INVALID_DATA'), message: errorLenght };
  return { type: null, message: 'ok' };
};

module.exports = {
  validateInputProduct,
};
