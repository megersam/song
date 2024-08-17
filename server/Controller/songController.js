const songModel = require("../Models/song");
const catchAsyncErrors = require("../Utils/catchAsyncErrors");
const ErrorHandler = require("../Utils/errorHandler");
const errorHandler = require("../Utils/errorHandler");
const express = require("express");
const router = express.Router();


const createSong = catchAsyncErrors(async (req, res) => {
    try {
        const { title, artist, album, genre } = req.body;

        // creating a new song.
        const newSong = await songModel.create({
            title,
            artist,
            album,
            genre
        });
        res.status(201).json({
            success: true,
            data: newSong
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }

});

// get all songs.
const getAllSongs = catchAsyncErrors(async (req, res) => {
    try {
        const songs = await songModel.find();
        res.status(200).json({
            success: true,
            data: songs
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get songs by id
const getSongById = catchAsyncErrors(async (req, res) => {
    try {
        const songId = req.params.id;
        const song = await songModel.findById(songId);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
            
        }
        res.status(200).json({
            success: true,
            data: song
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
});

// update song by id.
const updateSongById = catchAsyncErrors(async (req, res) => {
    try {
        const songId = req.params.id;
        const song = await songModel.findByIdAndUpdate(songId, req.body, {
            new: true,
            runValidators: true
        });
        if (!song) {
            return new (next, ErrorHandler("Song not found", 404));
        }
        res.status(200).json({
            success: true,
            data: song
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
});

// delete song by id.
const deleteSongById = catchAsyncErrors(async (req, res) => {
    try {
        const songId = req.params.id;
        await songModel.findByIdAndDelete(songId);
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
});

// for the stastics

const getSongStatistics = catchAsyncErrors( async (req, res) => {
    try {
      const totalSongs = await songModel.countDocuments();
      const totalArtists = await songModel.distinct('artist').then(artists => artists.length);
      const totalAlbums = await songModel.distinct('album').then(albums => albums.length);
      const totalGenres = await songModel.distinct('genre').then(genres => genres.length);
  
      // Group by genre and count songs in each genre
      const songsByGenre = await songModel.aggregate([
        { $group: { _id: "$genre", count: { $sum: 1 } } }
      ]);
  
 
      const songsAndAlbumsByArtist = await songModel.aggregate([
        {
          $group: {
            _id: "$artist",
            songCount: { $sum: 1 },
            albums: { $addToSet: "$album" }  
          }
        },
        {
          $addFields: { albumCount: { $size: "$albums" } }  
        }
      ]);
  
      // Group by album and count songs in each album
      const songsByAlbum = await songModel.aggregate([
        { $group: { _id: "$album", count: { $sum: 1 } } }
      ]);
  
      res.status(200).json({
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
        songsByGenre,
        songsAndAlbumsByArtist,
        songsByAlbum
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  



module.exports = {
    createSong,
    getSongById,
    getAllSongs,
    updateSongById,
    deleteSongById,
    getSongStatistics
}