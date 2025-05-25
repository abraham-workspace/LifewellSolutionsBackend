// routes/favoriteRoutes.ts
import express from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController";

const favorite = express.Router();

favorite.post("/", addFavorite);
favorite.get("/", getFavorites);
favorite.delete("/", removeFavorite);

export default favorite;
