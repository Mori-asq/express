import { NextFunction, Request, Response, Router } from "express";
import { ValidateMiddleware } from "../middlewares";
import RegisterDto from "./dtos/registerDto";
import LoginDto from "./dtos/loginDto";
import { loginService, registerService } from "./authServices";

const router = Router();

////////////////////////////////// Start Route "/auth/sth" //////////////////////////////////
router.post(
  "/login",
  ValidateMiddleware(LoginDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginData: LoginDto = req.body;
      res.send(await loginService(loginData));
    } catch (error: any) {
      next(error);
    }
  }
);

router.post(
  "/register",
  ValidateMiddleware(RegisterDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registerData: RegisterDto = req.body;
      res.send(await registerService(registerData));
    } catch (error: any) {
      next(error);
    }
  }
);
/////////////////////////////////// End Route "/auth/sth" ///////////////////////////////////

export default router;
