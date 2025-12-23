import User from '../models/User.js'
import Movie from '../models/Movie.js'

function toSafeUser(user) {
    const plain = user.toObject({ virtuals: false })
    delete plain.password
    if (Array.isArray(plain.favoriteMovies)) {
        plain.favoriteMovies = plain.favoriteMovies.map((m) => m.toString())
    }
    return plain
}

export async function getAllUsers(req, res, next) {
    try {
        return res.status(403).json({ message: 'Forbidden' })
    } catch (err) {
        next(err)
    }
}

export async function getProfile(req, res, next) {
    try {
        const user = await User.findOne({ username: req.params.username })
        if (!user) return res.status(404).json({ message: 'User not found' })
        res.json(toSafeUser(user))
    } catch (err) {
        next(err)
    }
}

export async function updateProfile(req, res, next) {
    try {
        const updates = { email: req.body.email, birthday: req.body.birthday }
        if (req.body.password) updates.password = req.body.password
        const user = await User.findOne({ username: req.params.username })
        if (!user) return res.status(404).json({ message: 'User not found' })
        Object.assign(user, updates)
        await user.save()
        res.json(toSafeUser(user))
    } catch (err) {
        next(err)
    }
}

export async function deleteUser(req, res, next) {
    try {
        await User.deleteOne({ username: req.params.username })
        res.status(204).end()
    } catch (err) {
        next(err)
    }
}

export async function addFavorite(req, res, next) {
    try {
        const { username, movieId } = req.params
        const movie = await Movie.findById(movieId)
        if (!movie) return res.status(404).json({ message: 'Movie not found' })
        const user = await User.findOneAndUpdate(
            { username },
            { $addToSet: { favoriteMovies: movieId } },
            { new: true }
        )
        res.json(toSafeUser(user))
    } catch (err) {
        next(err)
    }
}

export async function removeFavorite(req, res, next) {
    try {
        const { username, movieId } = req.params
        const user = await User.findOneAndUpdate(
            { username },
            { $pull: { favoriteMovies: movieId } },
            { new: true }
        )
        res.json(toSafeUser(user))
    } catch (err) {
        next(err)
    }
}
