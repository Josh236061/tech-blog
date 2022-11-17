
const router = require("express").Router();

const { User, Post, Comment } = require("../../models");

//SignUp
/* Username & Password */

router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = userData.username;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Login

/* User data : Username ; Password verification/user id and loggin id verification */

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    console.log(userData);

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    //Password validation
    const validPassword = userData.checkPassword(req.body.password);

    //FAILED response if incorrect password is implemented
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = userData.username;
      res.json({
        user: userData,
        logged_in: req.session.logged_in,
        username: userData.username,
        message: "You are now logged in!",
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

/* Logout */

/* Logged in user: DESTROY Session (LogOut) */
  

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
