![Filmstore Logo](src/assets/images/readme.png)

# Filmstore

Filmstore is a React application built with Vite that allows users to browse, discover, and explore movies. It utilizes the TMDB API to provide a rich and interactive movie database experience.

## Features

- **Browse Movies:** Explore a vast collection of movies across various genres.
- **Genre-Based Filtering:** Filter movies by genre to find exactly what you're looking for.
- **Search Functionality:** Quickly search for specific movies using keywords.
- **User Authentication:** Create an account and manage your profile.
- **Detailed Movie Information:** View in-depth information about each movie, including cast, crew, and reviews.
- **Pagination:** Navigate through large movie collections with ease.
- **Rated Cards:** Discover top-rated movies.
- **Color Mode Toggle:** Switch between light and dark themes for a comfortable viewing experience.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web development.
- **Redux:** A predictable state container for JavaScript apps.
- **TMDB API:** The Movie Database API for accessing movie data.
- **CSS:** Styling for the user interface.
- **Material-Ui** For a modern simplified styling

## Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd filmstore
    ```

3.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

1.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Project Structure

```
filmstore/
├── .env                    # Environment variables
├── .gitattributes
├── .gitignore
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML file
├── package-lock.json
├── package.json            # Project dependencies and scripts
├── README.md               # This file
├── vite.config.js          # Vite configuration
├── public/                 # Public assets
│   ├── red.png
│   └── vite.svg
├── src/                    # Source code
│   ├── index.css           # Main CSS file
│   ├── main.jsx            # Main JavaScript file
│   ├── app/                # Redux store configuration
│   │   └── store.js
│   ├── assets/             # Static assets (images, etc.)
│   │   └── genres/
│   │   └── images/
│   ├── components/         # React components
│   │   ├── App.jsx
│   │   ├── Navbar/
│   │   ├── Movies/
│   │   ├── Movie/
│   │   ├── MovieInfo/
│   │   ├── MovieList/
│   │   ├── Pagination/
│   │   ├── Search/
│   │   ├── SideBar/
│   │   ├── Profile/
│   │   ├── RatedCards/
│   │   └── FeaturedMovie/
│   ├── features/           # Redux features (slices)
│   │   └── auth.js
│   ├── services/           # API services
│   │   └── TMDB.js
│   ├── utils/              # Utility functions
│   │   ├── index.js
│   │   └── TogleColorMode.jsx
```

## Contributing

If you'd like to contribute to the project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch with your feature or bug fix.
3.  Commit your changes with clear and concise messages.
4.  Push your branch to your forked repository.
5.  Submit a pull request.
