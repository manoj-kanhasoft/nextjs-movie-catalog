// Import necessary modules and components
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/app/client-provider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import NavBar from "@/app/_components/navBar";

// Load the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application
export const metadata: Metadata = {
  title: "Movie App",
  description: "Movie App",
};

// RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the server session using authOptions
  const session = getServerSession(authOptions);

  return (
    // HTML document structure with language set to "en"
    <html lang="en">
      <body className={inter.className}>
        {/* Provider component wrapping NavBar and children */}
        <Provider session={session}>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
