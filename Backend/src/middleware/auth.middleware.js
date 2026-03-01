const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

async function authUser(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const isTokenBlacklisted = await redis.get(token);
    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

}

module.exports = {authUser};