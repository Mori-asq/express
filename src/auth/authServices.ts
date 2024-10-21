import { STATUS_CODES } from "../consts";
import ServerError from "../errors/serverError";
import usersModel from "../models/usersModel";
import { encodeAccessToken, encodeRefreshToken } from "../utils";
import LoginDto from "./dtos/loginDto";
import RegisterDto from "./dtos/registerDto";
import bcrypt from "bcrypt";

export const registerService = async (registerData: RegisterDto) => {
  // Check if user exists
  const user = await usersModel.findOne({ email: registerData.email });
  if (user)
    throw new ServerError(STATUS_CODES.CONFLICT_409, "USER ALREADY EXISTS!");
  // Hash user password multiple times (20) & Save
  const hashedPassword = await bcrypt.hash(
    registerData.password,
    process.env.HASHING_TIMES!!
  );
  const newUser = await usersModel.create({
    ...registerData,
    password: hashedPassword,
  });
  newUser.save();

  return newUser;
};

export const loginService = async (loginData: LoginDto) => {
  // Find user by Email
  const user = await usersModel.findOne({ email: loginData.email });
  if (!user)
    throw new ServerError(STATUS_CODES.NOT_FOUND_404, "USER NOT FOUND!");

  // Compare requset.body password with user password
  const compareResult = await bcrypt.compare(
    loginData.password,
    `${user.password}`
  );

  if (!compareResult)
    throw new ServerError(STATUS_CODES.BAD_REQUEST_400, "INVALID CREDENTIALS!");

  // Build User TOKEN
  const userToken = encodeAccessToken({ id: user._id });
  const userRefreshToken = encodeRefreshToken({ id: user._id });

  return { accessToken: userToken, refreshToken: userRefreshToken };
};
