// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmI5MjQzN2I1NWJiODkzNjM0YmI3NWVlZWQzMTIzOSIsInN1YiI6IjY0ZjUwOWFlOGMyMmMwMDEwMGNhYTc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wr31bnKfyxQHSQMSB9lg6UtRt_2Caquc8z75zSWBkjw'
// Define a service using a base URL and expected endpoints
export const tmdb = createApi({
  reducerPath: 'moviesdatabase',

  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders : (headers) =>{
        headers.set('Authorization', `Bearer ${API_KEY}`)
        headers.set('accept', 'application/json')
        return  headers
    }
 }),

  endpoints: (builder) => ({
    getMoviesGenres : builder.query({query: () => `/genre/movie/list`}),

    getMovieServices : builder.query({query: ({sort_order, release_date_gte,vote_average_gte,release_date_lte ,vote_average_lte ,page}) => 
    `/discover/movie?&sort_by=${sort_order}&release_date.gte=${release_date_gte}&release_date_lte=${release_date_lte}&vote_average.gte=${vote_average_gte}&vote_average.lte=${vote_average_lte}&with_original_language=en&page=${page}`}),
    
    getMovieById : builder.query({query: (id) => `/movie/${id}`}),
    getMoviesBySearch : builder.query({query: ({value,page}) => `/search/movie?query=${value}&include_adult=false&language=en-US&page=${page}`}),
    getMovieVideos : builder.query({query: (movieId) => `/movie/${movieId}/videos`}),
   
    getSimilarMovies : builder.query({query: (movieId) => `/movie/${movieId}/similar?vote_average.gte=7.0&language=en-US`}),
    getRecommendationsMovies : builder.query({query: (movieId) => `/movie/${movieId}/recommendations`}),
    getCreditsOfMovie : builder.query({query: (movieId) => `/movie/${movieId}/credits`}),
    getPersonInfos : builder.query({query: (personId) => `/person/${personId}`}),

  }),
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
   useGetMovieServicesQuery,
   useGetMoviesGenresQuery,
   useGetMovieByIdQuery,
   useGetMoviesBySearchQuery,
   useGetMovieVideosQuery,
   useGetSimilarMoviesQuery,
   useGetRecommendationsMoviesQuery,
   useGetCreditsOfMovieQuery,
   useGetPersonInfosQuery

  } = tmdb