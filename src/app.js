import express, { urlencoded } from "express";
import cors from "cors";
import cookieParse from "cookie-parser";

const app = express()


app.use(cors({

    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// Or allow multiple origins
// const allowedOrigins = process.env.PORT
// app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json())
app.use(urlencoded({ extended: true }))
// app.use(express.static("public"))
// for storing images files on server

app.use(cookieParse())

//routes import



import schoolRoutes from './routes/school.route.js';
app.use("/api/schools", schoolRoutes); 



export { app }