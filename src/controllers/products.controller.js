import ProductService from "../services/product.service.js";
import { socket } from "../server.js";
import {
    DuplicatedProductError,
    InvalidArgValuesError,
    ProductNotFoundError,
} from "../errors/errors.js";

export default class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    //Get all Products with specified limit/page/query/sort
    //~> |GET
    getProductsPaginated = async (req, res) => {
        try {
            const products = await this.productService.getProductsPaginated(
                req.query
            );
            res.json(products);
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    };

    //Get Product by ID
    //~> |GET
    getProductById = async (req, res) => {
        try {
            const productId = req.params.pid;
            const product = await this.productService.getProductById(productId);
            if (!product) {
                throw new ProductNotFoundError("Product not found");
            }

            res.send(product);
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                return res.status(400).json({ message: "Product not found" });
            }
            return res.status(500).json({ message: "Something went wrong" });
        }
    };

    //Add new Product
    //~> |POST
    addProduct = async (req, res) => {
        try {
            const requiredKeys = [
                "title",
                "description",
                "code",
                "stock",
                "thumbnail",
                "price",
                "category",
            ];

            for (const key of requiredKeys) {
                if (!(key in req.body)) {
                    return res
                        .status(400)
                        .json({ message: `Missing required key: ${key}` });
                }
            }
            const newProduct = req.body;

            const response = await this.productService.addProduct(newProduct);
            socket.emit("newProduct", response);
            res.json(response);
        } catch (error) {
            console.error(error);
            if (error instanceof InvalidArgValuesError) {
                return res
                    .status(400)
                    .json({ message: "Invalid argument values" });
            } else if (error instanceof DuplicatedProductError) {
                return res.status(400).json({ message: "Duplicated Product" });
            }
            return res.status(500).json({ message: "Something went wrong" });
        }
    };

    //Update Product Properties
    //~> |PUT
    updateProduct = async (req, res) => {
        try {
            const productId = req.params.pid;
            const newData = req.body;
            const response = await this.productService.updateProduct(
                productId,
                newData
            );
            res.json(response);
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                return res.status(404).json({ message: "Product not found" });
            } else if (error instanceof InvalidArgValuesError) {
                return res
                    .status(400)
                    .json({ message: "Invalid argument values" });
            }
            return res.status(500).json({ message: "Something went wrong" });
        }
    };

    //Delete Product
    //~> |DELETE
    deleteProduct = async (req, res) => {
        try {
            const productId = req.params.pid;
            const response = await this.productService.deleteProduct(productId);

            socket.emit("deletedProduct", productId);
            res.send(response);
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(500).json({ message: "Something went wrong" });
        }
    };
}
