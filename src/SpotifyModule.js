const CLIENT_ID = "7d8730c3751146d5a384e67e2a1eef7e";
const REDIRECT_URI = "http://localhost:3000/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = "user-read-private playlist-modify-private";
const API_ENDPOINT = "https://api.spotify.com/v1";
const TOKEN_LOCAL_KEY = "spotifyAuthToken";
const TOKEN_EXPIRATION_LOCAL_KEY = "tokenExpiration";

export function loginWithSpotify() {
  // Generate a random state
  const state = Math.random().toString(36).substring(7);
  // Save the state within the localStorage
  localStorage.setItem("state_key", state);

  let url = AUTH_ENDPOINT;
  url += "?response_type=" + encodeURIComponent(RESPONSE_TYPE);
  url += "&client_id=" + encodeURIComponent(CLIENT_ID);
  url += "&scope=" + encodeURIComponent(SCOPES);
  url += "&redirect_uri=" + encodeURIComponent(REDIRECT_URI);
  url += "&state=" + encodeURI(state);

  window.location.href = url;
}

export function saveTokenInfoFromHash() {
  try {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    const expires_in = params.get("expires_in");

    if (access_token && expires_in) {
      const tokenExpiration = Date.now() + expires_in * 1000;
      window.localStorage.setItem(TOKEN_LOCAL_KEY, access_token);
      window.localStorage.setItem(TOKEN_EXPIRATION_LOCAL_KEY, tokenExpiration);
      window.location.hash = "";
    } else {
      throw new Error(`Getting access token info from hash failed.`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

export function clearLocalStorage() {
  window.localStorage.removeItem(TOKEN_LOCAL_KEY);
  window.localStorage.removeItem(TOKEN_EXPIRATION_LOCAL_KEY);
}

export function isTokenStillValid() {
  const spotifyAuthToken = window.localStorage.getItem(TOKEN_LOCAL_KEY);
  const tokenExpiration = window.localStorage.getItem(
    TOKEN_EXPIRATION_LOCAL_KEY
  );
  return !!spotifyAuthToken && Date.now() < tokenExpiration;
}

export async function searchQuery(query) {
  const token = window.localStorage.getItem(TOKEN_LOCAL_KEY);
  const type = "track";
  const limit = 10;

  const url = `${API_ENDPOINT}/search?q=${query}&type=${type}&limit=${limit}`;
  const request = new Request(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function getArtists(trackInfo) {
    const artists = trackInfo.artists.map((artist) => artist.name);

    const numOfArtists = artists.length;

    if (numOfArtists === 1) {
      return artists[0];
    } else if (numOfArtists === 2) {
      return `${artists[0]} & ${artists[1]}`;
    } else {
      const lastArtist = artists[numOfArtists - 1];
      const otherArtists = artists.slice(0, numOfArtists - 1);
      return `${otherArtists.join(", ")} & ${lastArtist}`;
    }
  }

  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    const tracks = json.tracks.items.map((track) => {
      let trackToBeAdded = {
        id: track.id,
        name: track.name,
        artist: getArtists(track),
        album: track.album.name,
        uri: track.uri,
      };

      return trackToBeAdded;
    });

    return tracks;
  } catch (error) {
    console.error(error.message);
  }
}

async function getUserId() {
  const token = window.localStorage.getItem(TOKEN_LOCAL_KEY);

  const url = `${API_ENDPOINT}/me`;
  const request = new Request(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json.id;
  } catch (error) {
    console.error(error.message);
  }
}

async function createPlaylist(userId, playlistName) {
  const token = window.localStorage.getItem(TOKEN_LOCAL_KEY);

  const url = `${API_ENDPOINT}/users/${userId}/playlists`;
  const request = new Request(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: playlistName,
      public: false,
    }),
  });

  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json.id;
  } catch (error) {
    console.error(error.message);
  }
}

export async function savePlaylistToSpotify(playlistName, tracks) {
  const token = window.localStorage.getItem(TOKEN_LOCAL_KEY);

  const userId = await getUserId();
  const playlistId = await createPlaylist(userId, playlistName);
  const uris = tracks.join();

  const url = `${API_ENDPOINT}/playlists/${playlistId}/tracks?uris=${uris}`;
  const request = new Request(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response.ok;
  } catch (error) {
    console.error(error.message);
  }
}
