import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from '@models/user'
import {connectToDB} from '@database/database'
const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // async jwt({ token, account }) {
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile }) {
      // if (account.provider === "google") {
      //   return profile.email_verified && profile.email.endsWith("@example.com")
      // }
      
      try {
        await connectToDB();
  
        const userExists = await User.findOne({
          email: profile.email
        });
  
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      } // Do different verification for other providers that don't have `email_verified`
    },
  },

})

export { authOptions as GET, authOptions as POST };