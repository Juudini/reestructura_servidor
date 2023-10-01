import CustomRouter from "../middlewares/CustomRouter.js";
import SessionController from "../controllers/sessions.controller.js";

//~~> | Session Controller
const sessionController = new SessionController();

export default class SessionsRouter extends CustomRouter {
    init() {
        // ~> LogIn
        this.post("/login", sessionController.logInHandler);
        // ~> SignUp
        this.post("/signup", sessionController.signInHandler);
        this.get("/signupError", async (req, res) => {
            console.log("Failed strategy");
            res.send({ error: "failed" });
        });

        // ~> LogOut
        this.post("/logout", (req, res) => {
            res.clearCookie("MagicianToken");

            res.redirect("/login");
        });

        //Route if failed login
        this.get("/failLogin", (req, res) => {
            res.send({ error: "Error login" });
        });
    }
}
