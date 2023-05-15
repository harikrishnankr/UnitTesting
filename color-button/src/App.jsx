import "./App.css";
import { useState } from "react";

export function replaceCamelCaseWithSpaces(color) {
  return color.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [color, setColor] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState();
  const newButtonColor =
    color === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div>
      <button
        disabled={disabled}
        style={{ backgroundColor: disabled ? "gray" : color }}
        onClick={() => setColor(newButtonColor)}
      >
        Change to {replaceCamelCaseWithSpaces(newButtonColor)}
      </button>
      <input
        type="checkbox"
        defaultChecked={disabled}
        id="disable-button-checkbox"
        onClick={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable Button</label>
    </div>
  );
}

export default App;
