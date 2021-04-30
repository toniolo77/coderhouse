import { UserModel as User } from "./../model/user";

export const logout = async (req, res) => {
  console.log("USER",req.user);
  const { username } = req.user;
  req.logout();
  res.render("user/logout", { user: username });
};
