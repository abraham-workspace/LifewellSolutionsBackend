import pool from "@app/db/db"

export interface CartItem{ 
    id: number;
    user_id: number;
    product_id: number;
    quantity:number;
    added_at: Date;
}

// Get all cart items for a user
export const getCartItemsByUserId = async (user_id: number): Promise<CartItem[]> => {
    const { rows } = await pool.query('SELECT * FROM cart_items WHERE user_id = $1', [user_id]);
    return rows;
  };
  
  // Add item to cart (or update quantity if it exists)
  export const addCartItem = async (user_id: number, product_id: number, quantity: number): Promise<CartItem> => {
    const existing = await pool.query(
      'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [user_id, product_id]
    );
  
    if (existing.rows.length > 0) {
      const updated = await pool.query(
        `UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *`,
        [quantity, user_id, product_id]
      );
      return updated.rows[0];
    }
  
    const { rows } = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, product_id, quantity]
    );
  
    return rows[0];
  };
  
  // Update quantity of a cart item
  export const updateCartItemQuantity = async (user_id: number, product_id: number, quantity: number): Promise<CartItem | null> => {
    const { rows } = await pool.query(
      `UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *`,
      [quantity, user_id, product_id]
    );
    return rows[0] || null;
  };
  
  // Remove a cart item
  export const removeCartItem = async (user_id: number, product_id: number): Promise<void> => {
    await pool.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [user_id, product_id]);
  };
  
  // Clear all cart items for a user
  export const clearCart = async (user_id: number): Promise<void> => {
    await pool.query('DELETE FROM cart_items WHERE user_id = $1', [user_id]);
  };
  