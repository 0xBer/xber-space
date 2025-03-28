import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET as string;

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(400).json({ message: "Not authorized" });
        }

        const isAuth = jwt.verify(authHeader, SECRET);

        if (!isAuth) {
            return res.status(400).json({ message: "Wrong token" });
        }

        next();
    } catch (error) {
        res.status(400).json({ message: "Cant authorize" })
    }
};