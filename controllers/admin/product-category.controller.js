const ProductCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");

const createTree = require("../../helpers/createTree");

// [GET] /admin/product-category/
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);
  const newRecords = createTree(records);

  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
};

// [GET] /admin/product-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTree(records);

  res.render("admin/pages/product-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
  });
};

// [POST] /admin/product-category/createPost
module.exports.createPost = async (req, res) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  }

  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
};

// [GET] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const data = await ProductCategory.findOne({
    _id: id,
    deleted: false,
  });

  const records = await ProductCategory.find({
    deleted: false,
  });

  const newRecords = createTree(records);

  res.render("admin/pages/product-category/edit", {
    pageTitle: "Chỉnh sửa danh mục sản phẩm",
    data: data,
    records: newRecords,
  });
};

// [PATCH] /admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.position = parseInt(req.body.position);

  await ProductCategory.updateOne({ _id: id }, req.body);

  res.redirect("back");
};
