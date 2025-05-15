import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET as string;

export const authCheck: RequestHandler = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(400).json({ message: "Not authorized" });
        }

        const token = jwt.verify(authHeader, SECRET);

        if (!token) {
            return res.status(400).json({ message: "Wrong token" });
        }

        next();
    } catch (error) {
        res.status(400).json({ message: "Cant authorize" })
    }
};