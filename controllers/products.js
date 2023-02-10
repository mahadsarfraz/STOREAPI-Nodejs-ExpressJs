const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    name: { $regex: "ab", $options: "i" },
  });
  res.status(200).json({ products, length: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = name;
  }

  const products = await Product.find(queryObject);
  console.log(queryObject);
  res
    .status(200)
    .json({ msg: "Products are here ", products, length: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};