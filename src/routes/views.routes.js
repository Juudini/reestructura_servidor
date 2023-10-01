import passport from "passport";
import CustomRouter from "../middlewares/CustomRouter.js";
import ViewController from "../controllers/views.controller.js";

//~~> | View Controller
const viewController = new ViewController();

export default class ViewsRouter extends CustomRouter {
    init() {
        // Redirect to login
        this.get("/", (req, res) => {
            res.redirect("/login");
        });

        // Retrieve all static Products
        this.get(
            "/home",
            passport.authenticate("jwt", { session: false }),
            viewController.getHomeView
        );

        // Retrieve Products in Real Time
        this.get(
            "/realtimeproducts",
            passport.authenticate("jwt", { session: false }),
            viewController.getRealTimeProducts
        );

        // Chat in Real Time
        this.get(
            "/chat",
            passport.authenticate("jwt", { session: false }),
            viewController.chat
        );

        // All products with their respective view
        this.get(
            "/products",
            passport.authenticate("jwt", { session: false }),
            viewController.getAllProducts
        );

        // Productos en determinado carrito
        this.get(
            "/carts/:cid",
            passport.authenticate("jwt", { session: false }),
            viewController.getCartView
        );

        // Login and Register
        this.get("/login", viewController.getLoginView);
        this.get("/signup", viewController.getSignUpView);

        //All data and current view
        this.get(
            "/current",
            passport.authenticate("jwt", { session: false }),
            viewController.getCurrentView
        );
    }
}
