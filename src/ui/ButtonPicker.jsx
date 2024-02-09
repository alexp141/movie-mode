import { createContext, useContext, useState } from "react";
import styled from "styled-components";

const ButtonPickerContext = createContext();

const RecommendationButton = styled.button`
  color: inherit;
  font-size: 1.8rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;

  background-color: ${(props) => {
    switch (props.recommended) {
      case "Yes":
        return "green";
      case "No":
        return "red";
      case "Mixed Feelings":
        return "grey";
      default:
        throw new Error("Error in Recommended Info");
    }
  }};

  border: ${(props) => {
    return props.selected
      ? "2px solid var(--color-white)"
      : "2px solid var(--color-purple-dark-20)";
  }};

  border-radius: 3px;
`;

export default function ButtonPicker({ children }) {
  const [selectedButton, setSelectedButton] = useState(0);

  return (
    <ButtonPickerContext.Provider value={{ selectedButton, setSelectedButton }}>
      {children}
    </ButtonPickerContext.Provider>
  );
}

function Button({ children, id, recommended, setValue }) {
  const { selectedButton, setSelectedButton } = useContext(ButtonPickerContext);

  if (selectedButton === id) {
    return (
      <RecommendationButton
        selected={true}
        recommended={recommended}
        onClick={(e) => {
          e.preventDefault();
          setSelectedButton(id);
          setValue("recommended", recommended);
        }}
      >
        {children}
      </RecommendationButton>
    );
  }

  return (
    <RecommendationButton
      selected={false}
      recommended={recommended}
      onClick={(e) => {
        e.preventDefault();
        setSelectedButton(id);
        setValue("recommended", recommended);
      }}
    >
      {children}
    </RecommendationButton>
  );
}

ButtonPicker.Button = Button;
