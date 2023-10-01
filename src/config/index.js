//~> | AUTH
import jwtPassportInitialize from "./auth/jwtPassport.js";

//~> | DB
import connectDB from "./db.config.js";

//~> | ENV
import { SECRET_KEY, PORT, MONGODB_URI } from "./env.config.js";

/* ★━━━━━━━━━━━★ General ★━━━━━━━━━━━★ */
export { jwtPassportInitialize, connectDB };

/* ★━━━━━━━━━━━★ Env ★━━━━━━━━━━━★ */
export { SECRET_KEY, PORT, MONGODB_URI };
