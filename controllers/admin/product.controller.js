const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if(req.query.status) {
    const index = filterStatus.findIndex((item) => {
      return item.status == req.query.status;
    });
    
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => {
      return item.status == "";
    })

    filterStatus[index].class = "active";
  }

  let find = {
    deleted: false,
  };

  if(req.query.status) {
    find.status = req.query.status;
  }

  let keyword = "";
  if(req.query.keyword) {
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i"); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    
    // console.log(regex);
    find.title = regex;
  }


  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
  });
};
