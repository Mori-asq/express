import { STATUS_CODES } from "../consts";
import ServerError from "../errors/serverError";
import productsModel from "../models/productsModel";
import GetAllProductsDto from "./dtos/getAllProductsDto";
import CreateProductDto from "./dtos/productsCreateDto";

export const getAllProducts = async (queryFilters: GetAllProductsDto) => {
  const { tags, start_price, end_price, page, page_size } = queryFilters;
  let query: any = {};

  if (tags) {
    query["tags"] = { $in: [tags] };
  }

  if (start_price && end_price) {
    query["price"] = { $gte: start_price, $lte: end_price };
  }

  const result = await productsModel.find(
    query,
    {},
    { skip: page_size * (page - 1), limit: page_size }
  );
  return result;
};

export const getOneProduct = async (productId: string) => {
  const result = await productsModel.findById(productId);
  if (!result) {
    throw new ServerError(STATUS_CODES.NOT_FOUND_404, "PRODUCT NOT FOUND!");
  }
  return result;
};

export const createNewProduct = async (productData: CreateProductDto) => {
  const result = await productsModel.create(productData);
  return result;
};

export const updateProduct = async (
  productId: string,
  productData: CreateProductDto
) => {
  const product = await productsModel.findOne({
    _id: productId,
    user: productData.user,
  });
  if (!product) {
    throw new ServerError(STATUS_CODES.NOT_FOUND_404, "PRODUCT NOT FOUND!");
  }
  // update product by dto
  const result = await productsModel.findByIdAndUpdate(productId, {
    $set: productData,
  });
  return result;
};

export const deleteProduct = async (productId: String, user: string) => {
  const product = await productsModel.findOne({ _id: productId, user });
  if (!product) {
    throw new ServerError(STATUS_CODES.NOT_FOUND_404, "PRODUCT NOT FOUND!");
  }
  const result = await productsModel.deleteOne({ _id: productId });
  return result;
};
