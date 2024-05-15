/** Simple demo Express app. */

import express from "express";
import { findMean, findMedian, findMode } from './stats.js';
const app = express();

// useful error class to throw
import { NotFoundError, BadRequestError } from "./expressError.js";


const MISSING = "Expected key `nums` with comma-separated list of numbers.";

app.use(express.json());                           // process JSON data
app.use(express.urlencoded());                     // process trad form data


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  const nums = req.query.nums;
  let mean;
  const numbers = nums.split(',').map(str => Number(str));
  const invalidNums = numbers.filter(num => isNaN(num));

  if (nums === '' || invalidNums.length > 0) {
    throw new BadRequestError;
  } else {
    mean = findMean(numbers);
  }

  return res.json({
    response: { operation: 'mean', value: mean }
  });

});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, rest) {
  const nums = req.query.nums;
  console.log(nums);
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get('/mode', function (req, res) {

});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



export default app;
