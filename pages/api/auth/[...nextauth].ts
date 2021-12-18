import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";

const options = {
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
        })
    ],
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options as any)