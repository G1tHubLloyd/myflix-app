import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.error('Error: MONGO_URI not found in environment variables')
    process.exit(1)
}

async function migrateMovies() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDB')

        const db = mongoose.connection.db
        const moviesCollection = db.collection('movies')

        // Find all movies with old schema (uppercase fields)
        const oldMovies = await moviesCollection.find({ Title: { $exists: true } }).toArray()

        console.log(`Found ${oldMovies.length} movies to migrate`)

        if (oldMovies.length === 0) {
            console.log('No movies to migrate. All movies already use lowercase fields.')
            await mongoose.disconnect()
            return
        }

        let migrated = 0
        for (const movie of oldMovies) {
            const updates = {
                title: movie.Title || movie.title || 'Untitled',
                description: movie.Description || movie.description || 'No description available',
                imagePath: movie.ImagePath || movie.imagePath || '',
                genre: movie.Genre || movie.genre || { name: 'Unknown', description: '' },
                director: movie.Director || movie.director || { name: 'Unknown', bio: '' },
                releaseDate: movie.ReleaseDate || movie.releaseDate || '',
            }

            // Ensure genre and director have proper structure
            if (typeof updates.genre === 'string') {
                updates.genre = { name: updates.genre, description: '' }
            } else if (!updates.genre.name) {
                updates.genre = { name: 'Unknown', description: '' }
            }

            if (typeof updates.director === 'string') {
                updates.director = { name: updates.director, bio: '' }
            } else if (!updates.director.name) {
                updates.director = { name: 'Unknown', bio: '' }
            }

            // Update the document
            await moviesCollection.updateOne(
                { _id: movie._id },
                {
                    $set: updates,
                    $unset: {
                        Title: '',
                        Description: '',
                        ImagePath: '',
                        Genre: '',
                        Director: '',
                        ReleaseDate: ''
                    }
                }
            )

            migrated++
            console.log(`✓ Migrated: ${updates.title}`)
        }

        console.log(`\n✓ Migration complete! ${migrated} movies updated.`)
        await mongoose.disconnect()
        console.log('Disconnected from MongoDB')
    } catch (error) {
        console.error('Migration failed:', error)
        process.exit(1)
    }
}

migrateMovies()
