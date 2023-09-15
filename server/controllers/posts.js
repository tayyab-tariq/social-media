import Post from "../models/Post.js";
import User from "../models/User.js";
import asyncHandler from 'express-async-handler';


/* CREATE */
export const createPost = asyncHandler(async (req, res) => {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
});



/* READ */
export const getFeedPosts = asyncHandler(async (req, res) => {
    const post = await Post.find();
    res.status(201).json(post);
});

export const getUserPosts = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
});


/* UPDATE */
export const likePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userid } = req.body;
    const post = await Post.findById(id);

    const isLiked = post.likes.get(userId);
    if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    
});
