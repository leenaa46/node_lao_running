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

exports.error = (res, error) => {
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    let resData = {
      error: true,
      code: Status.code.Validation,
      message: Message.fail._validation,
      data: error.errors.map((error) => {
        const obj = {};
        obj[error.path] = error.message;
        return obj;
      }),
    };

    res.status(resData.code).json(resData);
  }

  let resData = {
    error: true,
    code: error.status || 500,
    message: error.message,
    data: {
      message: error.message
    },
  };

  res.status(resData.code).json(resData);
};