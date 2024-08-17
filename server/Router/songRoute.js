const express = require("express");
const songRouter = express.Router();

const {
    createSong,
    getSongById,
    getAllSongs,
    updateSongById,
    deleteSongById,
    getSongStatistics,
} = require("../Controller/songController");

// get songs statics route
songRouter.get("/statistics", getSongStatistics);


// router for creating song.
songRouter.post("/create", createSong);

// router for get all songs.
songRouter.get("/all", getAllSongs);

// router for get by id.
songRouter.get("/:id", getSongById);

// router for update by id song.
songRouter.put("/:id", updateSongById);

// router for delete by id song.
songRouter.delete("/:id", deleteSongById);





module.exports = songRouter;