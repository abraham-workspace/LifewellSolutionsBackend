import pool from "@app/db/db";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    image_url: string;
    stock_quantity: number;
    created_at?: Date;
    updated_at?: Date;
}

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
    const { rows } = await pool.query(
      `SELECT p.*, c.name AS category_name
       FROM products p
       JOIN categories c ON p.category_id = c.id`
    );
    return rows;
  };
  
  // Get product by ID
  export const getProductById = async (id: number): Promise<Product | null> => {
    const { rows } = await pool.query(
      `SELECT p.*, c.name AS category_name
       FROM products p
       JOIN categories c ON p.category_id = c.id
       WHERE p.id = $1`,
      [id]
    );
    return rows[0] || null;
  };
  
  // Add a new product
  export const addProduct = async (product: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product> => {
    const { name, description, price, category_id, image_url, stock_quantity } = product;
  
    const { rows } = await pool.query(
      `INSERT INTO products (name, description, price, category_id, image_url, stock_quantity)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, price, category_id, image_url, stock_quantity]
    );
  
    return rows[0];
  };
  
  // Update product
  export const updateProduct = async (id: number, updates: Partial<Product>): Promise<Product | null> => {
    const fields = Object.keys(updates).map((field, index) => `${field} = $${index + 2}`);
    const values = Object.values(updates);
  
    if (fields.length === 0) return null;
  
    const { rows } = await pool.query(
      `UPDATE products SET ${fields.join(", ")} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
  
    return rows[0] || null;
  };
  
  // Delete product
  export const deleteProduct = async (id: number): Promise<void> => {
    await pool.query(`DELETE FROM products WHERE id = $1`, [id]);
  };