import jwt from "jsonwebtoken";

const SECRET_KEY_ACCESS_TOKEN = process.env.SECRET_KEY_ACCESS_TOKEN;
const SECRET_KEY_REFRESH_TOKEN = process.env.SECRET_KEY_REFRESH_TOKEN;

export const encodeAccessToken = (payload: any) => {
  try {
    const token = jwt.sign(payload, SECRET_KEY_ACCESS_TOKEN!!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });

    return token;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const decodeAccessToken = (payload: any) => {
  try {
    const token = jwt.verify(payload, SECRET_KEY_ACCESS_TOKEN!!);

    return token;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const encodeRefreshToken = (payload: any) => {
  try {
    const refreshToken = jwt.sign(payload, SECRET_KEY_REFRESH_TOKEN!!, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    });

    return refreshToken;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const decodeRefreshToken = (payload: any) => {
  try {
    const token = jwt.verify(payload, SECRET_KEY_REFRESH_TOKEN!!);

    return token;
  } catch (err: any) {
    throw new Error(err);
  }
};
