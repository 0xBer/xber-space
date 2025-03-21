import express from "express";
import dotenv from "dotenv";

dotenv.config()

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, World" });
});

app.listen(PORT, () => {
    console.log(`Server is running on 127.0.0.1:${PORT}`)
});