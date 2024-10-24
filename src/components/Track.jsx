import React from "react";
import styles from "../styles/Track.module.css";

export default function Track({ track, setPlaylist, isAddingToPlaylist }) {
  const { name, artist, album } = track;

  function handleAddToPlaylist() {
    setPlaylist((prev) => ({
      ...prev,
      tracks: [...prev.tracks, track],
    }));
  }

  function handleRemoveFromPlaylist() {
    setPlaylist((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((prevTrack) => prevTrack.id !== track.id),
    }));
  }

  return (
    <li className={styles.track}>
      <div className={styles.trackInfo}>
        <h3>{name}</h3>
        <p>
          {artist} | {album}
        </p>
      </div>
      {isAddingToPlaylist ? (
        <i className="fa-solid fa-plus" onClick={handleAddToPlaylist}></i>
      ) : (
        <i className="fa-solid fa-minus" onClick={handleRemoveFromPlaylist}></i>
      )}
    </li>
  );
}
