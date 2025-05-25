// controllers/userProfileController.ts
import { Request, Response } from 'express';
import * as UserProfileModel from '@app/models/userProfileModel';
import { UserRequest } from '@app/utils/types/userTypes';

export const upsertUserProfile = async (req: UserRequest, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return 
        }

        const { phone_number, gender, city, preferences, security_question } = req.body;

        const profile = await UserProfileModel.upsertUserProfile({
            user_id: user.id,
            phone_number,
            gender,
            city,
            preferences,
            security_question,
        });

        res.status(200).json({ message: 'Profile saved successfully', profile });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ message: 'Error saving profile', error });
    }
};

export const getUserProfile = async (req: UserRequest, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }

        const profile = await UserProfileModel.getUserProfileByUserId(user.id);

        if (!profile) {
            res.status(404).json({ message: 'Profile not found' });
            return
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error('Error retrieving profile:', error);
        res.status(500).json({ message: 'Error retrieving profile', error });
    }
};

export const deleteUserProfile = async (req: UserRequest, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }

        await UserProfileModel.deleteUserProfile(user.id);
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: 'Error deleting profile', error });
    }
};
