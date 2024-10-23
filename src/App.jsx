import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import "normalize.css";
import "./global.css";
import styles from "./styles/App.module.css";

export default function App() {
  // States
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState({
    name: "My Playlist",
    tracks: [],
  });

  // Effects

  // Event Handlers

  return (
    <div id="App">
      {/* Header */}
      <Header />
      {/* Search Bar and Search Button */}
      <SearchBar setSearchResults={setSearchResults} />
      <div id="lists-container" className={styles.lists}>
        {/* Search Results */}
        <SearchResults
          searchResults={searchResults}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />
        {/* Playlist */}
        <Playlist playlist={playlist} setPlaylist={setPlaylist} />
      </div>
    </div>
  );
}
