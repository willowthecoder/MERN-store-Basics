import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch data" });
  }
};

export const createproduct = async (req, res) => {
  console.log("HIT /api/products POST"); // ✅ Debug log

  const product = req.body; // user sent data
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const newproduct = new Product(product);
  try {
    await newproduct.save();
    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      data: newproduct,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error creating product" });
  }
};

export const deleteproduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }
  try {
    await Product.findByIdAndDelete(id);
    return res.status(500).json({ success: true, message: " product Deleted" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(200)
      .json({ success: false, message: "No product ID found" });
  }
};

export const updateproduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }
  try {
    let updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Error updating product",
    });
  }
};
