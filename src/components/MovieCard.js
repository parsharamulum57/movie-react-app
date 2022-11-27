import React from "react";
import { addToFavourites, removeFromFavourites } from "../actions";

class MovieCard extends React.Component {
  handleFavouriteClick = () => {
    const { movie, dispatch } = this.props;
    dispatch(addToFavourites(movie));
  };

  handleUnFavouriteClick = () => {
    const { movie, dispatch } = this.props;
    dispatch(removeFromFavourites(movie));
  };
  render() {
    const { movie } = this.props;
    return (
      <div className="movie-card">
        <div className="left">
          <img alt="movie-psoter" src={movie.Poster}></img>
        </div>

        <div className="right">
          <div className="title">{movie.Title}</div>
          <div className="plot">{movie.Plot}</div>
          <div className="footer">
            <div className="rating">{movie.imdbRating}</div>

            {this.props.isFavouriteMovie ? (
              <>
                <button
                  className="unfavourite-btn"
                  onClick={this.handleUnFavouriteClick}
                >
                  UnFavourite
                </button>
              </>
            ) : (
              <>
                <button
                  className="favourite-btn"
                  onClick={this.handleFavouriteClick}
                >
                  Favourite
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
