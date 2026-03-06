const express = require("express");
const upload = require("../middleware/upload.middleware");
const songController = require("../controllers/song.controller")

const songRouter = express.Router();

songRouter.post("/", upload.single("song"), songController.uploadSong)
songRouter.get("/", songController.getSong)

module.exports = songRouter;