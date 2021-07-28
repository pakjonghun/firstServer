import express from "express";
import {
  getCate,
  getCourse,
  getResult,
} from "../Controllers/detailControllers/searchResult";

const detailRouter = express.Router();

detailRouter.post("/search", getResult);

detailRouter.get("/category", getCate);

detailRouter.get("/:contentid", getCourse);
export default detailRouter;
