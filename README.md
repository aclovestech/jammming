# Jammming 🎧
*A React app for creating and saving Spotify playlists with ease.*

## Features  
- **Search Spotify’s Library**: Find tracks by title, artist, or album across 50M+ songs.  
- **Build Custom Playlists**: Add/remove tracks with a simple “+”/“-” button interface.  
- **Save to Spotify**: Securely log in via Spotify and save playlists directly to your account.  
- **Dynamic Previews**: Preview playlists in real-time before saving.  

## Tech Stack  
- **Frontend**: React, JavaScript, CSS  
- **APIs**: Spotify Web API (Implicit Grant Flow)

## How It Works
- Uses Spotify’s Implicit Grant Flow for OAuth 2.0 authentication, storing access tokens securely in localStorage.
- Fetches track data from Spotify’s API and displays results in a clean, two-panel UI.
- Leverages React state management to dynamically update playlists and sync changes with Spotify.
