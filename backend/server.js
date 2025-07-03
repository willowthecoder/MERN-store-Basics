import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRoute);

console.log("__dirname is:", __dirname);
console.log(
  "Looking for dist at:",
  path.join(__dirname, "../../frontend/dist/index.html")
);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Connect DB and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Server is running");
});
