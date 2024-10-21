import { NextFunction, Response } from "express";
import { STATUS_CODES } from "../consts";
import { decodeAccessToken } from "../utils";
import RequestWithUser from "../types/RequestWithUser";

const AuthMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  // Check If Headers Token Exists
  let token = req.headers.authorization;
  if (!token)
    res.status(STATUS_CODES.UNAUTHORIZED_401).send({ message: "UNAUTHORIZED" });
  // Split the bearer from token
  token = token?.split(" ")[1];
  try {
    // decode token
    const decodedData: any = await decodeAccessToken(token);
    // add user property to our request header
    req.user = decodedData.id;

    next();
  } catch (error) {
    res.status(STATUS_CODES.UNAUTHORIZED_401).send({ message: "UNAUTHORIZED" });
  }
};

export default AuthMiddleware;
