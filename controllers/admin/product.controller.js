const Product = require("../../models/product.model");

const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  //...
  const filterStatus = filterStatusHelper(req.query);
  let objectSearch = searchHelper(req.query);

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }

  // Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 4,
  };

  const countProducts = await Product.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countProducts
  );

  // End Pagination

  const products = await Product.find(find)
    .sort({ position: "desc"})
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  if (products.length) {
    res.render("admin/pages/products/index", {
      pageTitle: "Trang danh sách sản phẩm",
      products: products,
      filterStatus: filterStatus,
      keyword: objectSearch.keyword,
      pagination: objectPagination,
    });
  } else {
    // res.redirect(`/${systemConfig.prefixAdmin}/products`);

    let stringQuery = "";
    for (const key in req.query) {
      if (key != "page") {
        stringQuery += `&${key}=${req.query[key]}`;
      }
    }

    const href = `${req.baseUrl}?page=1${stringQuery}`;
    res.redirect(href);
  }
};

// [PATCH] /admin/change-status/products/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  req.flash("success", "Cập nhật trạng thái thành công!");
  res.redirect("back");
};

// [PATCH] /admin/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: type });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;

    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`);
      break;

    case "change-position":
      for(const item of ids) {
        const [id, position] = item.split("-");
        await Product.updateOne({ _id: id }, { position: position});
      }
      req.flash("success", `Thay đổi vị trí thành công ${ids.length} sản phẩm!`);
      break;

    default:
      break;
  }

  res.redirect("back");
};

// [DELETE] /admin/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id});
  await Product.updateOne(
    {
      _id: id,
    },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );

  req.flash("success", `Xóa thành công sản phẩm!`);

  res.redirect("back");
};
