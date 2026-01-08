// Import necessary modules and components
"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { CiSearch } from "react-icons/ci";
import { Spinner } from "@material-tailwind/react";
import { CgDanger } from "react-icons/cg";

// Import custom components and utilities
import MovieCard from "@/app/_components/movieCard";
import Tabs from "@/app/_components/myFavTab";
import { Button, Input } from "@material-tailwind/react";
import { UserContext, ContextData } from "@/app/_utils/context";

// Define the Movie type
export interface Movie {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

// Function to fetch data from the API
const fetchData = async (page?: number, search?: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movies?${
      page ? `page=${page}` : ""
    }${search ? `&search=${search}` : ""}`,
    {
      headers: {
        token: "test_token",
      },
    }
  );
  const data = await response.data;
  return data.data;
};

// Function to get favorite data based on movie IDs
const getFavoriteData = async (ids: (number | string)[]) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movies`,
    { ids },
    {
      headers: {
        token: "test_token",
      },
    }
  );
  const data = await response.data;
  return data;
};

// Main component
export default function MoviesListPage() {
  // Access user context data
  const { data }: ContextData = useContext(UserContext);

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // State for page number
  const [page, setPage] = useState(1);

  // State for favorite movie list
  const [favList, setFavList] = useState([]);

  // UseQuery hook to fetch movie list based on page and search term
  const {
    data: movieList,
    error,
    isLoading,
    refetch, // Refetch function provided by useQuery
  } = useQuery(
    ["movieList", page, searchTerm],
    () => fetchData(page, searchTerm),
    {
      refetchOnWindowFocus: false,
    }
  );

  // UseMutation hook for getting favorite data
  const mutation = useMutation(getFavoriteData, {
    onSuccess: (res) => {
      setFavList(res.data);
    },
  });

  // State for the active tab ("all" or "fav")
  const [tabValue, setTabValue] = useState("all");

  // Effect to fetch favorite data when tabValue changes to "fav"
  useEffect(() => {
    if (tabValue === "fav") {
      mutation.mutate(data?.movieId || []);
    }
  }, [tabValue]);

  // Event handler for search input change
  const handleSearch = (e: any) => {
    setPage(1);
    setSearchTerm(e.target.value);
  };

  // JSX to render loading spinner
  if (isLoading) {
    return <Spinner className="h-24 w-24 absolute left-[50%] top-[50%]" />;
  }

  // JSX to render error message
  if (error) {
    return (
      <div className="absolute left-[50%] top-[50%]">
        <CgDanger color="#c12222" size={100} />
      </div>
    );
  }

  // JSX to render the main content
  return (
    <main>
      {/* Search and tabs section */}
      <div className=" flex justify-between w-full  mt-6 mb-4 px-56">
        <div className="w-72">
          <Tabs setTabValue={setTabValue} value={tabValue} />
        </div>
        <div className="w-72">
          <Input
            label="Search"
            placeholder="Search by movie title..."
            crossOrigin={Input}
            icon={<CiSearch />}
            className="bg-white"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
      </div>

      {/* Movie list section */}
      <div className="flex p-4 flex-wrap justify-center">
        {tabValue === "all"
          ? movieList.results.map((val: Movie, i: number) =>
              val ? (
                <MovieCard
                  movie={val}
                  key={i}
                  className="m-4 w-96 min-w-[500px] mb-12 transition-all duration-[0.2s] ease-[ease-in-out] hover:shadow-[0_4px_31px_5px_rgba(0,0,0,0.3)]"
                />
              ) : (
                ""
              )
            )
          : favList.map((val: Movie, i: number) =>
              val ? (
                <MovieCard
                  movie={val}
                  key={i}
                  className="m-4 w-96 min-w-[500px] mb-12 transition-all duration-[0.2s] ease-[ease-in-out] hover:shadow-[0_4px_31px_5px_rgba(0,0,0,0.3)]"
                />
              ) : (
                ""
              )
            )}
      </div>

      {/* Pagination section */}
      <div className="absolute left-[50%] pb-[50px]">
        <Button size="lg" placeholder={""} onClick={() => setPage(page + 1)}>
          Go Next
        </Button>
      </div>
    </main>
  );
}
