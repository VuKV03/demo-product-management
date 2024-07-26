module.exports.registerPost = (req, res, next) => {
  if(!req.body.fullName) {
    req.flash("error", "Tiêu đề tối thiểu 5 ký tự!");
    res.redirect("back");
    return;
  }

  if(!req.body.email) {
    req.flash("error", "Email không được để trống!");
    res.redirect("back");
    return;
  }

  if(!req.body.password) {
    req.flash("error", "Mật khẩu không được để trống!");
    res.redirect("back");
    return;
  }

  next();
}

module.exports.loginPost = (req, res, next) => {
  if(!req.body.email) {
    req.flash("error", "Email không được để trống!");
    res.redirect("back");
    return;
  }

  if(!req.body.password) {
    req.flash("error", "Mật khẩu không được để trống!");
    res.redirect("back");
    return;
  }
  
  next();
}

module.exports.forgotPasswordPost = (req, res, next) => {
  if(!req.body.email) {
    req.flash("error", "Email không được để trống!");
    res.redirect("back");
    return;
  }

  next();
}
