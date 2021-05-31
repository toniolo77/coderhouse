export const middlewares = {
  isLogin: function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/user/login");
    }
  },
};
