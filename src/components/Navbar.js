import React from "react";
import {
  addMovieToList,
  cancelSearchResult,
  hanldeSearchResult,
} from "../actions";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
    };
  }

  handleSearchInput = (e) => {
    //console.log(e.target.value);
    this.setState({
      searchInput: e.target.value,
    });
  };

  handleSearchResults = () => {
    this.props.dispatch(hanldeSearchResult(this.state.searchInput));
  };

  handleAddToMovies = (result) => {
    this.props.dispatch(addMovieToList(result));
  };

  cancelSearchResults = () => {
    this.props.dispatch(cancelSearchResult());
  };

  render() {
    const { showResults, result } = this.props.search;
    console.log(` showResults ${showResults} result ${result}`);
    return (
      <div className="nav">
        <div className="search-container">
          <input
            onChange={this.handleSearchInput}
            value={this.state.searchInput}
          />
          <button id="search-btn" onClick={this.handleSearchResults}>
            Search
          </button>

          {showResults && (
            <div className="search-results">
              <div className="search-result">
                {result.Response === "True" ? (
                  <>
                    <img src={result.Poster} alt="search-pic"></img>

                    <div className="movie-info">
                      <span>{result.Title}</span>
                      <button onClick={() => this.handleAddToMovies(result)}>
                        Add to Movies
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>{result.Error}</div>
                  </>
                )}
              </div>
              <img
                className="cancel"
                src="https://cdn-icons-png.flaticon.com/128/1828/1828665.png"
                alt="cancel"
                onClick={this.cancelSearchResults}
              ></img>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
