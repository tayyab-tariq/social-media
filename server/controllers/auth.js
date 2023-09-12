import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import asyncHandler from 'express-async-handler';


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

    const newUser = new User({
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

    const savedUser = await newUser.create();
    if (savedUser){
        generateToken(res, savedUser._id);
        res.status(201).json({
            _id: savedUser._id,
            name: savedUser.firstName,
            email: savedUser.email
        });
    }   else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

export const login = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user){
        res.status(401);
        throw new Error('Invalid email or password');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        res.status(401);
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });

});