import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

const authConfig = {
  session: {
    strategy: "jwt" as const,
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
};

export default authConfig;