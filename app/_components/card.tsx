// Import necessary modules and components
"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ReactElement } from "react";

// Define the component's props
interface Props {
  className: string;
  children: ReactElement;
  imageUrl?: string;
  footer?: ReactElement;
}

// CardComponent function component
export default function CardComponent(props: Props) {
  // Destructure props
  const { className, children, imageUrl, footer } = props;

  return (
    // Main Card component with specified className
    <Card className={className} placeholder={""}>
      {/* Card header with a background image */}
      <CardHeader color="blue-gray" className="relative h-56" placeholder={""}>
        <img src={imageUrl} alt="card-image" />
      </CardHeader>

      {/* Card body containing children components */}
      <CardBody placeholder={""}>{children}</CardBody>

      {/* Card footer with specified content */}
      <CardFooter className="pt-0" placeholder={""}>
        {footer}
      </CardFooter>
    </Card>
  );
}
