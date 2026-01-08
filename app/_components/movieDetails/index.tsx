// Import necessary modules and components
"use client";
import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import CardComponent from "@/app/_components/card";
import DrawerComponent from "@/app/_components/drawer";
import { Movie } from "@/app/page";
import StartComponent from "@/app/_components/starComponent";

// Define the component's props
interface Props {
  open: boolean;
  onClose: () => void;
  movie: Movie;
}

// MovieCardDetails component
export default function MovieCardDetails(props: Props) {
  // Destructure props
  const { open, onClose, movie } = props;

  return (
    // DrawerComponent for displaying movie details
    <DrawerComponent
      open={open}
      onClose={onClose}
      title=""
      placement="right"
      size={800}
    >
      {/* CardComponent to show movie details */}
      <CardComponent
        className=""
        imageUrl={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        // Footer with a button to close the drawer
        footer={<Button onClick={onClose} placeholder={""}>Close</Button>}
      >
        {/* Content inside the CardComponent */}
        <div>
          {/* Movie title */}
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            {movie.title}
          </Typography>

          {/* Star rating component */}
          <StartComponent rating={movie.vote_average || 0} />

          {/* Movie overview */}
          <Typography placeholder={""}>
            {movie.overview}
          </Typography>

          {/* Additional movie details */}
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            Average Vote: {movie?.vote_average} / 10
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            Release Date: {movie.release_date}
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            Adult Movie: {movie.adult ? "Yes" : "No"}
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            Original Language: {movie.original_language}
          </Typography>
        </div>
      </CardComponent>
    </DrawerComponent>
  );
}
