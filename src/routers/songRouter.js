const { Router } = require("express");
const {
  getAllSongs,
  getSongById,
  addSong,
  deleteSong,
  editSong,
} = require("../controllers/songController");

const songRouter = Router();

songRouter.get("/all", getAllSongs);
songRouter.get("/:id", getSongById);
songRouter.post("/add", addSong);
songRouter.put("/edit/:id", editSong);
songRouter.delete("/delete/:id", deleteSong);

module.exports = songRouter;
