import { Request, Response } from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const getOneUser = async (req: Request, res: Response) => {
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

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await pool.query("SELECT * FROM users");

        if (users.rows.length === 0) {
            return res.status(401).json({ message: "No users were found" });
        }

        return res.status(200).json(users.rows);
    } catch (error) {
        return res.status(401).json({ message: "Cant get list of users" });
    }
};
//TODO: secure routes