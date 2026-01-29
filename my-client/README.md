# MyFlix Client (Vite + React)

A responsive React single-page application for browsing movies, managing favorites, and maintaining user profiles. Built with Vite, React Router, Bootstrap, and integrated with a Node.js/Express backend API.

## Features

- **User Authentication**: Sign up and login with JWT tokens
- **Browse Movies**: View full movie catalog with descriptions, genres, and directors
- **Search & Filter**: Search movies by title, genre, director, or description
- **Favorites Management**: Add/remove movies from your favorites list
- **User Profile**: View and edit profile information (email, birthday, password)
- **Responsive Design**: Mobile-friendly Bootstrap-based UI
- **Protected Routes**: Authentication required for protected pages
- **State Management**: React hooks with localStorage persistence

## Quick Start

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL to your API endpoint (local dev: http://localhost:5003)

# Start development server (Vite will choose 5173 or next open port)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5003
```

For production (Netlify):
```env
VITE_API_BASE_URL=https://your-api-url.herokuapp.com
```

## Scripts
- `dev`: Start Vite dev server with hot reload
- `build`: Create optimized production build
- `preview`: Preview the production build locally

## Tech Stack
- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **Vite 7** - Build tool & dev server
- **Bootstrap 5** - CSS framework
- **SCSS** - Styling preprocessor
- **Axios** - HTTP client (via api.js)
- **JWT** - Token-based authentication

## Project Structure
```
my-client
├─ package.json
├─ vite.config.js
├─ index.html
├─ .env.example
├─ src
│  ├─ index.jsx          # React root
│  ├─ index.scss         # Global styles
│  ├─ App.jsx            # Main app component with routing
│  ├─ api.js             # API client functions
│  └─ components
│     ├─ navigation-bar/  # Top navigation with user links
│     ├─ main-view/       # Movie browser with search/filter
│     ├─ movie-card/      # Individual movie card
│     ├─ movie-view/      # Movie details page
│     ├─ login-view/      # Login form
│     ├─ signup-view/     # Registration form
│     └─ profile-view/    # User profile & favorites management
```

## API Integration

This app connects to a Node.js/Express backend. Required endpoints:

- `POST /auth/` - Login
- `POST /auth/signup` - Register new user
- `GET /movies` - Get all movies
- `GET /users/{username}` - Get user profile
- `PUT /users/{username}` - Update user info
- `DELETE /users/{username}` - Delete account
- `POST /users/{username}/movies/{movieId}` - Add favorite
- `DELETE /users/{username}/movies/{movieId}` - Remove favorite

## Testing

1. Start both servers:
   ```bash
   npm run dev  # from project root
   ```

2. Open http://localhost:5173 in your browser

3. Test features:
   - Create account or login (testuser / testpass123)
   - Search for movies using the filter box
   - Add/remove favorites
   - Edit profile information
   - View all features in React DevTools

## Deployment

### Netlify Deployment

1. **Build & Test Locally**
   ```bash
   npm run build
   npm run preview
   ```

2. **Connect GitHub to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select GitHub repository
   - Choose branch to deploy (main)

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Set Environment Variables**
   - In Netlify Site Settings → Build & deploy → Environment
   - Add `VITE_API_BASE_URL` with production API URL

5. **Deploy**
   - Netlify auto-deploys on push to main branch

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 5173
# Windows:
taskkill /IM node.exe /F
# macOS/Linux:
lsof -ti:5173 | xargs kill -9
```

**API connection issues?**
- Ensure backend is running on port 5003
- Check CORS_ORIGIN in backend .env includes http://localhost:5173
- Verify token is valid in localStorage

**Styling issues?**
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild: `npm run build && npm run preview`

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Project Structure
```
my-client
├─ package.json
├─ vite.config.js
├─ index.html
├─ src
│  ├─ index.jsx
│  ├─ index.scss
│  ├─ App.jsx
│  └─ components
│     ├─ navigation-bar/navigation-bar.jsx
│     ├─ main-view/main-view.jsx
│     ├─ movie-card/movie-card.jsx
│     ├─ movie-view/movie-view.jsx
│     ├─ login-view/login-view.jsx
│     ├─ signup-view/signup-view.jsx
│     └─ profile-view/profile-view.jsx
```

## Features
- **Authentication**: Login & Signup with JWT tokens
- **Routing**: React Router with protected routes (redirect unauthenticated users)
- **Navigation Bar**: Conditional links based on auth status, modern diagonal styling
- **Movie Browsing**: Home page lists all movies from API
- **Movie Details**: Dedicated page for each movie with full information
- **Favorites**: Add/remove movies to favorites (synced with backend)
- **Profile Management**: 
  - View user information
  - Edit email, birthday, and password
  - Delete account (deregister)
  - View and manage favorite movies list
- **Persistent Sessions**: User auth and favorites stored in localStorage
- **Responsive Design**: Bootstrap 5 styling throughout

## Routing
- `/login` — public; redirects to `/` if authenticated
- `/signup` — public; redirects to `/` if authenticated
- `/` — protected MainView
- `/movies/:movieId` — protected MovieView
- `/profile` — protected ProfileView

## Configuration
- Vite config in `vite.config.js` with React plugin.
- SCSS entry `src/index.scss` loaded from `src/index.jsx`.

## Development Notes
- Ensure the backend API is running before starting the client
- API calls are made to the URL specified in `VITE_API_BASE_URL` environment variable
- Movies, users, and favorites are stored in MongoDB via the API
- Authentication uses JWT tokens stored in localStorage
- The app uses React Router v7 for client-side routing
- Bootstrap 5 is used for styling

## API Endpoints Used
- `POST /login` - Authenticate user
- `POST /users` - Register new user
- `GET /users/:username` - Get user profile
- `PUT /users/:username` - Update user profile
- `DELETE /users/:username` - Delete user account
- `GET /movies` - Get all movies
- `POST /users/:username/movies/:movieId` - Add movie to favorites
- `DELETE /users/:username/movies/:movieId` - Remove movie from favorites

## Git
- Main development branch: `main`
- Create feature branches for new work
- Ensure `.gitignore` excludes `node_modules/`, `dist/`, and `.env`

## Next Steps
- Ensure backend API is running and accessible
- Seed database with movie data
- Test all features end-to-end
- Deploy to production (consider Netlify for client, Render/Railway for API)
