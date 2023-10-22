const { StatusCodes } = require("http-status-codes");
const Product = require("../models/productSchema");

exports.addProduct = async (req, res) => {
  try {
    const data = req.body.data;
    const finalData = JSON.parse(data);
    const { title, description, colorNumbers, shadesDetails } = finalData;
    if (!title || !description || !colorNumbers || shadesDetails.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please fill missing data" });
    } else {
      const newProduct = new Product({
        title,
        description,
        colorNumbers,
        shadesDetails,
      });
      await newProduct.save();
      return res.status(StatusCodes.CREATED).json({ msg: "Product Created" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const findProducts = await Product.find();
    if (findProducts.length > 0) {
      return res.status(StatusCodes.OK).json(findProducts);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Products not found!" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};
exports.getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const findProduct = await Product.findById(id);
    if (findProduct) {
      return res.status(StatusCodes.OK).json(findProduct);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No product available" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body.data;
    const finalData = JSON.parse(data);
    const { title, description, colorNumbers, shadesDetails } = finalData;
    if (!title || !description || !colorNumbers || shadesDetails.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please fill missing data" });
    } else {
      await Product.findByIdAndDelete(id);
      const newProduct = new Product({
        title,
        description,
        colorNumbers,
        shadesDetails,
      });
      await newProduct.save();
      return res.status(StatusCodes.OK).json({ msg: "Product Updated" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    return res.status(StatusCodes.OK).json({ msg: "Product deleted" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};
