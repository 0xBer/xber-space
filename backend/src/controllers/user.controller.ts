import { Request, Response } from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET as string;

export const create = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, hashedPassword]);

        return res.status(200).json(newUser.rows);
    } catch (error) {
        return res.status(401).json({ message: "Cant register" });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        if (user.rows.length === 0) {
            return res.status(401).json({ message: `Cant get user with id: ${id}` });
        }

        return res.status(200).json(user.rows)
    } catch (error) {
        return res.status(401).json({ message: "Cant get user" });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await pool.query("SELECT * FROM users");

        if (users.rows.length === 0) {
            return res.status(401).json({ message: "No users were found" });
        }

        return res.status(200).json(users.rows);
    } catch (error) {
        return res.status(401).json({ message: "Cant login" });
    }
};
//TODO: secure routes