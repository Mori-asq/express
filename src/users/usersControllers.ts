import { Request, Response, Router } from "express";
import { AuthMiddleware, ValidateMiddleware } from "../middlewares";
import {
  createNewUser,
  deleteOneUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
} from "./usersServices";
import CreateUserDto from "./dtos/usersCreateDto";
import User from "./dtos/userDto";

const router = Router();
// router.use(AuthMiddleware) // Add Middleware for all routes

////////////////////////////////// Start Route "/users" //////////////////////////////////
router.get("/", AuthMiddleware, async (req: any, res: Response) => {
  try {
    // const userID = req.user;
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

router.post(
  "/",
  ValidateMiddleware(CreateUserDto),
  async (req: Request, res: Response) => {
    try {
      const body: User = req.body;
      const user = await createNewUser(body);
      res.status(201).send(user);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
);
/////////////////////////////////// End Route "/users" ///////////////////////////////////

/////////////////////////////// Start Route "/users/:id" ///////////////////////////////
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await getOneUser(userId);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const userParams = req.body;
    const userId = req.params.id;
    const user = await updateOneUser(userId, userParams);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await deleteOneUser(userId);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});
/////////////////////////////// End Route "/users/:id" ///////////////////////////////

export default router;
