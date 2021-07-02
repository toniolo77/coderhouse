// require("dotenv").config();
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(`${__dirname}/../../`, `${process.env.NODE_ENV}.env`) });

const environmentValues = {
  NODE_ENV: process.env.NODE_ENV || "development",
  TYPE_DATABASE: process.env.TYPE_DATABASE || 'Mem',
  GRAPHIQL: process.env.GRAPHIQL || false
};

export default environmentValues;
