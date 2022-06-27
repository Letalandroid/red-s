const { Router } = require("express");
const db = require("./models/users");
const bcrypt = require("bcryptjs");

const router = Router();

router.get("/", (_req, res) => {
  res.render("home", {
    title: "Home",
    style: "home",
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
  const userExisting = await db.findOne({ user });

  if (userExisting) {
    res.render("register", {
      title: "Register",
      style: "register",
      error: "User already Use",
    });
  } else if (password === pass_repeat) {
    const newUser = new db({
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

  const userExisting = await db.findOne({ user });

  if (userExisting) {
    if (await bcrypt.compareSync(req.body.password, userExisting.password)) {

      localStorage.setItem("user", user);
      res.redirect("/");

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

module.exports = router;
