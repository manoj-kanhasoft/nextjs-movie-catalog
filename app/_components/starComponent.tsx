import React from "react";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";

interface StarComponentProps {
  rating: number;
}

// StarComponent functional component
const StarComponent: React.FC<StarComponentProps> = ({ rating }) => {
  // Function to render stars based on the provided rating
  const renderStars = () => {
    // Round the rating to the nearest half
    const roundedRating = Math.round(rating * 2) / 4;
    const stars = [];

    // Loop to create star components based on the rounded rating
    for (let i = 1; i <= 5; i++) {
      let starComponent = <IoMdStar className="w-[24px] h-[24px]" />;

      // Check if the current star should be filled or half-filled
      if (i <= roundedRating) {
        starComponent = <IoMdStar className="w-[24px] h-[24px] text-[red]" />;
      } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
        // Add half star with a different color
        starComponent = <IoMdStarHalf className="w-[24px] h-[24px] text-[red]" />;
      }

      // Push the star component to the stars array
      stars.push(starComponent);
    }

    return stars;
  };

  // Render the star components within a flex container
  return <div className="flex">{renderStars()}</div>;
};

export default StarComponent;
