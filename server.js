import express from "express";
import cors from "cors";
import 'dotenv/config';
import createError from 'http-errors'
import Response from './app/helpers/response.helper'
import Message from './app/helpers/message.helper'

const app = express();

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));


import run from "./app/routes/run_result.routes";
run(app);

import user from "./app/routes/user.routes";
user(app);

import runner from "./app/routes/runner.routes";
runner(app);

import info from "./app/routes/info.routes";
info(app);

import error from "./app/routes/error.routes";
error(app);

process.on('unhandledRejection', function (err) {
  console.log('unhandledRejection: ', err);
});

app.use((req, res, next) => {
  const error = createError(404, Message.fail._routeNotfound)
  next(error)
})

app.use((error, req, res, next) => {
  console.log('\x1b[31m', error);
  Response.error(res, error)
})

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});