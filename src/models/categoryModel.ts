// models/categoryModel.ts
import pool from '@app/db/db';

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export const getAllCategories = async (): Promise<Category[]> => {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return rows[0] || null;
};

export const addCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
  const { name, description } = category;
  const { rows } = await pool.query(
    `INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *`,
    [name, description]
  );
  return rows[0];
};

export const updateCategory = async (id: number, category: Partial<Omit<Category, 'id'>>): Promise<Category | null> => {
  const { name, description } = category;
  const { rows } = await pool.query(
    `UPDATE categories SET name = COALESCE($1, name), description = COALESCE($2, description)
     WHERE id = $3 RETURNING *`,
    [name, description, id]
  );
  return rows[0] || null;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM categories WHERE id = $1', [id]);
};
