import express from "express";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes)

export default app;