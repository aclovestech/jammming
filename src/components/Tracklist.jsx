import React from "react";
import Track from "./Track";
import styles from "../styles/Tracklist.module.css";

export default function Tracklist({
  tracks,
  playlist,
  setPlaylist,
  isAddingToPlaylist,
}) {
  return (
    <ul className={styles.tracklist}>
      {tracks.map((track) => {
        return (
          <Track
            key={track.id}
            track={track}
            setPlaylist={setPlaylist}
            isAddingToPlaylist={isAddingToPlaylist}
          />
        );
      })}
    </ul>
  );
}
