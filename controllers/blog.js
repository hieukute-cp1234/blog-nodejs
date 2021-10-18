const blogs = require("../models/blog");
const users = require("../models/user");
const blog = require("../models/blog");
const response = require("../helpers/response");

const fetchBlog = async (req, res) => {
  try {
    const all = await blogs.find({});
    return res.status(200).json(response(all, null));
  } catch (error) {
    return res.status(500).json(error);
  }
};

const fetchBlogByUser = async (req, res) => {
  try {
    const idUser = req.params.id_user;
    if (!idUser) {
      return res.status(401).json(response(null, "Unavailable params!"));
    }

    const existUser = await users.findOne({ _id: idUser });
    if (!existUser) {
      return res.status(402).json(response(null, "User not found"));
    }

    const blogOfUser = await blog.find({ author: idUser });
    return res.status(200).json(response(blogOfUser, "get blog success"));
  } catch (error) {
    return res.status(500).json(response(null, error));
  }
};

const createBlog = async (req, res) => {
  try {
    const { content, image, author } = req.body;
    if (!image && !content) {
      return res.status(400).json(response(null, "Blog no content!"));
    }

    if (!author) {
      return res.status(401).json(response(null, "Blog must have author!"));
    }

    const newBlog = {
      author: author,
      content: content,
      image: image,
      react: [],
      comments: [],
    };

    const result = await blogs.create(newBlog);
    const all = await blogs.find({});
    if (all > 1) {
      return res.status(200).json(response(result, "Add blog success!"));
    }
    return res.status(200).json(response(result, "First blog!"));
  } catch (err) {
    return res.status(500).json(error);
  }
};

const editBlog = async (req, res) => {
  try {
    const { content, image, author } = req.body;

    if (!image && !content) {
      return res.status(400).json(response(null, "Blog no content!"));
    }

    if (!author) {
      return res.status(401).json(response(null, "Blog must have author!"));
    }

    const editedBlog = await blogs.findByIdAndUpdate(
      { _id: req.params.id_blog },
      req.body
    );

    return res.status(200).json(response(editedBlog, "Edit blog success!"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogDelated = await blogs.deleteOne({ _id: req.params.id_blog });
    return res.status(200).json(response(blogDelated, "Delete blog success!"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  fetchBlog,
  createBlog,
  editBlog,
  deleteBlog,
  fetchBlogByUser,
};
