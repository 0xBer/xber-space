import express from "express";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/autentication.routes.js";
import { authCheck } from "./middlewares/authorization.middleware.js";

const app = express();

app.use(express.json());

app.use('/auth', authRoutes)
app.use('/users', authCheck, userRoutes);

export default app;