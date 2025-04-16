import express from "express";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/autentication.route.js";
import { authCheck } from "./middlewares/authorization.middleware.js";
import postRouter from "./routes/post.route.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/auth', authRouter);

app.use('/users', authCheck, userRouter);
app.use('/posts', authCheck, postRouter);

export default app;