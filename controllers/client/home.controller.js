const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");

// [GET] /
module.exports.index = async (req, res) => {
  // Hiển thị danh sách sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active",
  }).limit(6);

  const newProductsFeatured = productsHelper.newProductsPrice(productsFeatured);
  // Hiển thị danh sách sản phẩm nổi bật

  // Hiển thị danh sách sản phẩm mới nhất
  const listProducts = await Product.find({
    deleted: false,
    status: "active",
  })
    .sort({ position: "desc" })
    .limit(6);

  const newProducts = productsHelper.newProductsPrice(listProducts);

  // Hiển thị danh sách sản phẩm mới nhất

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    newProducts: newProducts,
  });
};
