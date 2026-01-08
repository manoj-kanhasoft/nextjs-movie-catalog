// Import necessary modules and components
import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Define authentication options
export const authOptions: AuthOptions = {
  providers: [
    // GitHub provider configuration with client ID and client secret from environment variables
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
};

// Initialize NextAuth with the defined authentication options
const handler = NextAuth(authOptions);

// Export the NextAuth handler for both GET and POST requests
export { handler as GET, handler as POST };
