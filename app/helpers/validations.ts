// Import Messages object from the messages helper
import Messages from "../helpers/messages";

// Import the getMoviesRequest interface from the types helper
import { getMoviesRequest } from "../helpers/types";

// Validation function for getting movies list
export const validateGetMovies = (data: getMoviesRequest) => {
  // Initialize an empty object to store validation errors
  const errors: getMoviesRequest = {};

  // Check if the 'token' property is missing or falsy
  if (!data?.token) {
    // If 'token' is missing or falsy, set an error message using the Messages object
    errors.token = Messages.ERROR.AUTH_TOKEN_REQUIRED;
  }

  // Currently, we have only verified the presence of the token in the header.
  // In the else part, there is an opportunity to conduct further token-related validations,
  // such as assessing its validity and expiration status.
  // else {}

  // Return the object containing validation errors (if any)
  return errors;
};
