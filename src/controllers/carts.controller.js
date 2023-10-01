import CartService from "../services/cart.service.js";
import {
    CartNotFoundError,
    EmptyCartError,
    ProductNotFoundError,
} from "../errors/errors.js";

export default class CartController {
    constructor() {
        this.cartService = new CartService();
    }

    createCart = async (req, res) => {
        try {
            const response = await this.cartService.createCart();
            res.json(response);
        } catch (error) {
            if (error instanceof CartNotFoundError) {
                return res.status(404).json({ message: "Cart not found" });
            } else if (error instanceof EmptyCartError) {
                return res.status(400).json({ message: "The cart is empty" });
            }
            return res.status(500).json({
                message: "Something goes wrong",
            });
        }
    };

    getProducts = async (req, res) => {
        try {
            const { cid } = req.params;
            const cartWithProducts = await this.cartService.getCartWithProducts(
                cid
            );
            res.json(cartWithProducts);
        } catch (error) {
            if (error instanceof CartNotFoundError) {
                return res.status(404).json({ message: "Cart not found" });
            } else if (error instanceof EmptyCartError) {
                return res.status(400).json({ message: "The cart is empty" });
            }
            return res.status(500).json({
                message: "Something goes wrong",
            });
        }
    };

    addProduct = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const response = await this.cartService.addProductToCart(cid, pid);
            res.send(response);
        } catch (error) {
            if (error instanceof CartNotFoundError) {
                return res.status(404).json({
                    message: "Cart not found",
                });
            } else if (error instanceof ProductNotFoundError) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }
            return res.status(500).json({
                message: "Something goes wrong",
            });
        }
    };

    updateCartProduct = async (req, res) => {
        try {
            const { cid } = req.params;
            const { products } = req.body;

            // Validar que products sea un arreglo
            if (!Array.isArray(products)) {
                return res.status(400).json({
                    error: "La propiedad 'products' debe ser un arreglo.",
                });
            }

            // Actualizar el carrito con el nuevo arreglo de productos
            const result = await this.cartService.updateCartProducts(
                cid,
                products
            );

            return res.json(result);
        } catch (error) {
            return res.status(500).json({
                error: "Ha ocurrido un error al actualizar el carrito con el arreglo de productos.",
            });
        }
    };

    updateProductQuantity = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            // Validar que la cantidad sea un número positivo
            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.status(400).json({
                    error: "La cantidad debe ser un número entero positivo.",
                });
            }

            const result = await this.cartService.updateProductQuantity(
                cid,
                pid,
                quantity
            );

            return res.json(result);
        } catch (error) {
            return res.status(500).json({
                error: "Ha ocurrido un error al actualizar la cantidad del producto en el carrito.",
            });
        }
    };

    deleteProduct = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const response = await this.cartService.removeProductFromCart(
                cid,
                pid
            );
            res.send(response);
        } catch (error) {
            return res.status(500).json({
                message: "Something goes wrong",
            });
        }
    };

    // Controller function to delete all products from a cart
    deleteAllProducts = async (req, res) => {
        try {
            const { cid } = req.params;
            const response = await this.cartService.removeAllProductsFromCart(
                cid
            );
            res.send(response);
        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    };
}
