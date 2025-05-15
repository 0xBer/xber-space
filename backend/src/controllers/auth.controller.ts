import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import client from "../db";
dotenv.config();

const SECRET = process.env.SECRET as string;

export const register: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = await client.user.findUnique({
            where: { username: username }
        });

        if (userExists !== null) {
            return res.status(400).json({ message: "User already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await client.user.create({
            data: {
                username,
                password: passwordHash
            }
        });

        const token = jwt.sign(user, SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error: any) {
        return res.status(401).json({ message: "Cant register", error: error.message });
    }
};

export const login: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await client.user.findUnique({
            where: {
                username
            }
        });

        if (user === null) {
            return res.status(400).json({ message: "Cant login. Wrong info provided" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Cant login. Wrong info provided" });
        }

        const token = jwt.sign(user, SECRET, { expiresIn: '1h' })

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ message: "Cant login. Server Error" });
    }
};