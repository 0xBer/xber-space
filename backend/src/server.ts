import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`Server is running on 127.0.0.1:${PORT}`);
});