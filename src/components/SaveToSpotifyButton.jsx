import React from "react";
import { isTokenStillValid, savePlaylistToSpotify } from "../SpotifyModule";
import styles from "../styles/SaveToSpotifyButton.module.css";

export default function SaveToSpotifyButton(props) {
  async function handleSave() {
    if (!isTokenStillValid()) {
      alert("Please try again...");
      props.setIsAuthenticated(false);
    } else {
      const uris = props.playlist.tracks.map((track) => track.uri);

      if (props.playlist.name === "") {
        alert("Please input a valid playlist name.");
        return;
      }

      const isPlaylistSaved = await savePlaylistToSpotify(
        props.playlist.name,
        uris
      );

      if (isPlaylistSaved) {
        alert(
          `The playlist named "${props.playlist.name}" was successfully saved to your Spotify account.`
        );

        props.setPlaylist({
          name: "My Playlist",
          tracks: [],
        });
      }
    }
  }

  const shouldShowBtn =
    props.isAuthenticated && props.playlist.tracks.length > 0;

  return (
    <>
      {shouldShowBtn && (
        <button onClick={handleSave} className={styles.saveToSpotifyBtn}>
          Save To Spotify
        </button>
      )}
    </>
  );
}
