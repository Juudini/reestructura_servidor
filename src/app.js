import Express from "express";
import { engine } from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";
import colors from "colors";
import cors from "cors";
import { __dirname } from "./utils/pathUtils.js";
import passport from "passport";
import { jwtPassportInitialize } from "./config/index.js";
//~> |Routes
import SessionsRouter from "./routes/sessions.routes.js";
import ViewsRouter from "./routes/views.routes.js";
import ProductsRouter from "./routes/products.routes.js";
import CartsRouter from "./routes/carts.routes.js";

const app = Express();
app.use(cors());
app.use(cookieParser());
app.use(Express.static(__dirname + "/public"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));

app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        runtimeOptions: { allowProtoPropertiesByDefault: true },
    })
);
app.set("view engine", ".hbs");

//~> | Passport Strategies
jwtPassportInitialize();

/* ★━━━━━━━━━━━★ Passport ★━━━━━━━━━━━★ */
app.use(passport.initialize());

/* ★━━━━━━━━━━━★ Routes ★━━━━━━━━━━━★ */
const sessionsRoutes = new SessionsRouter();
const viewsRoutes = new ViewsRouter();
const productsRoutes = new ProductsRouter();
const cartsRoutes = new CartsRouter();

app.use("/", viewsRoutes.getRouter());
app.use("/api/sessions", sessionsRoutes.getRouter());
app.use("/api", productsRoutes.getRouter());
app.use("/api", cartsRoutes.getRouter());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("¡Algo salió mal!");
});
/* ★━━━━━━━━━━━★ Plantillas ★━━━━━━━━━━━★ */
app.use("*", (req, res, next) => {
    res.render("partials/notFound", { title: "404 Not Found" });
});
export default app;
