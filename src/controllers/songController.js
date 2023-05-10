const {
  getAllCachedData,
  getCachedResultById,
  addDataToCache,
  editDataInCache,
  deleteDataInCache,
} = require("../redis/helpers");
const cacheObject = require("../redis/songCache");

const getAllSongs = async (req, res) => {
  try {
    // fetch all the Songs
    const allSongs = await getAllCachedData({
      cacheObject,
      cacheName: "songs",
    });
    return res.status(200).json(allSongs);
  } catch (error) {
    console.log("getSongById Failed");
    return res.status(500).json(error);
  }
};

const getSongById = async (req, res) => {
  try {
    // fetch song by id
    const song = await getCachedResultById({
      cacheObject,
      cacheName: "song",
      id: req.params.id,
    });
    return res.status(200).json(song);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addSong = async (req, res) => {
  try {
    // add a new song to cache
    const newSong = await addDataToCache({
      cacheObject,
      cacheName: "Song",
      payload: req.body,
    });
    return res.status(200).json(newSong);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const editSong = async (req, res) => {
  // edit a song in cache
  try {
    const editedSong = await editDataInCache({
      cacheObject,
      cacheName: "Song",
      id: req.params.id,
      payload: req.body,
    });
    return res.status(200).json(editedSong);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteSong = async (req, res) => {
  try {
    // delete a song from cache
    const deletedSong = await deleteDataInCache({
      cacheObject,
      cacheName: "Song",
      id: req.params.id,
    });
    return res.status(200).json(deletedSong);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  addSong,
  editSong,
  deleteSong,
};
