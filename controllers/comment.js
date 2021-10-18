const comments = require("../models/comment");
const blogs = require("../models/blog");
const response = require("../helpers/response");

const fetchCommentByBlog = async (req, res) => {
  try {
    const commentByBlog = await comments.find({ blog_id: req.params.blog_id });
    return res.status(200).json(response(commentByBlog, "Get success!"));
  } catch (error) {
    return res.status(500).json(response(null, error));
  }
};

const createComments = async (req, res) => {
  try {
    const { author, content, blog_id } = req.body;
    if (!author || !content || !blog_id) {
      return res.status(400).json(response(null, "Lack of information!"));
    }

    if (content.length < 1) {
      return res.status(401).json(response(null, "Comment has no content!"));
    }

    const newComment = {
      author: author,
      content: content,
      blog_id: blog_id,
    };

    const result = await comments.create(newComment);
    await blogs.findOneAndUpdate(
      { _id: blog_id },
      { $push: { comments: result } }
    );
    return res.status(200).json(response(result, "Comment success!"));
  } catch (err) {
    return res.status(500).json(error);
  }
};

const editComment = async (req, res) => {
  try {
    const { author, content, blog_id } = req.body;
    if (!author || !content || !blog_id) {
      return res.status(400).json(response(null, "Lack of information!"));
    }

    if (content.length < 1) {
      return res.status(401).json(response(null, "Comment has no content!"));
    }

    const newComment = await comments.findByIdAndUpdate(
      { _id: req.params.id_comment },
      req.body
    );
    return res.status(200).json(response(newComment, "edit success!"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

const delComment = async (req, res) => {
  try {
    const commentDeleted = await comments.remove({
      _id: req.params.id_comment,
    });
    return res.status(200).json(response(commentDeleted, "Deleted comment!"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  fetchCommentByBlog,
  createComments,
  editComment,
  delComment,
};
