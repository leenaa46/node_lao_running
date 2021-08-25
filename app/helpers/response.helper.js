import Message from '../helpers/message.helper'
import Status from '../helpers/status.helper'

exports.success = (res, msg, data, code = 200) => {
  var resData = {
    error: false,
    code: code,
    message: msg,
    data: data,
  };
  return res.status(code).json(resData);
};

exports.error = (res, msg, error, code = 500) => {
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    error = error.errors.map((error) => {
      const obj = {};
      obj[error.path] = error.message;
      return obj;
    })

    code = Status.code.Validation
    msg = Message.fail._validation
  }

  const resData = {
    error: true,
    code: code,
    message: msg,
    data: error,
  };

  return res.status(code).json(resData);
};