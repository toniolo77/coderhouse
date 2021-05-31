import { UserModel as User } from "./../model/user";
import Logger from "../loggin/loggin";
import { Mail } from "../helper/mail";
import { serviceGmail } from "../helper/serviceGmail";

export const logout = async (req, res) => {
  const { username } = req.user;
  const mail = new Mail();
  mail.sendMail("Log out ", ` user: ${username}, time: ${new Date()}`);
  req.logout();
  res.render("user/logout", { user: username });
};

export const login = async function (accessToken, refreshToken, profile, cb) {
  const mail = new Mail();
  const gmail = new serviceGmail();
  const findOrCreateUser = function () {
    User.findOne({ facebookId: profile.id }, function (err, user) {
      if (err) {
        Logger.error("Error in SignUp: " + err);
        return cb(err);
      }
      if (user) {
        Logger.info("User login succesful");

        mail.sendMail("Login", ` user: ${user.username}, time: ${new Date()}`);
        gmail.sendMail("Login", ` user: ${user.username}, time: ${new Date()}`, user.picture);
        return cb(null, user);
      } else {
        console.log("profile",profile);
        const userData = {
          facebookId: profile.id,
          username: profile.displayName,
          email: profile.emails[0]?.value,
          picture: profile.photos[0]?.value,
        };
        const newUser = new User(userData);
        newUser.save((err) => {
          if (err) {
            Logger.error("Error in Saving user: " + err);
            throw err;
          }
          Logger.info("User Registration succesful");
          mail.sendMail("Login", ` user: ${userData.username}, time: ${new Date()}`);
          gmail.sendMail("Login", ` user: ${userData.username}, time: ${new Date()}`, userData.picture);
          return cb(null, newUser);
        });
      }
    });
  };
  process.nextTick(findOrCreateUser);
};
