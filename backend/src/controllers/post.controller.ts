import { RequestHandler } from "express";

export const createPost: RequestHandler = async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({ message: "Cant create post" });
    }
};