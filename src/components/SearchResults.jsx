import React from "react";
import Tracklist from "./Tracklist";
import styles from "../styles/ListContainer.module.css";

export default function SearchResultsContainer({
  searchResults,
  playlist,
  setPlaylist,
}) {
  return (
    <section id="search-results-container" className={styles.container}>
      <h2 className={styles.title}>Results</h2>
      <Tracklist
        tracks={searchResults}
        playlist={playlist}
        setPlaylist={setPlaylist}
        isAddingToPlaylist={true}
      />
    </section>
  );
}
