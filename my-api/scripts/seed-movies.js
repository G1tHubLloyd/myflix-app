import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Movie from '../src/models/Movie.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.error('Error: MONGO_URI not found in environment variables')
    process.exit(1)
}

const movies = [
    {
        title: "Inception",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        imagePath: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
        genre: {
            name: "Sci-Fi",
            description: "Science fiction exploring dreams and reality"
        },
        director: {
            name: "Christopher Nolan",
            bio: "British-American film director, producer, and screenwriter known for his distinctive filmmaking style.",
            birth: new Date("1970-07-30")
        },
        releaseDate: "2010-07-16"
    },
    {
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
        imagePath: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
        genre: {
            name: "Action",
            description: "Superhero action thriller"
        },
        director: {
            name: "Christopher Nolan",
            bio: "British-American film director, producer, and screenwriter known for his distinctive filmmaking style.",
            birth: new Date("1970-07-30")
        },
        releaseDate: "2008-07-18"
    },
    {
        title: "Avatar",
        description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
        imagePath: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
        genre: {
            name: "Sci-Fi",
            description: "Epic science fiction adventure"
        },
        director: {
            name: "James Cameron",
            bio: "Canadian filmmaker known for pioneering visual effects and directing high-grossing films.",
            birth: new Date("1954-08-16")
        },
        releaseDate: "2009-12-18"
    },
    {
        title: "Parasite",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        imagePath: "https://m.media-amazon.com/images/I/91sustSTJ9L._AC_SY679_.jpg",
        genre: {
            name: "Thriller",
            description: "Dark comedy thriller"
        },
        director: {
            name: "Bong Joon-ho",
            bio: "South Korean film director and screenwriter known for genre-defying films.",
            birth: new Date("1969-09-14")
        },
        releaseDate: "2019-05-30"
    },
    {
        title: "Gladiator",
        description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
        imagePath: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
        genre: {
            name: "Action",
            description: "Historical action drama"
        },
        director: {
            name: "Ridley Scott",
            bio: "British film director and producer known for epic historical and science fiction films.",
            birth: new Date("1937-11-30")
        },
        releaseDate: "2000-05-05"
    },
    {
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        imagePath: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg",
        genre: {
            name: "Drama",
            description: "Prison drama about hope and friendship"
        },
        director: {
            name: "Frank Darabont",
            bio: "French-American film director, screenwriter, and producer.",
            birth: new Date("1959-01-28")
        },
        releaseDate: "1994-09-23"
    },
    {
        title: "Pulp Fiction",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        imagePath: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
        genre: {
            name: "Crime",
            description: "Neo-noir crime film"
        },
        director: {
            name: "Quentin Tarantino",
            bio: "American film director known for nonlinear storylines and stylized violence.",
            birth: new Date("1963-03-27")
        },
        releaseDate: "1994-10-14"
    },
    {
        title: "The Matrix",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        imagePath: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg",
        genre: {
            name: "Sci-Fi",
            description: "Cyberpunk science fiction"
        },
        director: {
            name: "The Wachowskis",
            bio: "American film and television directors, writers and producers.",
            birth: new Date("1965-06-21")
        },
        releaseDate: "1999-03-31"
    },
    {
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        imagePath: "https://m.media-amazon.com/images/I/91obuWzA3XL._AC_SY679_.jpg",
        genre: {
            name: "Sci-Fi",
            description: "Space exploration epic"
        },
        director: {
            name: "Christopher Nolan",
            bio: "British-American film director, producer, and screenwriter known for his distinctive filmmaking style.",
            birth: new Date("1970-07-30")
        },
        releaseDate: "2014-11-07"
    },
    {
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        imagePath: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg",
        genre: {
            name: "Crime",
            description: "Mafia crime drama"
        },
        director: {
            name: "Francis Ford Coppola",
            bio: "American film director, producer, and screenwriter.",
            birth: new Date("1939-04-07")
        },
        releaseDate: "1972-03-24"
    }
]

async function seedMovies() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDB')

        // Delete existing movies
        const deleteResult = await Movie.deleteMany({})
        console.log(`Deleted ${deleteResult.deletedCount} existing movies`)

        // Insert new movies
        const inserted = await Movie.insertMany(movies)
        console.log(`\n✓ Successfully seeded ${inserted.length} movies:\n`)

        inserted.forEach(movie => {
            console.log(`  • ${movie.title} (${movie.genre.name}) - Directed by ${movie.director.name}`)
        })

        console.log('\n✓ Seeding complete!')
        await mongoose.disconnect()
        console.log('Disconnected from MongoDB')
    } catch (error) {
        console.error('Seeding failed:', error)
        process.exit(1)
    }
}

seedMovies()
