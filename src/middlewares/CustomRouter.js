import { Router } from "express";
import Jwt from "jsonwebtoken";
// Create a Router Class
export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }

    init() {}

    get(path, ...callbacks) {
        this.router.get(
            //Recordar añadir "policies" como callback arriba
            path,
            // this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        );
    }
    post(path, ...callbacks) {
        //Recordar añadir "policies" como callback arriba
        this.router.post(
            path,
            // this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        );
    }
    put(path, ...callbacks) {
        //Recordar añadir "policies" como callback arriba
        this.router.put(
            path,
            // this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        );
    }
    delete(path, ...callbacks) {
        //Recordar añadir "policies" como callback arriba
        this.router.delete(
            path,
            // this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        );
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.error(error);
                params[1].status(500).send(error);
            }
        });
    }

    generateCustomResponses = (req, res, next) => {
        res.sendSucces = (payload) => res.send({ status: "Success", payload });
        res.sendServerError = (error) =>
            res.status(500).send({ status: "error", error });
        next();
    };

    // handlePolicies = (policies) => (req, res, next) => {
    //     if (policies === "PUBLIC") return next();
    //     const authHeaders = req.headers.authorization;

    //     if (!authHeaders)
    //         return res
    //             .status(401)
    //             .send({ status: "error", error: "Unauthorized" });

    //     const token = authHeaders;

    //     let user = Jwt.verify(token, "MagicianToken");

    //     if (!policies.includes(user.role.toUpperCase()))
    //         return res
    //             .status(401)
    //             .send({ status: "error", message: " Unauthorized" });
    //     req.user = user;
    //     next();
    // };
}
