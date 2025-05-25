import express from 'express'
import * as userProfile from '@app/controllers/userprofileController'
const profile = express.Router()

profile.get('/', userProfile.getUserProfile)
profile.delete('/:id', userProfile.deleteUserProfile)
profile.put('/:id', userProfile.upsertUserProfile)
profile.post('/createProfile', userProfile.upsertUserProfile)