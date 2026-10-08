import express from "express";
import { productModel } from "../module/product.js";
import multer from "multer";
import path from "path"
const route = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "ecommerce/uploads/");
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;

    cb(null, filename);
  }
});

const upload = multer({
  storage
})

route.get("/", async (req, res) => {


  const products = await productModel.find({});
  console.log(products);
  

  res.status(200).json({
    count: products.length,
    products,
  });
});

route.post("/create",upload.single("image"), async (req, res) => {
  console.log(req.file);
  
  const { name, description, price, category } = req.body;
  const new_product = await productModel.create({
    name,
    description,
    price,
    category,
    image:req.file.path,
    user: req.user._id,
  });
  res.json({
    data: new_product,
  });
});

route.get("/search", async (req, res) => {
  const q = req.query.name;

  const products = await productModel.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      // { category: { $regex: q, $options: "i" } }
    ],
  });

  res.status(200).json({
    count: products.length,
    products,
  });
});

route.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, price, category, image } = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        image
      },
      {
        new: true
      }
    );

    console.log(updatedProduct);
    

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

route.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

export default route;
