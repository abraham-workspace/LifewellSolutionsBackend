import pool from "@app/db/db"
import bcrypt from "bcrypt"

export interface User{
    id: number;
    name:string;
    email:String;
    role_id: number;
    role_name? : string;
}

export interface NewUser{
    name: string;
    email:string;
    password: string;
    role_id: string;
}

// Create a new user
export const createUser = async (user: NewUser): Promise<User> => {
    const { name, email, password, role_id } = user;
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password, role_id)
       VALUES ($1, $2, $3, $4) RETURNING id, name, email, role_id`,
      [name, email, hashedPassword, role_id]
    );
  
    return rows[0];
  };
  
  // Find user by email (with password hash for login)
  export const findUserByEmail = async (email: string) => {
    const { rows } = await pool.query(
      `SELECT users.id, users.name, users.email, users.password, users.role_id, user_roles.role_name
       FROM users
       LEFT JOIN user_roles ON users.role_id = user_roles.id
       WHERE users.email = $1`,
      [email]
    );
  
    return rows[0] || null;
  };
  
  // Check if user exists by email
  export const userExists = async (email: string): Promise<boolean> => {
    const { rows } = await pool.query(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );
    return rows.length > 0;
  };