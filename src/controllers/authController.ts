import { Request, Response } from "express";
import asyncHandler from "@app/middleware/asyncHandler/asyncHandler";
import { createUser, findUserByEmail, userExists } from "@app/models/authModel";
import { generateToken } from "@app/utils/helpers/generateToken";
import bcrypt from "bcrypt"


export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    try {

        const { name, email, password, role_id } = req.body;

        if (await userExists(email)) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const user = await createUser({ name, email, password, role_id });

        const { accessToken } = generateToken(res, user.id, user.role_id);

        res.status(201).json({
            message: "User registered successfully",
            accessToken,
            user,
        });
    } catch (error: unknown) {
        console.error('Error Registering New User:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

//logi the user
export const loginUser = asyncHandler(async(req:Request, res:Response)=>{
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
      
        if (!user) {
          res.status(401).json({ message: "Invalid email or password" });
          return;
        }
      
        const isMatch = await bcrypt.compare(password, user.password);
      
        if (!isMatch) {
          res.status(401).json({ message: "Invalid email or password" });
          return;
        }
      
        const { accessToken } = generateToken(res, user.id, user.role_id);
      
        res.status(200).json({
          message: "Login successful",
          accessToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            role_name: user.role_name,
          },
        });
        
    } catch (error: unknown) 
    {
        console.error('Error Logging in user:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
})

//logout the user: 
export const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
  
    res.status(200).json({ message: "User logged out successfully" });
  });