import React from "react";
import styles from "../styles/Track.module.css";

export default function Track(props) {
  const { name, artist, album } = props.track;

  function handleAddToPlaylist() {
    props.setPlaylist((prev) => ({
      ...prev,
      tracks: [...prev.tracks, props.track],
    }));
  }

  function handleRemoveFromPlaylist() {
    props.setPlaylist((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((track) => track.id !== props.track.id),
    }));
  }

  function determineAddOrRemove() {
    if (props.isAddingToPlaylist) {
      return <i class="fa-solid fa-plus" onClick={handleAddToPlaylist}></i>;
    } else {
      return (
        <i class="fa-solid fa-minus" onClick={handleRemoveFromPlaylist}></i>
      );
    }
  }

  return (
    <li className={styles.track}>
      <div>
        <h3>{name}</h3>
        <p>
          {artist} | {album}
        </p>
      </div>
      {determineAddOrRemove()}
    </li>
  );
}
