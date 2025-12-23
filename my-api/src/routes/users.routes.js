import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { getAllUsers, getProfile, updateProfile, deleteUser, addFavorite, removeFavorite } from '../controllers/users.controller.js'
import { signup } from '../controllers/auth.controller.js'

const router = Router()

function requireSameUser(req, res, next) {
    if (!req.user || req.user.username !== req.params.username) {
        return res.status(403).json({ message: 'Forbidden' })
    }
    return next()
}

router.get('/', requireAuth, getAllUsers)
router.post('/', signup)
router.get('/:username', requireAuth, requireSameUser, getProfile)
router.put('/:username', requireAuth, requireSameUser, updateProfile)
router.delete('/:username', requireAuth, requireSameUser, deleteUser)
router.post('/:username/movies/:movieId', requireAuth, requireSameUser, addFavorite)
router.delete('/:username/movies/:movieId', requireAuth, requireSameUser, removeFavorite)

export default router
