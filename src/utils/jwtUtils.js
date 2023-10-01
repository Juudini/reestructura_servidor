import Jwt from "jsonwebtoken";
import SECRET_KEY from "../config/index.js";

export const generateToken = (user) => {
    const token = Jwt.sign({ user }, SECRET_KEY, { expiresIn: "24h" });
    return token;
};

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send({
            status: "error",
            message: "No se envió el Token!",
        });
        return;
    }

    const token = authHeader;

    Jwt.verify(token, SECRET_KEY, (error, credentials) => {
        if (error) {
            res.status(401).send({
                status: "error",
                message: "No autorizado!",
            });
        } else {
            req.user = credentials.user;
            next();
        }
    });
};
