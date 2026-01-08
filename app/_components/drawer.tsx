// Import necessary modules and components
"use client";
import React, { ReactElement } from "react";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";

// Define the component's props
interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactElement;
  placement?: "left" | "right" | "top";
  size?: number;
}

// DrawerComponent function component
export default function DrawerComponent(props: Props) {
  // Destructure props
  const { open, onClose, title, children, placement, size } = props;

  return (
    // Drawer component with specified size, open state, onClose callback, and placement
    <Drawer
      size={size || 250}
      placeholder={""}
      open={open}
      onClose={onClose}
      className="p-4"
      placement={placement || "left"}
    >
      {/* Drawer header with title and close button */}
      <div className="mb-6 flex items-center justify-between">
        <Typography placeholder={""} variant="h5" color="blue-gray">
          {title}
        </Typography>
        <IconButton
          placeholder={""}
          variant="text"
          color="blue-gray"
          onClick={onClose}
        >
          {/* Close button icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      {/* Drawer content */}
      <div className="mb-8 pr-4 font-normal">{children}</div>
    </Drawer>
  );
}
