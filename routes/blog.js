const express = require("express");
const router = express.Router();
const { blogController } = require("../controllers");
const verifyTken = require("../middlewares/auth");

router.get("/blog", verifyTken, blogController.fetchBlog);
router.get("/blog/:id_user", verifyTken, blogController.fetchBlogByUser);
router.post("/blog", verifyTken, blogController.createBlog);
router.put("/blog/:id_blog", verifyTken, blogController.editBlog);
router.delete("/blog/:id_blog", verifyTken, blogController.deleteBlog);

module.exports = router;
