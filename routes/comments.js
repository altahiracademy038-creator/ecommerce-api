import express from "express";
import commentModel from "../module/comment.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const comment = await commentModel.find({});
  res.json({
    status: "ok",
    data: comment,
  });
});

router.post("/create", async (req, res) => {
  const { text,product,user} = req.body;
  const comment = commentModel.create({text,product,user})
  res.json({
    data:comment
  })
});

export default router;
