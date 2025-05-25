import pool from "@app/db/db";
import { Favorite } from "@app/utils/types/favoriteTypes";

export const addFavorite = async (user_id: number, product_id: number): Promise<Favorite> => {
    const { rows } = await pool.query(
      `INSERT INTO favorites (user_id, product_id)
       VALUES ($1, $2)
       RETURNING *`,
      [user_id, product_id]
    );
    return rows[0];
  };
  
  export const getUserFavorites = async (user_id: number): Promise<Favorite[]> => {
    const { rows } = await pool.query(
      `SELECT favorites.id, favorites.product_id, products.name, products.price, products.image_url
       FROM favorites
       JOIN products ON favorites.product_id = products.id
       WHERE favorites.user_id = $1`,
      [user_id]
    );
    return rows;
  };
  
  export const removeFavorite = async (user_id: number, product_id: number): Promise<void> => {
    await pool.query(
      `DELETE FROM favorites WHERE user_id = $1 AND product_id = $2`,
      [user_id, product_id]
    );
  };
