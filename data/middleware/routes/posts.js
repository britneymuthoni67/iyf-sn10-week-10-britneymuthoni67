const express = require("express");
const router = express.Router();

const posts = require("../../posts");

// GET all posts
router.get("/", (req, res) => {
  res.json(posts);
});

// GET single post
router.get("/:id", (req, res) => {
  const post = posts.find(
    p => p.id === parseInt(req.params.id)
  );

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  res.json(post);
});

// POST new post
router.post("/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

// PUT update post
router.put("/:id", (req, res) => {
  const post = posts.find(
    p => p.id === parseInt(req.params.id)
  );

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  res.json(post);
});

// DELETE post
router.delete("/:id", (req, res) => {
  const index = posts.findIndex(
    p => p.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  posts.splice(index, 1);

  res.json({
    message: "Post deleted successfully"
  });
});

module.exports = router;