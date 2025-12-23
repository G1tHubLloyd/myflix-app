import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../src/models/User.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.error('Error: MONGO_URI not found in environment variables')
    process.exit(1)
}

async function cleanupUsers() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDB')

        // Keep these test users
        const keepUsernames = ['john', 'jane', 'testuser123']

        // Get all users
        const allUsers = await User.find()
        console.log(`\nTotal users in database: ${allUsers.length}`)

        // Delete users not in the keep list
        const deleteResult = await User.deleteMany({
            username: { $nin: keepUsernames }
        })

        console.log(`\n✓ Deleted ${deleteResult.deletedCount} users`)

        // Show remaining users
        const remainingUsers = await User.find().select('username email birthday')
        console.log(`\n✓ Remaining users (${remainingUsers.length}):`)
        remainingUsers.forEach(user => {
            console.log(`  • ${user.username} - ${user.email}`)
        })

        await mongoose.disconnect()
        console.log('\n✓ Cleanup complete!')
        console.log('Disconnected from MongoDB')
    } catch (error) {
        console.error('Cleanup failed:', error)
        process.exit(1)
    }
}

cleanupUsers()
