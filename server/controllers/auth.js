import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js'


export const register = asyncHandler(async (req, res) => {
    
    const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation
    } = req.body;
    
    const userExists = await User.findOne({ email });

    if (userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000)
    });
    
    if (newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.firstName,
            email: newUser.email
        });
    }   else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const checkUser = await User.findOne({ email: email });

    if (!checkUser){
        res.status(401);
        throw new Error('Invalid email or password');
    }


    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch){
        res.status(401);
        throw new Error('Invalid email or password');
    }

    const token = generateToken(res, checkUser._id);
    const user = { ...checkUser.toObject() };
    delete user.password;
    res.status(200).json({ token, user });

});