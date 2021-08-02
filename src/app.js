require("dotenv").config();
import "./model/db";
import "./api";
import "./getDistance";

import express from "express";
import detailRouter from "./Routers/detailRouter";
import authRouter from "./Routers/authRouter";

const app = express();

const whiteList = ["http://localhost:3000", "https://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin, callback);
    if (whiteList.indexOf(origin) >= 0 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("당신은 접근이 허용되지 않았습니다."));
    }
  },
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/detail", detailRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
