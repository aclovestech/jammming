import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import {
  saveTokenInfoFromHash,
  isTokenStillValid,
  clearLocalStorage,
} from "./SpotifyModule";
import "normalize.css";
import "./global.css";
import styles from "./styles/App.module.css";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState({
    name: "My Playlist",
    tracks: [],
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function resetData() {
    setSearchResults([]);
    setPlaylist({
      name: "My Playlist",
      tracks: [],
    });
    clearLocalStorage();
  }

  useEffect(() => {
    if (!isTokenStillValid()) {
      resetData();
      saveTokenInfoFromHash();
    }
    setIsAuthenticated(isTokenStillValid());
  }, [isAuthenticated]);

  return (
    <div id="App">
      {/* Header */}
      <Header />
      {/* Search Bar and Search Button */}
      <SearchBar
        setSearchResults={setSearchResults}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div id="lists-container" className={styles.lists}>
        {/* Search Results */}
        <SearchResults
          searchResults={searchResults}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />
        {/* Playlist */}
        <Playlist
          playlist={playlist}
          setPlaylist={setPlaylist}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
    </div>
  );
}
