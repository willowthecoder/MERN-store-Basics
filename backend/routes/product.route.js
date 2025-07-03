import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {
  getProducts,
  createproduct,
  deleteproduct,
  updateproduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createproduct);

router.delete("/:id", deleteproduct);

router.put("/:id", updateproduct);
export default router;
