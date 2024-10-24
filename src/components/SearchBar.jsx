import React, { useState } from "react";
import styles from "../styles/SearchBar.module.css";
import {
  loginWithSpotify,
  searchQuery,
  isTokenStillValid,
} from "../SpotifyModule";

export default function SearchBarContainer(props) {
  const [searchInput, setSearchInput] = useState("");

  function handleChange({ target }) {
    setSearchInput(target.value);
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!isTokenStillValid()) {
      alert("Please try again...");
      props.setIsAuthenticated(false);
    } else {
      const tracksFromQuery = await searchQuery(searchInput);
      props.setSearchResults(tracksFromQuery);
    }
  }

  function showLoginBtnOrForm() {
    if (!props.isAuthenticated) {
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
    } else {
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
  }

  return <section id="search-container">{showLoginBtnOrForm()}</section>;
}
