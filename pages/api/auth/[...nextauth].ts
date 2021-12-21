import spotifyApi, { LOGIN_URL } from "lib/spotify";
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";

async function refreshAcessToken(token: any) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken)

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
        console.log("REFRESHED TOKEN", refreshedToken)

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // * 1 hour as 3600 returns from spotify API
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // if refresh token is not returned, use the one we have
        }

    } catch (err) {
        console.error(err)
        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}

const options = {
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
            authorization: LOGIN_URL
        })
    ],
    secret: process.env.JWT_SECRET as string,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }: { token: any, account: any, user: any }) {

            // initial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expire_at * 1000, // we are handling expiry time in ms, hence * 1000
                }
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                console.log("EXISTING ACCESS TOKEN IS VALID")
                return token;
            }

            // Access token has expired, so we need to refresh it...
            console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...")
            return await refreshAcessToken(token)
        },
        async session({ session, token }: { session: any, token: any }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username

            return session
        }
    }
}


export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options as any)