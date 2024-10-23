import React, { useState } from "react";
import styles from "../styles/Track.module.css";

export default function Track(props) {
  const { name, artist, album } = props.track;

  return (
    <li className={styles.track}>
      <div>
        <h3>{name}</h3>
        <p>
          {artist} | {album}
        </p>
      </div>
      <button className={styles.button}>+</button>
    </li>
  );
}
