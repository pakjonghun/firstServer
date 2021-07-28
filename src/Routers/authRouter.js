import express from "express";
import {
  changePassword,
  findPassword,
} from "../Controllers/authControllers/password";

const authRouter = express.Router();
authRouter.post("/findpassword", findPassword);
authRouter.post("/changepassword", changePassword);

export default authRouter;
