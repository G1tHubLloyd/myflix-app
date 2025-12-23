import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Movie from '../src/models/Movie.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

async function checkImages() {
    try {
        await mongoose.connect(MONGO_URI)
        const movies = await Movie.find({}, 'title imagePath')
        console.log('Current movie images:\n')
        movies.forEach(m => console.log(`${m.title}: ${m.imagePath}`))
        await mongoose.disconnect()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

checkImages()
