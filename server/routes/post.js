import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/* READ */
router.get("/", protect, getFeedPosts);
router.get("/:userId/posts", protect, getUserPosts);


/* UPDATE */
router.patch("/:id/like", protect, likePost);



export default router;