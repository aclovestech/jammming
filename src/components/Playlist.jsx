import React, { useEffect, useState } from "react";
import Tracklist from "./Tracklist";
import styles from "../styles/ListContainer.module.css";

export default function Playlist(props) {
  const [playlistNameInput, setPlaylistNameInput] = useState("");

  useEffect(() => {
    setPlaylistNameInput(props.playlist.name);
  }, []);

  function handleChange({ target }) {
    setPlaylistNameInput(target.value);
  }

  function handlePlaylistNameChange(e) {
    e.preventDefault();

    if (playlistNameInput === "") {
      setPlaylistNameInput("My Playlist");
      props.setPlaylist((prev) => ({ ...prev, name: "My Playlist" }));
    } else {
      props.setPlaylist((prev) => ({ ...prev, name: playlistNameInput }));
    }
  }

  return (
    <section id="playlist-container" className={styles.container}>
      <form onSubmit={handlePlaylistNameChange}>
        <input
          onChange={handleChange}
          value={playlistNameInput}
          className={styles.input}
        />
      </form>
      <Tracklist
        tracks={props.playlist.tracks}
        playlist={props.playlist}
        setPlaylist={props.setPlaylist}
        isAddingToPlaylist={false}
      />
    </section>
  );
}
