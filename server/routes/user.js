import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js";

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/* READ */
router.get("/:id", protect, getUser);
router.get("/:id/friends", protect, getUserFriends);

/* UPDATE */
router.patch('/:id/:friendId', protect, addRemoveFriend);

export default router;