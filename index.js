const express = require('express');
const userRouter = require('./routes/userRoutes');
const connectMongoDb = require('./config/db');
const logs = require("./middlewares/logs");

const app = express();

app.listen(8000, () => console.log("Server Started"));

//Database Connection
connectMongoDb("mongodb://127.0.0.1:27017/practice-mongo");

//Middleware
app.use(express.json());
app.use(logs("logs.txt"));
// app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/user", userRouter);
