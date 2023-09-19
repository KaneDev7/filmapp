import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { moviesGenreSelected_Slice } from '../reducers/movieGenre_slice';
import { tmdb } from '../services/TMDB';
import { moviesFilter_Slice } from '../reducers/movieFiltrage_slice';
import { filterOptions_slice } from '../reducers/filterOptions_slice';
import { ShowPersonInfos_slice } from '../reducers/ShowPersonInfos_slice';
import { auth_slice } from '../reducers/auth_slice';
import { comments_slice } from '../reducers/comments_slice';

export const store = configureStore({
    reducer : {
    selectedGenre : moviesGenreSelected_Slice.reducer,
    selectedFilter :  moviesFilter_Slice.reducer,
    isFilterOptionsActif : filterOptions_slice.reducer,
    isPersonInfosActif : ShowPersonInfos_slice.reducer,
    auth : auth_slice.reducer,
    comments : comments_slice.reducer,
    [tmdb.reducerPath] : tmdb.reducer,
    },
    middleware : (getDefaultMiddleware) =>getDefaultMiddleware().concat(tmdb.middleware),
 

        
})