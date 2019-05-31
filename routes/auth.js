const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/auth");
const redirectHome = require("../middlewares/redirectHome");
const redirectLogin = require("../middlewares/redirectLogin");
const checkUser = require("../middlewares/checkUser");
const findUser = require("../middlewares/findUser");

authRouter
  .route("/sign-up")
  .get(redirectHome, (req, res) => {
    res.render("sign-up");
  })
  .post(redirectHome, checkUser, authController.createUser);

authRouter
  .route("/login")
  .get(redirectHome, (req, res) => {
    res.render("login");
  })
  .post(redirectHome, checkUser, findUser.byEmail, authController.auth);

authRouter.get("/forgot-password", redirectHome, (req, res) => {
  res.render("forgotPassword");
});

authRouter.post("/logout", redirectLogin, authController.logout);

authRouter.get("/confirmation", redirectLogin, findUser.byId, (req, res) => {
  if (res.locals.user.isVerified) {
    res.redirect("/home");
  } else {
    res.render("confirmation");
  }
});

authRouter.get("/confirmation/:token", authController.verify);

module.exports = authRouter;
//use for all pages to confirm