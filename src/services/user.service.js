import { userModel } from "../models/User.js";
import CartService from "./cart.service.js";
import AdapterBcrypt from "../utils/AdapterBcrypt.js";
const bcryptAdapter = new AdapterBcrypt();
const cartService = new CartService();
export default class UserManager {
    constructor() {
        this.userModel = new userModel();
    }
    // Add a new User
    async addUser(userData) {
        try {
            const existingUser = await this.#checkIfUserExists(userData.email);
            if (!existingUser) {
                const hashedPassword = await bcryptAdapter.hashPassword(
                    userData.password
                );
                userData.password = hashedPassword;

                // Crear un nuevo carrito al registrar un usuario
                const newCart = await cartService.createCart();

                // Asignar el ID del carrito al usuario
                userData.cartId = newCart._id;

                const newUser = await this.userModel.create(userData);
                if (!newUser) {
                    return false;
                }
                return newUser;
            }

            return existingUser;
        } catch (error) {
            throw error;
        }
    }

    async #checkIfUserExists(email) {
        try {
            const existingUser = await this.userModel.findOne({ email });
            return existingUser;
        } catch (error) {
            throw error;
        }
    }

    // Verify user credentials
    async validateUserCredentials(email, password) {
        try {
            console.log("DATA VALIDATE USER CREDENTIALS".inverse, email);
            const existingUser = await this.#checkIfUserExists(email);
            if (!existingUser) {
                console.log("USUARIO NO EXISTE!!".bgBrightRed);
                return false;
            }
            const passwordMatch = await bcryptAdapter.comparePasswords(
                password,
                existingUser.password
            );

            if (!passwordMatch) {
                return false;
            }

            return existingUser.id;
        } catch (error) {
            throw error;
        }
    }

    async findUserById(userId) {
        try {
            console.log("Find USER by ID".bgBrightCyan, userId);

            const user = await this.userModel.findById(userId);

            console.log("user response findUserById".bgBrightCyan, user);

            if (!user) {
                return null;
            }

            return user;
        } catch (error) {
            throw error;
        }
    }
}
