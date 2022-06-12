import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import SpotifyWebApi from "spotify-web-api-node";

//instance from the server 
// import spotifyApi from '../lib/spotify'

//initialize the spotify api locally


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  // redirectUri: process.env.REDIRECT_URI
})

const useSpotify = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      //if the refresh access token failed direct user to login
      if (session.error === 'RefreshAccessTokenError') {
        signIn()
      }
      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])
  return spotifyApi;
}

export default useSpotify