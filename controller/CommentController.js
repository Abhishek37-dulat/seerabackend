const Comment = require("../model/Comments.js");
const Product = require("../model/Product.js");

const addComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.id;
    const { text, image, rating } = req.body;

    const userComment = await Comment.create({
      user: userId,
      product: productId,
      text,
      image,
      rating,
    });

    await Product.findByIdAndUpdate(
      productId,
      { $push: { comments: userComment._id } },
      { new: true }
    );

    return res
      .status(201)
      .json({ msg: "Comment added successfully", data: userComment });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error adding comment", error: error.message });
  }
};

const getCommentsByProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const comments = await Comment.find({ product: productId })
      .populate("user", "first_name last_name")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ msg: "Comments fetched successfully", data: comments });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error fetching comments", error: error.message });
  }
};
const updateComment = async (req, res) => {
  const userId = req.user.userId;

  try {
    const commentId = req.params.id;
    const { text, image, rating } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to update this comment" });
    }

    if (text) {
      comment.text = text;
    }
    if (image) {
      comment.image = image;
    }
    if (rating) {
      comment.rating = rating;
    }

    await comment.save();

    return res
      .status(200)
      .json({ msg: "Comment updated successfully", data: comment });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error updating comment", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const userId = req.user.userId;

  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to delete this comment" });
    }

    await Comment.deleteOne({ _id: commentId });

    return res.status(200).json({ msg: "Comment deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error deleting comment", error: error.message });
  }
};
module.exports = {
  addComment,
  getCommentsByProduct,
  updateComment,
  deleteComment,
};
