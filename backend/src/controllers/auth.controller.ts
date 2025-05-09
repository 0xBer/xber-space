import { RequestHandler } from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET as string;

export const register: RequestHandler = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, hashedPassword]);

        const token = jwt.sign(newUser.rows[0], SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(401).json({ message: "Cant register" });
    }
};

export const login: RequestHandler = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Cant login. Wrong info provided" });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        if (!isMatch) {
            return res.status(400).json({ message: "Cant login. Wrong info provided" });
        }

        const token = jwt.sign(user.rows[0], SECRET, { expiresIn: '1h' })

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ message: "Cant login. Server Error" });
    }
};