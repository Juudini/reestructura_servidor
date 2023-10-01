import CustomRouter from "../middlewares/CustomRouter.js";
import ProductController from "../controllers/products.controller.js";

//~~> | Product Controller
const productController = new ProductController();

export default class ProductsRouter extends CustomRouter {
    init() {
        // Retrieve all Products with specified limit/page/query/sort
        this.get("/products", productController.getProductsPaginated);

        // Retrieve a single Product with id
        this.get("/products/:pid", productController.getProductById);

        // Add a new Product
        this.post("/products", productController.addProduct);

        // Update a Product with id
        this.put("/products/:pid", productController.updateProduct);

        // Delete a Product with id
        this.delete("/products/:pid", productController.deleteProduct);
    }
}
