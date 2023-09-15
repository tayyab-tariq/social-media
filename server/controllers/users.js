import User from "../models/User.js";
import asyncHandler from 'express-async-handler';

/* READ */

export const getUser = asyncHandler(async (req, res) => {
    
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
});


export const getUserFriends = asyncHandler(async (req, res) => {
    
    const { id } = req.params;
    const user = await User.findById(id);
    
    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return {_id, firstName, lastName, occupation, location, picturePath };
        }
    );
    res.status(200).json(formattedFriends);
});


export const addRemoveFriend = asyncHandler(async (req, res) => {
    
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = User.findById(friendId);

    if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id);
    } else {
        user.friends.push(friendId);
        user.friends.push(id);
    }
    await user.save();
    await friend.save();
    
    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return {_id, firstName, lastName, occupation, location, picturePath };
        }
    );

    res.status(200).json(formattedFriends);
});
