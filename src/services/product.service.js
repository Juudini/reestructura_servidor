import {
    AddProductError,
    DeleteProductError,
    GetProductByIdError,
    GetProductsError,
    UpdateProductError,
} from "../errors/errors.js";
import { productModel } from "../models/Product.js";

export default class ProductService {
    constructor() {
        this.productModel = new productModel();
    }
    // Add a new Product
    async addProduct(newProduct) {
        try {
            const addedProduct = await this.productModel.create(newProduct);
            return addedProduct;
        } catch (error) {
            throw new AddProductError("Failed to add product ", error);
        }
    }

    // Retrieve all products
    async getProductsPaginated(params) {
        try {
            // Extract parameters
            let { limit = 10, page = 1, query, sort } = params;

            // Parse query if provided
            const filterOptions = query ? JSON.parse(query) : {};

            // Determine sorting options based on sort parameter
            const sortOptions =
                sort === "desc"
                    ? { price: -1 }
                    : sort === "asc"
                    ? { price: 1 }
                    : {};

            // Paginate products using provided parameters
            const products = await this.productModel.paginate(filterOptions, {
                limit: parseInt(limit),
                page: parseInt(page),
                sort: sortOptions,
            });

            // Destructure pagination properties
            const {
                docs,
                totalPages,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
            } = products;

            // Determine the status based on the presence of products
            const status = docs.length === 0 ? "error" : "success";

            // Build base URL for pagination links
            const baseUrl = `/api/products?limit=${limit}&query=${query}&sort=${sort}`;

            // Generate previous and next links if available
            const prevLink = hasPrevPage ? `${baseUrl}&page=${prevPage}` : null;
            const nextLink = hasNextPage ? `${baseUrl}&page=${nextPage}` : null;

            // Construct the result object
            const result = {
                status: status,
                payload: docs,
                page,
                totalPages,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                prevLink,
                nextLink,
            };

            return result;
        } catch (error) {
            throw new GetProductsError("Failed to get products ", error);
        }
    }
    async getProducts() {
        try {
            return await this.productModel.find().lean();
        } catch (error) {
            throw new GetProductsError("Failed to get products ", error);
        }
    }
    // Retrieve a product by id
    async getProductById(id) {
        try {
            return await this.productModel.findById(id);
        } catch (error) {
            throw new GetProductByIdError(
                "Failed to get product by id ",
                error
            );
        }
    }

    // Update a product by id
    async updateProduct(id, newData) {
        try {
            await this.productModel.findByIdAndUpdate(id, newData);
            return { message: "Product successfully updated." };
        } catch (error) {
            throw new UpdateProductError("Failed to update product ", error);
        }
    }

    async deleteProduct(id) {
        try {
            return await this.productModel.findByIdAndDelete(id);
        } catch (error) {
            throw new DeleteProductError("Failed to delete product ", error);
        }
    }
}
