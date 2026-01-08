// Import necessary modules and components
"use client";
import React, { ReactElement, createContext, useEffect, useState } from "react";

// Define the structure of component props
interface Props {
  children: ReactElement;
}

// Define the structure of data stored in localStorage
interface LocalStorageData {
  movieId: (string | number)[];
}

// Define the structure of context data
export interface ContextData {
  data: LocalStorageData;
  addFavList: Function;
  removeFavList: Function;
}

// Retrieve data from localStorage or initialize with an empty array
const storageData = localStorage.getItem("favIds") || "";
const localStorageData: LocalStorageData = storageData
  ? JSON.parse(storageData)
  : { movieId: [] };

// Create a context with initial data
const UserContext = createContext<ContextData>({
  data: localStorageData,
  addFavList: () => {},
  removeFavList: () => {},
});

// UserProvider component
const UserProvider = ({ children }: Props) => {
  // State to manage the data
  const [data, setData] = useState<LocalStorageData>(localStorageData);

  // Update localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("favIds", JSON.stringify(data));
  }, [data]);

  // Function to add a movie to the favorites list
  const addFavList = (id: number) => {
    setData({ movieId: [...data.movieId, id] });
  };

  // Function to remove a movie from the favorites list
  const removeFavList = (id: number) => {
    setData({
      movieId: data.movieId.filter((eId: string | number) => eId !== id),
    });
  };

  return (
    // Provide the context value to the children
    <UserContext.Provider value={{ data, addFavList, removeFavList }}>
      {children}
    </UserContext.Provider>
  );
};

// Export UserProvider and UserContext
export { UserProvider, UserContext };
