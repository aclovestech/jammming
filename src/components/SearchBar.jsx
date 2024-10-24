import React, { useState } from "react";
import styles from "../styles/SearchBar.module.css";
import {
  loginWithSpotify,
  searchQuery,
  isTokenStillValid,
} from "../SpotifyModule";

export default function SearchBarContainer({
  setSearchResults,
  isAuthenticated,
  setIsAuthenticated,
}) {
  const [searchInput, setSearchInput] = useState("");

  function handleChange({ target }) {
    setSearchInput(target.value);
  }

  async function handleSearch(e) {
    e.preventDefault();

    if (searchInput === "") {
      alert("Please enter a valid search query.");
      return;
    }

    if (!isTokenStillValid()) {
      alert("Please try again...");
      setIsAuthenticated(false);
    } else {
      const tracksFromQuery = await searchQuery(searchInput);
      setSearchResults(tracksFromQuery);
    }
  }

  function showLoginWithSpotifyBtn() {
    return (
      <div className={styles.loginContainer}>
        <button
          onClick={loginWithSpotify}
          className={styles.loginWithSpotifyBtn}
        >
          Login with Spotify
        </button>
      </div>
    );
  }

  function showSearchForm() {
    return (
      <form className={styles.search} onSubmit={handleSearch}>
        <input
          className={styles.searchBar}
          value={searchInput}
          onChange={handleChange}
        />
        <input className={styles.searchBtn} type="submit" value="Search" />
      </form>
    );
  }

  return (
    <section id="search-container">
      {!isAuthenticated ? showLoginWithSpotifyBtn() : showSearchForm()}
    </section>
  );
}
