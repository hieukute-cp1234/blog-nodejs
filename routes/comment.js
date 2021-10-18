const express = require("express");
const router = express.Router();
const { commentController } = require("../controllers");
const verifyTken = require("../middlewares/auth");

router.get(
  "/comments/:blog_id",
  verifyTken,
  commentController.fetchCommentByBlog
);
router.post("/comments", verifyTken, commentController.createComments);
router.put("/comments/:id_comment", verifyTken, commentController.editComment);
router.delete(
  "/comments/:id_comment",
  verifyTken,
  commentController.delComment
);

module.exports = router;
