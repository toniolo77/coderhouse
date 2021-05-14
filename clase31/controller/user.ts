import { UserModel as User } from "./../model/user";
import Logger from "../loggin/loggin";

export const logout = async (req, res) => {
  const { username } = req.user;
  req.logout();
  res.render("user/logout", { user: username });
};

export const login = async function (accessToken, refreshToken, profile, cb) {
  const findOrCreateUser = function () {
    User.findOne({ facebookId: profile.id }, function (err, user) {
      if (err) {
        Logger.error("Error in SignUp: " + err);
        return cb(err);
      }
      if (user) {
        Logger.info("User login succesful");
        return cb(null, user);
      } else {
        const userData = {
          facebookId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
        };
        const newUser = new User(userData);
        newUser.save((err) => {
          if (err) {
            Logger.error("Error in Saving user: " + err);
            throw err;
          }
          Logger.info("User Registration succesful");
          return cb(null, newUser);
        });
      }
    });
  };
  process.nextTick(findOrCreateUser);
};
