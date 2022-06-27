const { Router } = require("express");
const userModel = require("./models/users");
const postModel = require("./models/posts");
const bcrypt = require("bcryptjs");

const router = Router();

router.get("/", async (_req, res) => {

  const posts = await postModel.find().lean();

  res.render("home", {
    title: "Home",
    posts,
    style: "home"
  });
});

router.get("/register", async (_req, res) => {
  res.render("register", {
    title: "Register",
    style: "register",
  });
});

router.post("/register", async (req, res) => {
  const { user, password, pass_repeat } = req.body;
  const userExisting = await userModel.findOne({ user });

  if (userExisting) {
    res.render("register", {
      title: "Register",
      style: "register",
      error: "User already Use",
    });
  } else if (password === pass_repeat) {
    const newUser = new userModel({
      user,
      password
    });

    newUser.password = await newUser.encryptPassword(password);

    await newUser.save();
    res.redirect("/login");
  } else if (password !== pass_repeat) {
    res.render("register", {
      title: "Register",
      style: "register",
      error: "Passwords do not match",
    });
  }
});

router.get("/login", async (_req, res) => {
  res.render("login", {
    title: "Login",
    style: "login",
  });
});

router.post("/login", async (req, res) => {
  const { user } = req.body;

  const userExisting = await userModel.findOne({ user });

  if (userExisting) {
    if (await bcrypt.compareSync(req.body.password, userExisting.password)) {

      res.render("save", { user: userExisting.user });

    } else {
      res.render("login", {
        title: "Login",
        style: "login",
        error: "Password incorrect",
      });
    }
  } else {
    res.render("login", {
      title: "Login",
      style: "login",
      error: "User does not existing",
    });
  }
});

router.post("/", async (req, res) => {
  const { title, description, user } = req.body;
  const newPost = new postModel({
    title,
    description,
    user
  });

  await newPost.save();
  res.redirect("/");
});

router.get("/logout", async (_req, res) => {

  res.render("logout", {
    title: "Logout",
    style: "logout",
  });

});

module.exports = router;
