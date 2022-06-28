const postModel = require("../models/posts");
const { Router } = require("express");
const router = Router();

router.get("/api/posts", async (_req, res) => {
  const posts = await postModel.find().lean();

  res.send(posts);
});

module.exports = router;
