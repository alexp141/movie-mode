import { createContext, useContext, useEffect, useState } from "react";
import { FaRegStar as EmptyStar } from "react-icons/fa";
import { FaStar as FullStar } from "react-icons/fa";
import styled from "styled-components";

const StarContext = createContext();

const StyledStarRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function StarRating({ ratingLength, children, setValue }) {
  const [trueRating, setTrueRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(
    function () {
      if (setValue) {
        setValue("rating", trueRating);
      }
    },
    [setValue, trueRating]
  );

  return (
    <StarContext.Provider
      value={{ trueRating, hoverRating, setTrueRating, setHoverRating }}
    >
      <StyledStarRating>
        {Array.from({ length: ratingLength }, (_, i) => {
          return <StarRating.Star key={i + 1} id={i + 1} />;
        })}
        {children}
      </StyledStarRating>
    </StarContext.Provider>
  );
}

function Star({ id }) {
  const { trueRating, hoverRating, setTrueRating, setHoverRating } =
    useContext(StarContext);

  function handleClick() {
    setTrueRating(id);
  }

  function handleMouseEnter() {
    setHoverRating(id);
  }

  function handleMouseExit() {
    setHoverRating(trueRating);
  }

  if (id <= hoverRating || id <= trueRating) {
    return (
      <FullStar
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseExit}
      />
    );
  }

  return (
    <EmptyStar
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
    />
  );
}

StarRating.Star = Star;

export { StarContext };
