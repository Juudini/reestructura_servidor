import { errorFactory } from "./errorHandler.js";

// Products Errors
export const InvalidArgValuesError = errorFactory("InvalidArgValuesError");
export const DuplicatedProductError = errorFactory("DuplicatedProductError");
export const ProductNotFoundError = errorFactory("ProductNotFound");
export const DeleteProductError = errorFactory("DeleteProductError");
export const UpdateProductError = errorFactory("UpdateProductError");
export const GetProductByIdError = errorFactory("GetProductByIdError");
export const GetProductError = errorFactory("GetProductError");
export const ConnectToMongoDBError = errorFactory("ConnectToMongoDBError");

// Carts Errors
export const GetCartByIdError = errorFactory("GetCartByIdError");
export const CreateCartError = errorFactory("CreateCartError");
export const CartNotFoundError = errorFactory("CartNotFoundError");
export const EmptyCartError = errorFactory("EmptyCartError");

// ChatManager Errors
export const MessageModelError = errorFactory("MessageModelError");
export const GetAllMessagesError = errorFactory("GetAllMessagesError");
export const MessageError = errorFactory("MessageError");
export const NewMessageError = errorFactory("NewMessageError");

// Cart Model Errors
export const AddProductToCartError = errorFactory("AddProductToCartError");
export const GetProductsInCartError = errorFactory("GetProductsInCartError");

// Product Model Errors
export const AddProductError = errorFactory("AddProductError");
export const GetProductsLimitError = errorFactory("GetProductsLimitError");
export const GetProductsError = errorFactory("GetProductsError");

// Product Controller Errors
export const GetRealTimeProductsError = errorFactory(
    "GetRealTimeProductsError"
);
