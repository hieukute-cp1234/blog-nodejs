const reacts = require("../models/react");
const blogs = require("../models/blog");
const response = require("../helpers/response");

const getDataReact = async (req, res) => {
  try {
    const idBlog = req.params.id_blog;
    if (!idBlog) {
      return res.status(401).json(response(null, "Unavailable params!"));
    }

    const existBlog = await blogs.findOne({ _id: idBlog });
    if (!existBlog) {
      return res.status(402).json(response(null, "Blog dose not exist!"));
    }

    const reactOfTheBlog = await reacts.find({ blog: idBlog });
    return res.status(200).json(response(reactOfTheBlog, "Get success!"));
  } catch (error) {
    return res.status(500).json(response(null, error));
  }
};

const handleReact = async (req, res) => {
  try {
    const { reacted, blog, author } = req.body;
    if (!author) {
      return res.status(400).json(response(null, "no author!"));
    }

    if (!blog) {
      return res.status(400).json(response(null, "no blog!"));
    }

    const reaction = await reacts.findOne({
      $and: [{ author: author }, { blog: blog }],
    });

    if (reaction) {
      await reacts.findOneAndDelete({ _id: reaction._id });
      return res.status(200).json(response(null, "Quit reacting!"));
    }

    const newReact = {
      blog: blog,
      author: author,
      reacted: reacted,
    };

    const result = await reacts.create(newReact);
    await blogs.findOneAndUpdate({ _id: blog }, { $push: { react: result } });
    return res.status(200).json(response(result, "Reacted!"));
  } catch (error) {
    return res.status(500).json(response(null, error));
  }
};

module.exports = {
  handleReact,
  getDataReact,
};
