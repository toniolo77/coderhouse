import express from "express";
const router = express.Router();
import { logout } from "../controller/user";

router.get("/login", (req, res) => {
  res.render("user/login", {});
});

router.get("/logout", logout);

router.get("/faillogin", (req, res) => {
  res.render("user/login-error", {});
});

export default router;
