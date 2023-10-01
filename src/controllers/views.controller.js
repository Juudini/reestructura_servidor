import ProductService from "../services/product.service.js";
import CartService from "../services/cart.service.js";
import { userModel } from "../models/User.js";
import Jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.config.js";

export default class ViewController {
    constructor() {
        this.cartService = new CartService();
        this.productService = new ProductService();
    }

    // Retrieve all static Products
    getHomeView = async (req, res) => {
        try {
            const products = await this.productService.getProducts();

            res.render("home", { title: "Books Catalog", products });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    };

    // Retrieve Products in Real Time
    getRealTimeProducts = async (req, res) => {
        try {
            const products = await this.productService.getProducts();

            res.render("partials/_realTimeProducts", {
                title: "Real Time Products",
                products,
            });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    };

    chat = async (req, res) => {
        try {
            res.render("chat", { title: "Chat" });
        } catch (error) {
            console.error(error);
        }
    };

    // Retrieve Products in Real Time
    getCartView = async (req, res) => {
        try {
            const { cid } = req.params;
            const products = await this.cartService.getCartWithProducts(cid);
            res.render("partials/_cartView", {
                title: "Products in Cart View",
                products,
            });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    };

    getAllProducts = async (req, res) => {
        try {
            // Retrieve the list of products
            const products = await this.productService.getProducts();
            // const sessionData = req.session.user;
            //! ACA SACAR LA INFO DEL TOKEN
            // sessionData.name =
            //     sessionData.name.charAt(0).toUpperCase() +
            //     sessionData.name.slice(1);

            // Renderear la vista
            res.render("partials/_productsView", {
                products,
            });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    };

    getLoginView = async (req, res) => {
        try {
            res.render("partials/sessions/_login", { title: "Session" });
        } catch (error) {
            console.error(error);
        }
    };

    getSignUpView = async (req, res) => {
        try {
            res.render("partials/sessions/_signup", { title: "Session" });
        } catch (error) {
            console.error(error);
        }
    };
    getCurrentView = async (req, res) => {
        try {
            // Obtener el token JWT de la cookie "MagicianToken"
            const token = req.cookies.MagicianToken;

            // Decodificar el token para obtener su contenido
            const decodedToken = Jwt.verify(token, SECRET_KEY);

            const userId = decodedToken.response;
            console.log(userId.id);

            // Comprueba si el usuario es el administrador
            if (
                decodedToken.response.email === "adminCoder@coder.com" &&
                decodedToken.response.password === "adminCod3r123"
            ) {
                // Si el usuario es el administrador, crea un objeto de usuario ficticio
                const user = {
                    id: "1",
                    name: "Admin",
                    lastName: "Coder",
                    age: 30,
                    email: "adminCoder@coder.com",
                    password: "adminCod3r123",
                    role: "admin",
                    cartId: "cart123", // Cart ID ficticio
                };

                console.log("data GET CURRENT VIEW".inverse, user);
                res.render("partials/sessions/_current", {
                    title: "Session",
                    user,
                });
            } else {
                // Utiliza el modelo de usuario para buscar el usuario por su ID
                const user = await userModel.findById(userId);
                console.log("data GET CURRENT VIEW".inverse, user);
                res.render("partials/sessions/_current", {
                    title: "Session",
                    user,
                });
            }
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
            res.status(500).json({
                error: "Error al obtener los datos del usuario",
            });
        }
    };
}
