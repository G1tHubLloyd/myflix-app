import React, { useState } from 'react'
import { MovieCard } from '../movie-card/movie-card'

export const MainView = ({ user, movies, loading, error, onAddFavorite, onRemoveFavorite }) => {
    const [filterText, setFilterText] = useState('')

    const filteredMovies = movies.filter((movie) => {
        const query = filterText.toLowerCase()
        return (
            movie.title?.toLowerCase().includes(query) ||
            movie.description?.toLowerCase().includes(query) ||
            movie.genre?.name?.toLowerCase().includes(query) ||
            movie.director?.name?.toLowerCase().includes(query)
        )
    })

    if (loading) {
        return (
            <div className="container py-4">
                <div className="alert alert-info">Loading movies...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        )
    }

    if (!movies || movies.length === 0) {
        return (
            <div className="container py-4">
                <h1 className="mb-4">Welcome, {user?.username}!</h1>
                <div className="alert alert-warning">No movies available.</div>
            </div>
        )
    }

    return (
        <div className="container py-4">
            <h1 className="mb-4">Welcome, {user?.username}!</h1>

            {/* Movie Filter */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search movies by title, genre, director, or description..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <small className="text-muted d-block mt-2">
                    Showing {filteredMovies.length} of {movies.length} movies
                </small>
            </div>

            {filteredMovies.length === 0 ? (
                <div className="alert alert-info">No movies match your search.</div>
            ) : (
                <div className="movies-list">
                    {filteredMovies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            user={user}
                            onAddFavorite={onAddFavorite}
                            onRemoveFavorite={onRemoveFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
