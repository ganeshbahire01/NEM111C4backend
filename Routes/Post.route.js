const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PostModel } = require("../Modal/Post.model");
const postRoutes = express.Router();

postRoutes.get("/", async (req, res) => {
  const { id } = req.body;
  const { device1, device2, device3 } = req.query;
//   console.log(device1);
  let qu = { id, device: device1 || device2 || device3 };
  try {
    const posts = await PostModel.find(qu);
    res.send(posts);
  } catch (error) {
    console.log(error);
  }
});
postRoutes.get("/top", async (req, res) => {
  const { id } = req.body;

  try {
    const posts = await PostModel.find({ id }).sort({ no_if_comments: -1 });
    res.send(posts[0]);
  } catch (error) {
    console.log(error);
  }
});

postRoutes.post("/addpost", async (req, res) => {
  try {
    const post = PostModel(req.body);
    await post.save();
    res.send("Post Added");
  } catch (error) {
    console.log(error);
  }
});

postRoutes.patch("/updatepost/:id", async (req, res) => {
  const post = await PostModel.findById({ _id: req.params.id });
  try {
    if (post.id != req.body.id) {
      res.send("not Authorise");
    } else {
      await PostModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.send("Post Updated");
    }
  } catch (error) {}
});

postRoutes.delete("/deletepost/:id", async (req, res) => {
  const post = await PostModel.findById({ _id: req.params.id });
  try {
    if (post.id != req.body.id) {
      res.send("not Authorise");
    } else {
      await PostModel.findByIdAndDelete({ _id: req.params.id });
      res.send("Post Deleted");
    }
  } catch (error) {}
});
module.exports = {
  postRoutes,
};
