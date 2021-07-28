require("dotenv").config();
import "./model/db";
import "./api";
import "./getDistance";

import express from "express";
import detailRouter from "./Routers/detailRouter";
import authRouter from "./Routers/authRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/detail", detailRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
