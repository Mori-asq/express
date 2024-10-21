import { Router, Request, Response, NextFunction } from "express";
import {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
} from "./productsServices";
import { AuthMiddleware } from "../middlewares";
import RequestWithUser from "../types/RequestWithUser";
import CreateProductDto from "./dtos/productsCreateDto";
import { STATUS_CODES } from "../consts";

const router = Router();

////////////////////////////////// Start Route "/products" //////////////////////////////////
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryFilters: any = req.query;
    const result = await getAllProducts(queryFilters);
    res.status(STATUS_CODES.OK_200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  AuthMiddleware,
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productData: CreateProductDto = req.body;
      const result = await createNewProduct({
        ...productData,
        user: req.user!!,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);
////////////////////////////////// End Route "/products" //////////////////////////////////

////////////////////////////////// Start Route "/products/:id" //////////////////////////////////
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId: string = req.params.id;
    const result = await getOneProduct(productId);
    res.status(STATUS_CODES.OK_200).json(result);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  AuthMiddleware,
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productData: CreateProductDto = req.body;
      const productId: string = req.params.id;
      const result = await updateProduct(productId, {
        ...productData,
        user: req.user!!,
      });
      res.status(STATUS_CODES.OK_200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  AuthMiddleware,
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const result = await deleteProduct(productId, req.user!!);
      res.status(STATUS_CODES.OK_200).json(result);
    } catch (error) {
      next(error);
    }
  }
);
////////////////////////////////// End Route "/products/:id" //////////////////////////////////

export default router;
