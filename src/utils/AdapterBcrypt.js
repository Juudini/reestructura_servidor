import bcrypt from "bcrypt";

export default class AdapterBcrypt {
    async hashPassword(plainPassword) {
        try {
            const hashedPassword = await bcrypt.hash(plainPassword, 10);
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    }

    async comparePasswords(plainPassword, hashedPassword) {
        try {
            const passwordMatch = await bcrypt.compare(
                plainPassword,
                hashedPassword
            );
            return passwordMatch;
        } catch (error) {
            throw error;
        }
    }
}
