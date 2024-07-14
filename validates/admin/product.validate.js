module.exports.createPost = (req, res, next) => {
  if(!req.body.title) {
    req.flash("error", "Tiêu đề không được để trống!");
    res.redirect("back");
    return;
  }

  if(req.body.title.length < 5) {
    req.flash("error", "Tiêu đề tối thiểu 5 ký tự!");
    res.redirect("back");
    return;
  }
  
  next();
}

module.exports.editPatch = (req, res, next) => {
  if(!req.body.title) {
    req.flash("error", "Tiêu đề không được để trống!");
    res.redirect("back");
    return;
  }

  if(req.body.title.length < 5) {
    req.flash("error", "Tiêu đề tối thiểu 5 ký tự!");
    res.redirect("back");
    return;
  }
  
  next();
}