import dotenv from "dotenv";
import connectDb from "./db/index.js";  // ✅ Use the correct Sequelize instance
import { app } from "./app.js";

dotenv.config({
    path: "./env",
});

// ✅ Use `connectDb.sync()`
connectDb.sync({ force: false })
    .then(() => {
        app.listen(process.env.PORT || 8001, () => {
            console.log(` ⚙️ Server is running at port: ${process.env.PORT || 8001}`);
        });
    })
    .catch((err) => {
        console.error(" ❌ SQL Connection Failed !!! ", err);
        process.exit(1);
    });
