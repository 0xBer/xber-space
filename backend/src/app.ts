import express from "express";
import userRouter from "./routes/user.route";
import authRouter from "./routes/autentication.route";
import { authCheck } from "./middlewares/authorization.middleware";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/auth', authRouter);

app.use('/users', authCheck, userRouter);

export default app;