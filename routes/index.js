const authRouter = require("./auth");
const blogRouter = require("./blog");
const reactRouter = require("./react");
const commentRouter = require("./comment");

const route = (app) => {
  app.use("/api", authRouter);
  app.use("/api", blogRouter);
  app.use("/api", reactRouter);
  app.use("/api", commentRouter);
};

module.exports = route;
