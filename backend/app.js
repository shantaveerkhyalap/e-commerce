require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const index = require("./routes/index");
const expressSession = require("express-session");

// CORS – allow React dev server (update origin if you change the frontend port)
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:8081",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);

// ---------- Routes ----------
app.use("/api/owners", ownersRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api", index);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
// ---------- Start ----------
const PORT = process.env.PORT || 8086;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
