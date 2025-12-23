import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function sign(user) {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function toSafeUser(user) {
    const plain = user.toObject({ virtuals: false })
    delete plain.password
    if (Array.isArray(plain.favoriteMovies)) {
        plain.favoriteMovies = plain.favoriteMovies.map((m) => m.toString())
    }
    return plain
}

export async function login(req, res, next) {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) return res.status(401).json({ message: 'Invalid credentials' })
        const ok = await user.comparePassword(password)
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
        const token = sign(user)
        res.json({ token, user: toSafeUser(user) })
    } catch (err) {
        next(err)
    }
}

export async function signup(req, res, next) {
    try {
        const { username, password, email, birthday } = req.body
        const exists = await User.findOne({ username })
        if (exists) return res.status(409).json({ message: 'Username taken' })
        const user = await User.create({ username, password, email, birthday })
        const token = sign(user)
        res.status(201).json({ token, user: toSafeUser(user) })
    } catch (err) {
        next(err)
    }
}
