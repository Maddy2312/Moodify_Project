const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");


async function userRegisterController(req, res){
    const {username, email, password } = req.body;

    const isExists = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    });

    if(isExists){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = await jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token)

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })

}
async function userLoginController(req, res){
    const {username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    }).select("+password");

    if(!user){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const verifyPassword = await bcrypt.compare(password, user.password)
    
    if(!verifyPassword){
    return res.status(400).json({
        message: "Invalid Credentials"
    })
}
    const token = await jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })


    res.cookie("token", token)

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })

}
async function userGetMeController(req, res) {
    const user = await userModel.findById(req.user.id);
    return res.status(200).json({
        message: "User fetched succesfully",
        user
    })
}
async function userLogOutController(req, res) {
    const token = req.cookies.token;

    res.clearCookie('token')
    await redis.set(token, Date.now().toString(), "EX", 60*60)

    res.status(201).json({
        message: "logout successfully"
    })
}

module.exports = {
    userRegisterController,
    userLoginController,
    userGetMeController,
    userLogOutController
}