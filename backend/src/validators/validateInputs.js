const mongoose = require('mongoose');

exports.isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
exports.isNonEmptyString = (value, min = 0) => {
  return typeof value === 'string' && value.trim().length >= min;
};