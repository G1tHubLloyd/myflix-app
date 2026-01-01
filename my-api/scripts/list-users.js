import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../src/models/User.js'

dotenv.config()

async function listUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')

        const users = await User.find().select('-password')

        console.log(`\nFound ${users.length} user(s):\n`)

        users.forEach((user, index) => {
            console.log(`${index + 1}. Username: ${user.username}`)
            console.log(`   Email: ${user.email}`)
            console.log(`   Birthday: ${user.birthday}`)
            console.log(`   Favorite Movies: ${user.favoriteMovies.length}`)
            console.log(`   Created: ${user.createdAt}`)
            console.log('')
        })

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await mongoose.disconnect()
        console.log('Disconnected from MongoDB')
    }
}

listUsers()
