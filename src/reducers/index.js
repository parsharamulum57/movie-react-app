import { combineReducers } from "redux";

import {
  ADD_MOVIE,
  ADD_MOVIE_TO_LIST,
  ADD_SEARCH_RESULT,
  ADD_TO_FAVOURITES,
  CANCEL_SEARCH_RESULT,
  CHANGE_SHOW_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
} from "../actions";

const movieInitialState = {
  list: [],
  favouriteMovies: [],
  showFavourites: false,
};

export function movieReducer(state = movieInitialState, action) {
  console.log("In Movie Reducer action = ", action);
  switch (action.type) {
    case ADD_MOVIE:
      return {
        ...state,
        list: action.movies,
      };
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favouriteMovies: [action.movie, ...state.favouriteMovies],
      };
    case REMOVE_FROM_FAVOURITES:
      let filterArray = state.favouriteMovies.filter((movie) => {
        return movie !== action.movie;
      });
      return {
        ...state,
        favouriteMovies: filterArray,
      };
    case CHANGE_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        list: [action.movie, ...state.list],
      };
    default:
      return state;
  }
}

const searchInitialState = {
  result: {},
  showResults: false,
};

export function searchReducer(state = searchInitialState, action) {
  console.log("In search Reducer action = ", action);
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result: action.movie,
        showResults: true,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        showResults: false,
      };
    case CANCEL_SEARCH_RESULT:
      return {
        ...state,
        showResults: false,
      };
    default:
      return state;
  }
}

/*const rootInitialState = {
  movies: movieInitialState,
  search: searchInitialState,
};

export function rootReducer(state = rootInitialState, action) {
  console.log("In root Reducer action = ", action);
  return {
    movies: movieReducer(state.movies, action),
    search: searchReducer(state.search, action),
  };
}*/

export default combineReducers({
  movies: movieReducer,
  search: searchReducer,
});
