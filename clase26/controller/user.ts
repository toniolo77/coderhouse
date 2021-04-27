import { UserModel as User } from "./../model/user";
import bCrypt from "bcrypt";

export const logout = async (req, res) => {
  //   const userName = req.session.user;
  //   await req.session.destroy();
  //   res.render("user/logout", { user: userName || "algo" });
  const { username } = req.user;
  req.logout();
  res.render("user/logout", { user: username });
};

const validatePassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

export const login = (req, username, password, cb) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return cb(err);
    if (!user) {
      console.log("User Not Found with username " + username);
      return cb(null, false);
    }
    if (!validatePassword(user, password)) {
      console.log("Invalid Password");
      return cb(null, false);
    }
    return cb(null, user);
  });
};

export const register = (req, username, password, cb) => {
  const findOrCreateUser = function () {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        console.log("Error in SignUp: " + err);
        return cb(err);
      }
      if (user) {
        console.log("User already exists");
        return cb(null, false);
      } else {
        const newUserObject = {
          username: username,
          password: createHash(password),
        };
        var newUser = new User(newUserObject);
        newUser.save((err) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            throw err;
          }
          console.log("User Registration succesful");
          return cb(null, newUser);
        });
      }
    });
  };
  process.nextTick(findOrCreateUser);
};
