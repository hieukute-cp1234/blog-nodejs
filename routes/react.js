const express = require("express");
const router = express.Router();
const { reactController } = require("../controllers");
const verifyTken = require("../middlewares/auth");

router.get("/react/:id_blog", verifyTken, reactController.getDataReact);
router.post("/react", verifyTken, reactController.handleReact);

module.exports = router;
