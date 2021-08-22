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
  var resData = {
    error: true,
    code: code,
    message: msg,
    data: error,
  };
  return res.status(code).json(resData);
};