import express from "express";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/autentication.route.js";
import { authCheck } from "./middlewares/authorization.middleware.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', authCheck, userRouter);
app.use('/posts', authCheck, postRouter);

export default app;