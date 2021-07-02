import { sendErrorResponse, ResponseType } from "./../utils/responses";
import Logger from "../loggin/loggin";

export const errorHandler = (err, req, res, next) => {
  console.log("err",err);
  Logger.error(err);
  sendErrorResponse(
    res,
    ResponseType.INTERNAL_ERROR,
    "Se produjo un error al intentar realizar la operacion"
  );
};
