
const router = require("express").Router();
const apiRoutes = require("./api");
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection.js");

router.use("/api", apiRoutes);

router.get("/", async (req, res) => {
  res.redirect("/home");
});

/* Login */

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.render("home", {
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } else {
    res.render("login", { logged_in: req.session.logged_in });
  }
});

/* Sign Up */

router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.render("home", {
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } else {
    res.render("signup", { logged_in: req.session.logged_in });
  }
});

/* Logout */

router.get("/logout", async (req, res) => {
  res.render("home", { logged_in: req.session.logged_in });
});

/* Home */

router.get("/home", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    let posts = postData.map((post) => post.get({ plain: true }));

    posts = posts.map((post) => {
      return {
        ...post,
        formattedDate:
          new Date(post.created_at).getMonth() +
          "/" +
          new Date(post.created_at).getDate() +
          "/" +
          new Date(post.created_at).getFullYear(),
      };
    });

    res.render("home", {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      username: req.session.username,
      posts,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

/* Post */

router.get("/post", async (req, res) => {
  console.log("Entered /post");
  try {
    const postData = await sequelize.query(
      `select distinct P.id as post_id,title,content,P.created_at as post_created_date ,(select user.username from user where user.id=P.user_id) as posted_user,C.comment ,(select username from user where id=C.user_id) as commented_user,C.created_at as comment_created_on from post as P join comment C on P.id=C.post_id where P.id=${req.session.post_id}`
    );

    let postDate = postData[0][0].post_created_date;
    let post = {
      id: postData[0][0].post_id,
      title: postData[0][0].title,
      content: postData[0][0].content,
      postedBy: postData[0][0].posted_user,
      postenOn:
        new Date(postDate).getMonth() +
        "/" +
        new Date(postDate).getDate() +
        "/" +
        new Date(postDate).getFullYear(),
    };

    const comments = [];

    for (let j = 0; j < postData[0].length; j++) {
      let date = postData[0][j].comment_created_on;

      comments.push({
        content: postData[0][j].comment,
        commentedBy: postData[0][j].commented_user,
        commentedOn:
          new Date(date).getMonth() +
          "/" +
          new Date(date).getDate() +
          "/" +
          new Date(date).getFullYear(),
      });
    }

    res.render("postDetail", {
      post,
      comments,
      logged_in: req.session.logged_in,
      username:req.session.username
    });
  } catch (e) {
    console.log(e);
  }
});

/* Individual Post */


router.get("/post/:postId", async (req, res) => {
  if (!req.session.logged_in) {
    res.render("login", { logged_in: req.session.logged_in });
  } else {
    console.log("post parameter", req.params.postId);
    try {
      const postData = await Post.findByPk(req.params.postId, {
        attributes: ["id", "title", "content", "created_at"],
        include: [
          User,
          {
            model: Comment,
            include: [User],
          },
        ],
      });
      if (postData) {
        const post = postData.get({ plain: true });

        post.postedBy = post.user.username;
        post.postedOn =
          parseInt(new Date(post.created_at).getMonth()) +
          1 +
          "/" +
          new Date(post.created_at).getDate() +
          "/" +
          new Date(post.created_at).getFullYear();

        const comments = post.comments.map((data) => {
          return {
            ...data,
            commentedOn:
              parseInt(new Date(data.createdAt).getMonth()) +
              1 +
              "/" +
              new Date(data.createdAt).getDate() +
              "/" +
              new Date(data.createdAt).getFullYear(),
          };
        });

        res.render("postDetail", {
          post,
          comments,
          logged_in: req.session.logged_in,
          username:req.session.username

        });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (e) {
      console.log(e);
    }
  }
});

/* Dashboard */


router.get("/dashboard", async (req, res) => {
  console.log(req.session.logged_in);
  if (!req.session.logged_in) {
    res.render("login", { logged_in: req.session.logged_in });
  } else {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      where: { user_id: req.session.user_id },
    });

    let posts = postData.map((post) => post.get({ plain: true }));

    posts = posts.map((post) => {
      return {
        ...post,
        formattedDate:
          new Date(post.created_at).getMonth() +
          "/" +
          new Date(post.created_at).getDate() +
          "/" +
          new Date(post.created_at).getFullYear(),
        //not able to directly pass it hence added to posts
        username: req.session.username,
      };
    });

    console.log(postData);

    res.render("myposts", { logged_in: req.session.logged_in, posts });
  }
});

/* New */

router.get("/newpost", async (req, res) => {
  res.render("newpost", { logged_in: req.session.logged_in });
});


/* Edit - Update */

router.get("/edit/:postId", async (req, res) => {


  const username=req.session.username;

  console.log("Post id and User id",req.params.postId);

  const postData=await Post.findByPk(req.params.postId);

  const post=postData.get({plain:true});
  console.log(post);

  res.render('editPost',{logged_in:req.session.logged_in,post});

});



/* DELETE POST */

router.get("/delete/:postId", async (req, res) => {


 const username=req.session.username;

 console.log("Post id and User id",req.params.postId);

 const postData=await Post.findByPk(req.params.postId);

 const post=postData.get({plain:true});

 console.log(post);

 res.render('editPost',{logged_in:req.session.logged_in,post});

 });


  router.get("/updatePost", async (req, res) => {

  console.log(req.session.title);
  res.render("updatepost",{ logged_in: req.session.logged_in,title:req.session.title,content:req.session.content});

  }); 



module.exports = router;
