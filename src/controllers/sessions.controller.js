import Jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";
import { SECRET_KEY } from "../config/env.config.js";

export default class SessiongController {
    constructor() {
        this.userService = new UserService();
    }
    logInHandler = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (
                email === "adminCoder@coder.com" &&
                password === "adminCod3r123"
            ) {
                let response = { email, password };
                let token = Jwt.sign({ response }, SECRET_KEY, {
                    expiresIn: "24h",
                });
                res.cookie("MagicianToken", token, {
                    maxAge: 3600 * 1000,
                    httpOnly: true,
                }).send({
                    success: "OK",
                    redirect: "/products",
                });
            } else {
                const response = await this.userService.validateUserCredentials(
                    email,
                    password
                );
                console.log("Este es el response".cyan, response);
                let token = Jwt.sign({ response }, SECRET_KEY, {
                    expiresIn: "24h",
                });
                res.cookie("MagicianToken", token, {
                    maxAge: 3600 * 1000,
                    httpOnly: true,
                }).send({
                    success: "OK",
                    redirect: "/products",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    };

    signInHandler = async (req, res) => {
        try {
            const { name, lastName, age, email, password } = req.body;

            // Crea un objeto con los datos del usuario
            const userData = {
                name,
                lastName,
                age,
                email,
                password,
            };

            const newUser = await this.userService.addUser(userData);

            if (!newUser) {
                // Si no se pudo crear el usuario, devuelve un error
                return res
                    .status(500)
                    .json({ error: "No se pudo crear el usuario" });
            }
            const response = {
                success: true,
                redirect: "/login",
            };
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    };
}
