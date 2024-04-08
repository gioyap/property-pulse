import connectDB from "@/config/database"
import User from "@/models/User"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
          })
    ],
    callbacks: {
        //invoked on successful signin
        async signIn({ profile }) {
            //connect to db
            await connectDB()
            //check if user exists
            const userExists = await User.findOne({ email: profile.emaiil})
            //if not then add user to db
            if (!userExists) {
                //truncate user name if too long
                const username = profile.name.slice(0,20)

                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }
            //return true to allow sign in
            return true
        },
        async session({ session }) {
            //get user from db
            const user = await User.findOne({ email: session.user.email})
            //assign the user id to the session
            session.user.id = user._id.toString()
            //return session
            return session
        },
    }
}