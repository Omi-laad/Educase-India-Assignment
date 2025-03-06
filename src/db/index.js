import { Sequelize } from "sequelize";
import { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD,DB_PORT } from "../constants.js";

// ✅ Correct order of parameters
const connectDb = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    logging: false,  
    DB_PORT
});

const testDbConnection = async () => {
    try {
        await connectDb.authenticate();
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};

// Call function to test connection
testDbConnection();

export default connectDb;
