import {
    AddProductToCartError,
    CreateCartError,
    GetCartByIdError,
    GetProductsInCartError,
} from "../errors/errors.js";

import { cartModel } from "../models/Cart.js";

export default class CartService {
    constructor() {
        this.cartModel = new cartModel();
    }
    // Create a new Cart
    async createCart() {
        try {
            const newCart = await this.cartModel.create({ products: [] });
            return newCart;
        } catch (error) {
            throw new CreateCartError("Failed to create cart", error);
        }
    }
    // Private method to retrieve a Cart by id
    async #getCartById(id) {
        try {
            return await this.cartModel.findById(id);
        } catch (error) {
            throw new GetCartByIdError("Failed to get cart by id", error);
        }
    }

    // Add a product into Cart
    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.#getCartById(cartId);
            const existingProductIndex = cart.products.findIndex((item) =>
                item._id.equals(productId)
            );
            if (existingProductIndex !== -1) {
                // If the product already exists, increase the quantity

                const addToCart = await this.cartModel
                    .findOneAndUpdate(
                        { _id: cartId, "products._id": productId },
                        { $inc: { "products.$.quantity": 1 } },
                        { new: true }
                    )
                    .populate({
                        path: "products._id",
                        model: "products",
                    });

                return {
                    message: "Product quantity incremented in cart",
                    addToCart,
                };
            } else {
                // If the products not exists, add to the Cart
                const addToCart = await this.cartModel
                    .findOneAndUpdate(
                        { _id: cartId },
                        {
                            $addToSet: {
                                products: {
                                    _id: productId,
                                    quantity: 1,
                                },
                            },
                        },
                        { new: true }
                    )
                    .populate({
                        path: "products._id",
                        model: "products",
                    });

                return {
                    message: "Product successfully added to cart",
                    addToCart,
                };
            }
        } catch (error) {
            if (error instanceof GetCartByIdError) {
                throw error;
            }
            throw new AddProductToCartError(
                "Failed to add product to cart",
                error
            );
        }
    }

    // Get cart with complete products using population
    async getCartWithProducts(cartId) {
        try {
            const populatedCart = await this.cartModel
                .findById(cartId)
                .populate("products._id");

            if (!populatedCart) {
                throw new Error("Carrito no encontrado");
            }

            return populatedCart.products;
        } catch (error) {
            if (error instanceof CartNotFoundError) {
                throw error;
            } else if (error instanceof EmptyCartError) {
                throw error;
            } else if (error instanceof GetProductsInCartError) {
                throw error;
            }
            throw new GetCartByIdError(
                "Error al obtener el carrito con productos.",
                error
            );
        }
    }

    async updateCartProducts(cartId, newProducts) {
        try {
            const cart = await this.#getCartById(cartId);

            // Validar que newProducts sea un arreglo
            if (!Array.isArray(newProducts)) {
                throw new Error(
                    "La propiedad 'newProducts' debe ser un arreglo."
                );
            }

            // Iterar sobre los nuevos productos y actualizar el carrito
            for (const newProduct of newProducts) {
                const existingProductIndex = cart.products.findIndex((item) =>
                    item._id.equals(newProduct._id)
                );

                if (existingProductIndex !== -1) {
                    // Si el producto ya existe, incrementar la cantidad
                    cart.products[existingProductIndex].quantity +=
                        newProduct.quantity;
                } else {
                    // Si el producto no existe, agregarlo al carrito
                    cart.products.push(newProduct);
                }
            }

            await this.cartModel.findByIdAndUpdate(cartId, {
                products: cart.products,
            });

            return {
                message:
                    "Carrito actualizado con el nuevo arreglo de productos",
            };
        } catch (error) {
            if (error instanceof GetCartByIdError) {
                throw error;
            }
            throw new Error(
                "Error al actualizar el carrito con el arreglo de productos."
            );
        }
    }

    async updateProductQuantity(cartId, productId, newQuantity) {
        try {
            if (!Number.isInteger(newQuantity) || newQuantity <= 0) {
                throw new Error(
                    "La cantidad debe ser un número entero positivo."
                );
            }

            const cart = await this.#getCartById(cartId);

            const existingProductIndex = cart.products.findIndex((item) =>
                item._id.equals(productId)
            );

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity = newQuantity;

                await this.cartModel.findByIdAndUpdate(cartId, {
                    products: cart.products,
                });

                return {
                    message: "Cantidad de producto actualizada en el carrito",
                };
            } else {
                throw new Error("El producto no existe en el carrito.");
            }
        } catch (error) {
            if (error instanceof GetCartByIdError) {
                throw error;
            }
            throw new Error(
                "Error al actualizar la cantidad del producto en el carrito."
            );
        }
    }

    // Remove a product from Cart
    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await this.#getCartById(cartId);
            cart.products.splice(productId, 1); // Remove the product from the products array
            await this.cartModel.findByIdAndUpdate(cartId, {
                products: cart.products,
            });
            return { status: "successfully deleted" };
        } catch (error) {
            if (error instanceof GetCartByIdError) {
                throw error;
            }
            throw new RemoveProductFromCartError(
                "Failed to remove product from cart",
                error
            );
        }
    }
    // Remove all products from Cart
    async removeAllProductsFromCart(cartId) {
        try {
            const cart = await this.#getCartById(cartId);

            cart.products = [];

            await this.cartModel.findByIdAndUpdate(cartId, {
                products: cart.products,
            });

            return { status: "all products successfully deleted" };
        } catch (error) {
            if (error instanceof GetCartByIdError) {
                throw error;
            }
            throw new Error("Failed to remove all products from cart");
        }
    }
}
