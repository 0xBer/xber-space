import { RequestHandler } from "express";
import dotenv from "dotenv";
import jwtParser from "../utils/jwtParser";
import bcrypt from "bcrypt";
import client from "../db";

dotenv.config();

const SECRET = process.env.SECRET as string;

export const getOneUser: RequestHandler = async (req, res) => {
    try {
        const { id }= req.params;

        const user = await client.user.findUnique({
            where: { id: Number(id) }
        });

        if (user === null) {
            return res.status(401).json({ message: `Cant get user with id: ${id}` });
        }

        return res.status(200).json({ user })
    } catch (error) {
        return res.status(401).json({ message: "Cant get user" });
    }
};

export const getAllUsers: RequestHandler = async (req, res) => {
    try {
        const users = await client.user.findMany();

        return res.status(200).json({ users });
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

        const user = await client.user.delete({
            where: { id: Number(id) }
        })

        return res.status(200).json({ message: 'User deleted succesfully', user });
    } catch (error) {
        return res.status(400).json({ message: 'Cant delete user' });
    }
};

export const updateUser: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { id } = req.params;

        const token = req.headers.authorization as string;

        const decoded = jwtParser(token, SECRET);

        if (id != decoded.id) {
            return res.status(401).json({ message: `You cant patch this user, your id ${decoded.id}` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await client.user.update({
            where: { id: Number(id) },
            data: {
                username,
                password: hashedPassword,
            }
        })

        return res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        return res.status(400).json({ message: "Cant update user", error: error });
    }
};