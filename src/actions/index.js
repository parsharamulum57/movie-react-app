export const ADD_MOVIE = "Add-Movie";
export const ADD_TO_FAVOURITES = "Add-to-Favourites";
export const REMOVE_FROM_FAVOURITES = "Remove-from-Favourites";
export const CHANGE_SHOW_FAVOURITES = "Change-Show-Favourites";
export const ADD_MOVIE_TO_LIST = "Add-Movie-To-List";
export const CANCEL_SEARCH_RESULT = "Cancel-Search-Result";
export const ADD_SEARCH_RESULT = "Add-Search-Result";

export function addMovie(movies) {
  return {
    type: ADD_MOVIE,
    movies,
  };
}

export function addMovieToList(movie) {
  return {
    type: ADD_MOVIE_TO_LIST,
    movie,
  };
}

export function addToFavourites(movie) {
  return {
    type: ADD_TO_FAVOURITES,
    movie,
  };
}

export function removeFromFavourites(movie) {
  return {
    type: REMOVE_FROM_FAVOURITES,
    movie,
  };
}

export function changeShowFavourites(val) {
  return {
    type: CHANGE_SHOW_FAVOURITES,
    val,
  };
}

export function hanldeSearchResult(movieName) {
  return function (dispatch) {
    const url = `https://www.omdbapi.com/?apikey=b301aee1&t=${movieName}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data = ", data);

        dispatch(addSearchResult(data));
      });
  };
}

export function addSearchResult(movie) {
  return {
    type: ADD_SEARCH_RESULT,
    movie,
  };
}

export function cancelSearchResult() {
  return {
    type: CANCEL_SEARCH_RESULT,
  };
}
