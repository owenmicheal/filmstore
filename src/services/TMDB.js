import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;



export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({
        // fetching genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`
        }),
        // Fetch the latest movie
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                // get movies by search
                if( searchQuery ) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                }
                // popular, top_rated, upcoming => string {get moivies by category}
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                }
                // 12, 34, 54, 6553 => number {get movies by genre}
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
                }
                // {geting popular movies}
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`
            },
        }),
        //get movie
        getMovie: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
        }),
        // get user specific list {recomende}
        getRecommendations: builder.query({
            query: ({movie_id, list}) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
        }), 
        // get actors
        getActorsDetails: builder.query({
            query: (id) => `person/${id}?api_key=${tmdbApiKey}`
        }),
        // get movies an actor stared in
        getMoviesByActorId: builder.query({
            query: ({ id, page }) => `/discover/movie?api_key=${tmdbApiKey}&with_cast=${id}&page=${page}&sort_by=popularity.desc`,
          }),
    }),
});

export const { 
    useGetGenresQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorsDetailsQuery,
    useGetMoviesByActorIdQuery
} = tmdbApi;
