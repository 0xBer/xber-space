import { Request, Response } from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET as string;

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, hashedPassword]);

        const token = jwt.sign({ userId: newUser.rows[0].id }, SECRET, { expiresIn: "1h" });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(401).json({ message: "Cant register" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Wrong login or password1" });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong login or password2" });
        }

        const token = jwt.sign({ userId: user.rows[0].id }, SECRET, { expiresIn: "1h" });

        return res.status(200).json({ token })
    } catch (error) {
        return res.status(401).json({ message: "Cant login" });
    }
}

//TODO: secure routes