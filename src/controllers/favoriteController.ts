// controllers/favoriteController.ts
import { Request, Response } from "express";
import asyncHandler from "@app/middleware/asyncHandler/asyncHandler";
import * as favoriteModel from "@app/models/favouriteModel";
import { UserRequest } from "@app/utils/types/userTypes";

// Add to favorites
export const addFavorite = asyncHandler(async (req: UserRequest, res: Response) => {
  const user_id = req.user!.id;
  const { product_id } = req.body;

  try {
    const favorite = await favoriteModel.addFavorite(user_id, product_id);
    res.status(201).json({ message: "Product added to favorites", favorite });
  } catch (error) {
    res.status(500).json({ message: "Failed to add favorite", error });
  }
});

// Get user favorites
export const getFavorites = asyncHandler(async (req: UserRequest, res: Response) => {
  const user_id = req.user!.id;

  try {
    const favorites = await favoriteModel.getUserFavorites(user_id);
    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorites", error });
  }
});

// Remove from favorites
export const removeFavorite = asyncHandler(async (req: UserRequest, res: Response) => {
  const user_id = req.user!.id;
  const { product_id } = req.body;

  try {
    await favoriteModel.removeFavorite(user_id, product_id);
    res.status(200).json({ message: "Product removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove favorite", error });
  }
});
