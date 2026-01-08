// Import necessary modules and components
"use client";
import React, { useContext, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import CardComponent from "@/app/_components/card";
import MovieDetails from "@/app/_components/movieDetails";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LoginComponent from "@/app/_components/loginComponent";
import { UserContext, ContextData } from "@/app/_utils/context";
import { Movie } from "@/app/page";
import { useSession } from "next-auth/react";
import StartComponent from "@/app/_components/starComponent";

// Define the component's props
interface Props {
  className: string;
  movie: Movie;
}

// MovieCard component
export default function MovieCard(props: Props) {
  // Destructure props
  const { className, movie } = props;

  // Access user context data
  const { status } = useSession();
  const { data, removeFavList, addFavList }: ContextData = useContext(UserContext);

  // State for controlling the details drawer
  const [open, setOpen] = useState(false);

  // Functions to open and close the details drawer
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  // State for controlling the login drawer
  const [openLogin, setOpenLogin] = useState(false);

  // Functions to open and close the login drawer
  const openDrawerLogin = () => setOpenLogin(true);
  const closeDrawerLogin = () => setOpenLogin(false);

  return (
    <div>
      {/* Movie card with backdrop image */}
      <CardComponent
        className={className}
        imageUrl={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        // Card footer with Read More button, Star rating, and Heart icon for favorites
        footer={
          <div className="flex items-center justify-between">
            <Button onClick={openDrawer} placeholder={""}>
              Read More
            </Button>
            <StartComponent rating={movie.vote_average || 0} />
            {data?.movieId.includes(movie.id || 0) ? (
              <FaHeart
                color="#f70000"
                size={36}
                className="cursor-pointer"
                onClick={() =>
                  status === "authenticated"
                    ? removeFavList(movie.id)
                    : openDrawerLogin()
                }
              />
            ) : (
              <FaRegHeart
                color="#f70000"
                size={36}
                className="cursor-pointer"
                onClick={() =>
                  status === "authenticated"
                    ? addFavList(movie.id)
                    : openDrawerLogin()
                }
              />
            )}
          </div>
        }
      >
        {/* Movie details within the card */}
        <div>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            Release Date: {movie.release_date}
          </Typography>
          <Typography placeholder={""} className="three-dots">
            {movie.overview}
          </Typography>
        </div>
      </CardComponent>

      {/* Movie details drawer */}
      <MovieDetails open={open} onClose={closeDrawer} movie={movie} />

      {/* Login drawer */}
      <LoginComponent open={openLogin} onClose={closeDrawerLogin} />
    </div>
  );
}
