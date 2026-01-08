// Import necessary modules and components
"use client";
import React from "react";
import TabsComponent from "@/app/_components/tabs";

// Define the component's props
interface Props {
  setTabValue: Function;
  value: string | number;
}

// TabsDefault component
export default function TabsDefault(props: Props) {
  // Sample data for tabs
  const data = [
    {
      label: "All",
      value: "all",
      desc: ``,
    },
    {
      label: "Favorites List",
      value: "fav",
      desc: ``,
    },
  ];

  // Destructure props
  const { value, setTabValue } = props;

  // Render TabsComponent with specified options
  return <TabsComponent value={value} options={data} setTabValue={setTabValue} />;
}
