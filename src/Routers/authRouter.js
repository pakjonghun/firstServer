import express from "express";

import {
  changePassword,
  findPassword,
} from "../Controllers/authControllers/passwordController";

import {
  oAuth,
  oAuthJoin,
} from "../Controllers/authControllers/oAuthController";

import { join, login } from "../Controllers/authControllers/loginAndJoin";

import joinValidator from "../middlewares/joinValidator";
const authRouter = express.Router();

authRouter.post("/sociallogin", oAuth);

authRouter.post("/socialjoin", oAuthJoin);

authRouter.post("/join", joinValidator, join);

authRouter.post("/login", login);

authRouter.post("/findpassword", findPassword);

authRouter.post("/changepassword", changePassword);

export default authRouter;
