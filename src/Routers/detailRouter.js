import express from "express";
import {
  getCate,
  getCourse,
  getResult,
} from "../Controllers/detailControllers/searchResult";

const detailRouter = express.Router();
detailRouter.post("/search", getResult);
detailRouter.get("/:contentid", getCourse);
detailRouter.get("/category", getCate);
export default detailRouter;
