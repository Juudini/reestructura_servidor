import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { SECRET_KEY } from "../index.js";

const jwtPassportInitialize = () => {
    passport.use(
        "jwt",
        new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
                secretOrKey: SECRET_KEY,
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
};

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["MagicianToken"];
    }
    return token;
};

export default jwtPassportInitialize;
