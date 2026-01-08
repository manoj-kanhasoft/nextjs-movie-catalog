// Import necessary modules and components
"use client";
import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import DrawerComponent from "@/app/_components/drawer";
import { signIn } from "next-auth/react";

// Interface for component props
interface Props {
  open: boolean;
  onClose: () => void;
}

// DrawerDefault component
export default function DrawerDefault(props: Props) {
  // Destructure props
  const { open, onClose } = props;

  return (
    // Render DrawerComponent with specific configuration
    <DrawerComponent
      open={open}
      onClose={onClose}
      title="Sign In using Github"
      placement="left"
      size={500}
    >
      <div>
        {/* Explanation for users */}
        <Typography
          placeholder={""}
          color="gray"
          className="mb-8 pr-4 font-normal"
        >
          You must log in using GitHub if you want to save favorite movies.
        </Typography>

        {/* Sign-in button section */}
        <div className="flex gap-2">
          <Button
            onClick={() => signIn('github')}
            placeholder={""}
            size="lg"
            variant="gradient"
          >
            Sign In Using GitHub
          </Button>
        </div>
      </div>
    </DrawerComponent>
  );
}
