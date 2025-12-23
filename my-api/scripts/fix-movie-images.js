import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Movie from '../src/models/Movie.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.error('Error: MONGO_URI not found in environment variables')
    process.exit(1)
}

const imageUpdates = {
    "The Dark Knight": "https://m.media-amazon.com/images/I/81CLjrJfD2L._AC_SY679_.jpg",
    "Avatar": "https://m.media-amazon.com/images/I/71dZUO6FHJL._AC_SY679_.jpg",
    "Parasite": "https://m.media-amazon.com/images/I/91sustSTJ9L._AC_SY679_.jpg",
    "Gladiator": "https://m.media-amazon.com/images/I/51p1J2wGPGL._AC_SY679_.jpg",
    "Pulp Fiction": "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg"
}

async function fixImages() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDB')

        for (const [title, imagePath] of Object.entries(imageUpdates)) {
            const result = await Movie.updateOne(
                { title },
                { $set: { imagePath } }
            )
            if (result.modifiedCount > 0) {
                console.log(`✓ Updated ${title}`)
            } else {
                console.log(`- ${title} not found or already correct`)
            }
        }

        console.log('\n✓ Image fix complete!')
        await mongoose.disconnect()
        console.log('Disconnected from MongoDB')
    } catch (error) {
        console.error('Fix failed:', error)
        process.exit(1)
    }
}

fixImages()
