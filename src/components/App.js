import React from "react";

import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovie, changeShowFavourites } from "../actions";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    // console.log("Start component did Mount", this.props.store.getState());

    /*let ans = this.props.store.subscribe(() => {
      console.log("In subscriber updated");
      console.log(this);
      this.forceUpdate();
    });*/
    // console.log("Middle component did Mount", this.props.store.getState());
    this.props.dispatch(addMovie(data));
    // console.log("End component did Mount", this.props.store.getState(), ans);
  }

  isFavouriteMovie = (movie) => {
    let ind = this.props.movies.favouriteMovies.indexOf(movie);

    //console.log("index ", ind, this.props.store.getState().favouriteMovies);
    if (ind !== -1) {
      return true;
    }
    return false;
  };

  handleChangeTabs = (val) => {
    this.props.dispatch(changeShowFavourites(val));
  };

  render() {
    const { movies, search } = this.props;
    const { list, showFavourites, favouriteMovies } = movies;

    let dataMovies = showFavourites ? favouriteMovies : list;

    //console.log("In App render", this.props.store.getState());

    return (
      <div className="App">
        <Navbar dispatch={this.props.dispatch} search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => {
                this.handleChangeTabs(false);
              }}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => {
                this.handleChangeTabs(true);
              }}
            >
              Favourites
            </div>
          </div>

          <div className="list">
            {dataMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={index}
                dispatch={this.props.dispatch}
                isFavouriteMovie={this.isFavouriteMovie(movie)}
              />
            ))}
          </div>

          {dataMovies.length === 0 && (
            <div className="no-movies">No movies </div>
          )}
        </div>
      </div>
    );
  }
}
//Using Consumer
/*
class AppWrapper extends React.Component {
  render() {
    console.log("In AppWrapper");
    return (
      <StoreContext.Consumer>
        {(store) => {
          return <App store={store} />;
        }}
      </StoreContext.Consumer>
    );
  }
}*/
function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}

const ConnectComponent = connect(mapStateToProps)(App);

export default ConnectComponent;
