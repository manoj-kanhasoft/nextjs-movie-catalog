// Import necessary modules and functions
import { NextRequest, NextResponse } from "next/server";
import { validateGetMovies } from "../../helpers/validations";
import { getURLParameters, apiClient } from "../../helpers/services";
import { AxiosError } from "axios";

// Define the GET function for handling incoming movies related requests
export async function GET(request: NextRequest) {
  try {
    // Destructure the 'request' object for cleaner code
    const { headers, url } = request;

    // Extract the 'token' from request headers or set it to an empty string
    const token: string = headers?.get("token") || "";

    // Validate the 'token' using the validation function
    const errors = validateGetMovies({ token });
    if (Object.entries(errors)?.length) {
      // If validation errors exist, return a JSON response with errors and 422 status
      return NextResponse.json({ errors }, { status: 422 });
    }

    // Extract 'page' and 'search' parameters from the request URL
    const page = getURLParameters(url, "page") || 1;
    const search = getURLParameters(url, "search") || null;

    // Construct the API URL based on the presence of the 'search' parameter
    const apiUrl = search
      ? `/3/search/movie?page=${page}&include_adult=false&language=en-US&query=${search}`
      : `/3/movie/popular?page=${page}`;

    // Make a GET request to the external API using the configured Axios client
    const response = await apiClient().get(apiUrl);

    // Return a JSON response with the API data and 200 status
    return NextResponse.json({ data: response?.data || null }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Handle Axios errors (e.g., network error, request aborted, etc.)
      console.error("GET request AxiosError:", error);

      // Extract response data if available, otherwise, use a default error message
      const responseData = error.response?.data || "Internal Server Error";

      // Return a JSON response with error details and 422 status
      return NextResponse.json({ errors: responseData }, { status: 422 });
    } else {
      // Handle other types of errors
      console.error("GET request error:", error);

      // Return a JSON response with a default error message and 422 status
      return NextResponse.json(
        { errors: "Internal Server Error" },
        { status: 422 }
      );
    }
  }
}

// Create the POST function to manage the favorite movies list. Given the constraints in passing movie IDs through GET requests, this API is designed to use POST for handling a larger number of movie IDs.
export async function POST(request: NextRequest) {
  try {
    // Destructure the 'request' object for cleaner code
    const { headers } = request;

    // Extract the 'token' from request headers or set it to an empty string
    const token: string = headers?.get("token") || "";

    // Validate the 'token' using the validation function
    const errors = validateGetMovies({ token });
    if (Object.entries(errors)?.length) {
      // If validation errors exist, return a JSON response with errors and 422 status
      return NextResponse.json({ errors }, { status: 422 });
    }

    // Use optional chaining and nullish coalescing for default values
    const requestBody = await request.json();
    const favoriteIds: number[] = requestBody?.ids || [];

    // Check if array of favorite ids are passed in the request
    if (Array.isArray(favoriteIds) && favoriteIds?.length) {
      const getFavouriteMovies = await getMoviesDetailsFromIds(favoriteIds);

      // Return a JSON response with the API data and 200 status
      return NextResponse.json(
        { data: getFavouriteMovies || [] },
        { status: 200 }
      );
    }

    // Return an empty array if no favorite movie ids are provided
    return NextResponse.json({ data: [] }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Handle Axios errors (e.g., network error, request aborted, etc.)
      console.error("POST request AxiosError:", error);

      // Extract response data if available, otherwise, use a default error message
      const responseData = error.response?.data || "Internal Server Error";

      // Return a JSON response with error details and 422 status
      return NextResponse.json({ errors: responseData }, { status: 422 });
    } else {
      // Handle other types of errors
      console.error("POST request error:", error);

      // Return a JSON response with a default error message and 422 status
      return NextResponse.json(
        { errors: "Internal Server Error" },
        { status: 422 }
      );
    }
  }
}

/**
 * Fetch movie details for an array of movie IDs.
 * @param movies Array of movie IDs.
 * @returns Promise containing an array of movie details or null for each movie.
 */
const getMoviesDetailsFromIds = async (movies: number[]): Promise<(any | null)[]> => {
  try {
    // Create an array of promises for each movie ID
    const promises = movies.map(async (id: number) => {
      try {
        // Attempt to fetch movie details for the current ID
        const getMovie = await apiClient().get(`/3/movie/${id}`);
        // Return movie data or null if the request is successful
        return getMovie?.data || null;
      } catch (error) {
        // Handle errors that occur during the execution of the try block
        console.error("Error fetching movie details: ", error);
        // Return null in case of an error
        return null;
      }
    });

    // Wait for all promises to settle (fulfilled or rejected)
    const results = await Promise.allSettled(promises);

    // Extract the data from fulfilled promises or use null for rejected promises
    const movieDetails = results.map((result) => (result.status === 'fulfilled' ? result.value : null));

    return movieDetails;
  } catch (error) {
    // Handle errors that occur outside of the promises
    console.error("Error in getMoviesDetailsFromIds: ", error);
    // Return an array of null values to maintain consistency with the number of movies
    return Array(movies.length).fill(null);
  }
};