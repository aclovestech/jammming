import React from "react";
import Track from "./Track";
import styles from "../styles/Tracklist.module.css";

export default function Tracklist(props) {
  return (
    <ul className={styles.tracklist}>
      {props.tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            playlist={props.playlist}
            setPlaylist={props.setPlaylist}
          />
        );
      })}
    </ul>
  );
}
