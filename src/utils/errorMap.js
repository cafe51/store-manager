const errorMap = {
  BAD_REQUEST: 400,
  PRODUCT_NOT_FOUND: 404,
  INVALID_DATA: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};
