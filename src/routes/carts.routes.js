import CustomRouter from "../middlewares/CustomRouter.js";
import CartController from "../controllers/carts.controller.js";

//~~> | Cart Controller
const cartController = new CartController();

export default class CartsRouter extends CustomRouter {
    init() {
        // Retrieve all Products with Cart id
        this.get("/carts/:cid", cartController.getProducts);

        // Create a Cart
        this.post("/carts", cartController.createCart);

        // Add Product into Cart with both IDs
        this.post("/carts/:cid/product/:pid", cartController.addProduct);

        this.put("/carts/:cid", cartController.updateCartProduct);

        // Update only quantity
        this.put(
            "/carts/:cid/product/:pid",
            cartController.updateProductQuantity
        );

        // Delete Products from Cart with both IDs
        this.delete("/carts/:cid/product/:pid", cartController.deleteProduct);

        // Delete all Products from Cart with IDs
        this.delete("/carts/:cid", cartController.deleteAllProducts);
    }
}
