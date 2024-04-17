import { registerAs } from "@nestjs/config";

export default registerAs('db', () => {
    return {
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER_NAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
    }
});