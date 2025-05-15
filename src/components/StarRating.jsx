import { Star } from "lucide-react";
import { useState } from "react";

export default function StarRating({ max = 5, onRate }) {
  const [hovered, setHovered] = useState(0);
  const [rated, setRated] = useState(0);

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(0);
  const handleClick = (index) => {
    setRated(index);
    onRate?.(index);
  };

  return (
    <div className="flex">
      {Array.from({ length: max }, (_, i) => {
        const index = i + 1;
        const isFilled = index <= (hovered || rated);
        return (
          <div className="w-8" key={`star-${index}`}>
              <Star
                className={`w-8 h-8 cursor-pointer transition-colors ${
                  isFilled ? "text-yellow-400" : "text-gray-300"
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(index)}
                fill={isFilled ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
          </div>
        );
      })}
    </div>
  );
}
