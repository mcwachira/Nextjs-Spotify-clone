import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";


const refreshAccessToken = async (token) => {

    try {

        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        //function that sends both the access token and the refresh token in order to bring back to life a new access token
        const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
        console.log('Refresh TOKEN IS ', refreshAccessToken)

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,

            //The old refresh token is replaced with a new one if it exist or it falls back to the old refresh token
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }

    } catch (error) {

        console.log(error)
        return {
            ...token,
            error: 'RefreshAccessToken'
        }
    }
}
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,

            // authorized url 
            authorization: LOGIN_URL
        })
        //add more providers
    ],

    //encrypting jwt token passed back from spotify during login in
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: ' /login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    //handling expire time in milliseconds
                    accessTokenExpires: account.expires_at * 1000,
                }
            }


            //Return previous token if access token has not expired
            if (Date.now() < token.accessTokenExpires) {
                console.log('Existing Access token is valid');
                return token
            }
            //Access token expires so we need to refresh it ...
            console.log('ACCESS TOKEN HAS EXPIRED , REFRESHING ...')
            return await refreshAccessToken(token);
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;


            return session;

        }

    },
})


