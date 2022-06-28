const postModel = require("../models/posts");
const { Router } = require("express");
const router = Router();
let d = new Date();

router.get("/", async (_req, res) => {
  const posts = await postModel.find().lean();

  res.render("home", {
    title: "Home",
    posts,
    style: "home",
  });
});

router.post("/", async (req, res) => {
  const { title, description, user } = req.body;

  if (title === "" || description === "" || title.startsWith(" ") || description.startsWith(" ")) {
    res.render("home", {
      title: "Home",
      style: "home",
      error: "Please fill all fields",
    });
  } else {
    const newPost = new postModel({
      title,
      description,
      user,
      createdAt: new Date()
    });

    await newPost.save();
    res.redirect("/");
  }

});

module.exports = router;