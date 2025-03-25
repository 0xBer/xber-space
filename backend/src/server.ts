import app from "./app.js";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    try {
        await pool.connect()
            .then(() => console.log("Postgres connected"))
            .catch(error => console.error(`Error connecting to Postgres: ${error.message}`));
    } catch (error) {
        console.error(error);
    }
    console.log(`Server is running on 127.0.0.1:${PORT}`);
});