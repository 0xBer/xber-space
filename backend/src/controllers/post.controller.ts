import { RequestHandler } from "express";
import pool from "../db.js";
import dotenv from "dotenv";
import jwtParser from "../utils/jwtParses.js";
dotenv.config();

const SECRET = process.env.SECRET as string;

export const getAllPosts: RequestHandler = async (req, res) => {
    try {
        const posts = await pool.query('SELECT * FROM posts');
        if (posts.rows.length === 0) {
            return res.status(401).json({ message: "No posts found" });
        }
        return res.status(200).json(posts.rows);
    } catch (error) {
        return res.status(400).json({ message: "Cant get posts" });
    }
};

export const getOnePost: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

        if (post.rows.length === 0) {
            return res.status(401).json({ message: "No posts found" });
        }

        return res.status(200).json(post.rows);
    } catch (error) {
        return res.status(400).json({ message: "Cant get posts" });
    }
};

export const createPost: RequestHandler = async (req, res) => {
    try {
        const { title, body } = req.body;

        const token = req.headers.authorization as string;
        const decoded = jwtParser(token, SECRET);
        const author = decoded.username;

        const post = await pool.query('INSERT INTO posts (title, body, author) VALUES ($1, $2, $3) RETURNING *', [title, body, author]);

        return res.status(200).json(post.rows);
    } catch (error) {
        return res.status(400).json({ message: "Cant create post" });
    }
};