
const router = require("express").Router();

const { User, Post, Comment } = require("../../models");

//SIGNUP ROUTE

/* Get username and password from form and create a new user in user table */

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

//LOGIN ROUTE

/* Get the user data from the table using the username
Verify the password with existing one for the user
If Valid,save the session with user id and loggin id and return userdata */

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

    //Validate the password with saved in databse
    const validPassword = userData.checkPassword(req.body.password);

    //If Password is not valid send failed response
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



//LOGOUT ROUTE

/*
  Destroy the session for the user,if user is logged in
  */

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
