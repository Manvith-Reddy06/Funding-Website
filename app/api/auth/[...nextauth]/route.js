import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/myDatabase";
//mongodb://localhost:27017/
// Define schema & model (only once)
const userSchema = new Schema({
  name: String,
  email: String,
  username: String,
  profilepic: String,
  coverpic: String,
});

const User = models.User || model("User", userSchema);

async function connectMongo() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        // ✅ Only connect if not already connected
        await connectMongo();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            username: user.name.replace(/\s+/g, "").toLowerCase(),
            profilepic: user.image,
            coverpic: user.image,
          });

          await newUser.save();
          user.name = newUser.username;
          console.log("New user signed in:", newUser);

        } else {
          user.name = existingUser.username;
          console.log("Existing user signed in:", existingUser);
        }

        return true;
      }

      return false;
    },
    async jwt({ token, user }) {
      // On first login, user exists
      if (user) {
        // Fetch your MongoDB user
        await connectMongo();
        const existingUser = await User.findOne({ email: user.email });
        token.username = existingUser.username;
        token.coverpic = existingUser.coverpic;
      }
      return token;
    },
    async session({session, token}){
      session.user.username = token.username;
      session.user.coverpic = token.coverpic;
      return session;
    }
  },
});

export { handler as GET, handler as POST };
