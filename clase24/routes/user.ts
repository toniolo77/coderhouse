import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import { login,logout } from "../controller/user";
import { middlewares } from "../middlewares/permiso";

router.get("/login", (req: Request, res: Response) =>{
    res.render("user/login",{});
});
router.post("/login", login);
router.post("/logout",middlewares.isLogin, logout);

export default router;
