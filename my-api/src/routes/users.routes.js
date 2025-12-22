import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { getAllUsers, getProfile, updateProfile, deleteUser, addFavorite, removeFavorite } from '../controllers/users.controller.js'
import { signup } from '../controllers/auth.controller.js'

const router = Router()

router.get('/', requireAuth, getAllUsers)
router.post('/', signup)
router.get('/:username', requireAuth, getProfile)
router.put('/:username', requireAuth, updateProfile)
router.delete('/:username', requireAuth, deleteUser)
router.post('/:username/movies/:movieId', requireAuth, addFavorite)
router.delete('/:username/movies/:movieId', requireAuth, removeFavorite)

export default router
