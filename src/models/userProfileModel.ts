import pool from "@app/db/db";

export interface UserProfile{
    id: number;
    user_id:number;
    phone_number?:string;
    gender?:string;
    city?:string;
    preferences?:string[];
    security_question?:string;
    created_at?:Date;
    update_at?:Date;
}


// Create or Update User Profile
export const upsertUserProfile = async (profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>): Promise<UserProfile> => {
    const { user_id, phone_number, gender, city, preferences, security_question } = profile;
    const { rows } = await pool.query(
      `INSERT INTO user_profile (user_id, phone_number, gender, city, preferences, security_question)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id) DO UPDATE SET
          phone_number = EXCLUDED.phone_number,
          gender = EXCLUDED.gender,
          city = EXCLUDED.city,
          preferences = EXCLUDED.preferences,
          security_question = EXCLUDED.security_question,
          updated_at = NOW()
       RETURNING *`,
      [user_id, phone_number, gender, city, preferences, security_question]
    );
    return rows[0];
  };
  
  // Get User Profile by User ID
  export const getUserProfileByUserId = async (user_id: number): Promise<UserProfile | null> => {
    const { rows } = await pool.query(`SELECT * FROM user_profile WHERE user_id = $1`, [user_id]);
    return rows[0] || null;
  };
  
  // Delete User Profile
  export const deleteUserProfile = async (user_id: number): Promise<void> => {
    await pool.query(`DELETE FROM user_profile WHERE user_id = $1`, [user_id]);
  };