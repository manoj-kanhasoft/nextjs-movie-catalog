// Import necessary modules and components
"use client";
import React from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import LoginComponent from "@/app/_components/loginComponent";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

// NavBar component
export default function NavBar() {
  // Get session data and status from NextAuth
  const { data, status } = useSession();

  // State for controlling the login drawer
  const [open, setOpen] = React.useState(false);

  // Functions to open and close the login drawer
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div>
      {/* Navigation bar */}
      <Navbar
        placeholder={""}
        className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 mt-4"
      >
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          {/* Sign in/out button */}
          <div className="flex items-center gap-x-1">
            {status === "authenticated" ? (
              <Button
                onClick={() => signOut()}
                placeholder={""}
                variant="gradient"
                size="sm"
              >
                <span>Sign out</span>
              </Button>
            ) : (
              <Button
                placeholder={""}
                variant="gradient"
                size="sm"
                onClick={openDrawer}
              >
                <span>Sign in</span>
              </Button>
            )}
          </div>

          {/* Display user information if authenticated */}
          {status === "authenticated" && (
            <Typography
              placeholder={""}
              className="mr-4 cursor-pointer py-1.5 font-medium flex items-center"
            >
              <img src={data?.user?.image || ""} className="h-12 mr-2" />{" "}
              {data?.user?.name}
            </Typography>
          )}
        </div>
      </Navbar>

      {/* Login component drawer */}
      <LoginComponent open={open} onClose={closeDrawer} />
    </div>
  );
}
