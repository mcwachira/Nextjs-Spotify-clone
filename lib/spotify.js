import SpotifyWebApi from "spotify-web-api-node";

//permission for spotify
const scopes = [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'streaming',
    'user-read-private',
    'user-library-read',
    //'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-follow-read'

].join(',')

const params = {
    scope: scopes,
}

const queryParamString = new URLSearchParams(params);

// const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    //redirectUri:
})

export default spotifyApi;

export { LOGIN_URL }