import axios from "axios";
import { tmdbApiUrl, tmdbApiKey } from "../helpers/config";

// Function to create and configure an Axios client for making API requests
export const apiClient = () => {
  // Set the base URL for the Axios client
  const baseURL = tmdbApiUrl;

  // Set the headers for the Axios client, including authentication token
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tmdbApiKey}`,
    Accept: "application/json",
  };

  // Create and return an Axios instance with the configured settings
  return axios.create({
    baseURL,
    headers,
    timeout: 10000, // Set a timeout of 5000 milliseconds for requests
  });
};

// Function to extract a specific parameter value from the URL
export const getURLParameters = (url: string, parameter: string) => {
  // Parse the URL search parameters using the URLSearchParams API
  const search = new URLSearchParams(new URL(url || "").search || "");

  // Get the value of the specified parameter, or return null if not found
  return search?.get(parameter) || null;
};
