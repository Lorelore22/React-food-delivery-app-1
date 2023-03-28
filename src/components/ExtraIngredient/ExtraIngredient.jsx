import React, { useState } from "react";
import "./styles.css";

const ExtraIngredient = ({ ingredient, onSelect, isChecked }) => {
  const [isSelected, setIsSelected] = useState(isChecked);

  return (
    <div className="extraIngredient">
      <label className="checkboxContainer">
        {ingredient}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            onSelect(ingredient);
            setIsSelected(!isSelected);
          }}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default ExtraIngredient;
