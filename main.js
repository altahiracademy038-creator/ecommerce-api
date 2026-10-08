import express from "express";
import { db_connection } from "./config/db_connection.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import profileRouter from "./routes/profile.js";
import productsRouter from "./routes/products.js";
import { auth_middleware } from "./middleware/auth.js";
import commentRouter from "./routes/comments.js";

const app = express();

app.use(express.json());

db_connection();

app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/profile", auth_middleware, profileRouter);
app.use("/api/product", auth_middleware, productsRouter);
app.use("/api/comment", auth_middleware, commentRouter);

app.listen("3000", () => {
  console.log("server running on http://localhost:3000");
});
