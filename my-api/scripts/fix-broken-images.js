import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Movie from '../src/models/Movie.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

// Working alternative image URLs
const fixedImages = {
    "The Dark Knight": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "Avatar": "https://image.tmdb.org/t/p/w500/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
    "Parasite": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    "Gladiator": "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"
}

async function fixBrokenImages() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDB\n')

        for (const [title, imagePath] of Object.entries(fixedImages)) {
            const result = await Movie.updateOne(
                { title },
                { $set: { imagePath } }
            )
            if (result.modifiedCount > 0) {
                console.log(`✓ Updated ${title}`)
            } else {
                console.log(`- ${title} not found`)
            }
        }

        console.log('\n✓ Fixed broken image URLs!')
        await mongoose.disconnect()
    } catch (error) {
        console.error('Fix failed:', error)
        process.exit(1)
    }
}

fixBrokenImages()
