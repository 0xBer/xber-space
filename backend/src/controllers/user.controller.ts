import { RequestHandler } from "express";
import pool from "../db.js";
import dotenv from "dotenv";
import jwtParser from "../utils/jwtParser.js";
import bcrypt from "bcrypt";

dotenv.config();

const SECRET = process.env.SECRET as string;

export const getOneUser: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: `Cant get user with id: ${id}` });
        }

        return res.status(200).json(user.rows)
    } catch (error) {
        return res.status(401).json({ message: "Cant get user" });
    }
};

export const getAllUsers: RequestHandler = async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users");

        return res.status(200).json(users.rows);
    } catch (error) {
        return res.status(401).json({ message: "Cant get list of users" });
    }
};

export const deleteUser: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization as string;

        const decoded = jwtParser(token, SECRET);
        if (id != decoded.id) {
            return res.status(401).json({ message: `You cant delete this user, your id ${decoded.id}` });
        }

        const user = await pool.query('DELETE FROM users WHERE id = $1', [id]);

        return res.status(200).json({ message: 'User deleted succesfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Cant delete user' });
    }
};

export const updateUser: RequestHandler = async (req, res) => {
    try {
        const { username, email, currentPassword, newPassword } = req.body;
        const { id } = req.params;

        const token = req.headers.authorization as string;

        const decoded = jwtParser(token, SECRET);

        if (id != decoded.id) {
            return res.status(401).json({ message: `You cant patch this user, your id ${decoded.id}` });
        }

        if (currentPassword != decoded.password) {
            return res.status(401).json({ message: `You cant patch this user, wrong password` });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await pool.query('UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4', [username, hashedPassword, email, id]);

        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        return res.status(400).json({ message: "Cant update user", error: error });
    }
};