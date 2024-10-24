import React from "react";
import Tracklist from "./Tracklist";
import SaveToSpotifyButton from "./SaveToSpotifyButton";
import styles from "../styles/ListContainer.module.css";

export default function Playlist({
  playlist,
  setPlaylist,
  isAuthenticated,
  setIsAuthenticated,
}) {
  function handleChange({ target }) {
    setPlaylist((prev) => ({ ...prev, name: target.value }));
  }

  return (
    <section id="playlist-container" className={styles.container}>
      <input
        onChange={handleChange}
        value={playlist.name}
        className={styles.input}
      />
      <Tracklist
        tracks={playlist.tracks}
        playlist={playlist}
        setPlaylist={setPlaylist}
        isAddingToPlaylist={false}
      />
      <SaveToSpotifyButton
        playlist={playlist}
        setPlaylist={setPlaylist}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </section>
  );
}
