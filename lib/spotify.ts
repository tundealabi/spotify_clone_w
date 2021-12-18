import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-follow-read",
    // "user-library-modify",
].join(",");

const params = {
    scope: scopes
}

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
})

export default spotifyApi;

export { LOGIN_URL }